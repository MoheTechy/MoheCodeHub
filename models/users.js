const express = require('express');
const mysql = require('mysql');
const url = require('url');
const bodyParser= require('body-parser');
const app = express();
const qs = require('querystring');

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
                var token=jwt.sign({user},"samplesecret1");
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
        
    })//end Con.query
})

//Token Generation Method 1 --> Using JWT SIGN
app.post('/api/login',urlencodedParser,(req, res) => {
     
    console.log(req.body);

    const user1 = {
        id: '1',
        username: 'brad',
        email: 'brad@gmail.com'
    }

    jwt.sign({user1},'secretkey', { expiresIn: '30s' },(err, token) => {
        
        // res.setHeader('Content-Type', 'application/json');
        // res.send(JSON.stringify(token));
        
        // res.writeHead(200, {'Content-Type': 'application/json'});
        // res.end(token);
        res.json({
            token
        });
    });
});


//Post API Req get
app.post('/api/postReqCheck',urlencodedParser,(req, res, reqBody) => {
    var dt = req.params;
    console.log(req.body.email);

    res.json({
        message: 'Request Got!'
    });
});


//Get Method
app.get('/api/:id',(req,res) =>{

    console.log(req.params.username);
    const url_parts = url.parse(req.url, true);
    console.log(url_parts);
    const query = url_parts.query;
    console.log("query",query);

    const uid = req.params.id;
  	   	con.query('select * from users where Id = "' + uid + '"','utf8',function(err, data, fields){
       // if(err) throw err;
        console.log(data);

        res.end(JSON.stringify(data));
        res.end();
       // return;
  	   })

    // res.json({
    //     message: "Json Get API Created"
    // });
});

//Token Generation Method2 --> JWT Sign Mathod
app.post('/login',(req,res)=>{
    var message; 
        
    //create the token.
    var token=jwt.sign({user},"samplesecret");
    message="Login Successful";
        
    //If token is present pass the token to client else send respective message
    if(token){
        res.status(200).json({
            message,
            token
        });
    }
    else{
        res.status(403).json({
            message
        });
    }
});