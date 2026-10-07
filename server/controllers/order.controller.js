import crypto from "crypto";
import { Order } from "../models/order.model.js";
import Customer from "../models/customer.models.js";
import Product from "../models/product.models.js";
import razorpay from "../config/razorpay.js";

// Create Payment Order
export const createPaymentOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const userId = req.customer._id; // from auth middleware

    const customer = await Customer.findById(userId);
    if (!customer) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!customer.cart || customer.cart.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Load latest product data and verify stock
    let totalAmount = 0;
    const orderItems = [];

    for (const cartItem of customer.cart) {
      const product = await Product.findById(cartItem.product);
      
      if (!product) {
        return res.status(400).json({ success: false, message: `Product not found` });
      }

      if (product.stock < cartItem.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });
      }

      totalAmount += product.price * cartItem.quantity;
      
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: cartItem.quantity,
        image: product.image
      });
    }

    // Create pending ShopKart order
    const shopKartOrder = new Order({
      user: userId,
      items: orderItems,
      shippingAddress,
      totalAmount,
      status: "PENDING_PAYMENT",
      paymentStatus: "PENDING"
    });

    await shopKartOrder.save();

    // Create Razorpay order (amount in paise)
    const amountInPaise = Math.round(totalAmount * 100);
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: shopKartOrder._id.toString()
    });

    // Save Razorpay order ID
    shopKartOrder.razorpayOrderId = razorpayOrder.id;
    await shopKartOrder.save();

    res.status(200).json({
      success: true,
      shopKartOrderId: shopKartOrder._id,
      razorpayOrderId: razorpayOrder.id,
      amount: amountInPaise,
      currency: "INR",
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error("Error creating payment order:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.description || error.message });
  }
};

// Verify Payment
export const verifyPayment = async (req, res) => {
  try {
    const { shopKartOrderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = req.customer._id;

    const order = await Order.findById(shopKartOrderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Generate expected signature
    const body = order.razorpayOrderId + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    // Confirm the Order
    order.paymentStatus = "PAID";
    order.status = "PLACED";
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();

    // Clear cart
    const customer = await Customer.findById(userId);
    if (customer) {
      customer.cart = [];
      await customer.save();
    }

    // (Optional) Decrease stock of products
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      order
    });

  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get My Orders
export const getOrders = async (req, res) => {
  try {
    const userId = req.customer._id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get Single Order
export const getOrderById = async (req, res) => {
  try {
    const userId = req.customer._id;
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
