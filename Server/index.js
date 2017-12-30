// import library
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// connect
server.listen(4200, () => console.log('Server has been started port 4200'));

// API Route
const apiRouteDriver = require('./controller/router');
const db = require('./model/Config');
const Driver = require('./model/Drivers');

app.use('/api' , apiRouteDriver);

io.on('connection' , socket => {
  
  /* Socket with GPS APP */
  // Get all driver
  socket.on('GET_ALL_DRIVER' , () => {
    Driver.getAllDriver()
    .then(data => socket.emit('SEND_ALL_DRIVER' , data));
  });
  /* ============================== */
  /* Socket with GPS APP */
  

  /* ============================== */

  // realtime child_added
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
  })

});