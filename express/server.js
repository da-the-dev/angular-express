const express = require('express')
const v1 = require('./api/v1')
const v2 = require('./api/v2')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.sendStatus(200)
})

app.use('/api/v1', v1)
app.use('/api/v2', v2)

app.listen(3000, () => {
    console.log('Server started! ')
})
