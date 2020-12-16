const express = require('express')
const fetch = require('node-fetch')

const WEATHER_URL = 'http://www.meteoromania.ro/wp-json/meteoapi/v2/starea-vremii'

const app = express()

app.use(express.static('public'))

app.get('/weather', async (req, res) => {
  try {
    const response = await fetch(WEATHER_URL)
    const responseBody = await response.json()
    if (req.query.city) {
      const weatherRecord = responseBody.features.find((e) => e.properties.nume.indexOf(req.query.city.toUpperCase()) !== -1)
      if (weatherRecord) {
        res.status(200).json(weatherRecord)
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(200).json(responseBody)
    }
  } catch (err) {
    console.warn(err)
    res.status(500).json({ message: 'server error' })
  }
})

app.listen(8080)