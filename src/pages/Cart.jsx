
import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

const WHATSAPP_NUMBER = "919970879244";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, total } = useCart();
  const { language } = useLanguage();

  const marathi = language === "mr";

  const text = {
    title: marathi ? "तुमची खरेदीची बास्केट" : "Your Shopping Cart",
    empty: marathi ? "तुमची बास्केट रिकामी आहे." : "Your cart is empty.",
    browse: marathi ? "मसाले पहा" : "Browse Masale",
    total: marathi ? "एकूण" : "Total",
    order: marathi ? "व्हॉट्सअॅपवर ऑर्डर करा" : "Order on WhatsApp",
    quantity: marathi ? "प्रमाण" : "Quantity",
    mrp: marathi ? "मूळ किंमत" : "MRP",
    offer: marathi ? "ऑफर किंमत" : "Offer Price",
    weight: marathi ? "पॅक वजन" : "Pack Size",
    subtotal: marathi ? "उपएकूण" : "Subtotal",
  };

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  const orderOnWhatsApp = () => {
    if (!cart.length) return;

    const lines = cart.map((item) => {
      const name = marathi ? item.marathi : item.name;
      const weight = item.weight || "100 g";
      const price = Number(item.price) || 0;
      const mrp = Number(item.mrp ?? item.price) || 0;
      const subtotal = price * item.quantity;

      return [
        `• ${name}`,
        `  ${text.weight}: ${weight}`,
        `  ${text.quantity}: ${item.quantity}`,
        `  ${text.mrp}: ${formatPrice(mrp)}`,
        `  ${text.offer}: ${formatPrice(price)}`,
        `  ${text.subtotal}: ${formatPrice(subtotal)}`,
      ].join("\n");
    });

    const message = [
      marathi ? "नमस्कार Shelar Masalewale," : "Hello Shelar Masalewale,",
      marathi
        ? "मला खालील ऑर्डर करायची आहे:"
        : "I would like to place the following order:",
      "",
      ...lines,
      "",
      `${text.total}: ${formatPrice(total)}`,
      "",
      marathi
        ? "कृपया ऑर्डरची उपलब्धता आणि डिलिव्हरीची माहिती कळवा."
        : "Please confirm order availability and delivery details.",
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!cart.length) {
    return (
      <main className="py-24">
        <div className="container-page text-center">
          <ShoppingBag className="mx-auto text-maroon" size={48} />

          <h1 className="mt-5 font-display text-4xl font-bold">
            {text.empty}
          </h1>

          <Link to="/products" className="btn-primary mt-8 inline-flex">
            {text.browse}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="py-16">
      <div className="container-page">
        <h1 className="font-display text-4xl font-bold">
          {text.title}
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Cart Items */}
          <div className="space-y-4">
            {cart.map((item) => {
              const itemKey =
                item.cartItemId || `${item.id}-${item.weight || "100 g"}`;

              const itemName = marathi ? item.marathi : item.name;
              const itemPrice = Number(item.price) || 0;
              const itemMrp = Number(item.mrp ?? item.price) || 0;
              const subtotal = itemPrice * item.quantity;

              return (
                <div
                  key={itemKey}
                  className="flex flex-col gap-5 rounded-3xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900 sm:flex-row sm:items-center"
                >
                  {/* Product Image */}
                  <div className="grid h-28 w-24 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-orange-100 to-red-100">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={itemName}
                        className="h-full w-full object-contain p-1"
                      />
                    ) : (
                      <span className="font-display text-center font-bold text-red-950">
                        Shelar
                        <br />
                        Masale
                      </span>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h2 className="font-display text-xl font-bold">
                      {itemName}
                    </h2>

                    <p className="mt-1 text-sm text-stone-500">
                      {text.weight}: {item.weight || "100 g"}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                      <span className="text-stone-400 line-through">
                        {formatPrice(itemMrp)}
                      </span>

                      <span className="font-semibold text-maroon dark:text-orange-300">
                        {formatPrice(itemPrice)}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-sm text-stone-500">
                        {text.quantity}
                      </span>

                      <div className="flex items-center rounded-full border border-stone-300 dark:border-stone-700">
                        <button
                          type="button"
                          className="p-2"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQuantity(itemKey, item.quantity - 1)
                          }
                        >
                          <Minus size={15} />
                        </button>

                        <span className="min-w-8 text-center text-sm font-bold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          className="p-2"
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQuantity(itemKey, item.quantity + 1)
                          }
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Subtotal and Remove */}
                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <strong className="text-lg text-maroon dark:text-orange-300">
                      {formatPrice(subtotal)}
                    </strong>

                    <button
                      type="button"
                      onClick={() => removeFromCart(itemKey)}
                      className="text-stone-400 hover:text-red-600"
                      aria-label="Remove item"
                    >
                      <Trash2 size={19} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <aside className="h-fit rounded-3xl border border-stone-200 bg-white p-6 shadow-soft dark:border-stone-800 dark:bg-stone-900">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>{text.total}</span>

              <span className="text-maroon dark:text-orange-300">
                {formatPrice(total)}
              </span>
            </div>

            <button
              type="button"
              onClick={orderOnWhatsApp}
              className="btn-primary mt-6 w-full"
            >
              <MessageCircle size={18} />
              {text.order}
            </button>

            <p className="mt-4 text-xs leading-5 text-stone-500">
              {marathi
                ? "ऑर्डर WhatsApp वर पाठवली जाईल. पेमेंट आणि डिलिव्हरीची माहिती WhatsApp वर निश्चित केली जाईल."
                : "Your order will be sent to WhatsApp. Payment and delivery details can be confirmed there."}
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
