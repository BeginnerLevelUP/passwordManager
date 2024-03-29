const typeDefs=`
type User {
    _id: ID
    username: String
    email: String
    password: Password
    accounts:[Account]
    allowUpdates:Boolean
}

type Account{
    _id:ID
    username:String
    email:String
    websiteUrl:String
    notes:String
    created:String
    updated:String
    password:Password
}

type Password{
    _id:ID
    text:String
    length:Int
    uppercase:Boolean
    lowercase:Boolean
    number:Boolean
    specialCharacter:Boolean
    strength:String
}

type Auth{
    token:ID
    user:User
}

type Query{
users:[User]
user(username:String!):User
me:User
accounts(_id:ID!):Account
}

type Mutation{
    signup(username:String!,email:String!,password:String!):Auth
    login(email:String!,password:String!):Auth
    addNewAccount(passwordText:String!,username:String,email:String,websiteUrl:String,notes:String,currentUsername:String!):Account
    updateAccount(_id:ID!,username:String,email:String,password:String):User
    updateUserAccount(passwordText:String,username:String,email:String,websiteUrl:String,notes:String,currentAccountId:ID!):Account
    showExternalPassword(accountId:ID!,show:Boolean!):Account
    deleteUserAccount(accountId:ID!):Account
    deleteUser(userId:ID!):User
    changeEmailStatus(_id:ID!,status:Boolean!):User
}
`

module.exports=typeDefs
// Mutation  addAccount(owner:String!,username:String!,email:String!,password:String!):User