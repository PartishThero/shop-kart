import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosCalls/axios";
import Navbar from "../components/navbar";
import WishlistCard from "../components/WishlistCard";

export default function Wishlist() {
	const [wishlist, setWishlist] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchWishlist = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await axiosInstance.get("/wishlist");
			setWishlist(res.data.wishlist || []);
		} catch (err) {
			setError(err.response?.data?.message || "We couldn't load your wishlist. Check that the server is running and try again.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchWishlist();
	}, []); 

	const handleProductRemoved = (productId) => {
		setWishlist((prev) => prev.filter((p) => p._id !== productId));
	};

	return (
		<div className="min-h-screen bg-[#f7f5f0] text-neutral-950">
			<Navbar />
			<main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
				{/* Top navigation */}
				<div className="flex items-center justify-between">
					<div className="hidden items-center gap-2 sm:flex">
						<span className="h-1.5 w-1.5 rounded-full bg-[#e76f51]" />
						<span className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">
							Wishlist
						</span>
					</div>
				</div>

				{/* Main Header card */}
				<section className="mt-6 overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-[0_12px_40px_rgba(28,25,23,0.06)]">
					{/* Header */}
					<header className="relative overflow-hidden border-b border-neutral-200 bg-[#fbfaf7] px-6 py-8 sm:px-10 sm:py-10">
						<div className="absolute -right-20 -top-28 h-64 w-64 rounded-full bg-[#e76f51]/[0.07] blur-3xl" />

						<div className="relative">
							<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e76f51]/20 bg-[#fff4ed] px-3 py-1.5">
								<span className="h-1.5 w-1.5 rounded-full bg-[#e76f51]" />
								<span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#c8553d]">
									Saved Items
								</span>
							</div>

							<div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
								<div>
									<h1 className="text-3xl font-semibold tracking-[-0.045em] text-neutral-950 sm:text-4xl">
										Your Saved Products
									</h1>
									<p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
										Products you have saved to review later.
									</p>
								</div>
							</div>
						</div>
					</header>

					{/* Status bar */}
					<div className="flex flex-col gap-4 bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
						<div className="flex shrink-0 items-center gap-2 text-xs text-neutral-400">
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
							{isLoading ? "Loading..." : `${wishlist.length} ${wishlist.length === 1 ? "item" : "items"} saved`}
						</div>
					</div>
				</section>

				{/* Content Area */}
				<section className="mt-8">
					{error && (
						<div className="mb-8 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700" role="alert">
							<span className="mt-0.5 font-bold">!</span>
							<span>{error}</span>
						</div>
					)}

					{isLoading && (
						<div className="flex flex-col items-center justify-center py-24 text-center">
							<span className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-[#e76f51]" />
							<p className="mt-4 text-sm font-medium text-neutral-500">Loading your wishlist...</p>
						</div>
					)}

					{!isLoading && !error && wishlist.length === 0 && (
						<div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-white/50 px-5 py-24 text-center">
							<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-neutral-400 shadow-sm">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
									<path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
								</svg>
							</div>
							<h2 className="text-xl font-semibold text-neutral-950">Your wishlist is empty</h2>
							<p className="mt-2 mb-6 max-w-sm text-sm text-neutral-500">Save products you want to keep track of and find them here later.</p>
							<Link
								to="/products"
								className="group inline-flex items-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e76f51] hover:text-neutral-950 hover:shadow-md"
							>
								Browse Products
							</Link>
						</div>
					)}

					{!isLoading && wishlist.length > 0 && (
						<div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{wishlist.map((product) => (
								<WishlistCard 
									key={product._id} 
									product={product} 
									onRemoved={handleProductRemoved} 
								/>
							))}
						</div>
					)}
				</section>
			</main>
		</div>
	);
}
