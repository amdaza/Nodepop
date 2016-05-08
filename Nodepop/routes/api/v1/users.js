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


/**
 * APIDOC DOCUMENTATION
 * 
 * @api {POST} /users/register
 * @apiDescription Register new user
 * @apiName RegisterUser
 * @apiGroup Users
 *
 * @apiParam {String} name User name.
 * @apiParam {String} email User email.
 *      If email already exists, will return an error.
 * @apiParam {String} pass User password to later authentication.
 *
 * @apiParamExample {String} name
 *      Pepa
 * @apiParamExample {String} email
 *      pe@pa.com
 * @apiParamExample {String} name
 *      123
 *
 * @apiSuccess (200 Success) {boolean} success true.
 * @apiSuccess (200 Success) {json} data json with user information.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *           "success": true,
 *           "data": {
 *               "user": {
 *                   "__v": 0,
 *                   "name": "Pepa",
 *                   "email": "pe@pa.com",
 *                   "password": "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
 *                   "_id": "572f4e334e8f8d002d095fef"
 *               }
 *           }
 *       }
 *
 * 
 * @apiError (400 Bad Request) {boolean} success
 *      false.
 * @apiError (400 Bad Request) {json} error
 *      json with error information.
 *      DuplicatedEmail Cannot crate user, that email already exist.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *           "success": false,
 *           "error": {
 *               "code": 10,
 *               "message": "Cannot crate user, that email already exist.",
 *               "name": "DuplicatedEmail",
 *               "error": {
 *                   "code": 11000,
 *                   "index": 0,
 *                   "errmsg": "E11000 duplicate key error collection: nodepop.users index: email_1 dup key: { : \"pe@pe.com\" }",
 *                   "op": {
 *                       "name": "Pepe",
 *                       "email": "pe@pe.com",
 *                       "password": "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
 *                       "_id": "572f4ded4bff3fe8197660a5",
 *                       "__v": 0
 *                   }
 *               }
 *           }
 *       }
 */
router.post('/register', function (req, res) {
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
                undefined, // message
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
                undefined, // message
                err, // generated error
                'ServerError' // name
            );
            res.status(500);
            return apiResponse(res, false, serverError);
        }

        if(!user){
            var newError = 'Authentication failed, no user found with that email.';
            var noUserError = apiError(
                12, // code
                langTexts[req.lang][12], // message
                newError, // generated error
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