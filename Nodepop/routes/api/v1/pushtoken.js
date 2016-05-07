/**
 * Created by Alicia on 03/05/2016.
 */
"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var PushToken = mongoose.model('Pushtoken');

// Response schema
var apiResponse = require('../../../lib/apiResponse');

router.post('/', function (req, res, next) {
    var platform = req.body.platform;
    var token = req.body.token;
    var user = req.body.user;

    var data = {};
    if (platform !== undefined){
        data.platform = platform;
    }
    if (token !== undefined) {
        data.token = token;
    }


    var checkUserPromise = new Promise(function (resolve, reject){
        if (user !== undefined){
            // Search user by _id or email
            PushToken.getUserId(user, function (err, row){
                if (err) {
                    reject('Error trying to get user from email or _id');
                }
                // Include id user in data
                data.user = row;
                resolve();
            });

        } else{
            // No user, so we're done
            resolve();
        }
    });

    checkUserPromise.then( function (result) {
        var pushToken = new PushToken(data);

        var validateError = pushToken.validateSync();
        if (validateError){
            var err = apiError(
                3, // code
                langTexts[req.lang]['1'], // message
                validateError.errors, // generated error
                validateError.name // name
            );
            res.status(400);
            return apiResponse(res, false, err);
        }
        pushToken.save(function (err, saved) {
            if(err){
                next(err);
                return;
            }

            return apiResponse(res, true, saved);
        })

    }).catch (function (err){
        // Error on getting user
        return apiResponse(res, false, err);
    });
});

module.exports = router;