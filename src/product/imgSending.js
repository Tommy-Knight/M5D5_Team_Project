import express from "express"
import createError from "http-error"
import { getProduct, writeProduct, writeProductImage } from "../library/fs-tool"
import multer from "multer"

const productRoute = express.Router()

productRoute.post("/:id/upload", multer().single("productImg"), async (req, res, next) => {
    try {
        const products = await getProduct()
        const product = products.find(product => product._id === req.params.id)
        if (product) {
            await writeProductImage(`${product._id}.jpg`, req.file.buffer)
            const updatedProduct = { ...product, imgUrl: `http://localhost:3001/img/product/${product._id}.jpg` }
            const remainingProducts = products.filter(product => product._id !== req.params.id)
            updatedProduct.push(remainingProducts)
            writeProduct(remainingProducts)
            res.send(product)
        } else {
            next(createError(404, `Product with id: ${req.params.id} not found!`))
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})

export default productRoute