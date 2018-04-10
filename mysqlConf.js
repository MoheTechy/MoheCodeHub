// var express = require("express");
// var app = express();
// var fs = require("fs");
// var mysql = require("mysql");

// var con = mysql.createConnection({
// host:"localhost",
// user:"root",
// password:"22mohe1991",
// database:"shiksha",
// })

// con.connect(function(err){
// 	if(err) throw err;
// 	con.query("select * from users",function(err, result, fields){
// 		if(err) throw err;
// 		console.log(result);
// 	})
//})

// app.get('/listUsers',function(req, res){
// 	fs.readFile( "/home/mohe/project/nodejs/users.json",'utf8',function(err, data){
// 		console.log(data);
// 		res.end(data);
// 		// con.connect(function(err){
// 		// if(err) throw err;
// 		// con.query("select * from users",'utf8',function(err, result, fields){
// 		// 	if(err) throw err;
// 		// 	console.log(result);
// 		// 	res.end(result);
// 		// })
// 	});
// })


// var server = app.listen(8081, function(){
// 	var host = server.address().address
// 	var port = server.address().port
// 	console.log("Example App Listening at http://%s:%s", host, port);
// })

var express = require('express');
var app = express();
var fs = require("fs");
var mysql = require("mysql");
var url = require('url');

var con = mysql.createConnection({
host:"localhost",
user:"root",
password:"22mohe1991",
database:"shiksha",
})


app.get('/listUsers/:id', function (req, res) {

  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  console.log("query",query);
  // fs.readFile("/home/mohe/project/nodejs/users.json", 'utf8', function (err, data) {
  	//   con.connect(function(err){
  	  // 	if(err) throw err;
        const uid = req.params.id;
  	   	con.query('select * from users where uid = "' + uid + '"','utf8',function(err, data, fields){
       // if(err) throw err;
        console.log(data);

        res.end(JSON.stringify(data));
        res.end();
       // return;
  	   })
        //params:{uid : Joi.number().integer()}
       //con.end();
  // });  	   
})

app.post('/method/user/register', function(req,res) {

  console.log(req.body);

  var userName = req.body.name;
  var email = req.body.email;
  var pass = req.body.password;

  con.query('INSERT INTO users (username, email, pass)SELECT * FROM (SELECT ' + username + ', ' + email + ', ' + pass + ') AS tmp WHERE NOT EXISTS (SELECT username FROM users WHERE username = '+ username +') LIMIT 1;',function(err, data, fields) {
    console.log(data);
    res.end(JSON.stringify(data));
    res.end();
  })

})

app.post('/userName/:id',function(req,res){

  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  console.log(query);

  const uid = req.params.id;
  con.query('select name from users where uid = "' + uid + '"','utf8',function(err, data, fields){
    console.log(data);
    res.end(JSON.stringify(data));
    res.end();
  })
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})