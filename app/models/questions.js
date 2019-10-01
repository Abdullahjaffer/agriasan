'use strict';
var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
  _id:        {type: mongoose.Types.ObjectId},
  userid:     {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
  type : {type: String},
  question: {
    english : {type: String, required: [true, "can't be blank"]},
    urdu : {type: String, required: [true, "can't be blank"]}
  },
  description:{
    english : {type: String, required: [true, "can't be blank"]},
    urdu : {type: String, required: [true, "can't be blank"]}
  },
  images:[{type: String}],
  likes :[{type : mongoose.Schema.Types.ObjectId, ref: 'User'}],
  dislikes : [{type : mongoose.Schema.Types.ObjectId, ref: 'User'}],
  location:{
    lon: {type: String},
    lat: {type: String}
  },
  bestanswer : {type : mongoose.Schema.Types.ObjectId, ref: 'Comment'}
}, {timestamps: true});
QuestionSchema.index({'question.english':'text','description.english':'text','question.urdu':'text','description.urdu':'text'})
module.exports = mongoose.model('Question', QuestionSchema);