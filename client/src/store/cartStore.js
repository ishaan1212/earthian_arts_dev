import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existing = items.find((item) => item.product._id === product._id);

        if (existing) {
          set({
            items: items.map((item) =>
              item.product._id === product._id
                ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
                : item
            )
          });
          return;
        }

        set({ items: [...items, { product, quantity }] });
      },
      updateQuantity: (productId, quantity) => {
        set({
          items: get().items
            .map((item) => (item.product._id === productId ? { ...item, quantity } : item))
            .filter((item) => item.quantity > 0)
        });
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.product._id !== productId) });
      },
      clearCart: () => set({ items: [] })
    }),
    { name: "earthian_cart" }
  )
);

export function getCartTotals(items) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 75 ? 0 : 8;
  const tax = Math.round(subtotal * 0.13 * 100) / 100;
  const total = subtotal + shipping + tax;
  return { subtotal, shipping, tax, total };
}
