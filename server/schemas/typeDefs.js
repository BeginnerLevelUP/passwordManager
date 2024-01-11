const typeDefs=`
type User {
    _id: ID
    username: String
    email: String
    password: Password
    accounts:[Account]
}

type Account{
    _id:ID
    username:String
    email:String
    websiteUrl:String
    notes:String
    create:String
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
}

type Auth{
    token:ID
    user:User
}

type Query{
users:[User]
user(username:String!):User
me:User
}

type Mutation{
    signup(username:String!,email:String!,password:String!):Auth
    login(email:String!,password:String!):Auth
     addNewAccount(passwordText:String!,username:String,email:String,websiteUrl:String,notes:String,currentUsername:String!):Account
}
`

module.exports=typeDefs
// Mutation  addAccount(owner:String!,username:String!,email:String!,password:String!):User