var express =require('express');
var userprofile = require('../utilities/userprofile');
var userDb =require('../utilities/userDb');
var router = express.Router();
var app = express();
var session = require('express-session');
app.set('view engine', 'ejs');
var alltrips =require('../utilities/connectionDb')
var bodyParser= require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: false});
const { check, validationResult } = require('express-validator');

//For user to login,if not logged shows login page.
router.all('/login',urlEncodedParser,
[
    //validation of username
    check('username')
    .isLength({ min: 1 })
    .withMessage('Username and password shouldnt be empty')
    .isLength({ max: 10 })
    .withMessage('Username should be under 10 characters')
    .isAlphanumeric()
    .withMessage("can only contain letters, numbers")
    .escape()
    .trim(),

    //validation of password
    check('password')
    .isLength({ min: 1 })
    .withMessage('Username and password shouldnt be empty')
    .isLength({ max: 10 })
    .withMessage('Password hould be under 10 characters')
    .isAlphanumeric()
    .withMessage("can only contain letters, numbers")
    .escape()
    .trim(),
], async function(req, res){
    var dat = req.body;
    //console.log("details from the user",dat)
    const errors = validationResult(req)
    //console.log("error di :",errors.array());
    if(req.method === "GET"){
        req.session.allsc = await userprofile.getUserConnections();
        res.render('savedConnections', { user: req.session.user, data:req.session.allsc,})
    }
    else{
    if((!errors.isEmpty() )&&(req.session.user ==null||req.session.user ==undefined ))
    { 
        dat = errors.array()
        res.render('login',{data: dat});
    }
    else{
            //console.log(req.body);

        userdb = await userDb.getUser(req.body.username,req.body.password)
        //console.log("The value from userdb",userdb);
        //if no match is found in db we will send error message to user
        if(userdb == undefined || userdb == null)
        {   
             dat = [{
                msg: 'Username or password is incorrect please check',
                param: 'password or username'
                    }]

             res.render('login',{data: dat});  
        }
        else{
            //if correct credentials are given will redirect to save connection page
            req.session.user = userdb.UserID;
        req.session.allsc = await userprofile.getUserConnections()
        res.render('savedConnections',{user:req.session.user,data:req.session.allsc})
        }
        
}
}
});

//for user to logout
router.get('/logout',function(req,res){
    if(req.session.user){
        req.session.destroy();
        res.redirect('/');
    }else{
        res.redirect('/');
    }
});


//this handles all rsvp,update and
router.all('/',urlEncodedParser,[check('TripId').matches(/^(t[0-9 ]|[0-9])+$/i).withMessage('Wrong trip id in savedconnection page,should be a number or t1-10')] ,async function (req, res) {
    req.session.rsvp = req.body.rsvp;
    var action = req.body.action;
    //console.log("value inside action",action);
    const errors = validationResult(req)
        console.log("error di :",errors.array());
        //validating the trip id and if error will route to connections page
        if (!errors.isEmpty() && req.method !=="GET") { 
            erro = errors.array();
          console.log("inside the if ",erro);
          
        await  alltrips.getConnections().exec(function(err,everything){
            if(err) throw err;
            var topics=[];
            everything.forEach(function(iter){
           if(!topics.includes(iter.Triptopic)){
             topics.push(iter.Triptopic);
           }
         })
            res.render('connections',{Triptopic:topics ,data:everything,user:req.session.user,errormsg:erro});
          });
          }
          else{
    //if user is not loged in this will redirect to login page
    if  (req.session.user == null || req.session.user == undefined) {
        res.render('login',{data: null});
    }
    else {
        if(req.method === "GET"){
            req.session.allsc = await userprofile.getUserConnections();
            res.render('savedConnections', { user: req.session.user, data:req.session.allsc,})
        }
      
        //console.log("inside");  
        var TripId = req.body.TripId ;
        trip = await alltrips.getConnection(TripId);
       // console.log("Got the trip id details:",trip);
       
      if(action == 'Delete'){
          //console.log("entered delete");
          await userprofile.deletetosc(TripId);
          req.session.allsc = await userprofile.getUserConnections();
          res.render('savedConnections', { user: req.session.user, data:req.session.allsc})
      }
     else{
         //this else handles both update and add
        await userprofile.addtosc(trip[0].Tripname,req.session.rsvp,trip[0].Triptopic,trip[0].TripId,req.session.user)
        req.session.allsc = await userprofile.getUserConnections()
        res.render('savedConnections', { user: req.session.user, data:req.session.allsc})
     }
        }
    }
}

);

var stime = new RegExp('^([0-9][0-9]):[0-5][0-9]$');

var date = new RegExp('^([0-9][0-9][0-9][0-9])-([0-1][0-9]|[0-9])-([0-3][0-9]|[0-9])$');
//this handles the new connection
router.post('/new',urlEncodedParser ,
[    
    //validation of all the inputs
    check('triptype')
    .isAlpha()
    .withMessage('only Alphabets are allowed,please remove number,spaces or special characters')
    .escape()
    .trim(),
    check('name')
    .isLength({ min: 3 })
    .withMessage('Please enter atleast 4 letters')
    .matches(/^[a-z ]+$/i)
    .withMessage('only Alphabets and spaces are allowed')
    .escape()
    .trim(),
    check('details')
    .isLength({ min: 6 })
    .withMessage('Please enter atleast 7 letters')
    .matches(/^[a-z ]+$/i)
    .withMessage('only Alphabets and spaces are allowed')
    .escape()
    .trim(),
    check('startdate')
    .matches(date)
    .withMessage('date should be in yyyy-mm-dd')
    .escape()
    .trim(),
    //start date checking if it is greater than todays date
   check('startdate').custom((value, { req }) => {
    var s = value;
    var today = new Date();
    console.log("todays date",today);
    var date = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0'); 
    var year = today.getFullYear();
    today = year + '-' + month + '-' + date;
    console.log("today latest",today)
    if(new Date(s) <= new Date(today)){
        console.log("entered")
        throw new Error('Start date shouldnt be today or past date')
    }
    return true;
}),
    check('endate')
    .matches(date)
    .withMessage('date should be in yyyy-mm-dd')
    .escape()
    .trim(),

    //checking if the enddate is greater than start date
    check('endate')
    .custom((value, { req }) => {
    var s = req.body.startdate;
    if(new Date(value) < new Date(s)) {
        throw new Error ('End date should not be less than start date');
    }
    return true;

}),
   check('time')
   .matches(stime)
   .withMessage('time should be in 24 hrs format like 18:00 or 02:00')
   .escape()
    .trim()


], async function (req, res) {
    console.log("route new:",req.body)
    const errors = validationResult(req)
    console.log("error di :",errors.array());

    //if any validation errors displaying it
    if (!errors.isEmpty()) {  
        res.render('newConnection',{data:errors.array(), user:req.session.user});
      }
      else{
        data=req.body;
         await  userprofile.addConnection(data.name,data.triptype,data.details,data.startdate,data.endate,data.time,data.image,req.session.user);
        console.log('completed adding');
        
        //added to the saved connections and re directed to saveconnection page
        req.session.allsc = await userprofile.getUserConnections()
        console.log('retrived ');
        res.render('savedConnections', { user: req.session.user, data:req.session.allsc})
      }
   

});

 //to get the saved connection page anytime from header
 router.get('/mytrips', async function(req,res){
    req.session.allsc = await userprofile.getUserConnections();
    res.render('savedConnections',{user:req.session.user,data:req.session.allsc})
 });

module.exports = router;


