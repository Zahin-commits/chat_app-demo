const mongoose = require('mongoose');
const schema = mongoose.Schema;

const messageSchema = new schema({

 from:{
        type:String,
        required:true
 },

 to:{
        type:String,
        required:true
 },

 text:{
  type:String,
  required:true
 }
},{createdAt:true});

module.exports = mongoose.model('Message',messageSchema);