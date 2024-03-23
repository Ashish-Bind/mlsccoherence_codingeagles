require('dotenv').config()

const express = require('express')
const cors = require('cors')
const passport = require('passport')
const InstagramStrategy = require('passport-instagram').Strategy
const session = require('express-session')
const { authenticate } = require('@google-cloud/local-auth')
const { google } = require('googleapis')

const app = express()

app.use(cors())
app.use(
  session({ secret: 'your-secret-key', resave: true, saveUninitialized: true })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: true }))

app.get('/get-data', (req, res) => {
  const video = google.youtube('v3')
  const details = video.channels.list({})
  res.json(details)
})

app.get('/', (req, res) => {
  res.json('ok')
})

app.listen(3000, () => {
  console.log('Server started')
})
