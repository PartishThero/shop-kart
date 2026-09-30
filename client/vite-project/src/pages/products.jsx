import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import ProductCard from "../components/productCard";
import axiosInstance from "../axiosCalls/axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductsAndWishlist = async () => {
      setLoading(true);
      setError("");

      try {
        const params = {};
        if (activeSearch) params.search = activeSearch;
        if (category) params.category = category;

        const [productsRes, wishlistRes] = await Promise.all([
            axiosInstance.get("/products", { params }),
            axiosInstance.get("/wishlist").catch(() => ({ data: { wishlist: [] } }))
        ]);
        
        const fetchedProducts = productsRes.data.products ?? [];
        setProducts(fetchedProducts);
        
        const savedIds = wishlistRes.data.wishlist.map(p => p._id);
        setWishlistIds(savedIds);

        if (!activeSearch && !category) {
          const uniqueCategories = [...new Set(fetchedProducts.map((product) => product.category))].sort();
          setCategories(uniqueCategories);
        }
      } catch {
        setError("We couldn't load the catalog. Check that the server is running and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndWishlist();
  }, [activeSearch, category]);

  const handleSearch = (event) => {
    event.preventDefault();
    setActiveSearch(search.trim());
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
              Product Catalog
            </span>
          </div>

          <Link
            className="group inline-flex items-center gap-2 rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e76f51] hover:text-neutral-950 hover:shadow-md"
            to="/products/new"
          >
            Add new product
            <span className="text-lg transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
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
                  The ShopKart edit
                </span>
              </div>

              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                <div>
                  <h1 className="text-3xl font-semibold tracking-[-0.045em] text-neutral-950 sm:text-4xl">
                    Find something worth keeping.
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
                    Thoughtful everyday pieces, selected for how well they fit into real life.
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Filters and Search */}
          <div className="flex flex-col gap-4 bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            {/* Search */}
            <form className="flex w-full max-w-md items-center rounded-xl border border-neutral-200 bg-[#fafafa] px-2 py-1.5 transition-colors focus-within:border-neutral-950 focus-within:bg-white focus-within:ring-4 focus-within:ring-neutral-950/[0.06] hover:border-neutral-300" onSubmit={handleSearch}>
              <label className="sr-only" htmlFor="product-search">Search products</label>
              <input
                className="min-w-0 flex-1 bg-transparent px-3 py-1 text-sm font-normal text-neutral-950 outline-none placeholder:text-neutral-300"
                id="product-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search the catalog..."
              />
              <button className="rounded-lg bg-neutral-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#e76f51] hover:text-neutral-950" type="submit">Search</button>
            </form>

            {/* Filter & Count */}
            <div className="flex items-center justify-between gap-6 sm:justify-end">
              <label className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.08em] text-neutral-600" htmlFor="category-filter">
                Category
                <select
                  className="rounded-xl border border-neutral-200 bg-[#fafafa] px-3 py-2.5 text-sm font-normal normal-case text-neutral-950 outline-none transition hover:border-neutral-300 focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/[0.06]"
                  id="category-filter"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>

              <div className="flex shrink-0 items-center gap-2 text-xs text-neutral-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {loading ? "Loading..." : `${products.length} ${products.length === 1 ? "item" : "items"}`}
              </div>
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

          {loading && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-[#e76f51]" />
              <p className="mt-4 text-sm font-medium text-neutral-500">Loading the catalog...</p>
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-white/50 px-5 py-24 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-neutral-400 shadow-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-neutral-950">No products found</h2>
              <p className="mt-2 max-w-sm text-sm text-neutral-500">We couldn't find any products matching your search or filter. Try adjusting them.</p>
            </div>
          )}

          {!loading && products.length > 0 && (
            <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => <ProductCard key={product._id} product={product} initialIsAdded={wishlistIds.includes(product._id)} />)}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}