// import library
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// connect
server.listen(4200, () => console.log('Server has been started port 4200'));

// Driver
const Driver = require('./model/Drivers');

io.on('connection' , socket => {
  
  // Get all driver
  socket.on('GET_ALL_DRIVER' , () => {
    Driver.getAllDriver()
    .then(data => socket.emit('SEND_ALL_DRIVER' , data));
  });
})