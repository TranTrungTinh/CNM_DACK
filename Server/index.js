
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

// const arrSocket = []; // store current socket connect
const currentDriver = []; // store driver log in

io.on('connection' , socket => {
  
  // arrSocket.push(socket);
  // console.log("Current" + arrSocket.length);
  /* Socket with GPS APP */
  socket.on('GET_ALL_DRIVER' , () => {
    Driver.getAllDriver()
    .then(data => socket.emit('SEND_ALL_DRIVER' , data));
  });
 
  socket.on('RIDER_SELECTED_DRIVER', data => {
    const { driver , rider } = data;
    const idDriver = driver.id;
    // console.log("Rider selected driver:" + idDriver);
    const index = currentDriver.findIndex(e => e.idDriver == idDriver);
    if(index < 0) return; 
    const { id } = currentDriver[index];
    socket.to(id).emit('SEVER_SEND_RIDER' , rider);
  });

  /* ============================== */
  /* Socket with DRIVER APP */

  socket.on('DRIVER_LOG_IN', idDriver => {
    socket.idDriver = idDriver;
    currentDriver.push(socket);
    // console.log(`Driver: ${currentDriver.length} is ${socket.idDriver}`);
  });

  socket.on('DRIVER_LOG_OUT', idDriver => {
    const index = currentDriver.findIndex(e => e.idDriver == idDriver);
    currentDriver.splice(index , 1);
  });

  /* ============================== */
  
  /* Socket with MANAGE APP */
  db.ref('users').on('child_added' , user => {
    const { state , phone , address , lat , lng } = user.val();
    // if (!state) {
    const rider = { key: user.key, phone , address , lat , lng };
    socket.emit('SEND_NEW_RIDER', rider);
    // }
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

