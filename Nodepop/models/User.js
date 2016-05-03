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

// userSchema.index(); // Also possible...

// Method in controller, would be better here

// assign schema to model

var User = mongoose.model('User', userSchema);

// no need to export this, later we'll call mongoose of 'User'