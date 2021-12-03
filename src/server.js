import express from 'express'

const server = express()
const port = 3001

server.use(cors())
server.use(express.json())


server.listen(port, () => {
    console.log(`Server Running On Port ${port}`)
})