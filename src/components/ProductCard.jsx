import { ShoppingBag, Star, Flame } from "lucide-react";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ProductCard({ product, t, lang }) {
  const { addToCart } = useCart();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(
    product.variations?.[0]?.weight || product.weight || "100 g"
  );

  const name = lang === "mr" ? product.marathi : product.name;
  const description =
    lang === "mr" ? product.marathiDescription : product.description;
  const category =
    t.productCategory?.[product.category] || product.category;
  const heatKey = product.heat?.toLowerCase();
  const heat =
    lang === "mr" && product.marathiHeat
      ? product.marathiHeat
      : t[heatKey] || product.heat;
  const badge =
    lang === "mr" ? product.marathiBadge || product.badge : product.badge;

  const selectedVariation =
    product.variations?.find((variation) => variation.weight === selectedWeight) ||
    product.variations?.[0] ||
    { weight: product.weight || "100 g", mrp: product.mrp ?? product.price, price: product.price };

  const discount = selectedVariation.mrp > 0
    ? Math.round((1 - selectedVariation.price / selectedVariation.mrp) * 100)
    : 0;

  const add = () => {
    addToCart({
      ...product,
      weight: selectedVariation.weight,
      mrp: selectedVariation.mrp,
      price: selectedVariation.price,
      selectedWeight: selectedVariation.weight,
      cartItemId: `${product.id}-${selectedVariation.weight}`,
    });

    toast.success(`${name} (${selectedVariation.weight}) ${t.addedBasket}`, {
      position: "bottom-right",
    });
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 dark:border-stone-800 dark:bg-stone-900">
      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={product.image}
          alt={name}
          loading="lazy"
          onError={(e) => {
            console.error(`Failed to load product image: ${product.image}`);
            e.currentTarget.style.visibility = "hidden";
          }}
          className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-105"
        />

        {badge && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-maroon shadow-sm">
            {badge}
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              {category}
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold text-stone-900 dark:text-white">
              {name}
            </h3>
            {lang === "en" && (
              <p className="mt-1 text-sm text-stone-500">{product.marathi}</p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1 text-sm font-semibold text-yellow-600">
            <Star size={15} fill="currentColor" />
            {product.rating}
          </div>
        </div>

        {/* Expandable Description */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowFullDescription((prev) => !prev)}
            aria-expanded={showFullDescription}
            className="block w-full cursor-pointer text-left"
          >
            <p
              className={`min-h-[4.5rem] text-sm leading-6 text-stone-600 dark:text-stone-400 ${showFullDescription ? "" : "line-clamp-3"
                }`}
            >
              {description}
            </p>
            <span className="mt-1 inline-block text-xs font-semibold text-maroon hover:underline dark:text-orange-300">
              {showFullDescription
                ? lang === "mr" ? "कमी वाचा" : "Read Less"
                : lang === "mr" ? "अधिक वाचा" : "Read More"}
            </span>
          </button>
        </div>

        {/* Pack Size Selector */}
        <div className="mt-4">
          <label
            htmlFor={`weight-${product.id}`}
            className="mb-2 block text-xs font-semibold text-stone-500 dark:text-stone-400"
          >
            {lang === "mr" ? "पॅक निवडा" : "Select pack size"}
          </label>
          <select
            id={`weight-${product.id}`}
            value={selectedWeight}
            onChange={(e) => setSelectedWeight(e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-[#fffaf2] px-3 py-2 text-sm outline-none focus:border-maroon dark:border-stone-700 dark:bg-stone-950 dark:text-white"
          >
            {(product.variations || [{ weight: product.weight || "100 g" }]).map(
              (variation) => (
                <option key={variation.weight} value={variation.weight}>
                  {variation.weight}
                </option>
              )
            )}
          </select>
        </div>

        {/* Price and Heat Level */}
        <div className="mt-auto border-t border-stone-100 pt-4 dark:border-stone-800">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-xl font-bold text-maroon dark:text-orange-300">
              ₹{selectedVariation.price}
            </span>
            {selectedVariation.mrp > selectedVariation.price && (
              <>
                <span className="text-sm text-stone-400 line-through">
                  ₹{selectedVariation.mrp}
                </span>
                <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                  {discount}% OFF
                </span>
              </>
            )}
            <span className="ml-auto flex items-center gap-1 text-xs text-stone-500">
              <Flame size={14} />
              {heat}
            </span>
          </div>

          <button onClick={add} className="btn-primary mt-4 w-full">
            <ShoppingBag size={17} />
            {t.addBasket}
          </button>
        </div>
      </div>
    </article>
  );
}
