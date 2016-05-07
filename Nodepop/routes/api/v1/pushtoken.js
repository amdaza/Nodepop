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
    
    if (user !== undefined){
        // Search user by _id or email
        PushToken.getUserId(user, function (err, rows){
            if (err) {
                return apiResponse(res, false, err);
            }
console.log('rows',rows);
            data.user = rows;
        });
    }
// PROMISES
    console.log('data',data);

    var pushToken = new PushToken(data);

    var errors = pushToken.validateSync();
    if (errors){
        next(new Error('There were errors on pushToken validation'));
        return;
    }

    pushToken.save(function (err, saved) {
        if(err){
            next(err);
            return;
        }
        
        apiResponse(res, true, saved);
    })
});

module.exports = router;