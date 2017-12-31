
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

const currentDriver = [] // store driver log in

io.on('connection' , socket => {
  
  // console.log(socket.id);

  /* Socket with GPS APP */
  // Get all driver
  socket.on('GET_ALL_DRIVER' , () => {
    Driver.getAllDriver()
    .then(data => socket.emit('SEND_ALL_DRIVER' , data));
  });
 
  socket.on('RIDER_SELECTED_DRIVER', data => {
    // console.log(data);
    const { driver , rider } = data;
    const idDriver = driver.id;
    const index = currentDriver.findIndex(e => e.idDriver === idDriver);
    const { id } = currentDriver[index];
    socket.to(id).emit('SEVER_SEND_RIDER' , {rider});

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

  /* ============================== */
  
  /* Socket with MANAGE APP */
  db.ref('users').on('child_added' , user => {
    // console.log(user.key , user.val());
    // const { state } = user.val();
    // if (!state) {
    const rider = { key: user.key, ...user.val() };
    socket.emit('SEND_NEW_RIDER', rider);
    // }
  });

  db.ref('users').on('child_changed', user => {
    const rider = { key: user.key, ...user.val() };
    socket.emit('SEND_UPDATE_RIDER', rider);
  });

  // socket.on('disconnect' , () => {
  //   // console.log(socket.id);
  // });
  
});

