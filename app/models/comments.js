'use strict';
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  _id:        {type: mongoose.Types.ObjectId},
  userid:     {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
  parent:     {type : mongoose.Schema.Types.ObjectId, ref: 'Question', required: [true, "can't be blank"]},
  text: {
    english : {type: String, required: [true, "can't be blank"]},
    urdu : {type: String, required: [true, "can't be blank"]}
  },
  likes :[{type : mongoose.Schema.Types.ObjectId, ref: 'User'}],
  dislikes : [{type : mongoose.Schema.Types.ObjectId, ref: 'User'}],
  location:{
    lon: {type: String},
    lat: {type: String}
  }
}, {timestamps: true});
module.exports = mongoose.model('Comment', CommentSchema);