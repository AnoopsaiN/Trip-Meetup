var users = require('../model/user');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TripA2Z', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

//Schema
var UserDbSchema = new mongoose.Schema({
    email : String,
    userID : String,
   },{collection:'UserDb'});
    
  var UserDb = mongoose.model('UserDb', UserDbSchema);

//this will get the user details from mongoose db
  function getUser(name,password){
    return new Promise((resolve, reject) => {
    UserDb.find({username:name,password:password}).then((data) => {
      //console.log("inside data",data.length)
      if(data.length == 0){ 
        UserDbObj =null;
        resolve(UserDbObj);
      }
      else{
        console.log("inside ");
        let UserDbObj = new users();
        UserDbObj.setaUserID(data[0].userID);
        UserDbObj.setaemailaddress(data[0].email);
    //console.log("users data using model:",UserDbObj);
        resolve(UserDbObj);
      }
    
     }).catch((err) => {
      return reject(err);
    });

  })
};

  module.exports = {
    getUser:getUser
  }