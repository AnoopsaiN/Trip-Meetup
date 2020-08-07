var express =require('express');
var alltrips =require('../utilities/connectionDb')
var router = express.Router();
var app = express();
app.set('view engine', 'ejs');
const { check, validationResult } = require('express-validator');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TripA2Z', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(req,res) {
  console.log("were connected!");})

router.get('/',function(req,res){
    res.render('index',{user:req.session.user});
  });
  router.get('/index',function(req,res){
    res.render('index',{user:req.session.user});
    //res.send("index page");
  });








  //handles all the connections and displays everything from mongoose db
 router.get('/connections',function(req,res){

   alltrips.getConnections().exec(function(err,all){
     if(err) throw err;
     var topics=[];
     //console.log("Inside all connections:",all)
     all.forEach(function(iter){
       if(!topics.includes(iter.Triptopic)){
         topics.push(iter.Triptopic);
       }
     })
     res.render('connections',{Triptopic:topics,data:all,user:req.session.user,errormsg:null});
   })

}
);

  //checking if it has trip id and send that particular data to connection page
//var ids = new RegExp('^([t1])');
router.all('/connection',[check('TripId').matches(/^(t[0-9 ]|[0-9])+$/i).withMessage('Wrong trip id '),check('TripId').isLength({ max: 4 }).withMessage('Trip id should be 3 digit,t1-10 or 1-100')], async function(req,res){
  qs1=req.query;
   req.session.TripId =req.query.TripId;
   var TripId =req.query.TripId;
   //validating and checking if any errors are present
   const errors = validationResult(req)
        console.log("error di :",errors.array());
        if (!errors.isEmpty()) {  
          erro = errors.array();
          console.log("inside the if ",erro);
          everything = await alltrips.getConnections();
          var topics=[];
            everything.forEach(function(iter){
           if(!topics.includes(iter.Triptopic)){
             topics.push(iter.Triptopic);
           }
         })
         res.render('connections',{Triptopic:topics ,data:everything,user:req.session.user,errormsg:erro});
        }
        else{
          erro = null;
           every = await alltrips.getConnection(TripId);
           //if present in db it will redirect to connection page
           if(Object.keys(qs1.TripId).length !== 0 && ((every).length !== 0)){
       
            res.render('connection',{TripId:TripId,data:every,user:req.session.user});
          }
          else{
            //if the tripd is as per validation and still is not present in db will be routed to connections page
            everything = await alltrips.getConnections();
          var topics=[];
            everything.forEach(function(iter){
           if(!topics.includes(iter.Triptopic)){
             topics.push(iter.Triptopic);
           }
         })
         res.render('connections',{Triptopic:topics ,data:everything,user:req.session.user,errormsg:erro});
          }
        }
  // var everything =alltrips.getConnections().exec(function(err,all){
    //  if(err) throw err;
   //   return all;
   // });


   
    
    

    
  });
  //shows the about page
  router.get('/about',function(req,res){
    res.render('about',{user:req.session.user});
  });
  //shows the login page
  router.get('/login',function(req,res){
    res.render('login',{data :null});
  });
  //shows the contact page
  router.get('/contact',function(req,res){
    res.render('contact',{user:req.session.user});
  });
  //shows new connection page but if the user is not logged in it will show the login page
  router.get('/newConnection',function(req,res){
    if(req.session.user){
      res.render('newConnection',{user:req.session.user,data :null});
    }
    else{
      res.render('login',{data :null});
    }
  
  });

  module.exports = router;