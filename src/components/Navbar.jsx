import { Link, NavLink } from "react-router-dom";
import {
  Moon,
  Sun,
  Languages,
  Leaf,
  Menu,
  X,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";

export default function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const { language, changeLanguage, t } = useLanguage();
  const { itemCount } = useCart();

  const links = [
    ["/", t.home],
    ["/products", t.products],
    ["/about", t.about],
    ["/contact", t.contact],
  ];

  const toggleLanguage = () => {
    changeLanguage(language === "en" ? "mr" : "en");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-[#fffaf2]/90 backdrop-blur-xl dark:border-stone-800 dark:bg-[#17100c]/90">
      <div className="container-page flex h-20 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <img
            src="/images/shelar-masale-logo.png"
            alt="Shelar Masalewale Logo"
            className="h-12 w-12 rounded-full border-2 border-orange-200 object-cover shadow-sm"
          />

          <span>
            <span className="block font-display text-xl font-bold text-stone-900 dark:text-white">
              Shelar Masalewale
            </span>
            <span className="block text-[10px] font-bold tracking-[.2em] text-stone-500">
              {t.est}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-semibold transition ${isActive
                  ? "text-maroon dark:text-orange-300"
                  : "text-stone-600 hover:text-maroon dark:text-stone-300 dark:hover:text-orange-300"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/cart"
            className="relative rounded-full border border-stone-300 p-2 text-stone-700 hover:border-maroon dark:border-stone-700 dark:text-stone-200"
            aria-label={language === "mr" ? "बास्केट" : "Cart"}
            title={language === "mr" ? "बास्केट" : "Cart"}
          >
            <ShoppingBag size={18} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-maroon px-1 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>


          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 rounded-full border border-stone-300 px-3 py-2 text-xs font-bold text-stone-700 hover:border-maroon dark:border-stone-700 dark:text-stone-200"
            title={language === "en" ? t.marathi : t.english}
          >
            <Languages size={16} />
            <span>{language === "en" ? "मराठी" : "English"}</span>
          </button>

          <button
            onClick={() => setDark(!dark)}
            className="rounded-full border border-stone-300 p-2 text-stone-700 hover:border-maroon dark:border-stone-700 dark:text-stone-200"
            title={t.theme}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={t.menu}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-stone-200 bg-[#fffaf2] px-5 py-5 dark:border-stone-800 dark:bg-[#17100c] md:hidden">
          <div className="flex flex-col gap-4">
            {links.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="font-semibold"
              >
                {label}
              </NavLink>
            ))}

            <div className="flex flex-wrap gap-2 pt-2">
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="btn-secondary !px-4 !py-2"
              >
                <ShoppingBag size={16} />
                {language === "mr" ? "बास्केट" : "Cart"} ({itemCount})
              </Link>


              <button
                onClick={toggleLanguage}
                className="btn-secondary !px-4 !py-2"
              >
                <Languages size={16} />
                {language === "en" ? "मराठी" : "English"}
              </button>

              <button
                onClick={() => setDark(!dark)}
                className="btn-secondary !px-4 !py-2"
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
