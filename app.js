const express = require('express');
var jwt = require('jsonwebtoken');
const mysql = require('mysql');
const url = require('url');
const bodyParser= require('body-parser');
const app = express();
const qs = require('querystring');

const urlencodedParser = bodyParser.urlencoded({ extended: false});

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
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, authentication-token");
    if ('OPTIONS' == req.method) {
    res.sendStatus(200);
    } else {
      next();
    }
});

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

//Post Method
app.post('/api/post', verifyToken, (req,res) => {
    // console.log(req.body);
    // console.log(req.token);
    // var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // console.log("token:"+token);
    
});


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