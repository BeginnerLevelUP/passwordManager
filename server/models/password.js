const { Schema, model } = require('mongoose');

const passwordSchema=new Schema({
    text:{
        tpye:String,
        required:true,
        min:8
    },
    length:{
        type:Number,
        required:true,
        min:8
    },
    uppercase:{
        type:Boolean,
        required:true,
        default:true,
    },
    lowercase:{
        type:Boolean,
        required:true,
        default:true,  
    },
    number:{
        type:Boolean,
        required:true,
        default:true,
    },
    specialCharacter:{
        type:Boolean,
        required:true,
        default:true,
    }
})

const Password=model('Password',passwordSchema)
module.exports=Password