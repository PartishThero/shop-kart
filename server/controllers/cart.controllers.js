import Customer from '../models/customer.models.js';
import Product from '../models/product.models.js';

export const addToCart = async (req, res) => {
    try {
        const customer = req.customer;
        const productId = req.params.productId;
        
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const cartItemIndex = customer.cart.findIndex(item => item.product.toString() === productId);

        if (cartItemIndex > -1) {
            if (customer.cart[cartItemIndex].quantity + 1 > product.stock) {
                return res.status(400).json({ message: "Quantity exceeds stock" });
            }
            customer.cart[cartItemIndex].quantity += 1;
        } else {
            if (1 > product.stock) return res.status(400).json({ message: "Out of stock" });
            customer.cart.push({ product: productId, quantity: 1 });
        }

        await customer.save();
        const updatedCustomer = await Customer.findById(customer._id).populate('cart.product'); 
        res.status(200).json({ success: true, message: "Cart updated", cart: updatedCustomer.cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCart = async (req, res) => {
    try {
        const customer = await Customer.findById(req.customer._id).populate('cart.product');
        res.status(200).json({ success: true, cart: customer.cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateQuantity = async (req, res) => {
    try {
        const customer = req.customer;
        const productId = req.params.productId;
        const { quantity } = req.body;

        if (quantity === undefined || quantity < 1) return res.status(400).json({ message: "Invalid quantity" });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        if (quantity > product.stock) return res.status(400).json({ message: "Quantity exceeds stock" });

        const cartItemIndex = customer.cart.findIndex(item => item.product.toString() === productId);
        if (cartItemIndex === -1) return res.status(404).json({ message: "Product not in cart" });

        customer.cart[cartItemIndex].quantity = quantity;
        await customer.save();
        const updatedCustomer = await Customer.findById(customer._id).populate('cart.product');

        res.status(200).json({ success: true, cart: updatedCustomer.cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const customer = req.customer;
        const productId = req.params.productId;

        customer.cart = customer.cart.filter(item => item.product.toString() !== productId);
        await customer.save();
        const updatedCustomer = await Customer.findById(customer._id).populate('cart.product');

        res.status(200).json({ success: true, cart: updatedCustomer.cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
