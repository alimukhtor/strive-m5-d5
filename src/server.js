import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import productsRouter from './products/products.js'


const server = express()
const port = 3001

server.use(cors())
server.use(express.json())


// ENDPOINTS HERE

server.use("/products", productsRouter)
console.table(listEndpoints(server))


// ENDPOINTS ENDS HERE


server.listen(port, () => {
    console.log(`Server Running On Port ${port}`)
})