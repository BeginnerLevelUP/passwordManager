const db = require('../config/connection');
const { User, Account } = require('../models/index');
const usersSeed = require('./userSeeds.json');
const accountsSeed=require('./accountSeeds.json')
const cleanDB = require('./cleanDb');

db.once('open', async () => {
    try {
        await cleanDB('Account', 'accounts');
        await cleanDB('User', 'users');

        const users = await User.create(usersSeed);
        const accounts=await Account.create(accountsSeed)

         if (users.length > 0 && accounts.length > 0) {
            // Push the first friend's ObjectId to the friends array of the first user
            // Extract all friend ObjectIds
            const accountsObjectIds = accounts.map(account => account._id);

            // Push all friend ObjectIds to the first user's friends array
            users[0].accounts.push(...accountsObjectIds);


            // Save the updated user
            await users[0].save();
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('Seeded');
    process.exit(0);
});