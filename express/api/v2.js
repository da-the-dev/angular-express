const express = require('express')
let CATS = require('../mocks/cats.mock')

const v2 = express.Router()

v2.route('/cats/:name')
    // Create
    .put((req, res) => {
        console.log('smth')
        if(req.body) {
            const newCat = { name: req.params.name, ...req.body }
            console.log(newCat)
            CATS.push(newCat)
            res.status(201).send(newCat)
        }
        else
            res.sendStatus(400)
    })

    // Read
    .get((req, res) => {
        const selectedCat = CATS.find(c => c.name == req.params.name)
        if(selectedCat)
            res.status(200).send(selectedCat)
        else
            res.sendStatus(404)
    })

    // Update
    .patch((req, res) => {
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
    .delete((req, res) => {
        const selectedCatIndex = CATS.findIndex(c => c.name == req.params.name)
        if(selectedCatIndex != -1) {
            CATS.splice(selectedCatIndex, 1)
            res.status(200).send({ name: req.body.name })
        }
        else
            res.sendStatus(404)
    })

v2.get('/cats', (req, res) => {
    res.status(200).send(CATS)
})

module.exports = v2