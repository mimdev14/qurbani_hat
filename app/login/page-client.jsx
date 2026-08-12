"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import useAuth from "@/contexts/useAuth";

const Login = () => {
  const { loginUser, googleLogin } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    setSubmitting(true);
    const { error: signInError } = await loginUser(email, password);
    setSubmitting(false);

    if (signInError) {
      const message = "Invalid email or password.";
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("Welcome back!");
    router.push(redirectTo);
  };

  const handleGoogle = async () => {
    const { error: googleError } = await googleLogin();
    if (googleError) {
      setError("Google login failed. Please try again.");
      toast.error("Google login failed.");
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5 py-16 sm:px-8">
      <div className="rounded-2xl border border-ink/10 bg-white p-8 shadow-sm">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-rust">
          Welcome Back
        </span>
        <h1 className="font-display text-3xl font-semibold text-ink">Login</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-ink/80">Email</label>
            <input
              required
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full rounded-md border border-ink/15 px-4 py-2.5 text-sm focus:border-forest"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-ink/80">Password</label>
            <input
              required
              type="password"
              name="password"
              placeholder="Your password"
              className="w-full rounded-md border border-ink/15 px-4 py-2.5 text-sm focus:border-forest"
            />
          </div>

          {error && <p className="text-sm text-rust">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-forest py-3 text-sm font-semibold text-paper transition-colors hover:bg-forest-dark disabled:opacity-60"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-ink/40">
          <span className="h-px flex-1 bg-ink/10" /> or <span className="h-px flex-1 bg-ink/10" />
        </div>

        <button
          onClick={handleGoogle}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-ink/15 py-2.5 text-sm font-medium text-ink transition-colors hover:border-forest"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.46a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.57-5.17 3.57-8.82Z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.87-3.01c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.1A12 12 0 0 0 12 24Z" />
            <path fill="#FBBC05" d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56v-3.1H1.28a12 12 0 0 0 0 10.76l3.99-3.1Z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.28 6.62l3.99 3.1C6.22 6.86 8.87 4.75 12 4.75Z" />
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-ink/60">
          New to QurbaniHat?{" "}
          <Link href="/register" className="font-semibold text-forest hover:text-rust">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
