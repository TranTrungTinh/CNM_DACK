// import library
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// API Route
const db = require('./models/Config');
const Driver = require('./models/Drivers');
const apiDriver = require('./controlles/router');

// api
app.use('/api', apiDriver);

// connect
server.listen(4200, () => console.log('Server has been started port 4200'));

// Global variable
const currentDriver = []; // store socket driver log in
const busyDriver = []; // store socket diver busy
// const completes = []; // store complete path history
// const notpickups = []; // store not pickup history
let oneAccept = 0; // check one accept driver
let countDriverSend = 0; // check count notification send to driver
let countDriverCancel = 0; // check equal with countDriverSend

// Listening connected...
io.on('connection' , socket => {
  
  /* Socket with GPS APP */
  socket.on('GET_ALL_DRIVER' , () => {
    Driver.getAllDriver()
    .then(data => socket.emit('SEND_ALL_DRIVER' , data));
  });
  
  // Khi app GPS định vị cho người dùng hệ thống gửi lên 5 xe
  socket.on('RIDER_SELECTED_DRIVER', data => {
    // reset state
    countDriverSend = 0;
    countDriverCancel = 0;
    // Tình huống thứ 1
    // Chưa có tài xế đăng nhập
    if(!currentDriver[0]) {
      socket.emit('NOT_DRIVER_READY');
      return;
    }
    // Tình huống thứ 2
    // Lọc 5 xe và gửi thông tin khách về cho tài xế 
    const { driversID , rider } = data;
    // Tình huống thứ 3
    // Không có 5 xe gần nhất đăng nhập vào
    let checkFiveCar = 0;
    oneAccept = 1; // Chỉ chấp nhận một tài xế
    driversID.forEach(idDriver => {
      const index = currentDriver.findIndex(e => e.idDriver === idDriver);
      if(index < 0) {
        checkFiveCar++;
        if(checkFiveCar === 5) socket.emit('NO_FIVE_DRIVER');
        return;
      } 
      countDriverSend++; // Lưu giá trị số lần gửi
      const { id } = currentDriver[index];
      socket.to(id).emit('SEVER_SEND_RIDER' , rider);
    });
  });


  /* ============================== */
  /* Socket with DRIVER APP */

  socket.on('DRIVER_LOG_IN', idDriver => {
    socket.idDriver = idDriver;
    const index = currentDriver.findIndex(e => e.idDriver === idDriver);
    if(index < 0) {
      currentDriver.push(socket);
      socket.emit('LOGIN_SUCCESS');     
      return;
    }
    socket.emit('LOGIN_FAIL');     
  });

  socket.on('DRIVER_LOG_OUT', idDriver => {
    const index = currentDriver.findIndex(e => e.idDriver === idDriver);
    const indexbusy = busyDriver.findIndex(e => e.idDriver === idDriver);
    if(index >= 0) currentDriver.splice(index , 1);
    else busyDriver.splice(indexbusy , 1);
  });

  socket.on('DRIVER_ACCEPT', async ({idDriver , idRider}) => {
    if(oneAccept === 1){
      // remove driver accept ~ driver is busying
      const index = currentDriver.findIndex(e => e.idDriver === idDriver);
      if(index >= 0) {
        busyDriver.push(currentDriver[index]);
        currentDriver.splice(index , 1);
      } 

      // update database
      // set state=true with driver
      const Ddata = await db.ref(`cars/${idDriver}`).once('value');
      const Rdata = await db.ref(`users/${idRider}`).once('value');
      db.ref(`users/${idRider}`).remove();
      db.ref(`cars/${idDriver}`).update({state: true});
      
      const {name , lat , lng} = Ddata.val();      
      const driver = {id: Ddata.key , name , lat , lng };
      const rider = {id: Rdata.key , ...Rdata.val()};
      db.ref(`pickup`).push({rider , driver});

      oneAccept = 0; // Chỉ chấp nhận một tài xế chọn "chấp nhận" nhanh nhất     
      socket.broadcast.emit('CLOSE_NOTIFICATION', {idDriver , idRider});
    }
  });

  socket.on('DRIVER_CANCEL', async (data) => {
    countDriverCancel++;    
    // Kiểm tra nếu số lượt không phản hồi = số lần gửi
    if(countDriverCancel === countDriverSend) {
      const {id} = data;
      // write database not pick up
      const Rdata = await db.ref(`users/${id}`).once('value');
      if(Rdata.key) {
        const rider = {id: Rdata.key , ...Rdata.val()};
        db.ref('notpickup').push(rider);
        db.ref(`users/${id}`).remove();   
      }       
      socket.broadcast.emit('CHOOSE_ANOTHER_DRIVER' , data);
    } 
  });

  socket.on('DRIVER_COMPLETE' , async (idRider) => {
    const data = await db.ref(`pickup`).once('value');
    data.forEach(e => {
      const {rider , driver} = e.val();
      if(rider.id === idRider) {
        // update currentDriver
        const index = busyDriver.findIndex(e => e.idDriver === driver.id);
        if(index >= 0) {
          currentDriver.push(busyDriver[index]);
          busyDriver.splice(index , 1);
        }
        // update database
        db.ref('complete').push({rider , driver});
        db.ref(`cars/${driver.id}`).update({state: false});
        db.ref(`pickup/${e.key}`).remove();
        // send data
        socket.broadcast.emit('SEND_DRIVER_COMPLETE', idRider);
        return;                   
      }
    });
  });

  db.ref('cars').on('child_changed', driver => {
    const {state , name , username , lat , lng} = driver.val();
    if(!state) {
      const freeDriver = {id: driver.key , name , username , lat , lng}
      socket.emit('SEND_FREE_DRIVER' , freeDriver);
    }
  });

  /* ============================== */
  /* Socket with MANAGE AND DRIVER APP */

  socket.on('CLIENT_SEND_POSITION' , data => {
    socket.broadcast.emit('SERVER_SEND_POSITION' , data);
  });

  /* ============================== */
  /* Socket with MANAGE APP */

  db.ref('users').on('child_added' , user => {
    const { state , phone , address , lat , lng } = user.val();
    const rider = { id: user.key, phone , address , lat , lng };
    socket.emit('SEND_NEW_RIDER', rider);
  });

  db.ref('pickup').on('child_added', data => {
    const { rider , driver } = data.val();
    socket.emit('SEND_PICKUP_RIDER', {rider , driver});
  });

  db.ref('notpickup').on('child_added', user => {
    const { state , phone , address , lat , lng , id } = user.val();
    // notpickups.push({phone , address}); // store history
    const rider = { id , phone , address , lat , lng };
    socket.emit('SEND_NOT_PICKUP_RIDER', rider);
  });

  db.ref('complete').on('child_added' , data => {
    // completes.push(data.val()); // store history
    const { state , phone , address , lat , lng , id } = data.val().rider;
    const rider = { id , phone , address , lat , lng };
    socket.emit('SEND_COMPLETE_RIDER', rider);
  });
  db.ref('complete').on('child_removed', data => {
    const {rider , driver} = data.val();
    const index = currentDriver.findIndex(e => e.idDriver === driver.id);
    if(index >= 0) {
      const { id } = currentDriver[index];
      socket.to(id).emit('SEVER_ASSIGN_DRIVER' , rider);
    }
  });

  // Handle disconnect with socket
  socket.on('disconnect' , () => {
    const {idDriver} = socket;
    if(idDriver) {
      const index = currentDriver.findIndex(e => e.idDriver === idDriver);
      currentDriver.splice(index , 1);
    }
  });
  
});

