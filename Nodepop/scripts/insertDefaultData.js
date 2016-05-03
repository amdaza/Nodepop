/**
 * Created by Alicia on 03/05/2016.
 */

// Database connection with mongoose
require('../lib/connectMongoose');
require('../models/User');
require('../models/Advertisement');

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Advertisement = mongoose.model('Advertisement');

//var models = [User, Advertisement];

var fs = require('fs');

var defaultUsers = fs.readFile('defaultData.json', 'utf8', function (err, data) {

    // Insert default model data
  /*  myArray.forEach(function(value){
        console.log(value);
    });*/
    var col = User.collection;
    var col_name = User.collection.name;

    col.drop( function (err) {
        if (err){
            return console.log('Error', err);
        }

        col.insertMany(JSON.parse(data)[col_name], function(err, docs) {
            console.log(docs);
            col.count(function (err, count) {
                console.log(count);
                //return process.exit();
            });
        })
    });

    // Insert default advertisements

});
