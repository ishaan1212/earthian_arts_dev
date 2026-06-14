import { createBrowserRouter } from "react-router-dom";
import { App } from "./App.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { AdminPage } from "./pages/AdminPage.jsx";
import { CartPage } from "./pages/CartPage.jsx";
import { CheckoutSuccessPage } from "./pages/CheckoutSuccessPage.jsx";
import { FeaturedPage } from "./pages/FeaturedPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { ProductPage } from "./pages/ProductPage.jsx";
import { ShopPage } from "./pages/ShopPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "featured", element: <FeaturedPage /> },
      { path: "product/:slug", element: <ProductPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "admin", element: <AdminPage /> },
      { path: "checkout/success", element: <CheckoutSuccessPage /> }
    ]
  }
]);
