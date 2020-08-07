var express =require('express');
var session = require('express-session');
var alltrips =require('./utilities/connectionDb')
var app = express();
app.set('view engine', 'ejs');
var cookieParser = require('cookie-parser');
console.log({user:'jondoe', age:30,name:{first: 'jsodjso', last:'doe'}, inspector:function(){
  return JSON.stringify(this)}});

//middleware
app.use('/assets', express.static('assets'));
app.use(session({secret: 'NBAD',
                    saveUninitialized: true,
                    resave: true,
                    cookie: {}}));
 app.use(cookieParser());

//routes to controller
var controller = require('./controller/connectioncontroller')
var usercontroller=require('./controller/Usercontroller')
app.use('/savedConnections', usercontroller)

app.use('/', controller);

  app.listen(8080);
  
  
 