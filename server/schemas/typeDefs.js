const typeDefs=`
type User {
    _id: ID
    username: String
    email: String
    password: String
    accounts:[Account]
}

type Account{
    _id:ID
    username:String
    email:String
    password:String
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
    addAccount(owner:String!,username:String!,email:String!,password:String!):User
}
`

module.exports=typeDefs