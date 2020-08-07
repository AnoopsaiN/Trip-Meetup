var uc = require('../model/UserConnection')
var session = require('express-session');
var alltrips = require('./connectionDb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TripA2Z', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

var completeuserconnectionSchema = new mongoose.Schema({
    TripId : String,
    Connection : String,
    rsvp : String,
    triptopic : String,
    userid : String
   },{collection:'completeuserconnection'});
    
  var completeuserconnection = mongoose.model('completeuserconnection', completeuserconnectionSchema);

//This function will handles both adding Rsvp or updating rsvp
function addtosc(Connection,rsvp,triptopic,TripId,userid){
    return new Promise((resolve, reject) => {
  completeuserconnection.findOneAndUpdate({TripId : TripId
    },{$set :{Connection: Connection, rsvp: rsvp,triptopic : triptopic,TripId:TripId,userid:userid}},
    {upsert: true, new: true
     // , runValidators: true
    },
    function (err, data) {
        //console.log("course either updated or added.");
        //console.log(data);
        resolve(data);
      })
      .catch((erro) => {
        return reject(err);
      });
    })

}


//This will delete from mongoose db
function deletetosc(TripId){
    return new Promise((resolve, reject) => {
        completeuserconnection.deleteOne({TripId:TripId}).then((data) => {
            resolve(data);
    })
    .catch((err) => {
        return reject(err);
      });

    }
    )
}
  

//to return all the connections
function getUserConnections(){
    return new Promise((resolve, reject) => {
        completeuserconnection.find({}).then((data) => {
        resolve(data);
})
.catch((err) => {
    return reject(err);
  });
    })

};

//This is to add new connection from the header
function addConnection(Tripname,Triptopic,details,startdate,endate,time,image,username){
    return new Promise(async (resolve, reject) => {
//will assign random new number to id          
 var  id=  Math.floor((Math.random() * 100) + 1);
 console.log("id:",id);
 
 //as the user is creating the connection ,Yes will be the default rsvp and added to saved connection
 var addsc =   new completeuserconnection({TripId:id,Connection:Tripname,rsvp:'yes',triptopic:Triptopic,userid:username});
   await addsc.save();

//added to connections page
var add =   new alltrips.completedata({TripId:id,Tripname:Tripname,Triptopic:Triptopic,details:details,startdate:startdate,endate:endate,time:time,place:Tripname,image:image,username:username});
     await add.save();

     resolve("Success")
})
};

module.exports = {
    addtosc : addtosc,
    deletetosc : deletetosc,
    getUserConnections:getUserConnections,
    addConnection:addConnection,
                }