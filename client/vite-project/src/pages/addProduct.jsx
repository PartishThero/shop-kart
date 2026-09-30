import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import axiosInstance from "../axiosCalls/axios";

const initialForm = {
	name: "",
	description: "",
	price: "",
	category: "",
	image: "",
	stock: "",
};

export default function AddProduct() {
	const navigate = useNavigate();
	const [form, setForm] = useState(initialForm);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm((currentForm) => ({ ...currentForm, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setSubmitting(true);
		setError("");

		try {
			await axiosInstance.post("/products", {
				...form,
				price: Number(form.price),
				stock: Number(form.stock),
			});
			navigate("/products");
		} catch (requestError) {
			setError(
				requestError.response?.data?.message ||
					"Could not add the product. Please try again."
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-[#f7f5f0] text-neutral-950">
			<Navbar />

			<main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
				{/* Top navigation */}
				<div className="flex items-center justify-between">
					<Link
						className="group inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-neutral-500 transition hover:bg-white hover:text-neutral-950"
						to="/products"
					>
						<span className="text-lg transition-transform group-hover:-translate-x-0.5">
							←
						</span>
						Back to products
					</Link>

					<div className="hidden items-center gap-2 sm:flex">
						<span className="h-1.5 w-1.5 rounded-full bg-[#e76f51]" />
						<span className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">
							New catalog item
						</span>
					</div>
				</div>

				{/* Main card */}
				<section className="mt-6 overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-[0_12px_40px_rgba(28,25,23,0.06)]">
					{/* Header */}
					<header className="relative overflow-hidden border-b border-neutral-200 bg-[#fbfaf7] px-6 py-8 sm:px-10 sm:py-10">
						<div className="absolute -right-20 -top-28 h-64 w-64 rounded-full bg-[#e76f51]/[0.07] blur-3xl" />

						<div className="relative">
							<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e76f51]/20 bg-[#fff4ed] px-3 py-1.5">
								<span className="h-1.5 w-1.5 rounded-full bg-[#e76f51]" />
								<span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#c8553d]">
									Catalog management
								</span>
							</div>

							<div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
								<div>
									<h1 className="text-3xl font-semibold tracking-[-0.045em] text-neutral-950 sm:text-4xl">
										Add a product
									</h1>

									<p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
										Create a polished product listing with clear details,
										pricing, inventory, and a customer-ready image.
									</p>
								</div>

								<div className="flex shrink-0 items-center gap-2 text-xs text-neutral-400">
									<span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
									All fields required
								</div>
							</div>
						</div>
					</header>

					<div className="grid gap-10 lg:grid-cols-3">
						{/* Form */}
						<div className="p-6 sm:p-10 lg:col-span-2">
							<form className="space-y-9" onSubmit={handleSubmit}>
								{/* Product details */}
								<div>
									<div className="flex items-center gap-3">
										<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-950 text-xs font-bold text-white">
											01
										</div>
										<div>
											<h2 className="text-sm font-bold text-neutral-950">
												Product details
											</h2>
											<p className="mt-0.5 text-xs text-neutral-400">
												Basic information about your product
											</p>
										</div>
									</div>

									<div className="mt-6 grid gap-5 sm:grid-cols-2">
										<label className="space-y-2 sm:col-span-2">
											<span className="block text-xs font-bold uppercase tracking-[0.08em] text-neutral-600">
												Product name
											</span>

											<input
												className="w-full rounded-xl border border-neutral-200 bg-[#fafafa] px-4 py-3.5 text-sm font-normal text-neutral-950 outline-none transition placeholder:text-neutral-300 hover:border-neutral-300 focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/[0.06]"
												name="name"
												value={form.name}
												onChange={handleChange}
												placeholder="e.g. Mechanical Keyboard"
												required
											/>
										</label>

										<label className="space-y-2">
											<span className="block text-xs font-bold uppercase tracking-[0.08em] text-neutral-600">
												Category
											</span>

											<input
												className="w-full rounded-xl border border-neutral-200 bg-[#fafafa] px-4 py-3.5 text-sm font-normal text-neutral-950 outline-none transition placeholder:text-neutral-300 hover:border-neutral-300 focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/[0.06]"
												name="category"
												value={form.category}
												onChange={handleChange}
												placeholder="Electronics"
												required
											/>
										</label>

										<label className="space-y-2">
											<span className="block text-xs font-bold uppercase tracking-[0.08em] text-neutral-600">
												Price
											</span>

											<div className="relative">
												<span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-neutral-400">
													₹
												</span>

												<input
													className="w-full rounded-xl border border-neutral-200 bg-[#fafafa] py-3.5 pl-8 pr-4 text-sm font-normal text-neutral-950 outline-none transition placeholder:text-neutral-300 hover:border-neutral-300 focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/[0.06]"
													name="price"
													type="number"
													min="0.01"
													step="0.01"
													value={form.price}
													onChange={handleChange}
													placeholder="2999"
													required
												/>
											</div>
										</label>

										<label className="space-y-2">
											<span className="block text-xs font-bold uppercase tracking-[0.08em] text-neutral-600">
												Stock quantity
											</span>

											<input
												className="w-full rounded-xl border border-neutral-200 bg-[#fafafa] px-4 py-3.5 text-sm font-normal text-neutral-950 outline-none transition placeholder:text-neutral-300 hover:border-neutral-300 focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/[0.06]"
												name="stock"
												type="number"
												min="0"
												step="1"
												value={form.stock}
												onChange={handleChange}
												placeholder="10"
												required
											/>
										</label>

										<label className="space-y-2 sm:col-span-2">
											<div className="flex items-center justify-between">
												<span className="block text-xs font-bold uppercase tracking-[0.08em] text-neutral-600">
													Description
												</span>
												<span className="text-[11px] text-neutral-400">
													Tell customers what matters
												</span>
											</div>

											<textarea
												className="min-h-36 w-full resize-y rounded-xl border border-neutral-200 bg-[#fafafa] px-4 py-3.5 text-sm leading-6 text-neutral-950 outline-none transition placeholder:text-neutral-300 hover:border-neutral-300 focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/[0.06]"
												name="description"
												value={form.description}
												onChange={handleChange}
												placeholder="What makes this product worth choosing?"
												required
											/>
										</label>
									</div>
								</div>

								{/* Image */}
								<div className="border-t border-neutral-100 pt-8">
									<div className="flex items-center gap-3">
										<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-950 text-xs font-bold text-white">
											02
										</div>

										<div>
											<h2 className="text-sm font-bold text-neutral-950">
												Product image
											</h2>
											<p className="mt-0.5 text-xs text-neutral-400">
												Add a public image URL for the product
											</p>
										</div>
									</div>

									<label className="mt-6 block space-y-2">
										<span className="block text-xs font-bold uppercase tracking-[0.08em] text-neutral-600">
											Image URL
										</span>

										<input
											className="w-full rounded-xl border border-neutral-200 bg-[#fafafa] px-4 py-3.5 text-sm font-normal text-neutral-950 outline-none transition placeholder:text-neutral-300 hover:border-neutral-300 focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/[0.06]"
											name="image"
											type="url"
											value={form.image}
											onChange={handleChange}
											placeholder="https://example.com/product.jpg"
											required
										/>
									</label>

									<div className="mt-3 flex items-start gap-2 text-xs leading-5 text-neutral-400">
										<span className="mt-0.5">ⓘ</span>
										<p>
											Use a public image URL ending in .jpg, .png, or
											.webp. The preview updates automatically.
										</p>
									</div>
								</div>

								{/* Error */}
								{error && (
									<div
										className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700"
										role="alert"
									>
										<span className="mt-0.5">!</span>
										<span>{error}</span>
									</div>
								)}

								{/* Actions */}
								<div className="flex flex-col-reverse gap-3 border-t border-neutral-100 pt-7 sm:flex-row sm:justify-end">
									<Link
										className="rounded-xl px-5 py-3 text-center text-sm font-semibold text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
										to="/products"
									>
										Cancel
									</Link>

									<button
										className="rounded-xl bg-neutral-950 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e76f51] hover:text-neutral-950 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
										type="submit"
										disabled={submitting}
									>
										{submitting ? (
											<span className="inline-flex items-center gap-2">
												<span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
												Adding product...
											</span>
										) : (
											"Add product"
										)}
									</button>
								</div>
							</form>
						</div>

						{/* Preview */}
						<aside className="border-t border-neutral-200 bg-[#faf9f6] p-6 sm:p-10 lg:col-span-1 lg:border-l lg:border-t-0 lg:p-7">
							<div className="sticky top-6">
								<div className="mb-4 flex items-center justify-between">
									<div>
										<p className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
											Live preview
										</p>
										<p className="mt-1 text-xs text-neutral-500">
											Customer-facing appearance
										</p>
									</div>

									<span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-neutral-400">
										Preview
									</span>
								</div>

								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_10px_30px_rgba(28,25,23,0.07)]">
									<div className="relative aspect-[4/5] overflow-hidden bg-[#e9e5dd]">
										{form.image ? (
											<img
												className="h-full w-full object-cover transition duration-500"
												src={form.image}
												alt="Product preview"
												onError={(event) => {
													event.currentTarget.style.display = "none";
												}}
											/>
										) : (
											<div className="flex h-full flex-col items-center justify-center px-6 text-center">
												<div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-neutral-400 shadow-sm">
													<svg
														width="20"
														height="20"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="1.5"
													>
														<rect
															x="3"
															y="3"
															width="18"
															height="18"
															rx="2"
														/>
														<circle cx="8.5" cy="8.5" r="1.5" />
														<path d="m21 15-5-5L5 21" />
													</svg>
												</div>

												<p className="text-xs font-medium text-neutral-500">
													Product image
												</p>
												<p className="mt-1 max-w-[170px] text-[11px] leading-5 text-neutral-400">
													Add an image URL to see your product here
												</p>
											</div>
										)}

										<div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-600 shadow-sm backdrop-blur">
											{form.category || "Category"}
										</div>
									</div>

									<div className="p-5">
										<div className="flex items-start justify-between gap-3">
											<div className="min-w-0">
												<h3 className="truncate text-sm font-semibold text-neutral-950">
													{form.name || "Product name"}
												</h3>

												<p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-400">
													{form.description ||
														"Your product description will appear here."}
												</p>
											</div>

											<p className="shrink-0 text-sm font-bold text-neutral-950">
												{form.price ? `₹${form.price}` : "₹0"}
											</p>
										</div>

										<div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4">
											<span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
												Inventory
											</span>

											<span className="text-xs font-semibold text-neutral-600">
												{form.stock || "0"} units
											</span>
										</div>
									</div>
								</div>

								<div className="mt-5 rounded-xl border border-neutral-200 bg-white p-4">
									<div className="flex gap-3">
										<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fff1eb] text-[#e76f51]">
											✓
										</div>

										<div>
											<p className="text-xs font-semibold text-neutral-800">
												Ready to publish
											</p>
											<p className="mt-1 text-[11px] leading-5 text-neutral-400">
												Review the details before adding this product
												to your catalog.
											</p>
										</div>
									</div>
								</div>
							</div>
						</aside>
					</div>
				</section>
			</main>
		</div>
	);
}