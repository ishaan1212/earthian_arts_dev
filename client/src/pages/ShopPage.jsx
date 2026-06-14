import { useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

const initialFilters = {
  category: "",
  audience: "",
  material: "",
  sort: "newest"
};

export function ShopPage() {
  const [filters, setFilters] = useState(initialFilters);
  const params = useMemo(() => Object.fromEntries(Object.entries(filters).filter(([, value]) => value)), [filters]);
  const { products, loading, error } = useProducts(params);

  function updateFilter(event) {
    setFilters((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Shop jewellery</p>
        <h1>Find the piece that matches the moment.</h1>
        <p>Filter by jewellery type, audience, material, and sorting preference.</p>
      </section>

      <section className="shop-shell section">
        <aside className="filters">
          <div className="filter-header">
            <h2>Filters</h2>
            <button type="button" onClick={() => setFilters(initialFilters)}>Reset</button>
          </div>
          <label>Jewellery Type
            <select name="category" value={filters.category} onChange={updateFilter}>
              <option value="">All</option>
              <option value="earrings">Earrings</option>
              <option value="bracelet">Bracelets</option>
              <option value="necklace">Necklaces</option>
              <option value="ring">Rings</option>
            </select>
          </label>
          <label>For
            <select name="audience" value={filters.audience} onChange={updateFilter}>
              <option value="">All</option>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="unisex">Unisex</option>
            </select>
          </label>
          <label>Material
            <select name="material" value={filters.material} onChange={updateFilter}>
              <option value="">All</option>
              <option value="gold">Gold tone</option>
              <option value="silver">Silver tone</option>
              <option value="beads">Beads</option>
              <option value="pearl">Pearl</option>
              <option value="stone">Stone</option>
            </select>
          </label>
          <label>Sort
            <select name="sort" value={filters.sort} onChange={updateFilter}>
              <option value="newest">Newest</option>
              <option value="priceAsc">Price: low to high</option>
              <option value="priceDesc">Price: high to low</option>
            </select>
          </label>
        </aside>

        <div className="shop-content">
          <div className="shop-toolbar">
            <p><strong>{products.length}</strong> products found</p>
            <span>Product inventory is validated again during checkout.</span>
          </div>
          {error && <p className="alert">{error}</p>}
          {loading ? <p>Loading collection...</p> : <div className="product-grid">{products.map((product) => <ProductCard key={product._id} product={product} />)}</div>}
        </div>
      </section>
    </main>
  );
}
