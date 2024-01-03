import { gql } from '@apollo/client';

export const SIGNUP=gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  signup(username: $username, email: $email, password: $password) {
    token
    user {
      username
      _id
    }
  }
}
`
export const LOGIN=gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      username
      _id
    }
  }
}
`