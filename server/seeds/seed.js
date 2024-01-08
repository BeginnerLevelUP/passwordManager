const db = require('../config/connection');
const { User, Account,Password } = require('../models/index');
const usersSeed = require('./userSeeds.json');
const accountsSeed=require('./accountSeeds.json')
const passwordsSeed=require('./passwordSeeds.json')
const cleanDB = require('./cleanDb');

db.once('open', async () => {
    try {
        await cleanDB('Account', 'accounts');
        await cleanDB('User', 'users');
        await cleanDB('Password','passwords')

        // const users = await User.create(usersSeed);
        // const accounts=await Account.create(accountsSeed)


    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('Seeded');
    process.exit(0);
});