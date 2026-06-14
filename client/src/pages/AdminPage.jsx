import { useProducts } from "../hooks/useProducts";
import { useAuthStore } from "../store/authStore";

export function AdminPage() {
  const user = useAuthStore((state) => state.user);
  const { products, loading } = useProducts();

  if (!user || user.role !== "admin") {
    return (
      <main className="section">
        <p className="eyebrow">Admin</p>
        <h1>Admin access required.</h1>
        <p>Sign in with the seeded admin account after running the seed script.</p>
      </main>
    );
  }

  return (
    <main className="section admin-page">
      <p className="eyebrow">Admin dashboard</p>
      <h1>Products and stock</h1>
      <p>This first admin screen is read-only in the UI; the backend already has protected create/update product APIs.</p>
      {loading ? <p>Loading products...</p> : (
        <div className="admin-table">
          <div className="admin-row admin-head"><span>Product</span><span>Category</span><span>Price</span><span>Stock</span></div>
          {products.map((product) => (
            <div className="admin-row" key={product._id}>
              <span>{product.name}</span>
              <span>{product.category}</span>
              <span>${product.price.toFixed(2)}</span>
              <span>{product.stock}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
