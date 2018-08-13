'use strict';

var mongoose = require('mongoose');

//Connect to the database
var Schema = mongoose.Schema;

var ContentSchema = new Schema({
   Author: String,
   Description: String,
   Group: String,
   Image: String,
   Name: String,
   Reserved: String,
   Reserved_Until: String,
   Type: String,
}, {collection:'Content'});

module.exports = mongoose.model('content', ContentSchema, "Contents");