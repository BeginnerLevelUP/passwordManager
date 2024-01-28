const { GraphQLError } = require('graphql'); //creates a custom error for your graphql queries and mutations
const jwt = require('jsonwebtoken'); // utils to create json web tokens

const secret = 'mysecretssshhhhhhh'; // what encrpyts 
//export to a .env
const expiration = '2h'; //self explanatory

module.exports = {
    // syntax to create the error
    AuthenticationError: new GraphQLError('Could not authenticate user.', {
        extensions: {
            code: 'UNAUTHENTICATED',
        },
    }),
    // used in your express server
    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }// takes the token from the bearer

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration }); //does what the method says
            req.user = data;
            //guess req.CANBECUSTOMIZED
        } catch {
            console.log('Invalid token');
        }

        return req;
    },
    signToken: function ({ email, username, _id }) {
        const payload = { email, username, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration }); // actually creating the token
    },
};

