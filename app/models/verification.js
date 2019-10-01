'use strict';
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
// const arrayUniquePlugin = require('mongoose-unique-array');
var jwt = require('jsonwebtoken')

var VerifySchema = new mongoose.Schema({
    _id: {type: mongoose.Types.ObjectId} ,
    code: {type: Number},
    phonenumber: {type: String , required: [true, "can't be blank"], unique: [true, 'Already exsists']}
}, {timestamps: true});

VerifySchema.plugin(uniqueValidator, {message: 'is already taken.'});
module.exports = mongoose.model('Verify', VerifySchema);