const express = require('express')
const cors = require('cors')
const passport = require('passport')
const InstagramStrategy = require('passport-instagram').Strategy
const session = require('express-session')

const app = express()

app.use(cors())
app.use(
  session({ secret: 'your-secret-key', resave: true, saveUninitialized: true })
)
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})

passport.use(
  new InstagramStrategy(
    {
      clientID: '1132455621276257',
      clientSecret: '31650d73e9db2f218e9f041145be8eff',
      callbackURL: 'http://localhost:3000/auth/instagram/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile)
    }
  )
)

app.get('/auth/instagram', passport.authenticate('instagram'))

app.get(
  '/auth/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/')
  }
)

app.get('/', (req, res) => {
  res.send('Welcome to the SocialSight Dashboard!')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`))
