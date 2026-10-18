
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("shelar-cart")
      );

      if (!Array.isArray(savedCart)) return [];

      // Preserve existing cart items and give each variation
      // a unique identifier.
      return savedCart.map((item) => ({
        ...item,
        cartItemId:
          item.cartItemId ||
          `${item.id}-${item.weight || "100 g"}`,
        mrp: item.mrp ?? item.price,
      }));
    } catch {
      return [];
    }
  });

  // Persist cart changes in localStorage.
  useEffect(() => {
    localStorage.setItem("shelar-cart", JSON.stringify(cart));
  }, [cart]);

  // Add a product using its selected variation.
  const addToCart = (product, quantity = 1, variation = null) => {
    const selectedVariation = variation || product.selectedVariation || {
      weight: product.weight || "100 g",
      mrp: product.mrp ?? product.price,
      price: product.price,
    };

    const weight = selectedVariation.weight;
    const mrp = selectedVariation.mrp;
    const price = selectedVariation.price;

    const cartItemId = `${product.id}-${weight}`;

    const cartItem = {
      ...product,
      weight,
      mrp,
      price,
      quantity,
      cartItemId,
    };

    setCart((current) => {
      const existing = current.find(
        (item) =>
          item.cartItemId === cartItemId ||
          (
            item.id === product.id &&
            item.weight === weight
          )
      );

      if (existing) {
        return current.map((item) =>
          item.cartItemId === existing.cartItemId
            ? {
              ...item,
              quantity: item.quantity + quantity,
              price,
              mrp,
            }
            : item
        );
      }

      return [...current, cartItem];
    });
  };

  // Remove one specific product variation.
  const removeFromCart = (cartItemId) => {
    setCart((current) =>
      current.filter(
        (item) => item.cartItemId !== cartItemId
      )
    );
  };

  // Update quantity for one specific variation.
  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      return removeFromCart(cartItemId);
    }

    setCart((current) =>
      current.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  // Total number of individual packs.
  const itemCount = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.quantity,
        0
      ),
    [cart]
  );

  // Total uses offer price, not MRP.
  const total = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
