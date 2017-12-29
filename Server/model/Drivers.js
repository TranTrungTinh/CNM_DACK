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
}

module.exports = Driver;