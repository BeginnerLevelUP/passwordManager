const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Cryptr = require('cryptr');    
 const cryptr = new Cryptr(process.env.CRYPTR_KEY);
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


passwordSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.text);
    // adds a method to the usershcma to compare passwords for later use
};
passwordSchema.methods.strengthTest=async function(password){
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



    }
}
passwordSchema.methods.hashNativePassword = async function (password) {
    await this.strengthTest(); // Call strengthTest before modifying this.text
    const saltRounds = 10;
    this.text = await bcrypt.hash(this.text, saltRounds);
};


passwordSchema.methods.encryptExternalPassword = async function () {
    await this.strengthTest(); // Call strengthTest before modifying this.text
    this.text = cryptr.encrypt(this.text);
};

// could create another feild that says strength and add a checker in the .pre and make it similar to the 
// rarity thing in the trading card app
const Password=model('Password',passwordSchema)
module.exports=Password