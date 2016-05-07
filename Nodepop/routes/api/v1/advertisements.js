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
    // Get query values
    var name = req.query.name;
    var tags = req.query.tags;
    var forSale = req.query.forSale;
    var price = req.query.price;
    var includeTotal = req.query.includeTotal;

    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || null;
    var sort = req.query.sort || null;

    // Prepare filters
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

    includeTotal = (includeTotal === 'true' || includeTotal === '1');


    // Queries (with promises)
    var listPromise = Advertisement.list(filters, start, limit, sort);

    var promises = [listPromise];

    if (includeTotal) {
        // Include total count
        var totalPromise = Advertisement.total(filters);
        promises.push(totalPromise);
    }

    Promise.all(promises)
        .then( function (responses) {
            // Fired when all promises have ended
            var data = {
                rows: responses[0] // listPromise returned value
            };

            if (includeTotal){
                data.count = responses[1]; // countPromise returned value
            }

            return apiResponse(res, true, data);
        })
        .catch( function (err) {
            // Fired on first element that fails
            return apiResponse(res, false, err);
        });


});


router.post('/', function (req, res, next) {

    var agent = new Advertisement(req.body);

    var errors = agent.validateSync();
    if (errors){
        next(new Error('There were errors on Agent validation'));
        return;
    }

    agent.save(function (err, saved) {
        if(err){
            next(err);
            return;
        }
        
        apiResponse(res, true, saved);
    })
});

module.exports = router;