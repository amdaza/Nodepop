/**
 * Created by Alicia on 25/04/2016.
 */
"use strict";

var mongoose = require('mongoose');

// Create schema
var userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        index: { unique: true } // use index in MongoDB
    },
    password: String
});


userSchema.statics.getUserId = function (idOrMail, callback) {
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

var User = mongoose.model('User', userSchema);
