const {initializeApp , database} = require('firebase');
const config = {
  apiKey: "AIzaSyAFqu4kmq_udnqJlm9bi5B_GxHqUNztiP8",
  authDomain: "cnm-dack.firebaseapp.com",
  databaseURL: "https://cnm-dack.firebaseio.com",
  projectId: "cnm-dack",
  storageBucket: "cnm-dack.appspot.com",
  messagingSenderId: "19927862908"
};

initializeApp(config);
module.exports = database();
