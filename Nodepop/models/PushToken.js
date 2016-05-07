/**
 * Created by Alicia on 25/04/2016.
 */
"use strict";

var mongoose = require('mongoose');
var User = mongoose.model('User');

// Create schema
var pushTokenSchema = mongoose.Schema({
    platform: {
        type: String,
        enum: ['ios', 'android']
    },
    token: {
        type: String,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

pushTokenSchema.statics.getUser = function (idOrMail, callback) {
    var ObjectId = mongoose.Types.ObjectId;
    var filters = {};
    try{
        var userId = new ObjectId(idOrMail);
        filters._id = userId;
    } catch (e) {
        filters.email = idOrMail;
    }
    console.log(filters);

    var query = User.find(filters); // without .exec(), still  not executed

    return query.exec(callback); // will be called with err and rows
    // exec will return a promise
};

pushTokenSchema.statics.getUserId = function (idOrMail, callback) {
    var ObjectId = mongoose.Types.ObjectId;
    try{
        var userId = new ObjectId(idOrMail);
        // Success, so it's a valid id. That value is returned.
        return callback(null, userId);
    } catch (e) {
        // new ObjectId(idOrMail) failed. Search if user is an existing email
        var filters = {
            email: idOrMail
        };

        var query = User.find(filters);
        query.select('_id'); // for getting only selected fields

        var result = query.exec(function (err, rows){

            if (err) {
                return callback(err);
            }

            if (rows.length === 0 || rows[0]._id === undefined){
                var error = 'Cannot find user from email or id';
                return callback(error);
            }

            return callback(null, rows[0]._id);
        });
    }
};

var pushToken = mongoose.model('Pushtoken', pushTokenSchema);

// no need to export this, later we'll call mongoose of 'Pushtoken'