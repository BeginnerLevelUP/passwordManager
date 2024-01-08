const { Schema, model } = require('mongoose');
const dateFormat=require('../utils/dateFormat')
const bcrypt = require('bcrypt');


const accountSchema= new Schema({
username:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    match: [/.+@.+\..+/, 'Must be a valid email address!'] // the regex and fail message
},
password:{
type:Schema.Types.ObjectId, 
ref:'Password'
},
websiteUrl:{
type:String,
match:[/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,'Must be a valid website']
},
created:{
    type:Date,
    default:Date.now(),
    get: (timestamp) => dateFormat(timestamp), //modifies the data whenever it is retrived 
}
})

// Middleware to runs before the saving to the database 
accountSchema.pre('save', async function (next) {
    // this.isNew checks if database isnt created yet or hasnt been added to?
    // this.isModified takes in an argument of the field (in string form) and checks if it has been
    // changed bascially to bcrypt if you update your password
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10; // the amount hash rounds 
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next(); //moves on
});

accountSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
    // adds a method to the usershcma to compare passwords for later use
};

const Account = model('Account', accountSchema);

module.exports = Account;