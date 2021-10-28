const express = require('express')
let CATS = require('../mocks/cats.mock')

const v1 = express.Router()

// Create
v1.put(`/cats/:name`, (req, res) => {
    if(req.body) {
        CATS.push({ name: req.params.name, ...req.body })
        res.sendStatus(201)
    }
    else
        res.sendStatus(400)
})

// Read
v1.get(`/cats/:name`, (req, res) => {
    const selectedCat = CATS.find(c => c.name == req.params.name)
    if(selectedCat)
        res.status(200).send(selectedCat)
    else
        res.sendStatus(404)
})
v1.get(`/cats`, (req, res) => {
    res.status(200).send(CATS)
})

// Update
v1.patch(`/cats/:name`, (req, res) => {
    if(!req.body) {
        res.sendStatus(400)
        return
    }

    const selectedCatIndex = CATS.findIndex(c => c.name == req.params.name)
    if(selectedCatIndex != -1) {
        CATS[selectedCatIndex] = { name: req.params.name, ...req.body }
        res.sendStatus(200)
    }
    else
        res.sendStatus(404)
})

// Delete
v1.delete(`/cats/:name`, (req, res) => {
    const selectedCatIndex = CATS.findIndex(c => c.name == req.params.name)
    if(selectedCatIndex != -1) {
        CATS.splice(selectedCatIndex, 1)
        res.sendStatus(200)
    }
    else
        res.sendStatus(404)
})

module.exports = v1