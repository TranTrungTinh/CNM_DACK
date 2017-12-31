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

// middleware
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Methods', 'GET,POST');
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });


// connect
server.listen(4200, () => console.log('Server has been started port 4200'));







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