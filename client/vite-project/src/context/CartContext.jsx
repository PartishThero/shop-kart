import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../axiosCalls/axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/cart');
            setCart(response.data.cart || []);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching cart');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart([]);
            setLoading(false);
        }
    }, [user]);

    const addToCart = async (productId) => {
        try {
            const response = await axiosInstance.post(`/cart/${productId}`);
            setCart(response.data.cart);
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            const response = await axiosInstance.patch(`/cart/${productId}`, { quantity });
            setCart(response.data.cart);
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const response = await axiosInstance.delete(`/cart/${productId}`);
            setCart(response.data.cart);
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    const subtotal = cart.reduce((total, item) => total + (item.product?.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cart, loading, error, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, subtotal, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
