'use strict';
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
// const arrayUniquePlugin = require('mongoose-unique-array');
var jwt = require('jsonwebtoken')

var UserSchema = new mongoose.Schema({
  _id:        {type: mongoose.Types.ObjectId} ,
  // username:   {type: String, lowercase: true, unique: [true, 'Already exsists'], required: [true, "can't be blank"], match: [/^[a-zA-Z0-9 ]+$/, 'is invalid']},
  fullname:   {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z ]+$/, 'is invalid']},
  email:      {type: String, lowercase: true, unique: [true, 'Already exsists'], match: [/\S+@\S+\.\S+/, 'is invalid'] , sparse: true},
  password:   {type: String, required: [true, "can't be blank"],select: false},
  type: {type:String, required: [true, "can't be blank"]},
  profilepic: {type: String},
  phonenumber : { type: String, required: [true, "can't be blank"] , unique: [true, 'Already exsists']},
  questions:[ { type : mongoose.Schema.Types.ObjectId, ref: 'Question'}],
  comments: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  videos: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Video'}],
  ads: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Ad'}],
  designationName:{type: String},
  instituteName:{type: String},
  gender: {type: String},
  location:{
    lon: {type: String},
    lat: {type: String}
  },
  dateofbirth: {
    day: {type: Number},
    month : {type: Number},
    year : {type: Number}
  },
  verified: {type: Boolean, default: false}
}, {timestamps: true});

        UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});
        
        UserSchema.methods.CreateToken = function() {
        var token = jwt.sign({ _id: this._id,
            phonenumber: this.phonenumber }, 'abc12385');
            return token
                }
module.exports = mongoose.model('User', UserSchema);