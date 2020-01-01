var config = require('../config/environment');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: 'cute.autoemailer@gmail.com',
      pass: '00Cute2019*'
    },
    tls: {
      rejectUnauthorized: false
    }
});

exports.emailer = transporter;   