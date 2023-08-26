var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    a05status:{type:String,required:true},
    a10personID:{type:Schema.Types.ObjectID,required:false},
    a15account:{type:String,required:true},
    a20password:{type:String,required:false},
    a25group:{type:String,required:false},
    a99footnote:{type:String,required:false}
  }
);


//Export model
module.exports = mongoose.model('User', UserSchema);
