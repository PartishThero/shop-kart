import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import { Headphones, Smartphone, Laptop, ShoppingBag, Heart, Package } from 'lucide-react';
export default function HomePage() {
    return (
        <div className="min-h-screen bg-[#f7f5f0] text-neutral-950">
            <Navbar />
            
            <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
                
                {/* Hero Section */}
                <header className="relative mb-12 overflow-hidden rounded-[2.5rem] border border-neutral-200/80 bg-white px-8 py-16 shadow-[0_12px_40px_rgba(28,25,23,0.06)] sm:px-16 sm:py-20 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#e76f51]/[0.08] blur-3xl" />
                    <div className="absolute -left-20 -bottom-28 h-80 w-80 rounded-full bg-orange-300/[0.05] blur-3xl" />
                    
                    <div className="relative z-10 max-w-xl">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e76f51]/20 bg-[#fff4ed] px-4 py-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#e76f51] animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8553d]">
                                New Arrivals
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-neutral-950 sm:text-6xl leading-[1.1] mb-6">
                            Upgrade your <br/><span className="text-[#e76f51]">everyday</span> life.
                        </h1>
                        <p className="text-lg text-neutral-500 mb-8 max-w-md">
                            Explore our latest collection of premium gadgets, accessories, and lifestyle essentials designed for the modern world.
                        </p>
                        <Link to="/products" className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-neutral-950/10 transition-all hover:bg-[#e76f51] hover:-translate-y-1 hover:shadow-xl hover:shadow-[#e76f51]/20">
                            Shop Now
                            <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </div>

                    {/* Abstract Graphic / Placeholder for Featured Product */}
                    <div className="relative w-full max-w-md aspect-square rounded-3xl bg-[#fafafa] border border-neutral-100 flex items-center justify-center overflow-hidden shadow-inner">
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-neutral-100/50" />
                        <div className="relative w-48 h-48 bg-white rounded-full shadow-2xl border border-neutral-100 flex items-center justify-center">
                            <Headphones className="w-16 h-16 text-neutral-800" />
                        </div>
                        {/* Decorative floating elements */}
                        <div className="absolute top-10 left-10 w-16 h-16 bg-white rounded-2xl shadow-xl rotate-12 flex items-center justify-center border border-neutral-100 text-neutral-700"><Smartphone className="w-8 h-8" /></div>
                        <div className="absolute bottom-12 right-12 w-20 h-20 bg-white rounded-full shadow-xl -rotate-12 flex items-center justify-center border border-neutral-100 text-neutral-700"><Laptop className="w-10 h-10" /></div>
                    </div>
                </header>

                {/* Quick Links / Categories */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    <Link to="/products" className="group relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-sm transition hover:shadow-md hover:border-neutral-300">
                        <div className="mb-4 h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Browse Catalog</h3>
                        <p className="text-sm text-neutral-500">Discover all our premium products in one place.</p>
                    </Link>
                    
                    <Link to="/wishlist" className="group relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-sm transition hover:shadow-md hover:border-neutral-300">
                        <div className="mb-4 h-12 w-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Heart className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Your Wishlist</h3>
                        <p className="text-sm text-neutral-500">View the items you've saved for later.</p>
                    </Link>

                    <Link to="/orders" className="group relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-sm transition hover:shadow-md hover:border-neutral-300">
                        <div className="mb-4 h-12 w-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Package className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Order History</h3>
                        <p className="text-sm text-neutral-500">Track your past purchases and deliveries.</p>
                    </Link>
                </div>

            </main>
        </div>
    );
}
