const express = require('express')
const v1 = require('./api/v1')
const v2 = require('./api/v2')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send('Hi! You are on a backend server!')
})

app.use('/api/v1', v1)
app.use('/api/v2', v2)

app.listen(8080, () => {
    console.log('Server started!')
})
