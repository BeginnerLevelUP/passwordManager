
// /* MIGHT JUST USE AN NPM PACKAGE BIG DAWG
// https://www.npmjs.com/package/generate-password-browser -- BROWSER SUPPORT
// */

import generatePassword from 'generate-password-browser';

/* Function Criteria
 Must be able to generate a password selectivey (adding and excluding character types)
 Returns a password with the given length
 Done randomly
*/
class GenService{

    getDefault(){
 // /* Generating the default password 
// 1)Has 50 characters 
// 2)Uses all character types
// */
    const defaultpassword = generatePassword.generate({
    length: 50,
    numbers: true,
    symbols: true,
    uppercase: true,
    lowercase:true,
    strict:true
  });
    return defaultpassword
    }

    genUserPsw(length, upper, lower, num, spec) {
  if (!length || !upper || !lower || !num || !spec) {
    return {};
  }

  const userPsw = generatePassword.generate({
    length: length,
    numbers: num,
    symbols: spec,
    uppercase: lower,
    lowercase: upper,
  });

  return userPsw;
    }

    testUser(text){
      /*
      in the two functions the state change would affect the generation of the password
      but now the generation of the password affects the state
      by using regex to test the text state(textArea) you can affect the checkboxes
      and length should be pretty much the same 
      */
// All Character types in regex

return {
  upper: /[A-Z]/.test(text),
  lower: /[a-z]/.test(text),
  spec: /[!@#$%^&*()\-_+=\[\]{}|;:,.<>?]/.test(text),
  num: /\d/.test(text)
}

    }

}

export default new GenService()