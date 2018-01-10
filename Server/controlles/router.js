const router = require('express').Router();
const jsonParser = require('body-parser').json();
const Driver = require('../models/Drivers');
const Users = require('../models/Users')
// API
router.get('/' , (req , res) => res.status(200).send('Welcome to connect server'));

router.post('/order' , jsonParser , (req , res) => {
  const {phone , address} = req.body;
  if(!phone || !address) res.send({error: error.message});
  Users.checkComplete(phone , address)
  .then(data => {
    if(data) {
      Users.callCar(data);
    } else {
      Users.addUser(req.body);
    }
    res.send({message: "OK"});
  });
});

router.post('/login', jsonParser , (req , res) => {
  const {username , password} = req.body;
  Driver.logIn(username , password)
  .then( driver => res.send({ driver }))
  .catch( error => res.send({ error: error.message }));
});

router.post('/history' , jsonParser , async (req , res) => {
  const {phone} = req.body;
  try {
    const completes = await Users.getComplete(phone);
    const notpickups = await Users.getNotpickup(phone);
    res.send({completes , notpickups});
  } catch(error) {
    res.send({ error: error.message });
  }
});
module.exports = router;