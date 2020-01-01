var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var Sequelize = require('../../../config/sequelize').getConnection();
var jwt = require('jsonwebtoken');
var pp = require('../../../config/passport');
//var password = require('password-hash-and-salt');


exports.validUser = function (req, res, next) {
    console.log(req.body);
    emailId = req.body.emailId;

    var user = {
        user: emailId,
        pwd: req.body.password,

    }

    passport.authenticate('local', (result) => {

        console.log(result);
        if (result < 0) {
            if (result == -1) {
                res.status(400);
                res.send({ statusBool: false, message: "Couldn't find your User Account" });
                return;
            }
            if (result == -2) {
                res.status(500);
                res.send({ statusBool: false, message: "Wrong password. Try again or contact admin to reset it." });
                return;
            }
            if (result == -3) {
                res.status(500);
                res.send({ statusBool: false, message: "Please contact admin." });
                return;
            }
        } else {
            if (result == null || result == undefined) {
                res.status(500);
                res.send({ statusBool: false, message: "Incorrect username or password." });
                return;
            }
            var body = pp.body;

            // only include items with even id's
            var tkn = jwt.sign({ user }, 'cuteinspection');
            console.log(tkn);
            res.status(200);
            res.send({ statusBool: true, message: "Successfully logged in!", token: tkn, userName: emailId, name: body[0].loginId });
            return;

        }

        // res.status(result.statusHttp);
        res.send(result);
    })(req, res, next)

};
//
