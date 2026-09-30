import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axiosInstance from "../axiosCalls/axios"

const defaultProduct = {	
	name: "Everyday Canvas Tote",
	category: "Bags & Accessories",
	price: 48,
	image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85",
	stock: 10,
};

function formatPrice(value) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(value);
}

export default function ProductCard({ product = defaultProduct, initialIsAdded = false }) {
	const [isLoading, setIsLoading] = useState(false)
	const [isAdded, setIsAdded] = useState(initialIsAdded)
	const [error, setError] = useState(null)
	const {_id, name, category, price, image, stock,} = product;
	const isInStock = stock > 0;

	useEffect(() => {
		setIsAdded(initialIsAdded);
	}, [initialIsAdded]);

	const handleToggleWishlist = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await axiosInstance.patch(`/wishlist/${_id}/toggle`);
			setIsAdded(res.data.saved);
		} catch (err) {
			setError(err.response?.data?.message || "Failed to update wishlist");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<article className="group w-full max-w-77.5 overflow-hidden rounded-[20px] border border-neutral-200 bg-[#fbfaf7] text-neutral-950 shadow-[0_12px_30px_rgba(28,25,23,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(28,25,23,0.14)]">
			<div className="relative aspect-4/5 overflow-hidden bg-[#e9e4db]">
				<img
					className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
					src={image}
					alt={name}
					onError={(event) => {
						event.currentTarget.src = "https://placehold.co/900x1100/e9e4db/525252?text=Product+Image";
					}}
				/>
				<div className="absolute inset-x-4 top-4 flex items-start justify-end gap-3">
					<button
						className={`flex shrink-0 items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition shadow-sm backdrop-blur ${
							isAdded 
								? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600" 
								: "bg-white/90 text-neutral-950 border border-transparent hover:bg-neutral-950 hover:text-white"
						}`}
						type="button"
						onClick={handleToggleWishlist}
						disabled={isLoading}
					>
						{isLoading ? (
							"Saving..."
						) : isAdded ? (
							"Remove from Wishlist"
						) : (
							"Add to Wishlist"
						)}
					</button>
{error && <p className="text-red-500 text-xs mt-1 absolute -bottom-5 right-0">{error}</p>}

				</div>
			</div>

			<div className="space-y-4 p-5">
				<div className="flex items-start justify-between gap-4">
					<div className="min-w-0">
						<p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500">{category}</p>
						<h2 className="truncate text-lg font-semibold tracking-[-0.02em]">{name}</h2>
					</div>
					<p className="shrink-0 font-semibold">{formatPrice(price)}</p>
				</div>

				<div className="flex items-center gap-2 text-xs font-medium">
					<span className={`size-2 rounded-full ${isInStock ? "bg-emerald-500" : "bg-red-500"}`} />
					<span className={isInStock ? "text-emerald-700" : "text-red-700"}>
						{isInStock ? `${stock} ${stock === 1 ? "unit" : "units"} left` : "Out of stock"}
					</span>
				</div>

				<Link
					className="flex w-full items-center justify-between rounded-xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#e76f51] hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-[#e76f51] focus:ring-offset-2"
					to={`/products/${product._id}`}
				>
					<span>View details</span>
					<svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
						<path d="M5 12h14M13 6l6 6-6 6" />
					</svg>
				</Link>
			</div>
		</article>
	);
}
