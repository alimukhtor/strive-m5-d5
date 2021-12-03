import express from 'express'
import { getReviews, writeReview } from '../lib/fs-tools.js'
import uniqid from 'uniqid'

const reviewsRouter = express.Router()

reviewsRouter.route('/')
.get(async (req, res, next) => {
    try {
        const reviews = await getReviews()
        res.send(reviews)    
    } catch (error) {
        next(error)
    }
})
.post(async (req, res, next) => {
    try {
        const reviews = await getReviews()
        const newReview = {
            id: uniqid(),
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        reviews.push(newReview)
        await writeReview(reviews)
        res.status(201).send(newReview)    
    } catch (error) {
        next(error)
    }
})

reviewsRouter.route('/:reviewId')
.put(async (req, res, next) => {
    try {
        const reviews = await getReviews()
        res.send(reviews)    
    } catch (error) {
        next(error)
    }
})
.delete(async (req, res, next) => {
    try {
        const reviews = await getReviews()
        res.send(reviews)    
    } catch (error) {
        next(error)
    }
})

export default reviewsRouter