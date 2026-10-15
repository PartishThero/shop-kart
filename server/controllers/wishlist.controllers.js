import Customer from "../models/customer.models.js"
import Product from "../models/product.models.js"

export const addToWishlist = async (req, res) => {
    try {
        const customerId = req.customer._id
        const {productId} = req.params

        if(!productId){
            return res.status(404).json({message: "Product not found"})
        }

        const product = await Product.findById(productId)

        if(!product){
            return res.status(404).json({message: "Product not found"})
        }

        const customer = await Customer.findById(customerId)

        if(!customer){
            return res.status(404).json({message: "Customer not found"})
        }
 
        if(customer.wishlist.some(id => id.toString() === productId)){
            return res.status(400).json({message: "Product already in wishlist"})
        }

        customer.wishlist.push(productId)
        await customer.save()

        res.status(200).json({message: "Product added to wishlist successfully"})
    } catch (error) { 
        res.status(500).json({message: error.message})
    }
}

export const getWishlist = async (req, res) => {
    try {
        const customerId = req.customer._id
        const customer = await Customer.findById(customerId).populate("wishlist")
        res.status(200).json({success: true, count: customer.wishlist.length, wishlist: customer.wishlist})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const removeFromWishlist = async (req, res) => {
    try {
        const customerId = req.customer._id
        const {productId} = req.params

        if(!productId){
            return res.status(404).json({message: "Product not found"})
        }

        const product = await Product.findById(productId)

        if(!product){
            return res.status(404).json({message: "Product not found"})
        }

        const customer = await Customer.findById(customerId)

        if(!customer){
            return res.status(404).json({message: "Customer not found"})
        }

        if (!customer.wishlist.some(id => id.toString() === productId)){
            return res.status(400).json({message: "Product not found in wishlist"})
        }

        customer.wishlist = customer.wishlist.filter((id) => id.toString() !== productId)
        await customer.save()

        res.status(200).json({message: "Product removed from wishlist successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const toggleWishlist = async (req, res) => {
    try {
        const customerId = req.customer._id
        const {productId} = req.params

        if(!productId){
            return res.status(404).json({message: "Product not found"})
        }

        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }

        const customer = await Customer.findById(customerId)
        if(!customer){
            return res.status(404).json({message: "Customer not found"})
        }

        const isSaved = customer.wishlist.some(id => id.toString() === productId)

        if (isSaved) {
            customer.wishlist = customer.wishlist.filter((id) => id.toString() !== productId)
            await customer.save()
            return res.status(200).json({saved: false, message: "Removed from wishlist"})
        } else {
            customer.wishlist.push(productId)
            await customer.save()
            return res.status(200).json({saved: true, message: "Added to wishlist"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
} 