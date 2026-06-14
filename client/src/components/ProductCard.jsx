import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/cartStore";

export function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  const image = product.images?.[0]?.url || "/assets/images/jewelry-hero.png";

  return (
    <article className="product-card">
      <Link to={`/product/${product.slug}`} className="product-image-wrap">
        <img src={image} alt={product.images?.[0]?.alt || product.name} />
      </Link>
      <div className="product-meta">
        <div>
          <Link to={`/product/${product.slug}`}>
            <strong>{product.name}</strong>
          </Link>
          <small>
            {product.category} · {product.audience} · {product.material?.join(", ")}
          </small>
        </div>
        <b>${product.price.toFixed(2)}</b>
      </div>
      <p>{product.description}</p>
      <button type="button" onClick={() => addItem(product)}>
        <ShoppingBag size={18} />
        Add to Cart
      </button>
    </article>
  );
}
