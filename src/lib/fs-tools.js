import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const {readJSON, writeJSON } = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), '../data')
const reviewsJSONPath = join(dataFolderPath, '/reviews.json')

export const getReviews = () => readJSON(reviewsJSONPath)
export const writeReview = content => writeJSON(reviewsJSONPath, content)