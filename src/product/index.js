import express from "express"
import uniqid from "uniqid"
import createError from "http-error"
import { validationResult } from "express-validator"
import { productsValidation } from "./validation.js"
import { getProduct, writeProduct, writeProduceImage, writeProductImage } from "../library/fs-tool.js"
import multer from "multer"

const productRoutes = express.Router()

productRoutes.post("/", productsValidation, async (req, res, next) => {
    try {
        const products = await getProduct()
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) {
            next(createError(400, { errorList: errors }))
        } else {
            const newProduct = { _id: uniqid(), ...req.body, createdAt: new Date() }
            products.push(newProduct)
            await writeProduct(products)
            req.status(201).send(newProduct)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})


// productRoutes.post("/:id/upload", multer().single("productImg"), async (req, res, next) => {
//     try {
//         const products = await getProduct()
//         const product = products.find(product => product._id === req.params.id)
//         if (product) {
//             await writeProductImage(`${product._id}.jpg`, req.file.buffer)
//             const updatedProduct = { ...product, imgUrl: `http://localhost:3001/img/product/${product._id}.jpg` }
//             const remainingProducts = products.filter(product => product._id !== req.params.id)
//             updatedProduct.push(remainingProducts)
//             writeProduct(remainingProducts)
//             res.send(product)
//         } else {
//             next(createError(404, `Product with id: ${req.params.id} not found!`))
//         }
//     } catch (error) {
//         console.log(error)
//         next(error)
//     }
// })

productRoutes.get("/", async (req, res, next) => {
    try {
        const products = await getProduct()
        res.send(products)
    } catch (error) {
        console.log(error);
        next(error)
    }
})

productRoutes.get("/:id", async (req, res, next) => {
    try {
        const products = await getProduct()
        const product = products.find(product => product._id === req.params.id)
        if (product) {
            res.send(product)
        } else {
            next(createError(404, `Product with id: ${req.params.blogId} not found!`))
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
})

productRoutes.put("/:id", async (req, res, next) => {
    try {
        const products = await getProduct()
        const product = products.find(product => product._id === req.params.id)
        if (product) {
            const remainingProducts = products.filter(product => product._id !== req.params.id)
            const editedProduct = { _id: req.params.id, ...req.body, updatedAt: new Date() }
            remainingProducts.push(editedProduct)
            await writeProduct(remainingProducts)
            res.send(editedProduct)
        } else {
            next(createError(404, `Product with id: ${req.params.blogId} not found!`))
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
})
productRoutes.delete(":id", async (req, res, next) => {
    try {
        const products = await getProduct()
        const product = products.find(product => product._id === req.params.id)
        if (product) {
            const remainingProducts = products.filter(product => product._id !== req.params.id)
            await writeProduct(remainingProducts)
            res.status(204).send(`Ok the product with id:${req.params.id} is successfully deleted!`)
        } else {
            next(createError(404, `Product with id: ${req.params.blogId} not found!`))
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
})

export default productRoutes
