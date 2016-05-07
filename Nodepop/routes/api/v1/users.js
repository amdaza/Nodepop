/**
 * Created by Alicia on 03/05/2016.
 */
"use strict";

var jwt = require('jsonwebtoken');
var hash = require('hash.js');
var config = require('../../../local_config');

var express = require('express');
var router = express.Router();

// Response schema
var apiResponse = require('../../../lib/apiResponse');
// Error schema
var apiError = require('../../../lib/apiError');

// Languages
var langTexts = {
    es: require('../../../lib/languages/lang_ES'),
    en: require('../../../lib/languages/lang_EN')
};

var User = require('mongoose').model('User');

router.post('/register', function (req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.pass;

    var password = hash.sha256().update(pass).digest('hex');

    // Insert User in database
    var newUser = new User({
        name: name,
        email: email,
        password: password
    });

    var validateError = newUser.validateSync();
    if (validateError){
        var err = apiError(
            1, // code
            langTexts[req.lang][1], // message
            validateError.errors, // generated error
            validateError.name // name
        );
        res.status(400);
        return apiResponse(res, false, err);
    }

    newUser.save(function (err, newUser) {
        // Duplicated unique index error
        if ( err && err.code === 11000 ) {
            var duplicatedError = apiError(
                10, // code
                langTexts[req.lang][10], // message
                err, // generated error
                'DuplicatedEmail' // name
            );
            res.status(400);
            return apiResponse(res, false, duplicatedError);
        }

        if (err) { // Other error
            var serverError = apiError(
                500, // code
                null, // message
                err, // generated error
                'ServerError' // name
            );
            res.status(500);
            return apiResponse(res, false, serverError);
        }

        var data = {
            user: newUser
        };
        return apiResponse(res, true, data);
    });
});

router.post('/authenticate', function (req, res) {
    var email = req.body.email;
    var pass = req.body.pass;

    var password = hash.sha256().update(pass).digest('hex');

    // Would search in database
    User.findOne({email: email}).exec(function (err, user) { // to distinguish user or password error
        if (err){
            var serverError = apiError(
                500, // code
                null, // message
                err, // generated error
                'ServerError' // name
            );
            res.status(500);
            return apiResponse(res, false, serverError);
        }

        if(!user){
            var error = 'Authentication failed, no user found with that email.';
            var noUserError = apiError(
                12, // code
                langTexts[req.lang][12], // message
                error, // generated error
                'MissingUser' // name
            );
            res.status(400);
            return apiResponse(res, false, noUserError);
        }

        if (user.password !== password){
            var error = 'Authentication failed, invalid password.';
            var invalidPassError = apiError(
                13, // code
                langTexts[req.lang][13], // message
                error, // generated error
                'MissingUser' // name
            );
            res.status(400);
            return apiResponse(res, false, invalidPassError);
        }

        var token = jwt.sign(
            {id: user._id}, //json web token for this id
            config.jwt.secret, // secret word for distinguish between other users
            {expiresIn: '2 days'}
        ); // sign is syncronous


        var data = {
            token: token
        };
        return apiResponse(res, true, data);
    });
});

module.exports = router;