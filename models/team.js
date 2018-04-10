// var express = require('express');
const mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"productDB",
    password:"22mohe1991"
})

this.teamAdd = function(req,res){
    
    console.log(req.body);
    var teamNo = req.body.teamRegNo;
    var teamName = req.body.teamName;
    var chairman = req.body.teamChair;
    var division = req.body.teamDiv;
    var teamRegDate = req.body.teamRegDate;
    var teamSize = req.body.teamSize;
                    
    return con.query('INSERT INTO teams (teamName, registerID, chairMan, division, entryDate, teamPlyrs)SELECT * FROM (SELECT "' + teamName + '", "' + teamNo + '", "' + chairman + '", "' + division + '", "' + teamRegDate + '", "' + teamSize + '") AS tmp WHERE NOT EXISTS (SELECT teamName FROM teams WHERE teamName = "'+ teamName +'") LIMIT 1;');
};