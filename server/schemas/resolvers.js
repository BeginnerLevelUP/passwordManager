
const { User, Account, Password } = require('../models/index'); 
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers={
    Query:{
        users:async(parent)=>{
            return await User.find({}).populate('accounts')
        },
        user:async(parent,{username})=>{
            return await User.findOne({username}).populate('accounts')
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
            const newPassword=await Password.create({text:password})
            const user= await User.create({username,email,password:newPassword._id})
            const token=signToken(user) // based on the parameters back in the auth file (the _id will be automatically added)
            return {user,token} // returns to token so it can be saved in the local storage im assuming
        },
login: async (parent, { email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw AuthenticationError;
    }

    const userPassword = await Password.findOne({ _id: user.password }); // Assuming user.password holds the reference to the Password document

    if (!userPassword) {
        throw AuthenticationError;
    }

    const isPasswordCorrect = await userPassword.isCorrectPassword(password);

    if (!isPasswordCorrect) {
        throw AuthenticationError;
    }

    const token = signToken(user);

    return { token, user };
},

        // addAccount:async(parent,{owner,username,email,password})=>{
        //  const newAccount= await Account.create({username,email,password})
        //    return await User.findOneAndUpdate(
        //         {username:owner},
        //         {$addToSet:{accounts:newAccount}}
        //         ).populate('accounts')
        // }
    }
}

module.exports=resolvers