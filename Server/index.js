// import library
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const jsonParser = require('body-parser').json();

// connect
server.listen(4200, () => console.log('Server has been started port 4200'));

// Driver
const Driver = require('./model/Drivers');

// api
app.post('/api/order' , jsonParser , (req , res) => {
  const {phone , address } = req.body;
  if(!phone || !address) res.send({error: error.message});
  Driver.addUser(req.body);
  res.send({message: "OK"});
});


io.on('connection' , socket => {
  
  // Get all driver
  socket.on('GET_ALL_DRIVER' , () => {
    Driver.getAllDriver()
    .then(data => socket.emit('SEND_ALL_DRIVER' , data));
  });
})