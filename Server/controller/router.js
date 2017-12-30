const router = require('express').Router();
const jsonParser = require('body-parser').json();

// class Driver
const Driver = require('../model/Drivers');

// api
router.post('/order' , jsonParser , (req , res) => {
  const {phone , address } = req.body;
  if(!phone || !address) res.send({error: error.message});
  Driver.addUser(req.body);
  res.send({message: "OK"});
});

router.post('/driver/login', jsonParser , (req , res) => {
  const {username , password} = req.body;
  Driver.logIn(username , password)
  .then(name => res.send({name}))
  .catch(error => res.send({error: error.message}));
});

module.exports = router;