import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export function HomePage() {
  const { products, loading, error } = useProducts({ featured: true });

  return (
    <main>
      <section className="hero">
        <div className="hero-media" />
        <div className="hero-content">
          <p className="eyebrow">Handmade jewellery with a little earth in every detail</p>
          <h1>Earthian Arts</h1>
          <p>Vibrant earrings, bracelets, necklaces, rings, and keepsakes shaped for expressive people and memorable gifting.</p>
          <div className="hero-actions">
            <Link className="button primary" to="/shop">Explore Collection</Link>
            <Link className="button secondary" to="/featured">New Launches</Link>
          </div>
        </div>
      </section>

      <section className="section intro-band">
        <div>
          <p className="eyebrow">Fresh from the studio</p>
          <h2>Jewellery that feels personal before you even wear it.</h2>
        </div>
        <p>Browse handcrafted styles, add your favourites to cart, and move through checkout with a clean operational flow ready for payment gateway integration.</p>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Featured picks</p>
            <h2>Shop customer favourites</h2>
          </div>
          <Link className="text-link" to="/shop">See all products</Link>
        </div>
        {loading && <p>Loading products...</p>}
        {!loading && error && <p className="alert">{error}. Connect the API to MongoDB and seed products to populate this section.</p>}
        {!loading && !error && products.length === 0 && <p>No featured products are active yet.</p>}
        {!loading && !error && products.length > 0 && (
          <div className="product-grid animated-products">
            {products.slice(0, 3).map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        )}
      </section>

      <section className="story-strip">
        <div>
          <p className="eyebrow">Made for gifting</p>
          <h2>Colorful pieces, thoughtful packaging, easy checkout.</h2>
        </div>
        <Link className="button light" to="/about">Meet the Studio</Link>
      </section>
    </main>
  );
}
