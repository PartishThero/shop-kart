import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../axiosCalls/axios';
import Navbar from '../components/navbar';
import { Package } from 'lucide-react';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get('/orders');
                setOrders(response.data.orders);
            } catch (err) {
                setError("Failed to load your orders.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-[#f7f5f0] text-neutral-950">
            <Navbar />
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-[#e76f51]" />
                <p className="mt-4 text-sm font-medium text-neutral-500">Retrieving your order history...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-[#f7f5f0] text-neutral-950">
            <Navbar />
            <div className="mx-auto w-full max-w-7xl px-4 py-16 text-center">
                <div className="mb-8 inline-flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                    <span className="mt-0.5 font-bold">!</span>
                    <span>{error}</span>
                </div>
            </div>
        </div>
    );

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-[#f7f5f0] text-neutral-950">
                <Navbar />
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-white/50 px-5 py-24 text-center mt-12">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-neutral-400 shadow-sm">
                        <Package className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-semibold text-neutral-950">No orders found</h2>
                    <p className="mt-2 max-w-sm text-sm text-neutral-500 mb-6">You haven't placed any orders yet. Once you do, they will appear here.</p>
                    <Link to="/products" className="rounded-xl bg-neutral-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e76f51] hover:text-neutral-950 hover:shadow-md">Start Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f7f5f0] text-neutral-950">
            <Navbar />
            <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
                
                <header className="relative mb-8 overflow-hidden rounded-3xl border border-neutral-200/80 bg-white px-6 py-8 shadow-[0_12px_40px_rgba(28,25,23,0.06)] sm:px-10 sm:py-10">
                    <div className="absolute -right-20 -top-28 h-64 w-64 rounded-full bg-[#e76f51]/[0.07] blur-3xl" />
                    <div className="relative">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e76f51]/20 bg-[#fff4ed] px-3 py-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#e76f51]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#c8553d]">
                                History
                            </span>
                        </div>
                        <h1 className="text-3xl font-semibold tracking-[-0.045em] text-neutral-950 sm:text-4xl">
                            My Orders
                        </h1>
                    </div>
                </header>

                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order._id} className="overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-[0_12px_40px_rgba(28,25,23,0.04)]">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#fbfaf7] p-6 border-b border-neutral-100">
                                <div className="mb-4 sm:mb-0">
                                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Order Placed</p>
                                    <p className="font-semibold text-neutral-900">{new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                    <p className="text-xs text-neutral-500 font-mono mt-1">#{order._id}</p>
                                </div>
                                <div className="flex flex-col sm:items-end">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase ${
                                        order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                                        order.status === 'PLACED' ? 'bg-blue-100 text-blue-700' :
                                        'bg-orange-100 text-orange-700'
                                    }`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${
                                            order.status === 'DELIVERED' ? 'bg-green-600' :
                                            order.status === 'PLACED' ? 'bg-blue-600' :
                                            'bg-orange-600'
                                        }`} />
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="space-y-4 mb-6">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-lg bg-[#fafafa] border border-neutral-100 overflow-hidden flex-shrink-0">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-neutral-300">No Img</div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-neutral-900">{item.name}</p>
                                                <p className="text-sm text-neutral-500">Qty: {item.quantity} × ${(item.price || 0).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="flex justify-between items-center pt-6 border-t border-neutral-100">
                                    <div>
                                        <p className="text-sm text-neutral-500 mb-0.5">Total Amount</p>
                                        <p className="font-bold text-2xl text-neutral-950">${(order.totalAmount || 0).toFixed(2)}</p>
                                    </div>
                                    <Link to={`/order-success/${order._id}`} className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50 hover:border-neutral-300">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
