const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const passwordSchema=new Schema({
    text:{
        type:String,
        required:true,
        min:8
    },
    length:{
        type:Number,
        min:8
    },
    uppercase:{
        type:Boolean,
        default:true,
    },
    lowercase:{
        type:Boolean,
        default:true,  
    },
    number:{
        type:Boolean,
        default:true,
    },
    specialCharacter:{
        type:Boolean,
        default:true,
    }
})
// Middleware to runs before the saving to the database 
passwordSchema.pre('save', async function (next) {
    // this.isNew checks if database isnt created yet or hasnt been added to?
    // this.isModified takes in an argument of the field (in string form) and checks if it has been
    // changed bascially to bcrypt if you update your password
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10; // the amount hash rounds 
       this.text = await bcrypt.hash(this.text, saltRounds);
    }

    next(); //moves on
});

passwordSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.text);
    // adds a method to the usershcma to compare passwords for later use
};

// maybe create a method that automatically categorizes what the password is
const Password=model('Password',passwordSchema)
module.exports=Password