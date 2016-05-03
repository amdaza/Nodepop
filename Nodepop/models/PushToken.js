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
    token: String,
    user: {type: Schema.ObjectId, ref: 'User'}
});

// userSchema.index(); // Also possible...

// Method in controller, would be better here

// assign schema to model

var User = mongoose.model('User', userSchema);

// no need to export this, later we'll call mongoose of 'User'