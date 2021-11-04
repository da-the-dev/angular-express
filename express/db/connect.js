const { MongoClient, Db, Collection } = require("mongodb")
const { Document } = require('bson')
require('dotenv').config()

const client = new MongoClient(process.env.MURL)

/**
 * @param {(catapi: Db) => Promise<void>|void} func 
 */
async function connect(func) {
    const connection = await client.connect()
    await func(connection.db('catapi'))
    await connection.close()
}

/**
 * @param {(users: Collection<Document>) => Promise<void>|void} func 
 */
async function users(func) {
    connect(db => func(db.collection('users')))
}

module.exports = { connect, users }