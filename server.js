const path = require('path')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const csrf = require('csurf')
const dotenv = require('dotenv')

const connectDB = require('./config/db')

dotenv.config()

const app = express()

// Connect to MongoDB
connectDB()

// JSON parsing and URL-encoded form parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Sessions stored in MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
  })
)

// CSRF protection
app.use(csrf())

// View engine setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Sample root route
app.get('/', (req, res) => {
  res.send('Express server running')
})

// 404 handler
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
