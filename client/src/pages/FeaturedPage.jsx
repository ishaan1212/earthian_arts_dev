import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export function FeaturedPage() {
  const { products, loading, error } = useProducts({ newlyLaunched: true });

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Featured and newly launched</p>
        <h1>Fresh color stories from the latest drop.</h1>
        <p>Statement pieces, gifting favourites, and new studio launches collected in one place.</p>
      </section>
      <section className="section">
        {loading && <p>Loading launches...</p>}
        {!loading && error && <p className="alert">{error}. Connect the API to MongoDB and seed products to populate this section.</p>}
        {!loading && !error && products.length === 0 && <p>No newly launched products are active yet.</p>}
        {!loading && !error && products.length > 0 && (
          <div className="product-grid">
            {products.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        )}
      </section>
      <section className="story-strip">
        <div>
          <p className="eyebrow">Limited edit</p>
          <h2>Mix two metals, add one color accent, and keep the rest effortless.</h2>
        </div>
        <Link className="button light" to="/shop">Shop the Drop</Link>
      </section>
    </main>
  );
}
