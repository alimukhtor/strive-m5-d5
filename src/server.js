import express from 'express'
import cors from 'cors'
import reviewsRouter from './reviews/reviews.js'
import errorHandler from './middleware/error-handlers.js'

const server = express()
const port = 3001

server.use(cors())
server.use(express.json())

server.use('/reviews', reviewsRouter)

server.use(errorHandler)

server.listen(port, () => {
    console.log(`Server Running On Port ${port}`)
})