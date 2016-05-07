/**
 * Created by Alicia on 25/04/2016.
 */
"use strict";

var mongoose = require('mongoose');

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

var pushToken = mongoose.model('Pushtoken', pushTokenSchema);

// no need to export this, later we'll call mongoose of 'Pushtoken'