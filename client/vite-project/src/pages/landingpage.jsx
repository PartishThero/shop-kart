import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';

function LandingPage() {
    return (
        <div className="min-h-screen bg-[#f7f5f0] text-neutral-950 overflow-hidden">
            {/* The landing page intentionally does not have the navbar to feel more immersive, but we can add a simplified header or just keep the default one. For consistency we will include Navbar. */}
            <Navbar />
            
            <main className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 pt-20 pb-24 sm:px-6 lg:px-8 text-center min-h-[calc(100vh-80px)]">
                
                {/* Decorative background elements */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-[#e76f51]/[0.08] blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-orange-300/[0.05] blur-[80px] pointer-events-none" />
                
                <div className="relative z-10 max-w-3xl mx-auto">
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/50 px-4 py-2 backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-[#e76f51] animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">
                            Welcome to ShopKart
                        </span>
                    </div>
                    
                    <h1 className="text-5xl font-bold tracking-tight text-neutral-950 sm:text-7xl mb-6 leading-[1.1]">
                        Discover products that <span className="text-[#e76f51]">elevate</span> your life.
                    </h1>
                    
                    <p className="text-lg text-neutral-500 mb-10 max-w-xl mx-auto leading-relaxed">
                        ShopKart brings you a curated collection of premium electronics and lifestyle products. Quality, design, and performance—delivered directly to you.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/signup" className="w-full sm:w-auto px-8 py-4 rounded-full bg-neutral-950 text-white font-semibold shadow-xl shadow-neutral-950/10 transition-all hover:bg-[#e76f51] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#e76f51]/20">
                            Get Started
                        </Link>
                        <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-neutral-950 font-semibold border border-neutral-200 transition-all hover:border-neutral-300 hover:bg-neutral-50">
                            Sign In to Account
                        </Link>
                    </div>
                </div>

                {/* Optional: Add a hero image or abstract graphic here */}
                <div className="relative mt-20 w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-neutral-200/50 shadow-2xl bg-white/50 p-2 backdrop-blur-sm">
                    <div className="aspect-[21/9] w-full rounded-2xl bg-[#fafafa] border border-neutral-100 flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-50 relative">
                            {/* Abstract decorative shapes inside the hero container */}
                            <div className="absolute top-10 left-10 w-32 h-32 bg-[#e76f51]/10 rounded-full blur-xl" />
                            <div className="absolute bottom-10 right-20 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="text-3xl font-bold text-neutral-200 tracking-widest uppercase">Premium Experience</h2>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}

export default LandingPage;