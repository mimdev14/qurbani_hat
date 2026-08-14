"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useAuth from "@/contexts/useAuth";

const Register = () => {
  const { registerUser, googleLogin } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (!/[A-Z]/.test(password)) return "Password needs at least one uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password needs at least one lowercase letter.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const image = form.photoURL.value.trim();
    const password = form.password.value;

    const passError = validatePassword(password);
    if (passError) {
      setError(passError);
      toast.error(passError);
      return;
    }

    setSubmitting(true);
    const { error: signUpError } = await registerUser({ name, email, password, image });
    setSubmitting(false);

    if (signUpError) {
      const message =
        signUpError.code === "USER_ALREADY_EXISTS"
          ? "This email is already registered."
          : signUpError.message || "Registration failed. Please try again.";
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("Account created! Please log in.");
    router.push("/login");
  };

  const handleGoogle = async () => {
    const { error: googleError } = await googleLogin();
    if (googleError) {
      setError("Google sign-up failed. Please try again.");
      toast.error("Google sign-up failed.");
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5 py-16 sm:px-8">
      <div className="rounded-2xl border border-ink/10 bg-white p-8 shadow-sm">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-rust">
          Join QurbaniHaat
        </span>
        <h1 className="font-display text-3xl font-semibold text-ink">Register</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-ink/80">Name</label>
            <input
              required
              type="text"
              name="name"
              placeholder="Your full name"
              className="w-full rounded-md border border-ink/15 px-4 py-2.5 text-sm focus:border-forest"
            />
          </div>
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
            <label className="mb-1 block text-sm font-medium text-ink/80">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="https://example.com/photo.jpg"
              className="w-full rounded-md border border-ink/15 px-4 py-2.5 text-sm focus:border-forest"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-ink/80">Password</label>
            <input
              required
              type="password"
              name="password"
              placeholder="At least 6 characters"
              className="w-full rounded-md border border-ink/15 px-4 py-2.5 text-sm focus:border-forest"
            />
          </div>

          {error && <p className="text-sm text-rust">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-forest py-3 text-sm font-semibold text-paper transition-colors hover:bg-forest-dark disabled:opacity-60"
          >
            {submitting ? "Creating account..." : "Register"}
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
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-forest hover:text-rust">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
