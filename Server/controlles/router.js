const router = require('express').Router();
const jsonParser = require('body-parser').json();
const Driver = require('../models/Drivers');

// API
router.get('/' , (req , res) => res.status(200).send('Welcome to connect server'));

router.post('/order' , jsonParser , (req , res) => {
  const {phone , address} = req.body;
  if(!phone || !address) res.send({error: error.message});
  Driver.addUser(req.body);
  res.send({message: "OK"});
});

router.post('/login', jsonParser , (req , res) => {
  const {username , password} = req.body;
  Driver.logIn(username , password)
  .then( driver => res.send({ driver }) )
  .catch( error => res.send({ error: error.message }) );
});


module.exports = router;