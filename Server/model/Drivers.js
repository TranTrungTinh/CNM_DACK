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
    const { phone , address , lat , lng , bike , other , state } = objUser;
    db.ref('users').push({phone , address , lat , lng , bike , other , state});
  }
}

module.exports = Driver;