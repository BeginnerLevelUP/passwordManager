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
    },
    uppercase:{
        type:Boolean,
    },
    lowercase:{
        type:Boolean,  
    },
    number:{
        type:Boolean,
    },
    specialCharacter:{
        type:Boolean,
    },
    strength:{
        type:String,
        enum:['bad','good','great']
    }
})
// Middleware to runs before the saving to the database 
passwordSchema.pre('save', async function (next) {
    if (this.isModified('text') || this.isNew ) {
        // Use regex to check for uppercase, lowercase, numbers, and special characters
        const regexUppercase = /[A-Z]/;
        const regexLowercase = /[a-z]/;
        const regexNumber = /[0-9]/;
        const regexSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

        // Set properties based on text
        this.uppercase = regexUppercase.test(this.text);
        this.lowercase = regexLowercase.test(this.text);
        this.number = regexNumber.test(this.text);
        this.specialCharacter = regexSpecialChar.test(this.text);
        
        //Setting the Length 
        this.length=this.text.length
        
        //Setting the Strength of the password 
        // Calculate strength based on the criteria met
        let criteriaMet = 0;
        if (this.uppercase) criteriaMet++;
        if (this.lowercase) criteriaMet++;
        if (this.number) criteriaMet++;
        if (this.specialCharacter) criteriaMet++;

        // Set password strength based on the number of criteria met
        if (criteriaMet >= 3) {
            this.strength = 'great';
        } else if (criteriaMet === 2) {
            this.strength = 'good';
        } else {
            this.strength = 'bad';
        }

        // Hash the
        const saltRounds = 10; // the amount hash rounds 
       this.text = await bcrypt.hash(this.text, saltRounds);

    }

    next(); //moves on
});

passwordSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.text);
    // adds a method to the usershcma to compare passwords for later use
};

// could create another feild that says strength and add a checker in the .pre and make it similar to the 
// rarity thing in the trading card app
const Password=model('Password',passwordSchema)
module.exports=Password