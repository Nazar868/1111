import express from 'express'
import { errors } from 'celebrate'
import announcementsRouter from './src/routes/announcements.routes.js'

const app = express()

app.use(express.json())

app.use('/announcements', announcementsRouter)

// celebrate errors
app.use(errors())

// Prisma P2025 -> 404 handler (в boilerplate вже є, але логіка така)
app.use((err, req, res, next) => {
  if (err.code === 'P2025') {
    return res.status(404).json({ message: 'Not found' })
  }
  return res.status(500).json({ message: 'Server error' })
})

export default app
