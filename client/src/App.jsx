import { NavLink, Outlet } from "react-router-dom";
import { ShoppingBag, UserRound } from "lucide-react";
import { useCartStore } from "./store/cartStore";
import { useAuthStore } from "./store/authStore";

export function App() {
  const cartCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <header className="site-header">
        <NavLink className="brand" to="/" aria-label="Earthian Arts home">
          <span className="brand-mark">EA</span>
          <span>Earthian Arts</span>
        </NavLink>
        <nav className="site-nav" aria-label="Primary navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/featured">Featured</NavLink>
        </nav>
        <div className="header-actions">
          <NavLink className="icon-link" to="/login" aria-label="Account">
            <UserRound size={19} />
            <span>{user ? user.name.split(" ")[0] : "Account"}</span>
          </NavLink>
          <NavLink className="cart-link" to="/cart" aria-label={`Cart with ${cartCount} items`}>
            <ShoppingBag size={19} />
            <span>{cartCount}</span>
          </NavLink>
        </div>
      </header>

      <Outlet />

      <footer className="site-footer">
        <span>Earthian Arts</span>
        <span>Handmade jewellery for everyday glow.</span>
      </footer>
    </>
  );
}
