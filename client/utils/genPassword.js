
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

    strength(userResults){
      /*
      takes in the object that was returned from the testUser function (the one above)
      the loop through the object and seperate the true from the false
      now you can determine how good the password is 
          only one then bad password
          if it has two or more it is good
          if has all 4 then great
        (similar to something on the backend )
      */
  const trueProperties = {};
  for (const results in userResults) {
    if (userResults[results]) {
      trueProperties[results] = true;
    }
  }

  const falseProperties = {};
  for (const results in userResults) {
    if (!userResults[results]) {
      falseProperties[results] = false;
    }
  }

  // let status;
  //   if(Object.keys(trueProperties).length === 1 && Object.keys(trueProperties).length < 4){
  //     status='bad'
  //   }else if(Object.keys(trueProperties).length > 1 && Object.keys(trueProperties).length < 4){
  //     status='good'
  //   }else if(Object.keys(trueProperties).length === 4){
  //     status='great'
  //   }else{
  //     status='N/A'
  //   }
        
    return {trueProperties,falseProperties,}
    //status
    }
    
    }


export default new GenService()