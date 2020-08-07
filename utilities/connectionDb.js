var qs = require('../model/connection');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TripA2Z', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(req,res) {
  console.log("were connected!");})

  //Schema 
var completedataSchema = new mongoose.Schema({
    TripId : String,
    Tripname : String,
    Triptopic : String,
    details : String,
    startdate : String,
    endate : String,
    time : String,
    place : String,
    image : String,
    username : String
   },{collection:'completedata'});
    
  var completedata = mongoose.model('completedata', completedataSchema);

  
//to get all the connections

function getConnections(){
  var all =completedata.find()
  return all;
}

//to get specific connections by trip id
function getConnection(TripId){

 var RequestDetails = completedata.find({TripId:TripId});

       if(RequestDetails == null){
         RequestDetails = null;
     }
      return RequestDetails;
};





module.exports ={getConnections:getConnections,
getConnection:getConnection,
completedata:completedata
 };