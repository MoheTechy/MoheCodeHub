
var express = require('express');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var url = require('url');
var bodyParser= require('body-parser');
var app = express();
var qs = require('querystring');
var mongoose  = require('mongoose');
var mongo = require('mongodb');
var async = require('async');

var os = require('os');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var urlencodedParser = bodyParser.urlencoded({ extended: false});
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));

teamReg = require('./models/team'); 

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"productDB",
    password:"22mohe1991"
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, authentication-token, application/json, charset=utf-8");
    if ('OPTIONS' == req.method) {
    res.sendStatus(200);
    } else {
      next();
    }
});

var Square = require('./models/square');

const mySquare = new Square(2);
console.log(`The area of mySquare is ${mySquare.area()}`);
// var info = os.constants.signals.SIGINFO;
//console.log(info);

//Login API
app.post('/methos/user/login', function(req, res){

    var user = req.body.username;
    var pass = req.body.password;

    console.log(user);
    console.log(pass);

    con.query("select count(*) as count from users where username='"+ user +"' and pass='"+ pass +"';", function(err, data, fields){
        // var result = '';
        var user = [{
            'username':user,
            'pass':pass
        }];

        if(err){
            console.log(err);
            res.end(JSON.stringify(err));
            res.end();
        }else{
            var message = '';
            console.log(data);
            if(data[0].count > 0){
                var flag = true;
                var token=jwt.sign({user},'kdcaSecurity');
                message="Login Successful";
                res.status(200).json({
                    message,
                    token,
                    flag
                });
            }else{
                var flag = false;
                message = 'Username or Password Wrong.';
                res.status(200).json({
                    message,
                    flag
                });
            }//end if    
        }//end if
        
    });//end Con.query
});

//New User Registration API
app.post('/method/user/register', function(req,res) {

    console.log(req.body);
  
    var userName = req.body.username;
    var email = req.body.email;
    var pass = req.body.pass;
                    
    con.query('INSERT INTO users (username, email, pass)SELECT * FROM (SELECT "' + userName + '", "' + email + '", "' + pass + '") AS tmp WHERE NOT EXISTS (SELECT username FROM users WHERE username = "'+ userName +'") LIMIT 1;',function(err, data, fields) {
        var result = '';
        if(err){
            result = err;
            console.log(err);
        }else{
            console.log(data);
            if(data.affectedRows == 0){
                result = 'User Exists Already!';
            }else{
                result = 'User Registered Successfully!';
            }
        }
        res.end(JSON.stringify(result));
        res.end();    
    });
  
});

//New Team Registration
app.post('/method/team/register', verifyToken, function(req,res){

    jwt.verify(req.token, 'kdcaSecurity', (err, authData) => {
        if(err){
            return res.json({"error": true});
            console.log(err);
        }else{

            // console.log(req.body);
            var teamNo = req.body.teamRegNo;
            var teamName = req.body.teamName;
            var chairman = req.body.teamChair;
            var division = req.body.teamDiv;
            var teamRegDate = req.body.teamRegDate;
            var teamSize = req.body.teamSize;
                            
            con.query('INSERT INTO teams (teamName, registerID, chairMan, division, entryDate, teamPlyrs)SELECT * FROM (SELECT "' + teamName + '", "' + teamNo + '", "' + chairman + '", "' + division + '", "' + teamRegDate + '", "' + teamSize + '") AS tmp WHERE NOT EXISTS (SELECT teamName FROM teams WHERE teamName = "'+ teamName +'") LIMIT 1;', function(err, data, fields){
                var result = '';
                if(err){
                    result = err;
                    console.log(err);
                }else{
                    console.log(data.affectedRows);
                    var message = '';
                    var flag = '';
                    if(data.affectedRows == 0){
                        message = 'Team Exists Already!';
                        flag = false;
                        res.status(200).json({message,flag});
                        res.end();
                    }else{
                        message = 'Team Registered Successfully!';
                        flag = true;
                        res.status(200).json({message,flag});
                        res.end();
                    }
                }
            });//con end     
        }
    });//token verify end
});

