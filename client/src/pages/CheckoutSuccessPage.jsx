import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useEffect } from "react";

export function CheckoutSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="section success-panel">
      <p className="eyebrow">Payment flow complete</p>
      <h1>Thank you for your order.</h1>
      <p>Your cart has been cleared. When Stripe keys and webhooks are configured, this page will appear after a successful payment gateway checkout.</p>
      <Link className="button primary" to="/shop">Keep Shopping</Link>
    </main>
  );
}
