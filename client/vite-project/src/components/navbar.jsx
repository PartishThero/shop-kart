import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const menus = {
	Home: "/",
	Products: ["All Products","Add Product"],
	Wishlist: "/wishlist",
    Orders: "/orders",
};

export default function Navbar() {
	const [open, setOpen] = useState(null);
	const { cartCount } = useCart();

		return (
		<nav className="flex items-center justify-center px-4 py-3 font-sans sm:px-7 sm:py-4.5" aria-label="Main navigation">
			<div className="flex items-center gap-1 rounded-full border border-neutral-950 bg-neutral-950 p-1.5 shadow-[0_5px_20px_rgba(0,0,0,0.2)]">
				
				{Object.keys(menus).map((label) => {
					const itemData = menus[label];
					const isDropdown = Array.isArray(itemData);

					return (
						<div className="relative" key={label} onMouseEnter={() => isDropdown && setOpen(label)} onMouseLeave={() => isDropdown && setOpen(null)}>
							
							{/* Render a Link if it's a direct route, OR a Button if it's a dropdown */}
							{isDropdown ? (
								<button
									className={`rounded-full px-3.75 py-2.5 text-[13px] font-medium transition-colors ${open === label ? "bg-white text-neutral-950" : "bg-transparent text-white hover:bg-white hover:text-neutral-950"}`}
									aria-expanded={open === label}
								>
									{label}
								</button>
							) : (
								<Link
									to={itemData}
									className="block rounded-full px-3.75 py-2.5 text-[13px] font-medium transition-colors bg-transparent text-white hover:bg-white hover:text-neutral-950 no-underline"
								>
									{label}
								</Link>
							)}

							{/* Render the Dropdown Box only if it's a dropdown AND it's open */}
							{isDropdown && open === label && (
								<div className="absolute left-1/2 top-full z-10 min-w-41.25 -translate-x-1/2 pt-3">
									<div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-2 shadow-[0_14px_35px_rgba(0,0,0,0.3)]">
										{itemData.map((item) => (
											<Link
												className="block rounded-lg px-3 py-2.5 text-[13px] text-white no-underline hover:bg-white hover:text-neutral-950"
												to={item === "All Products" ? "/products" : "/products/new"}
												key={item}
												onClick={() => setOpen(null)}
											>
												{item}
											</Link>
										))}
									</div>
								</div>
							)}
							
						</div>
					);
				})}

				<Link
					to="/cart"
					className="block rounded-full px-3.75 py-2.5 text-[13px] font-medium transition-colors bg-transparent text-white hover:bg-white hover:text-neutral-950 no-underline"
				>
					Cart ({cartCount})
				</Link>

			</div>
		</nav>
	);

}
