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
export const ADD_ACCOUNT=gql`
mutation Mutation($passwordText: String!, $currentUsername: String!, $username: String, $email: String, $websiteUrl: String, $notes: String) {
  addNewAccount(passwordText: $passwordText, currentUsername: $currentUsername, username: $username, email: $email, websiteUrl: $websiteUrl, notes: $notes) {
    _id
    username
    email
    websiteUrl
    notes
    created
    password {
      _id
      text
      length
      uppercase
      lowercase
      number
      specialCharacter
    }
  }
}
`

export const UPDATE_USER_ACCOUNT=gql`
mutation UpdateUserAccount($currentAccountId: ID!, $passwordText: String, $username: String, $email: String, $websiteUrl: String, $notes: String) {
  updateUserAccount(currentAccountId: $currentAccountId, passwordText: $passwordText, username: $username, email: $email, websiteUrl: $websiteUrl, notes: $notes) {
    _id
    username
    email
    websiteUrl
    notes
    created
    password {
      _id
      text
      length
      uppercase
      lowercase
      number
      specialCharacter
    }
  }
}
`