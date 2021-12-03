import express from 'express'

const reviewsRouter = express.Router()

reviewsRouter.route('/')
.get(async (req, res, next) => {
    try {
        res.send('OK')    
    } catch (error) {
        next(error)
    }
})
.post(async (req, res, next) => {
    try {
        res.send('OK')
    } catch (error) {
        next(error)
    }
})

reviewsRouter.route('/:reviewId')
.put(async (req, res, next) => {
    try {
        res.send('OK')
    } catch (error) {
        next(error)
    }
})
.delete(async (req, res, next) => {
    try {
        res.send('OK')
    } catch (error) {
        next(error)
    }
})

export default reviewsRouter