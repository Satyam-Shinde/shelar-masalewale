import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";

import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { CartProvider } from "./context/CartContext";

function AppContent() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("shelar-theme") === "dark"
  );

  const { t, language } = useLanguage();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("shelar-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#fffaf2] text-stone-900 dark:bg-[#17100c] dark:text-stone-100">
        <Navbar dark={dark} setDark={setDark} />

        <Routes>
          <Route path="/" element={<Home t={t} lang={language} />} />
          <Route
            path="/products"
            element={<Products t={t} lang={language} />}
          />
          <Route path="/about" element={<About t={t} />} />
          <Route path="/contact" element={<Contact t={t} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Home t={t} lang={language} />} />
        </Routes>

        <Footer t={t} />
        <ToastContainer theme={dark ? "dark" : "light"} />
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </LanguageProvider>
  );
}
