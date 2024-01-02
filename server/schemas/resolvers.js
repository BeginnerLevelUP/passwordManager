
const { User, Account } = require('../models/index'); 
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers={
    Query:{
        users:async(parent)=>{
            return await User.find({}).populate('accounts')
        },
        user:async(parent,{username})=>{
            return await User.find({username}).populate('accounts')
        },
        me:async(parent,args,context)=>{
            if(context.user){
                return await User.findOne({_id:context.user._id}).populate('accounts')
            }
            throw AuthenticationError
        }
    },
    Mutation:{
        signup:async(parent,{username,email,password})=>{
            const user= await User.create({username,email,password})
            const token=signToken(user) // based on the parameters back in the auth file (the _id will be automatically added)
            return {user,token} // returns to token so it can be saved in the local storage im assuming
        },
        login:async(parent,{email,password})=>{
            const user=await User.findOne({email})
            
            if(!user){
                throw AuthenticationError // in auth.js
            }

            const correctPw=await user.isCorrectPassword(password) // method in mongoose

            if(!correctPw){
                throw AuthenticationError
            }

            const token=signToken(user) // signs the token if the information is correct

            return{token,user}
        },
        addAccount:async(parent,{owner,username,email,password})=>{
         const newAccount= await Account.create({username,email,password})
           return await User.findOneAndUpdate(
                {username:owner},
                {$addToSet:{accounts:newAccount}}
                ).populate('accounts')
        }
    }
}

module.exports=resolvers