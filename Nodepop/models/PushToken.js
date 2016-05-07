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
 /*
    filters = { $or: [
        {_id: new ObjectId(user)},
        {email: user}
    ] };
*/
    var query = User.find(filters); // without .exec(), still  not executed

    return query.exec(callback); // will be called with err and rows
    // exec will return a promise
};

pushTokenSchema.statics.getUserId = function (idOrMail, callback) {
    var ObjectId = mongoose.Types.ObjectId;
    try{
        var userId = new ObjectId(idOrMail);
        return callback(null, userId);
    } catch (e) {
        var filters = {
            email: idOrMail
        };

        var query = User.find(filters);
        query.select('_id'); // for getting only selected fields

        var result = query.exec(function (err, rows){
            console.log(err, rows);
            if (err) {
                callback(err);
            }

            return callback(null, rows[0]._id);
        });

    }

};


var pushToken = mongoose.model('Pushtoken', pushTokenSchema);

// no need to export this, later we'll call mongoose of 'Pushtoken'