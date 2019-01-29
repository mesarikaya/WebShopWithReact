'use strict';
var mongoose = require('mongoose');

//Connect to the database
var Schema = mongoose.Schema;

// Set user document schema
var UserSchema = new Schema({
   
    local_login: {
        city: String,
        country: String,
        email: {
            trim: true,
            type: String,
        },
        firstName: String,
        houseNumber: String,
        isVerified: { type: Boolean, default: false },
        mobileNumber: String,
        password: {
            trim: true,
            type: String
        },
        password_reset_expires: Date,
        password_reset_token: String,
        permalink: String,
        security_answer: String,
        streetName: String,
        surname: String,
        verify_token: String,
        verify_token_expires: Date,
        zipcode: String
    },
    social_login: {
        created: Date,
        name: String,
        oauthID: {}
    }

}, { collection: 'User' });

// Set the data model name specifically and export
module.exports = mongoose.model('user', UserSchema, "Users");