import { gql } from '@apollo/client';

export const QUERY_ME=gql`
query Me {
  me {
    _id
    username
    email
    password {
      _id
      text
      length
      uppercase
      lowercase
      number
      specialCharacter
    }
    accounts {
      _id
      username
      email
      websiteUrl
      notes
      created
          updated
            password{
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
}
`
