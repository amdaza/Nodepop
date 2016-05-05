/**
 * Created by Alicia on 03/05/2016.
 */
"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Advertisement = mongoose.model('Advertisement');

// Response schema
var apiResponse = require('../../../lib/apiResponse');

// JWT Auth
var jwtAuth = require('../../../lib/jwtAuth');

router.use(jwtAuth());

router.get('/', function (req, res) {
    var name = req.query.name;
    var tags = req.query.tags;
    var forSale = req.query.for_sale;
    var price = req.query.price;

    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || null;
    var sort = req.query.sort || null;
    
    var filters = {};

    if (name !== undefined){
        filters.name = new RegExp('^' + name, "i");
    }

    if (tags !== undefined){
        filters.tags = { '$in': tags };
    }

    if (forSale !== undefined){
        filters.forSale = !!forSale; // !! to get boolean value
    }

    if (price !== undefined){
        if (price.indexOf('-') === -1){
            filters.price = price;

        } else {
            var priceSplitted = price.split('-');
            var minPrice = priceSplitted[0];
            var maxPrice = priceSplitted[1];

            filters.price = {};

            if (minPrice.length > 0){
                filters.price.$gte = minPrice;
            }
            if (maxPrice.length > 0){
                filters.price.$lte = maxPrice;
            }
        }

    }
console.log(filters);

    Advertisement.list(filters, start, limit, sort, function (err, rows) {
        if (err){
            res.status(401);
            return apiResponse(res, false, err);
        }

        apiResponse(res, true, rows);
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
        
        apiResponse(res, true, saved);
    })
});

module.exports = router;