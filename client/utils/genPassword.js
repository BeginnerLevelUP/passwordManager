
// /* MIGHT JUST USE AN NPM PACKAGE BIG DAWG
// https://www.npmjs.com/package/generate-password-  OG VERSION
// https://www.npmjs.com/package/generate-password-browser -- BROWSER SUPPORT
// */

import generatePassword from 'generate-password';

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
    length: 12,
    numbers: true,
    symbols: true,
    uppercase: true,
    lowercase:true,
    strict:true
  });
    return defaultpassword
    }

    genUserPsw(length,upper,lower,num,spec){
    const userPsw=generatePassword.generate({
    length:length,
    numbers: num,
    symbols: spec,
    uppercase: lower,
    lowercase:upper,
  });
    }

}

export default new GenService()