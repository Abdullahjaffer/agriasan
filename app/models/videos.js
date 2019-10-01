'use strict';
var mongoose = require('mongoose');

var VideoSchema = new mongoose.Schema({
  _id:        {type: mongoose.Types.ObjectId},
  userid:     { type : mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, "can't be blank"]},
  link:       {type : String , unique : [true, 'Already exsists'], required: [true, "can't be blank"]},
  name: {
    english : {type: String, required: [true, "can't be blank"]},
    urdu : {type: String, required: [true, "can't be blank"]}
  },
  likes :[{type : mongoose.Schema.Types.ObjectId, ref: 'User'}],
  dislikes : [{type : mongoose.Schema.Types.ObjectId, ref: 'User'}],
  Tags : [{
    tag: {
        english : {type : String , required: [true, "can't be blank"]},
        urdu : {type : String , required: [true, "can't be blank"]}
    },
    starttime: {type : Number},
    endtime: {type : Number}
}]
}, {timestamps: true});
module.exports = mongoose.model('Video', VideoSchema);