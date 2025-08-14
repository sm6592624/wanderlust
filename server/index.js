require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

// Route imports
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user')
const serviceRoutes = require('./routes/service')
const passwordResetRoutes = require('./routes/passwordReset')

const app = express()

// Middleware setup
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(cors())

// API routes
app.use('/admin', adminRoutes)
app.use('/admin/service', serviceRoutes)
app.use('/user', userRoutes)
app.use('/password-reset', passwordResetRoutes)

// Welcome route
app.get('/', (req, res) => {
    res.send('<h1>WanderLust backend is up and running!</h1>')
})

const PORT = process.env.PORT || 5000

// Database connection and server startup
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })
        console.log('✅ MongoDB Connected successfully!')
        
        app.listen(PORT, () => {
            console.log(`🚀 Server started at port ${PORT}`)
        })
    } catch (error) {
        console.error('❌ Database connection failed:', error.message)
        process.exit(1)
    }
}

startServer()
