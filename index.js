const express = require('express')
const app = express()
const cors = require('cors')
const bosyParser = require('body-parser')
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)

app.use(cors())
app.use(bosyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

// Schemas
const exerciseSchema = new mongoose.Schema({
  username: String,
  description: String,
  duration: Number,
  date: String,
})
const userSchema = new mongoose.Schema({
  username: String
})
const logSchema = new mongoose.Schema({
  username: String,
  count: Number,
  log: {
    description: String,
    duration: Number,
    date: String,
  },
})
const Exercise = mongoose.model("Exercise", exerciseSchema)
const User = mongoose.model("User", userSchema)
const Log = mongoose.model("Log", logSchema)

// Handles post request by creating new user w/ username
app.post("/api/users", (req, res) => {
  const user = new User({ username: req.body.username })
  user.save().then(newUser => {
    res.send(newUser)
  })
})

// Handles get request by giving all known users
app.get("/api/users", (req, res) => {
  User.find({}).then(users => {
    res.send(users)
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
