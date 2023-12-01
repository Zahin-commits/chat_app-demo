const mongoose = require('mongoose');
const schema = mongoose.Schema;

const groupSchema = new schema ({
 groupName: {
  type:String,
  required:true
},
 members: {
  type:Array,
  default:[]
},
 adminList: {
  type:Array,
  default:[]
},
type:{
  type: String,
  enum:['public','private'] 
}
})

module.exports = mongoose.model('Group',groupSchema);