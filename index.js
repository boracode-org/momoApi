const express = require('express')
const bodyParser = require('body-parser')
const momo = require('mtn-momo')
require('dotenv').config()
const http = require('http')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

// Setup Sandbox User
const { Collections, Disbursements } = momo.create({
    callbackHost: process.env.HOST
});

const collections = Collections({
    userSecret: process.env.USER_SECRET,
    userId: process.env.USER_ID,
    primaryKey: process.env.PRIMARY_KEY
});


// Make request to pay
collections
    .requestToPay({
        amount: '50',
        currency: 'EUR',
        externalId: '123456',
        payer: {
            partyIdType: "MSISDN",
            partyId: "256774290781"
        },
        payerMessage: 'Am running a test',
        payeeNote: 'Hello, are you working'
    })
    .then(transactionId => {
        console.log({transactionId})
        // Get status of transaction
        return collections.getTransaction(transactionId)
    })
    .then(transaction => {
        console.log({transaction})

        // Get account balance
        return collections.getBalance()
    })
    .then(accountBalance => {
        console.log(accountBalance)
    })
    .catch(error => {
        console.log(error)
    })

let port = process.env.USER_ID
console.log(port)
