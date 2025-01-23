import express from 'express'
import cors from 'cors'
import logger from './middleware/logger.js'
import errorHandler from './middleware/errorHandler.js'
import notFound from './middleware/notFound.js'
import suggestions from './routes/suggestions.js'
import weather from './routes/weather.js'

const app = express()

const PORT = process.env.PORT || 5000

// CORS
app.use(cors())

// Body parser middleware
app.use(express.json())

// Logger
app.use(logger)

// Routes
app.use('/api/suggestions', suggestions)
app.use('/api/weather', weather)

// Error Handler
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))