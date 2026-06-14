import { useEffect, useState } from "react";
import { api } from "../api/client";

export function useProducts(params = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    api
      .get("/products", { params, signal: controller.signal })
      .then(({ data }) => {
        setProducts(data.products);
        setError("");
      })
      .catch((err) => {
        if (err.name !== "CanceledError") setError(err.response?.data?.message || "Unable to load products");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [JSON.stringify(params)]);

  return { products, loading, error };
}
