require('dotenv').config()

const express = require('express')
const cors = require('cors')
const passport = require('passport')
const InstagramStrategy = require('passport-instagram').Strategy
const session = require('express-session')
const { authenticate } = require('@google-cloud/local-auth')
const { google } = require('googleapis')
const axios = require('axios')

const app = express()
const port = 3000
const apiKey = process.env.API_KEY

const apiUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails%2C%20contentOwnerDetails%2C%20snippet%2C%20statistics%2C%20status%2C%20topicDetails&
`

const youtube = google.youtube({
  version: 'v3',
  auth: apiKey,
})

app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get('/get-data', async (req, res, next) => {
  try {
    const searchQuery = req.query.search_query
    const url = `${apiUrl}id=${searchQuery}&key=${apiKey}`

    const response = await axios.get(url)
    // const titles = response.data.items.map((item) => item.snippet.title)

    res.send(response.data)
  } catch (err) {
    next(err)
  }
})

app.get('/search-with-googleapis', async (req, res, next) => {
  try {
    const searchQuery = req.query.search_query
    const response = await youtube.search.list({
      part: 'statistics',
      channelId: searchQuery,
    })

    const titles = response.data.items.map((item) => item.snippet.title)
    res.send(titles)
  } catch (err) {
    next(err)
  }
})

async function getMostRecentVideos(searchQuery) {
  try {
    const response = await youtube.search.list({
      part: 'snippet',
      maxResults: 10, // Adjust as needed
      order: 'date',
      channelId: searchQuery,
    })

    const videos = response.data.items
    return videos
  } catch (error) {
    console.error('Error fetching most recent videos:', error)
    return []
  }
}

async function getMostPopularVideos(searchQuery) {
  try {
    const response = await youtube.search.list({
      part: 'snippet',
      maxResults: 10, // Adjust as needed
      order: 'viewCount',
      channelId: searchQuery,
    })

    const videos = response.data.items
    return videos
  } catch (error) {
    console.error('Error fetching most popular videos:', error)
    return []
  }
}

app.get('/recent-videos', async (req, res) => {
  const searchQuery = req.query.search_query
  const recentVideos = await getMostRecentVideos(searchQuery)
  res.json(recentVideos)
})

app.get('/popular-videos', async (req, res) => {
  const searchQuery = req.query.search_query
  const popularVideos = await getMostPopularVideos(searchQuery)
  res.json(popularVideos)
})

app.get('/', (req, res) => {
  res.json('ok')
})

app.listen(3000, () => {
  console.log('Server started')
})
