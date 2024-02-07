// import emailjs from '@emailjs/browser';
// const badPasswordTime= 1209600000 //2weeks in milliseconds

// const goodPasswordTime= 2629744000 // 1month in milliseconds


// import.meta.env.VITE_YOUR_SERVICE_ID
// import.meta.env.VITE_YOUR_TEMPLATE_ID
// emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams).then(
//   function (response) {
//     console.log('SUCCESS!', response.status, response.text);
//   },
//   function (err) {
//     console.log('FAILED...', err);
//   },
// );

const Email = (accounts) => {
    const messages = accounts.map((account) => {
        switch (account.password.strength) {
            case "bad":
                return {...account,
                        duration:1209600000,
                        message:`
                         We are reaching out to you today regarding your account ${account.username} belongin to the . 
                         Our system has detected
                        that the password you are currently using is weak and susceptible to unauthorized access. 
                        As part of our commitment to ensuring the security and privacy of your account,we highly 
                        recommend that you update your password as soon as possible.
                        According to our strength decetor 
                        Length:${account.password.length} (recommended to be at least 8 characters)
                        Lowercase:${account.passsword.lowercase}
                        Uppercase:${account.passsword.uppercase}
                        Number:${account.passsword.number}
                        Special Character:${account.passsword.specialCharacter}
                        `};
            case "good":
                return { message: 'good password',account };
            case "great":
                return { message: 'great password',account};
            default:
                return { message: 'unknown account strength',account};
        }
    });

//     const  templateParams = {
// to_name:,
// to_email:,
// message:,
// message_duration,

// };

};

export default Email;
