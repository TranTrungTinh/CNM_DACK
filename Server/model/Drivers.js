const db = require('./Config');

class Driver {
  static async getAllDriver() {
    const arrDrivers = [];
    const drivers = await db.ref('cars').once('value');
    drivers.forEach(e => {
      const {state} = e.val();
      if(state) return;
      arrDrivers.push({ id: e.key , ...e.val() });
    });
    return arrDrivers;
  }

  static addUser(objUser) {
    db.ref('users').push(objUser);
  }

  static async logIn(rawUsername , rawPassword) {
    const drivers = await db.ref('cars').once('value');
    drivers.forEach(driver => {
      const {username , password , name} = driver.val();
      if(rawUsername === username && rawPassword === password) {
        return name;
      }
    });
    throw new Error('Wrong username or password');
  }
}

module.exports = Driver;