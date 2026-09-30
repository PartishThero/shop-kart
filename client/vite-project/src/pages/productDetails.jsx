import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import axiosInstance from "../axiosCalls/axios";

function formatPrice(value) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0,
	}).format(value);
}

export default function ProductDetails() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await axiosInstance.get(`/products/${id}`);
				setProduct(response.data.product);
			} catch {
				setError("Something went wrong while loading this product.");
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	return (
		<div className="min-h-screen bg-[#f5f1ea] text-neutral-950">
			<Navbar />
			<main className="mx-auto max-w-6xl px-5 pb-16 pt-8 sm:px-8 lg:px-10">
				<Link className="mb-8 inline-flex text-sm font-semibold text-neutral-600 hover:text-[#e76f51]" to="/products">← Back to products</Link>
				{loading && <p className="py-20 text-center text-sm text-neutral-500">Loading product...</p>}
				{error && <p className="rounded-2xl bg-[#fff4ed] px-5 py-4 text-sm text-[#a9442f]" role="alert">{error}</p>}
				{!loading && !error && product && (
					<section className="grid overflow-hidden rounded-[24px] border border-neutral-200 bg-[#fbfaf7] shadow-[0_12px_30px_rgba(28,25,23,0.07)] lg:grid-cols-2">
						<div className="min-h-[360px] bg-[#e9e4db] lg:min-h-[620px]">
							<img
								className="h-full w-full object-cover"
								src={product.image}
								alt={product.name}
							onError={(event) => {
								event.currentTarget.src = "https://placehold.co/900x1100/e9e4db/525252?text=Product+Image";
								}}
							/>
						</div>
						<div className="flex flex-col justify-center p-7 sm:p-12">
							<p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#e76f51]">{product.category}</p>
							<h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{product.name}</h1>
							<p className="mt-6 text-2xl font-semibold">{formatPrice(product.price)}</p>
							<p className="mt-6 leading-7 text-neutral-600">{product.description}</p>
							<p className={`mt-6 text-sm font-semibold ${product.stock > 0 ? "text-emerald-700" : "text-red-700"}`}>
								{product.stock > 0 ? `${product.stock} units available` : "Out of stock"}
							</p>
							<button className="mt-8 rounded-xl bg-neutral-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#e76f51] hover:text-neutral-950" type="button">Add to cart</button>
						</div>
					</section>
				)}
			</main>
		</div>
	);
}

