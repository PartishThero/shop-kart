import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { axiosInstance } from '../axiosCalls/axios';
import Navbar from '../components/navbar';
import { AlertCircle } from 'lucide-react';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Checkout() {
    const { cart, cartCount, subtotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState({
        fullName: '',
        phone: '',
        addressLine1: '',
        city: '',
        state: '',
        pincode: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const { fullName, phone, addressLine1, city, state, pincode } = shippingAddress;
        if (!fullName.trim() || !phone.trim() || !addressLine1.trim() || !city.trim() || !state.trim() || !pincode.trim()) {
            return "All fields are required.";
        }
        if (!/^\d{10}$/.test(phone)) {
            return "Phone must be a valid 10-digit number.";
        }
        if (!/^\d{6}$/.test(pincode)) {
            return "Pincode must be exactly 6 digits.";
        }
        return null;
    };

    const handlePlaceOrder = async () => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        setLoading(true);

        const isScriptLoaded = await loadRazorpayScript();
        if (!isScriptLoaded) {
            setError("Failed to load Razorpay. Please check your connection.");
            setLoading(false);
            return;
        }

        try {
            const { data } = await axiosInstance.post('/orders/create-payment-order', {
                shippingAddress
            });

            if (!data.success) {
                setError("Could not create order.");
                setLoading(false);
                return;
            }

            const options = {
                key: data.key,
                amount: data.amount,
                currency: data.currency,
                name: "ShopKart",
                description: "ShopKart Order",
                order_id: data.razorpayOrderId,

                handler: async function (response) {
                    try {
                        const verifyRes = await axiosInstance.post('/orders/verify-payment', {
                            shopKartOrderId: data.shopKartOrderId,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        if (verifyRes.data.success) {
                            clearCart();
                            navigate(`/order-success/${data.shopKartOrderId}`);
                        } else {
                            setError("Payment verification failed.");
                        }
                    } catch (err) {
                        setError(err.response?.data?.message || "Payment verification error");
                    }
                },
                prefill: {
                    name: shippingAddress.fullName,
                    contact: shippingAddress.phone
                },
                theme: {
                    color: "#0a0a0a"
                }
            };

            const paymentObject = new window.Razorpay(options);

            paymentObject.on("payment.failed", function (response) {
                setError(`Payment failed: ${response.error.description}`);
            });

            paymentObject.open();
        } catch (err) {
            console.error("Backend error response:", err.response?.data);
            const errMsg = err.response?.data?.error ? `Server Error: ${err.response.data.error}` : err.response?.data?.message;
            setError(errMsg || "Something went wrong creating the order.");
        } finally {
            setLoading(false);
        }
    };

    if (cartCount === 0) {
        return (
            <div className="min-h-screen bg-[#f7f5f0] text-neutral-950">
                <Navbar />
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-white/50 px-5 py-24 text-center mt-12">
                    <h2 className="text-2xl font-semibold text-neutral-950">Your cart is empty</h2>
                    <p className="mt-2 max-w-sm text-sm text-neutral-500 mb-6">Looks like you haven't added anything yet.</p>
                    <button onClick={() => navigate('/products')} className="rounded-xl bg-neutral-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e76f51] hover:text-neutral-950 hover:shadow-md">Browse Products</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f7f5f0] text-neutral-950">
            <Navbar />
            <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
                
                <header className="relative mb-8 overflow-hidden rounded-3xl border border-neutral-200/80 bg-white px-6 py-8 shadow-[0_12px_40px_rgba(28,25,23,0.06)] sm:px-10 sm:py-10">
                    <div className="absolute -right-20 -top-28 h-64 w-64 rounded-full bg-[#e76f51]/[0.07] blur-3xl" />
                    <div className="relative">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e76f51]/20 bg-[#fff4ed] px-3 py-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#e76f51]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#c8553d]">
                                Secure Checkout
                            </span>
                        </div>
                        <h1 className="text-3xl font-semibold tracking-[-0.045em] text-neutral-950 sm:text-4xl">
                            Complete your order
                        </h1>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Shipping Form */}
                    <div className="space-y-6">
                        <div className="p-8 rounded-3xl border border-neutral-200/80 bg-white shadow-[0_12px_40px_rgba(28,25,23,0.04)]">
                            <h2 className="text-2xl font-semibold mb-6 tracking-tight">Shipping Details</h2>
                            {error && (
                                <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </div>
                            )}
                            <div className="grid grid-cols-1 gap-5">
                                <input type="text" name="fullName" placeholder="Full Name" value={shippingAddress.fullName} onChange={handleInputChange} className="rounded-xl border border-neutral-200 bg-[#fafafa] px-4 py-3.5 text-sm font-normal text-neutral-950 outline-none transition focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/[0.06] hover:border-neutral-300" />
                                <input type="text" name="phone" placeholder="Phone Number" value={shippingAddress.phone} onChange={handleInputChange} className="rounded-xl border border-neutral-200 bg-[#fafafa] px-4 py-3.5 text-sm font-normal text-neutral-950 outline-none transition focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/[0.06] hover:border-neutral-300" />
                                <input type="text" name="addressLine1" placeholder="Address Line 1" value={shippingAddress.addressLine1} onChange={handleInputChange} className="rounded-xl border border-neutral-200 bg-[#fafafa] px-4 py-3.5 text-sm font-normal text-neutral-950 outline-none transition focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/[0.06] hover:border-neutral-300" />
                                <div className="grid grid-cols-2 gap-5">
                                    <input type="text" name="city" placeholder="City" value={shippingAddress.city} onChange={handleInputChange} className="rounded-xl border border-neutral-200 bg-[#fafafa] px-4 py-3.5 text-sm font-normal text-neutral-950 outline-none transition focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/[0.06] hover:border-neutral-300" />
                                    <input type="text" name="state" placeholder="State" value={shippingAddress.state} onChange={handleInputChange} className="rounded-xl border border-neutral-200 bg-[#fafafa] px-4 py-3.5 text-sm font-normal text-neutral-950 outline-none transition focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/[0.06] hover:border-neutral-300" />
                                </div>
                                <input type="text" name="pincode" placeholder="Pincode" value={shippingAddress.pincode} onChange={handleInputChange} className="rounded-xl border border-neutral-200 bg-[#fafafa] px-4 py-3.5 text-sm font-normal text-neutral-950 outline-none transition focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/[0.06] hover:border-neutral-300" />
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="p-8 rounded-3xl border border-neutral-200/80 bg-white shadow-[0_12px_40px_rgba(28,25,23,0.06)] sticky top-6">
                            <h2 className="text-2xl font-semibold mb-6 tracking-tight">Order Summary</h2>
                            <div className="space-y-4 mb-8">
                                {cart.map(item => (
                                    <div key={item.product._id} className="flex justify-between items-center text-neutral-700 pb-4 border-b border-neutral-100 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-[#fafafa] border border-neutral-100 overflow-hidden flex-shrink-0">
                                                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="flex-1 text-sm font-medium pr-4">{item.product.name} <span className="text-neutral-400">× {item.quantity}</span></span>
                                        </div>
                                        <span className="font-semibold text-neutral-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="space-y-3 mb-6 pt-4 border-t border-neutral-100">
                                <div className="flex justify-between text-sm text-neutral-600">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-neutral-600">
                                    <span>Shipping</span>
                                    <span className="text-[#e76f51] font-medium">Free</span>
                                </div>
                            </div>

                            <div className="border-t border-neutral-100 pt-6 flex justify-between font-bold text-2xl mb-8">
                                <span>Total</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={handlePlaceOrder}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e76f51] hover:text-neutral-950 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-500 border-t-white" />
                                        Processing...
                                    </>
                                ) : 'Place Order securely'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
