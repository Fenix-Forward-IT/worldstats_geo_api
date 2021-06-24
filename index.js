const NodeGeocoder = require('node-geocoder')
const express = require('express')
const cors = require('cors')
require('dotenv/config')

const options = {
    provider: 'google',
    apiKey: process.env.GOOGLE_KEY || '',
    formatter: null
};

const geocoder = NodeGeocoder(options);

const app = express()
const port = process.env.PORT || 5000

app.use(cors())

app.get('/:city', async (req, res) => {
    const { city } = req.params
    try {
        const result = await geocoder.geocode(city);
        res.json(result)
    } catch (e) {
        res.json({ msg: e.message })
    }
})

app.listen(port, () => console.log(`> server on port ${port}`))