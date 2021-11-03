const { MongoClient } = require("mongodb");
require('dotenv').config()

const client = new MongoClient(process.env.MURL)

async function connect() {
    return (await client.connect()).db('catapi')
}

async function users() {
    return (await connect()).collection('users')
}

module.exports = { connect, users }