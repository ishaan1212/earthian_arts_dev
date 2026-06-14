import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, register, logout, user } = useAuthStore();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const redirect = searchParams.get("redirect") || "/";

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");

    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        await register(form);
      }
      navigate(redirect);
    } catch (err) {
      setError(err.response?.data?.message || "Account action failed");
    }
  }

  if (user) {
    return (
      <main className="section account-panel">
        <p className="eyebrow">Account</p>
        <h1>Welcome, {user.name}</h1>
        <p>You are signed in as {user.email}.</p>
        {user.role === "admin" && <button className="button secondary" type="button" onClick={() => navigate("/admin")}>Open Admin</button>}
        <button className="button primary" type="button" onClick={logout}>Sign Out</button>
      </main>
    );
  }

  return (
    <main className="section auth-layout">
      <section>
        <p className="eyebrow">Customer account</p>
        <h1>{mode === "login" ? "Sign in" : "Create account"}</h1>
        <p>Use an account to save order history and proceed through checkout.</p>
      </section>
      <form className="auth-form" onSubmit={submit}>
        {mode === "register" && (
          <label>Name
            <input name="name" value={form.name} onChange={updateField} required />
          </label>
        )}
        <label>Email
          <input name="email" type="email" value={form.email} onChange={updateField} required />
        </label>
        <label>Password
          <input name="password" type="password" value={form.password} onChange={updateField} required minLength="8" />
        </label>
        {error && <p className="alert">{error}</p>}
        <button className="button primary" type="submit">{mode === "login" ? "Sign In" : "Create Account"}</button>
        <button className="text-button" type="button" onClick={() => setMode(mode === "login" ? "register" : "login")}>
          {mode === "login" ? "Need an account?" : "Already have an account?"}
        </button>
      </form>
    </main>
  );
}
