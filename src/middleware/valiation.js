import { body } from 'express-validator'

export const reviewsBodyValidator = [
    body('comment').exists().isLength({ min: 1 }).withMessage('You Must Have A Comment'),
    body('rate').exists().isLength({ min: 1 }).withMessage('You Must Have A rating'),
    body('product_id').exists().isLength({ min: 1 }).withMessage('You Must Have A productId')
]