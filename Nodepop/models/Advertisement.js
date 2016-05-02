/**
 * Created by Alicia on 02/05/2016.
 */
"use strict";
var mongoose = require('mongoose');

// Create schema
var advertisementSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    forSale: Boolean,
    price: Number,
    picture: String,
    tags: [String]
});

// Method static
advertisementSchema.statics.list = function (filter, start, limit, sort, callback) {
    var query = Advertisement.find(filter); // without .exec(), still  not executed

    // variables for pagination
    query.skip(start);
    query.limit(limit);

    // variable for sort
    query.sort(sort);

    // query.select('name price'); // for getting only selected fields

    return query.exec(callback); // will be called with err and rows
    // exec will return a promise !!
};
/*
var fs = require('fs');

advertisementSchema.statics.listPromise = function () {
    return new Promise(function (resolve, reject) {
        fs.readFile(__dirname + '/../itemsMock.json', 'utf-8', function (err, data) { // __dirname == actual directory
            if (err) {
                return reject(err);
            }
            return resolve(JSON.parse(data));
        });
    });
};
*/
// assign schema to model

var Advertisement = mongoose.model('Advertisement', advertisementSchema);

// no need to export this, later we'll call mongoose of 'Advertisement'