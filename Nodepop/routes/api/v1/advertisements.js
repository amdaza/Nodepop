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
// Error schema
var apiError = require('../../../lib/apiError');

// Languages
var langTexts = {
    es: require('../../../lib/languages/lang_ES'),
    en: require('../../../lib/languages/lang_EN')
};

// JWT Auth
var jwtAuth = require('../../../lib/jwtAuth');

router.use(jwtAuth());

/**
 * @api {get} /advertisements/
 * @apiDescription Get advertisements
 * @apiName GetAdvertisements
 * @apiGroup Advertisements
 *
 * @apiParam {String} name Advertisement beginning name filter.
 * @apiParam {[String]} tags Advertisement tags filter.
 * @apiParam {String} forSale filter. Casted to true when value is 'true' or '1'.
 * @apiParam {String} price Price range filter with format: ¡'min-max'. 'min-' and '-max' are also accepted.
 * @apiParam {String} includeTotal filter. Response will return elements count if value is 'true' or '1'.
 * @apiParam {String} start Start, for pagination.
 * @apiParam {String} limit Limit of elements to obtain.
 * @apiParam {String} sort Will sort elements by its value.
 *
 * @apiSuccess {Object} rows.
 */
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
        filters.name = new RegExp('^' + name, 'i');
    }

    if (tags !== undefined){
        filters.tags = { '$in': tags };
    }

    if (forSale !== undefined){
        filters.forSale = (forSale === 'true' || forSale === '1');
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
            var queryError = apiError(
                20, // code
                langTexts[req.lang][20], // message
                err, // generated error
                'QueryError' // name
            );
            res.status(400);
            return apiResponse(res, false, queryError);
        });


});


module.exports = router;