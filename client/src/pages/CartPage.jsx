import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { api } from "../api/client";
import { getCartTotals, useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";

export function CartPage() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem } = useCartStore();
  const user = useAuthStore((state) => state.user);
  const totals = getCartTotals(items);
  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkout() {
    if (!user) {
      navigate("/login?redirect=/cart");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await api.post("/checkout/session", {
        customerEmail: email,
        items: items.map((item) => ({ productId: item.product._id, quantity: item.quantity })),
        shippingAddress: {}
      });
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err.response?.data?.message || "Unable to start checkout");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="section cart-layout">
      <div>
        <p className="eyebrow">Your cart</p>
        <h1>Ready when you are.</h1>
        {items.length === 0 ? (
          <p>Your cart is empty. <Link to="/shop">Shop jewellery</Link></p>
        ) : (
          <div className="cart-items">
            {items.map(({ product, quantity }) => (
              <article className="cart-item" key={product._id}>
                <img src={product.images?.[0]?.url || "/assets/images/jewelry-hero.png"} alt={product.name} />
                <div>
                  <Link to={`/product/${product.slug}`}><strong>{product.name}</strong></Link>
                  <small>${product.price.toFixed(2)} each</small>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(event) => updateQuantity(product._id, Number(event.target.value))}
                    aria-label={`Quantity for ${product.name}`}
                  />
                </div>
                <button type="button" aria-label={`Remove ${product.name}`} onClick={() => removeItem(product._id)}>
                  <Trash2 size={18} />
                </button>
              </article>
            ))}
          </div>
        )}
      </div>

      <aside className="summary">
        <h2>Order Summary</h2>
        <div><span>Subtotal</span><strong>${totals.subtotal.toFixed(2)}</strong></div>
        <div><span>Shipping</span><strong>{totals.shipping === 0 ? "Free" : `$${totals.shipping.toFixed(2)}`}</strong></div>
        <div><span>Estimated tax</span><strong>${totals.tax.toFixed(2)}</strong></div>
        <div className="summary-total"><span>Total</span><strong>${totals.total.toFixed(2)}</strong></div>
        <label>Email for receipt
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        </label>
        {error && <p className="alert">{error}</p>}
        <button className="button primary" type="button" disabled={items.length === 0 || loading} onClick={checkout}>
          {loading ? "Starting checkout..." : "Proceed to Payment"}
        </button>
      </aside>
    </main>
  );
}
