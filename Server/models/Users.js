const db = require('./Config');

class Users {
  static addUser(objUser) {
    db.ref('users').push(objUser);
  }
  static async getComplete(rawphone) {
    const arrResult = [];
    const arrComplete = await db.ref('complete').once('value');    
    arrComplete.forEach(e => {
      const {phone , address} = e.val().rider;
      if(phone === rawphone) {
        arrResult.push({address});
      }
    });
    return arrResult;
  }
  static async getNotpickup(rawphone) {
    const arrResult = [];
    const arrNotpickup = await db.ref('notpickup').once('value');    
    arrNotpickup.forEach(e => {
      const {phone , address} = e.val();
      if(phone === rawphone) {
        arrResult.push({address});
      }
    });
    return arrResult;
  }
  static async checkComplete(rawphone , rawaddress) {
    let data = null;
    const arrComplete = await db.ref('complete').once('value');
    arrComplete.forEach(e => {
      const {phone , address} = e.val().rider;
      if(phone === rawphone && address === rawaddress) {
        data = e.val();
        db.ref(`complete/${e.key}`).remove();
      }
    }); 
    return data;
  }
  static async callCar(data) {
    const {rider , driver} = data;
    db.ref(`pickup`).push({rider , driver});
  }
}
module.exports = Users;