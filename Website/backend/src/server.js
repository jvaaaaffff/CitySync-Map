import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' })
})

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal Server Error' })
})

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
