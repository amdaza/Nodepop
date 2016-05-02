/**
 * Created by Alicia on 03/05/2016.
 */
"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Advertisement = mongoose.model('Advertisement');

// JWT Auth
var jwtAuth = require('../../../lib/jwtAuth');

//router.use(jwtAuth());

router.get('/', function (req, res) {
    var name = req.query.name;
    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || null;
    var sort = req.query.sort || null;
    
    var filters = {};

    if (name !== undefined){
        filters.name = name;
    }

    Advertisement.list(filters, start, limit, sort, function (err, rows) {
        if (err){
            return res.json({
                success: false,
                error: err
            });
            //return;
        }

        res.json({
            success: true,
            rows: rows
        });
    });
});

// playing with promises

router.get('/promise', function (req, res) {
    Advertisement.listPromise()
        .then(function (data) {
            res.json({
                success: true,
                rows: data
            });
        })
        .catch(function (err) {
            res.json({
                success: false,
                error: err
            });
        });
});

router.post('/', function (req, res, next) {

    var agent = new Advertisement(req.body);

    var errors = agent.validateSync();
    if (errors){
        console.log('errors', errors);
        next(new Error('There were errors on validation'));
        return;
    }


    //console.log(agent);
    agent.save(function (err, saved) {
        if(err){
            next(err);
            return;
        }
        res.json({success: true, saved: saved});
    })
});

module.exports = router;