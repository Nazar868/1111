import express from 'express'
import { errors } from 'celebrate'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

import announcementsRouter from './src/routes/announcements.routes.js'

const app = express()

// middleware
app.use(express.json())

// routes
app.use('/announcements', announcementsRouter)


// ---------------------
// Swagger setup
// ---------------------
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Announcements API',
      version: '1.0.0',
      description: 'REST API for announcements board',
    },
  },
  apis: ['./src/routes/*.js'],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


// ---------------------
// Celebrate error handler (400)
// ---------------------
app.use(errors())


// ---------------------
// Prisma + global error handler
// ---------------------
app.use((err, req, res, next) => {
  // Prisma "record not found"
  if (err.code === 'P2025') {
    return res.status(404).json({
      message: 'Announcement not found',
    })
  }

  return res.status(500).json({
    message: 'Internal server error',
  })
})

export default app
