// All Character types in regex
const uppercaseRegex = /[A-Z]/;
const lowercaseRegex = /[a-z]/;
const specialCharsRegex = /[!@#$%^&*()-_+=\[\]{}|;:,.<>?]/;
const numbersRegex = /\d/; // or /[0-9]/

// All the characters needed to make a password placed inside an Array
const alphabetUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const alphabetLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', '|', ';', ':', ',', '.', '/', '<', '>', '?']
const numbersArray = [0,1, 2, 3, 4, 5, 6, 7, 8, 9,]

/* Generating the default password 
1)Has 50 characters 
2)Uses all character types
*/

/* Function Criteria
Must be able to generate a password selectivey (adding and excluding character types)
Returns a password with the given length
Done randomly
*/

/* MIGHT JUST USE AN NPM PACKAGE BIG DAWG
https://www.npmjs.com/package/generate-password-  OG VERSION
https://www.npmjs.com/package/generate-password-browser -- BROWSER SUPPORT
*/