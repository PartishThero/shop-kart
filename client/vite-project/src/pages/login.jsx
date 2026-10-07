import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/navbar';
import { User, AlertCircle } from 'lucide-react';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loader, setLoader] = useState(false);
    const [err, setErr] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth(); // Assuming login is provided by AuthContext, otherwise fallback to standard login logic if needed

    const handleChange = ({ target }) => {
        setForm(prev => ({ ...prev, [target.name]: target.value }));
        if (err) setErr(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loader) return;

        setLoader(true);
        setErr(null);

        try {
            await login(form.email, form.password);
            navigate('/products');
        } catch (error) {
            setErr(error?.response?.data?.message || error.message);
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f5f0] text-neutral-950">
            <Navbar />
            
            <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 pb-16 pt-12 sm:px-6 lg:px-8">
                <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-neutral-200/80 bg-white px-8 py-10 shadow-[0_12px_40px_rgba(28,25,23,0.06)] sm:px-12 sm:py-14">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#e76f51]/[0.07] blur-3xl" />
                    <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#e76f51]/[0.05] blur-3xl" />
                    
                    <div className="relative text-center">
                        <div className="mb-6 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff4ed] border border-[#e76f51]/20 shadow-sm text-[#e76f51]">
                            <User className="w-7 h-7" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-neutral-950 mb-2">Welcome Back</h1>
                        <p className="text-sm text-neutral-500 mb-8">Please sign in to continue to your account.</p>
                        
                        {err && (
                            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 text-left">
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                <span>{err}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5 text-left">
                            <div>
                                <label className="block text-sm font-semibold text-neutral-900 mb-1.5 ml-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-xl border border-neutral-200 bg-[#fafafa] px-4 py-3.5 text-sm font-normal text-neutral-950 outline-none transition focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/[0.06] hover:border-neutral-300"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-neutral-900 mb-1.5 ml-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="w-full rounded-xl border border-neutral-200 bg-[#fafafa] px-4 py-3.5 text-sm font-normal text-neutral-950 outline-none transition focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/[0.06] hover:border-neutral-300"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loader}
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e76f51] hover:text-neutral-950 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loader ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-500 border-t-white" />
                                        Signing in...
                                    </>
                                ) : 'Sign In'}
                            </button>
                        </form>
                        
                        <div className="mt-8 text-sm text-neutral-500">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-semibold text-[#e76f51] hover:underline">
                                Create one now
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
