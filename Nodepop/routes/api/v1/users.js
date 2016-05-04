/**
 * Created by Alicia on 03/05/2016.
 */
"use strict";

var jwt = require('jsonwebtoken');
var config = require('../../../local_config');

var express = require('express');
var router = express.Router();

var User = require('mongoose').model('User');

router.post('/register', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.pass;

    // Insert User in database

    var newUser = new User({
        name: name,
        email: email,
        password: pass
    });

    newUser.save(function (err, newUser) {
        // Duplicated unique index error
        if ( err && err.code === 11000 ) {
            return res.status(401).json({
                success: false,
                error: 'This email already exists',
                mongoError: err
            });
        }

        if (err) { // Other error
            return res.status(500).json({
                success: false,
                error: err
            });
        }

        return res.json({
            success:true,
            user: newUser
        })
    });
});

router.post('/authenticate', function (req, res) {
    var email = req.body.email;
    var pass = req.body.pass;

    // Would search in database
    User.findOne({email: email}).exec(function (err, user) { // to distinguish user or password error
        if (err){
            return res.status(500).json({
                success: false,
                error: err
            });
        }

        if(!user){
            return res.status(401).json({
                success: false,
                error: "Authentication failed, no user found with that email."
            });
        }

        if (user.password !== pass){
            return res.status(401).json({
                success: false,
                error: "Authentication failed, invalid password."
            });
        }

        var token = jwt.sign(
            {id: user._id}, //json web token for this id
            config.jwt.secret, // secret word for distinguish between other users
            //{expiresIn: 60*24*2 *60} // token will be valid for 2 days
            {expiresIn: '2 days'}
        ); // sign is syncronous

        res.json({
            success:true,
            token: token
        })
    });
});

module.exports = router;