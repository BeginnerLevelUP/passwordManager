const { Schema, model } = require('mongoose');
const dateFormat=require('../utils/dateFormat')
const bcrypt = require('bcrypt');


const accountSchema= new Schema({
username:{
    type:String,
    default:null
},
email:{
    type:String,
    match: [/.+@.+\..+/, 'Must be a valid email address!'],// the regex and fail message
    default:null
},
password:{
type:Schema.Types.ObjectId, 
ref:'Password',
},
websiteUrl:{
type:String,
match:[/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,'Must be a valid website'],
default:null
},
notes:{
    type:String,
    default:'Untitled Password'
},
created:{
    type:Date,
    default:Date.now(),
    get: (timestamp) => dateFormat(timestamp), //modifies the data whenever it is retrived 
}
})

accountSchema.pre('save',async function(next){
    // if the fields are filled in the notes are left empty
  if (this.username !== null || this.email !== null || this.websiteUrl !== null) {
    this.notes = '';
  }

  next();
})
const Account = model('Account', accountSchema);

module.exports = Account;