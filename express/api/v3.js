const express = require('express')
const v2 = require('./v2')
const { users } = require('../db/connect')

const v3 = express.Router()
v3.use('/', v2)

v3.post('/register', async (req, res) => {
    users(async users => {
        if(!(await users.findOne({ nickname: req.body.nickname }))) {
            await users.findOneAndUpdate({ nickname: req.body.nickname }, { $set: { ...req.body } }, { upsert: true })
            res.status(201).send({ nickname: req.body.nickname })
        } else {
            res.sendStatus(400)
        }
    })
})
v3.get('/login/:nickname', async (req, res) => {
    users(async users => {
        const user = await users.findOne({ nickname: req.params.nickname })
        if(user) {
            res.status(200).send({ ...user })
        } else {
            res.sendStatus(404)
        }
    })
})

module.exports = v3
