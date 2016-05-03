/**
 * Created by Alicia on 03/05/2016.
 */
"use strict";

// Database connection with mongoose
require('../lib/connectMongoose');
require('../models/User');
require('../models/Advertisement');

var mongoose = require('mongoose');
var fs = require('fs');

var User = mongoose.model('User');
var Advertisement = mongoose.model('Advertisement');

var models = [User, Advertisement];


function insertDefaultData(item, data, callback) {
    var col = item.collection;
    var col_name = item.collection.name;
    console.log('col', col_name);

    col.deleteMany( {}, function (err) {
        if (err){
            return console.log(`Error on deleteMany in ${col_name} collection;`, err);
        }

        col.insertMany(JSON.parse(data)[col_name], function(err, docs) {
            console.log(`Inserted in ${col_name}`, docs);
            col.count(function (err, count) {
                console.log(`There are now ${count} documents in ${col_name}`);
                callback();
            });
        })
    });

}

var defaultData = fs.readFile('defaultData.json', 'utf8', function (err, data) {

    // Insert default model data
    let requests = models.map((item) => {
        return new Promise((resolve) => {
            insertDefaultData(item, data, resolve);
        });
    })

    Promise.all(requests).then(() => {
        console.log('done');
        process.exit();
    });

});
