const express = require('express')
const bodyParser = require('body-parser')
const momo = require('mtn-momo')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

// primarykey: 02ff6612bf3c410e99df698658986c1d
// Momo Sandbox Credentials {
//     "userSecret": "50c05f2ef3014b69b6a986c5cd3c3fbd",
//     "userId": "024284fa-77e3-4694-bc08-91c0313f4ab9"
//   }

const { Collections, Disbursements } = momo.create({
    callbackHost: process.env.CALLBACK_HOST
});

const collections = Collections({
    userSecret: process.env.USER_SECRET,
    userId: process.env.USER_ID,
    primaryKey: process.env.PRIMARY_KEY
});