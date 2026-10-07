import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { axiosInstance } from '../axiosCalls/axios';
import Navbar from '../components/navbar';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function OrderSuccess() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axiosInstance.get(`/orders/${id}`);
                setOrder(response.data.order);
            } catch (err) {
                setError("Could not load order details.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-[#f7f5f0] text-neutral-950">
            <Navbar />
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-[#e76f51]" />
                <p className="mt-4 text-sm font-medium text-neutral-500">Retrieving order details...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-[#f7f5f0] text-neutral-950">
            <Navbar />
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-white/50 px-5 py-24 text-center mt-12">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500 shadow-sm">
                    <AlertCircle className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-semibold text-neutral-950">{error}</h2>
                <Link to="/orders" className="mt-6 rounded-xl bg-neutral-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e76f51] hover:text-neutral-950 hover:shadow-md">View All Orders</Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f7f5f0] text-neutral-950">
            <Navbar />
            
            <main className="mx-auto w-full max-w-2xl px-4 pb-16 pt-12 sm:px-6 lg:px-8 text-center">
                <div className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white px-6 py-12 shadow-[0_12px_40px_rgba(28,25,23,0.06)] sm:px-12">
                    <div className="absolute -right-20 -top-28 h-64 w-64 rounded-full bg-green-500/[0.07] blur-3xl" />
                    <div className="absolute -left-20 -bottom-28 h-64 w-64 rounded-full bg-emerald-500/[0.07] blur-3xl" />
                    
                    <div className="relative">
                        <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-green-100">
                            <CheckCircle className="w-12 h-12" />
                        </div>
                        
                        <h1 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl mb-4">Order Placed Successfully</h1>
                        <p className="text-neutral-500 mb-10 text-lg">Thank you for your purchase. Your order has been securely saved.</p>
                        
                        <div className="bg-[#fbfaf7] border border-neutral-200/80 p-8 rounded-2xl text-left mb-10">
                            <div className="flex justify-between items-center mb-6 pb-6 border-b border-neutral-200">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Order Number</p>
                                    <p className="font-mono font-medium text-lg text-neutral-900">{order._id}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Status</p>
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-end">
                                <p className="text-sm text-neutral-600">Total Amount Paid</p>
                                <p className="font-bold text-3xl text-neutral-950">${(order.totalAmount || 0).toFixed(2)}</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/orders" className="flex-1 rounded-xl border border-neutral-200 bg-white px-6 py-4 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-50 hover:border-neutral-300">View My Orders</Link>
                            <Link to="/products" className="flex-1 rounded-xl bg-neutral-950 px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e76f51] hover:text-neutral-950 hover:shadow-md">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
