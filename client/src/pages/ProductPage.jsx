import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { api } from "../api/client";
import { useCartStore } from "../store/cartStore";

export function ProductPage() {
  const { slug } = useParams();
  const addItem = useCartStore((state) => state.addItem);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/products/${slug}`)
      .then(({ data }) => setProduct(data.product))
      .catch((err) => setError(err.response?.data?.message || "Product not found"))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <main className="section"><p>Loading product...</p></main>;
  if (error) return <main className="section"><p className="alert">{error}</p><Link to="/shop">Back to shop</Link></main>;

  return (
    <main className="section product-detail">
      <img src={product.images?.[0]?.url || "/assets/images/jewelry-hero.png"} alt={product.images?.[0]?.alt || product.name} />
      <div>
        <p className="eyebrow">{product.category} · {product.audience}</p>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="price">${product.price.toFixed(2)}</p>
        <p>{product.stock > 0 ? `${product.stock} in stock` : "Sold out"}</p>
        <button className="button primary" type="button" disabled={product.stock === 0} onClick={() => addItem(product)}>
          <ShoppingBag size={18} />
          Add to Cart
        </button>
      </div>
    </main>
  );
}
