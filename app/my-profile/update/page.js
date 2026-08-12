"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import PrivateRoute from "@/components/PrivateRoute";
import useAuth from "@/contexts/useAuth";

const UpdateProfileForm = () => {
  const { user, updateUserProfile } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const image = form.photoURL.value.trim();

    setSubmitting(true);
    const { error } = await updateUserProfile({ name, image: image || undefined });
    setSubmitting(false);

    if (error) {
      toast.error("Could not update your profile. Please try again.");
      return;
    }

    toast.success("Profile updated!");
    router.push("/my-profile");
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16 sm:px-8">
      <Link href="/my-profile" className="mb-4 text-sm font-medium text-forest hover:text-rust">
        ← Back to profile
      </Link>
      <div className="rounded-2xl border border-ink/10 bg-white p-8 shadow-sm">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-rust">
          Keep It Current
        </span>
        <h1 className="font-display text-3xl font-semibold text-ink">
          Update Information
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-ink/80">Name</label>
            <input
              required
              type="text"
              name="name"
              defaultValue={user?.name || ""}
              placeholder="Your full name"
              className="w-full rounded-md border border-ink/15 px-4 py-2.5 text-sm focus:border-forest"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-ink/80">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              defaultValue={user?.image || ""}
              placeholder="https://example.com/photo.jpg"
              className="w-full rounded-md border border-ink/15 px-4 py-2.5 text-sm focus:border-forest"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-forest py-3 text-sm font-semibold text-paper transition-colors hover:bg-forest-dark disabled:opacity-60"
          >
            {submitting ? "Updating..." : "Update Information"}
          </button>
        </form>
      </div>
    </div>
  );
};

const UpdateProfilePage = () => (
  <PrivateRoute>
    <UpdateProfileForm />
  </PrivateRoute>
);

export default UpdateProfilePage;
