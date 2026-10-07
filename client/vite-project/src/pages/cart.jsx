import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/navbar';
import { ShoppingCart } from 'lucide-react';

export default function Cart() {
    const { cart, loading, error, updateQuantity, removeFromCart, cartCount, subtotal } = useCart();

    if (loading) return (
        <div className="min-h-screen bg-[#f7f5f0] text-neutral-950">
            <Navbar />
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-[#e76f51]" />
                <p className="mt-4 text-sm font-medium text-neutral-500">Loading your cart...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-[#f7f5f0] text-neutral-950">
            <Navbar />
            <div className="mx-auto w-full max-w-7xl px-4 py-16 text-center">
                <div className="mb-8 inline-flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                    <span className="mt-0.5 font-bold">!</span>
                    <span>Unable to load your cart. {error}</span>
                </div>
                <br />
                <button onClick={() => window.location.reload()} className="rounded-xl bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e76f51] hover:text-neutral-950">Try Again</button>
            </div>
        </div>
    );

    if (cartCount === 0) return (
        <div className="min-h-screen bg-[#f7f5f0] text-neutral-950">
            <Navbar />
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-white/50 px-5 py-24 text-center mt-12">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-neutral-400 shadow-sm">
                    <ShoppingCart className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-semibold text-neutral-950">Your cart is empty</h2>
                <p className="mt-2 max-w-sm text-sm text-neutral-500 mb-6">Looks like you haven't added anything yet.</p>
                <Link to="/products" className="rounded-xl bg-neutral-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e76f51] hover:text-neutral-950 hover:shadow-md">Browse Products</Link>
            </div>
        </div>
    );

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
                                Checkout
                            </span>
                        </div>
                        <h1 className="text-3xl font-semibold tracking-[-0.045em] text-neutral-950 sm:text-4xl">
                            Your Shopping Cart
                        </h1>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div key={item.product._id} className="flex flex-col sm:flex-row gap-6 p-6 rounded-3xl border border-neutral-200/80 bg-white shadow-[0_12px_40px_rgba(28,25,23,0.04)] items-center sm:items-start">
                                <img src={item.product.image} alt={item.product.name} className="w-28 h-28 object-cover rounded-2xl bg-[#fafafa] border border-neutral-100 shadow-sm" />
                                <div className="flex-1 flex flex-col justify-between w-full">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-xl tracking-tight">{item.product.name}</h3>
                                            <p className="text-neutral-500 mt-1">${item.product.price}</p>
                                        </div>
                                        <div className="font-bold text-lg">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-6">
                                        <div className="flex items-center rounded-xl border border-neutral-200 bg-[#fafafa] overflow-hidden">
                                            <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} disabled={item.quantity <= 1} className="px-4 py-1.5 text-neutral-600 hover:bg-neutral-200 transition disabled:opacity-30">-</button>
                                            <span className="px-4 font-medium text-sm">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} disabled={item.quantity >= item.product.stock} className="px-4 py-1.5 text-neutral-600 hover:bg-neutral-200 transition disabled:opacity-30">+</button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.product._id)} className="text-[#e76f51] text-sm font-semibold hover:underline">Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 rounded-3xl border border-neutral-200/80 bg-white shadow-[0_12px_40px_rgba(28,25,23,0.06)] h-fit sticky top-6">
                        <h2 className="text-xl font-semibold mb-6 tracking-tight">Order Summary</h2>
                        <div className="flex justify-between mb-4 text-sm text-neutral-600">
                            <span>Items ({cartCount}):</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-4 text-sm text-neutral-600">
                            <span>Shipping:</span>
                            <span className="text-[#e76f51] font-medium">Free</span>
                        </div>
                        <div className="flex justify-between font-bold text-2xl border-t border-neutral-100 pt-6 mt-2">
                            <span>Total</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <Link to="/checkout" className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e76f51] hover:text-neutral-950 hover:shadow-md">
                            Proceed to Checkout
                            <span className="text-lg transition-transform group-hover:translate-x-0.5">→</span>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
