'use strict';

var mongoose = require('mongoose');

//Connect to the database
var Schema = mongoose.Schema;

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
        password: {
            type: String
        },
        password_reset_expires: Date,
        password_reset_token: String,
        permalink: String,
        phone: String,
        security_question_answer: String,
        security_question_type: String,
        street: String,
        surname: String,
        username: String,
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

module.exports = mongoose.model('user', UserSchema, "Users");