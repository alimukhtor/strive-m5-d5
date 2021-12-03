import express from 'express'
import uniqid from 'uniqid'

import { getProducts, writeProducts} from "../lib/fs-tools.js"


const productsRouter = express.Router()
// HERE POSTING NEW PRODUCT
productsRouter.post("/", async(request, response, next)=> {
    try {
        console.log("Body", request.body);
        const newProduct = { ...request.body, createdAt: new Date(), id: uniqid() }
        const products = await getProducts()
        products.push(newProduct)
     
        await writeProducts(products)
        response.status(201).send({id: newProduct.id})
        
    } catch (error) {
        next(error)
    }
})

// END OF POSTING NEW PRODUCT 

// STARTING OF GETTING PRODUCT
productsRouter.get("/", async(request, response, next)=> {
    try {
        console.log("Getting objects:", request.body);
       
        const products = await getProducts()
        response.send(products)
    } catch (error) {
        next(error);
    }
})

// END OF GETTING PRODUCT

// STARTING OF GETTING PRODUCT BY ID

productsRouter.get("/:productId", async(request, response, next)=> {
    try {
        const products = await getProducts()
        console.log("Product id:", request.params.productId);

        const getById = products.find(product => product.id === request.params.productId)
        response.send(getById)
    } catch (error) {
        next(error)
    }
})

// END OF GETTING PRODUCT BY ID

// STARTING OF UPDATING THE PRODUCT

productsRouter.put("/:productId", async(request, response, next)=> {
    try {
        const products = await getProducts()
        console.log("Updation is:", request.body);
        const updatingProduct = products.findIndex(product => product.id === request.params.productId)
        const modifyProduct = products[updatingProduct]
        const updatedFields = request.body
        const updatedProduct = {...modifyProduct, ...updatedFields, updatedAt: new Date()}
        products[updatingProduct] = updatedProduct
        await writeProducts(products)
        response.send(updatedProduct) 
    } catch (error) {
        next(error)
    }
})

// END OF UPDATING THE PRODUCTS

// STARTING OF DELETING THE PRODUCT

productsRouter.delete("/:productId", async(request, response, next)=> {
    try {
        const products = await getProducts() 
        const deleteById = products.filter(product => product.id !== request.params.productId)
        await writeProducts(deleteById)
        response.status(204).send()
    } catch (error) {
        next(error)
    }
})

export default productsRouter