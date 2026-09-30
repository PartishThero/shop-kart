import mongoose from "mongoose";
import Product from "../models/product.models.js";

export const createProduct = async (req, res) => {
    try {
        const {name, description, price, category, image, stock} = req.body

        if (!name || !description || price === undefined || price === null || !category || !image || stock === undefined || stock === null){
            return res.status(400).json({message: "Missing required Fields"})
        }

        if (typeof price !== "number" || !Number.isFinite(price) || price <= 0 ||
            typeof stock !== "number" || !Number.isFinite(stock) || stock < 0){
            return res.status(400).json({message: "Price or Stock is invalid"})
        }

        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            image,
            stock
        })

        res.status(201).json({ success: true, product: newProduct })


    } catch (error) {
        res.status(500).json({ message: "Server Crashed", error: error.message })
    }
}



export const getProducts = async ( req, res ) => {
    try {
        const { search, category } = req.query
        const filter = {}

        if (search) {
            filter.name = { $regex: search, $options: "i" }
        }

        if (category) {
            filter.category = { $regex: `^${category}$`, $options: "i" }
        }

        const products = await Product.find(filter)
            .select("_id name price category image stock")
            .sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            count: products.length,
            products
        })
    } catch (error) {
        res.status(500).json({message: "Server Crashed", error:error.message})
    }
}



export const getProductById = async (req, res)=> {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid product ID"})
        }

        const product = await Product.findById(req.params.id)

        if (!product){
            return res.status(404).json({message: "No product found with the given id"})
        }

        res.status(200).json({product})
    } catch (error) {
        res.status(500).json({message: "Server Crashed", error:error.message})
    }
}