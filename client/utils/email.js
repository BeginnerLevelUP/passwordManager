import emailjs from '@emailjs/browser';
emailjs.init(import.meta.env.VITE_YOUR_PUBLIC_KEY);
const Email = (accounts) => {
    const messages = accounts.map((account) => {
        switch (account.password.strength) {
            case "bad":
                return {
                    strength: account.password.strength,
                    to_name: account.username,
                    to_email: account.email,
                    message_duration: 1209600000,
                    message: `
                        We are reaching out to you today regarding your account ${account.username}.
                        Our system has detected that the password you are currently using is weak and susceptible to unauthorized access.
                        As part of our commitment to ensuring the security and privacy of your account, we highly recommend that you update your password as soon as possible.
                        According to our strength detector:
                        Length: ${account.password.length} (recommended to be at least 8 characters)
                        Lowercase: ${account.password.lowercase}
                        Uppercase: ${account.password.uppercase}
                        Number: ${account.password.number}
                        Special Character: ${account.password.specialCharacter}
                        To make a stronger password, it is recommended that you use all character types when creating a password.
                    `
                };
            case "good":
                return {
                    strength: account.password.strength,
                    to_name: account.username,
                    to_email: account.email,
                    message_duration: 2629744000,
                    message: `
                        We want to take a moment to commend you for maintaining a strong and secure password for your account.
                        Your dedication to account security is truly appreciated by us and contributes significantly to the overall safety of our platform.
                        While your current password meets our security standards, we would like to remind you of the importance of regularly updating your password as an additional measure to safeguard your account against potential threats.
                        Cybersecurity best practices recommend periodic password changes to mitigate the risk of unauthorized access.
                        According to our strength detector:
                        Length: ${account.password.length} (recommended to be at least 8 characters)
                        Lowercase: ${account.password.lowercase}
                        Uppercase: ${account.password.uppercase}
                        Number: ${account.password.number}
                        Special Character: ${account.password.specialCharacter}
                        To make a stronger password, it is recommended that you use all character types when creating a password.
                    `
                };
            default:
                return null; // Add default case to handle unexpected strength values
        }
    }).filter(message => message !== null); // Filter out null messages
    messages.forEach((message) => {
        setInterval(() => {
            emailjs.send(import.meta.env.VITE_YOUR_SERVICE_ID, import.meta.env.VITE_YOUR_TEMPLATE_ID, message).then(
                function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                },
                function (err) {
                    console.log('FAILED...', err);
                },
            );
        // }, message.message_duration); // bad - 2week good - 1month 
                }, 30000); //test 30min
    });
};

export default Email;
