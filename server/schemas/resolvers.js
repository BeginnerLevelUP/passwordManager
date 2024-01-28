
const { User, Account, Password } = require('../models/index'); 
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers={
    Query:{
        users:async(parent)=>{
            return await User.find({}).populate(
         {  path: 'accounts',
            populate:{
                path:'password'
            } })
            .populate('password')
        },
        user:async(parent,{username})=>{
            return await User.findOne({$or:[{username},{email:username}]}).populate(
         {  path: 'accounts',
            populate:{
                path:'password'
            } })
            .populate('password')
        },
        me:async(parent,args,context)=>{
            if(context.user){
                return await User.findOne({_id:context.user._id}).populate(
         {  path: 'accounts',
            populate:{
                path:'password'
            } })
            .populate('password')
            }
            throw AuthenticationError
        },
        accounts:async(parent,{_id})=>{
            // populate the newAccount 
            const populatedNewAccount=await Account.findById(_id).populate('password')
            return populatedNewAccount
        },
         showExternalPassword:async(parent,{accountId})=>{
try {
        // Find the account
        const currentAccount = await Account.findById(accountId)
        const currentPasswordId = currentAccount.password;

        // Find password
        const currentPassword = await Password.findById(currentPasswordId);
        await currentPassword.viewPassword();
        await currentPassword.save()
        // Return the decrypted password
        return currentAccount.populate("password")
    } catch (error) {
        // Find the account
        const currentAccount = await Account.findById(accountId)
        const currentPasswordId = currentAccount.password;

        // Find password
        const currentPassword = await Password.findById(currentPasswordId);
        await currentPassword.encryptExternalPassword();
        await currentPassword.save()
        // Return the decrypted password
        return currentAccount.populate("password")
    }
        }
    },
    Mutation:{
        signup:async(parent,{username,email,password})=>{
    try {
        const newPasswordInstance = new Password({ text: password });
        await newPasswordInstance.hashNativePassword();
        const newPassword = await newPasswordInstance.save();

        const newUser = await User.create({ username, email, password: newPassword._id });
        const token = signToken(newUser);
        return { user: newUser, token };
    } catch (error) {
        console.error(error);
        throw new Error('Error creating user');
    }
        },
        login: async (parent, { email, password }) => {
  const user = await  User.findOne({$or:[{username:email},{email}]})
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
        addNewAccount:async(parent,{passwordText,username,email,websiteUrl,notes,currentUsername})=>{
            try{
            // Have to find the user first so if there's no user the rest of the code throws an error 
            const validate=await User.findOne({username:currentUsername})
            if(validate){
  //this is a mutation for when you click savePassword button on the front end (if your logged in)
            /*
            create a new password
            */
            const newPasswordInstance=new Password({text:passwordText})
            await newPasswordInstance.encryptExternalPassword()
            const newPassword=await newPasswordInstance.save()
            /*
            create a new account document to store the password 
            if the user doesnt want to tie and account to their saved password the fields are optional
            by default the notes field will be filled in to say "untitled password "
            */
            const newAccount=await Account.create({
                username,
                email,
                password:newPassword._id,
                websiteUrl,
                notes 
            })


            /*
            add that new account to the user
            */
            const currentUser=await User.findOneAndUpdate({username:currentUsername},
                {
                $addToSet:{accounts:newAccount._id}
                },
                {
                  new:true  
                })
            
            // populate the newAccount 
            const populatedNewAccount=await Account.findById(newAccount._id).populate('password')
            return populatedNewAccount
            }
          
            }catch(e){
                console.error(e)
            }

        },
        updateUserAccount : async (parent, { passwordText, username, email, websiteUrl, notes, currentAccountId }) => {
    try {
        // Find the current account
if (passwordText!==passwordText) {
    const currentAccount = await Account.findOne({ _id: currentAccountId }).populate('password');
    const passwordId = currentAccount.password._id;
    
    const currentPassword = await Password.findOne({ _id: passwordId });

    currentPassword.text = passwordText;

    await currentPassword.save();

    return currentAccount;
}
const currentAccount =await Account.findOneAndUpdate(
                { _id: currentAccountId },
                { $set: { username,email,websiteUrl,notes,passwordText } },
                { new: true }
            ).populate('password')
currentAccount.updated=Date.now()
            await currentAccount.save()

    return currentAccount

    } catch (error) {
        console.error(error);
        throw new Error("Error updating account");
    }
        }

    }
}

module.exports=resolvers

