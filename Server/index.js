
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

// 
const currentDriver = []; // store driver log in
let oneAccept = 0; // check one accept driver
let countDriverSend = 0; // check count notification send to driver
let countDriverCancel = 0; // check equal with countDriverSend

io.on('connection' , socket => {
  
  /* Socket with GPS APP */
  socket.on('GET_ALL_DRIVER' , () => {
    Driver.getAllDriver()
    .then(data => socket.emit('SEND_ALL_DRIVER' , data));
  });
  
  // Khi app GPS định vị cho người dùng hệ thống gửi lên 5 xe
  socket.on('RIDER_SELECTED_DRIVER', data => {
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
    currentDriver.push(socket);
  });

  socket.on('DRIVER_LOG_OUT', idDriver => {
    const index = currentDriver.findIndex(e => e.idDriver === idDriver);
    currentDriver.splice(index , 1);
  });

  socket.on('DRIVER_ACCEPT', data => {
    if(oneAccept === 1){
      oneAccept = 0; // Chỉ chấp nhận một tài xế chọn chấp nhận nhanh nhất     
      socket.broadcast.emit('CLOSE_NOTIFICATION', data);
    }
  });

  socket.on('DRIVER_CANCEL', data => {
    countDriverCancel++;
    // Kiểm tra nếu số lượt không phản hồi = số lần gửi
    if(countDriverCancel === countDriverSend) {
      countDriverSend = 0;
      countDriverCancel = 0;
      socket.broadcast.emit('CHOOSE_ANOTHER_DRIVER' , data);
    }
  });

  /* ============================== */
  /* Socket with MANAGE APP */

  db.ref('users').on('child_added' , user => {
    const { state , phone , address , lat , lng } = user.val();
    const rider = { key: user.key, phone , address , lat , lng };
    socket.emit('SEND_NEW_RIDER', rider);
  });

  db.ref('users').on('child_changed', user => {
    const { state , phone , address , lat , lng } = user.val();
    const rider = { key: user.key, phone , address , lat , lng };
    socket.emit('SEND_UPDATE_RIDER', rider);
  });

  socket.on('disconnect' , () => {
    const {idDriver} = socket;
    if(idDriver) {
      const index = currentDriver.findIndex(e => e.idDriver == idDriver);
      currentDriver.splice(index , 1);
    }
  });
  
});

