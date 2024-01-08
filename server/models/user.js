const { Schema, model } = require('mongoose');
// Destructing the class schema and function model from mongoose



const userSchema= new Schema(//constructor takes in an object
    {
username:{
    type:String,
    required:true,
    unique:true,
    match: [/^[a-zA-Z0-9]+$/,'Alphanumber Charcters only'] //REGEX to only allow alphanumeric characters
},
email:{
    type:String,
    required:true,
    unique:true,
    match: [/.+@.+\..+/, 'Must match an email address!'] // the regex and fail message
},
password:{
type:Schema.Types.ObjectId, 
ref:'Password'
},
accounts:[
    {
        type:Schema.Types.ObjectId, // id that references an already established id
        ref:'Account' // reference the frined model
    }
]
})

const User = model('User', userSchema);

module.exports = User;