//Team List
app.post('/method/team/teamList', verifyToken, (req,res) => {
    
    jwt.verify(req.token,'kdcaSecurity',(err, authData) => {

        if(err){
            return res.json({"error":'Token Error'});
            console.log(err);
        }else{
            //Teams Detail Data
            console.log(req.body);
            var div = req.body.division;
            con.query('select * from teams where division = '+ div +';', function(err, data, fields){
                if(err){
                    console.log(err);
                    return res.json({'Error':'Mysql'});
                }else{
                    console.log(data.affectedRows);
                    if(data.affectedRows == 0){
                        res.status(200).json({data});
                        res.end();
                    }else{
                        //MongoDB Image Retreive Based on TeamID
                        MongoClient.connect(url, function(err, db){
                            if(err) throw err;
                            var dbo = db.db("mydb");
                            for(var i=0; i<10; i++){
                                var query = {docID:data[i].registerID};
                                dbo.collection("teamLogos").find(query).toArray(function(err, result){
                                if(err) throw err;
                                console.log(result);
                                data[i].push({docFile:result.docFile});
                                db.close();
                                });
                            }    
                        });
                        
                        res.status(200).json({data,result});
                        res.end();
                                
                        
                    }
                }
            });

            //Teams Logo Img
             

        }
    });    
});

//Team Logo Store
app.post('/document/team/logo', verifyToken, function(req, res){

    jwt.verify(req.token,'kdcaSecurity',(err, authData) => {

        if(err){
            return res.json({"error":'Token Error'});
            console.log(err);
        }else{
            var doc = req.body.logoDoc;
            var teamId = req.body.teamId;
            
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("mydb");
                var myobj = {docID:teamId, docFile:doc};
                dbo.collection("teamLogos").insertOne(myobj, function(err, res1) {
                if (err) throw err;
                console.log("1 document inserted");
                //console.log(res);
                db.close();
                res.status(200).json({Msg:"Document Uploaded Successfully!"});
                });
            }); 
        }
    });
});

//Team Logo Retreive
app.post('/document/teamLogo/get', verifyToken, function(req, res){

    jwt.verify(req.token,'kdcaSecurity',(err, authData) => {

        if(err){
            return res.json({"error":'Token Error'});
            console.log(err);
        }else{
    
            var teamId = req.body.docID;
            console.log(teamId);
            MongoClient.connect(url, function(err, db){
                if(err) throw err;
                var dbo = db.db("mydb");

                var query = {docID:teamId};
                dbo.collection("teamLogos").find(query).toArray(function(err, result){
                    if(err) throw err;
                    console.log(result);
                    db.close();
                    res.end(JSON.stringify(result));
                    res.end();
                });
            });
        }
    });
});

app.get('/userDet', function(req, res){
    console.log(req);
    res.end(JSON.stringify("hai"));
    res.end();
});

//Team List With Logo's
app.post('/method/teamList/logos',verifyToken, function(req, res){

    jwt.verify(req.token,'kdcaSecurity',(err, authData) => {

        if(err){
            return res.json({"error":'Token Error'});
            console.log(err);
        }else{
        
        
        }
    });
});

// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: '',
//     pass: ''
//   }
// });

// var mailOptions = {
//   from: 'c.mohanrajcs@gmail.com',
//   to: 'mohanraj.c@sastratechnologies.in',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });


//Token Verify Function
function verifyToken(req, res, next){
//Get Auth Header Value
const bearerHeader = req.headers['authentication-token'];
//Check if bearer is undefined
// console.log(bearerHeader);
if(typeof bearerHeader !== 'undefined'){
    //Split the space
    const bearer = bearerHeader.split(' ');
    //Get Token From Array
    const bearerToken = bearer[1];
    //Set the token
    req.token = bearerHeader;
    //Next Middleware
    next();
}else{
    res.sendStatus(403);
}
}

//Server Creation
app.listen(5000, () => console.log('Server started on port 5000'));