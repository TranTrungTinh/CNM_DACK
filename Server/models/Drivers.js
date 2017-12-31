const db = require('./Config');

class Driver {
  static async getAllDriver() {
    const arrDrivers = [];
    const drivers = await db.ref('cars').once('value');
    drivers.forEach(e => {
      const {state , name , username , lat , lng} = e.val();
      if(state) return;
      const driver = {id: e.key , name , username , lat , lng}
      arrDrivers.push(driver);
    });
    return arrDrivers;
  }

  static addUser(objUser) {
    db.ref('users').push(objUser);
  }

  static async logIn(rawUsername , rawPassword) {
    const drivers = await db.ref('cars').once('value');
    let isDriver = null;
    drivers.forEach(driver => {
      const { username , password , name , state , lat , lng} = driver.val();
      if(rawUsername == username && rawPassword == password) {
        isDriver = {id: driver.key , name , state , lat , lng};
        return;        
      }
    });
    if(!isDriver) throw new Error('Wrong username or password');
    return isDriver;
  }
}

module.exports = Driver;