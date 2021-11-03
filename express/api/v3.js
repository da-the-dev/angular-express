const express = require('express')
const v2 = require('./v2')
const { users } = require('../db/connect')

const v3 = express.Router()
v3.use('/', v2)
v3.post('/register', async (req, res) => {
    console.log(req.body);
    (await users()).insertOne(req.body)
    res.status(201).send({ nickname: req.body.nickname })
})

module.exports = v3