
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
import products from "../data/products.json";

export default function Products({ t, lang }) {
    // Search input state
    const [query, setQuery] = useState("");

    // Selected category state
    const [cat, setCat] = useState("All");

    // Get unique product categories
    const cats = [
        "All",
        ...new Set(products.map((p) => p.category)),
    ];

    // Filter products based on category and search query
    const filtered = useMemo(
        () =>
            products.filter(
                (p) =>
                    (cat === "All" || p.category === cat) &&
                    (
                        p.name +
                        " " +
                        p.marathi +
                        " " +
                        p.description +
                        " " +
                        p.marathiDescription
                    )
                        .toLowerCase()
                        .includes(query.toLowerCase())
            ),
        [query, cat]
    );

    return (
        <main>
            {/* Products Section */}
            <section className="bg-white py-20 dark:bg-stone-950">
                <div className="container-page">

                    {/* Page Heading */}
                    <SectionHeading
                        eyebrow={t.products}
                        title={t.productsTitle}
                        center
                    />

                    {/* Search Bar and Category Filters */}
                    <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 sm:flex-row">

                        {/* Search Input */}
                        <div className="relative flex-1">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                                size={18}
                            />

                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={t.searchPlaceholder}
                                className="w-full rounded-full border border-stone-300 bg-[#fffaf2] py-3 pl-11 pr-5 outline-none focus:border-maroon dark:border-stone-700 dark:bg-stone-900 dark:text-white"
                            />
                        </div>

                        {/* Category Filter Buttons */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-1">
                            {cats.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setCat(c)}
                                    className={`whitespace-nowrap rounded-full px-4 py-3 text-sm font-semibold ${cat === c
                                        ? "bg-maroon text-white"
                                        : "border border-stone-300 dark:border-stone-700 dark:text-white"
                                        }`}
                                >
                                    {c === "All" ? t.all : t.productCategory[c]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Number of Products Found */}
                    <div className="mt-12 flex items-center gap-2 text-sm text-stone-500">
                        <SlidersHorizontal size={16} />
                        {t.showing} {filtered.length} {t.productsWord}
                    </div>

                    {/* Product Grid */}
                    <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((p) => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                t={t}
                                lang={lang}
                            />
                        ))}
                    </div>

                    {/* Empty Search Results */}
                    {filtered.length === 0 && (
                        <div className="py-20 text-center text-stone-500">
                            {t.noProducts}
                        </div>
                    )}

                </div>
            </section>
        </main>
    );
}
