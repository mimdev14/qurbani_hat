"use client";

import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";
import useAuth from "@/contexts/useAuth";

const ProfileContent = () => {
  const { user } = useAuth();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-5 py-16 sm:px-8">
      <div className="animate__animated animate__fadeIn rounded-2xl border border-ink/10 bg-white p-8 text-center shadow-sm sm:p-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-rust">
          Account
        </span>
        <h1 className="font-display text-3xl font-semibold text-ink">My Profile</h1>

        <img
          src={
            user?.image ||
            `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
              user?.name || user?.email || "User"
            )}&backgroundColor=d4a017&textColor=1b4332`
          }
          alt={user?.name || "Profile"}
          referrerPolicy="no-referrer"
          className="mx-auto mt-6 h-28 w-28 rounded-full border-4 border-gold object-cover"
        />

        <h2 className="mt-5 font-display text-2xl font-semibold text-ink">
          {user?.name || "No name set"}
        </h2>
        <p className="mt-1 font-mono text-sm text-ink/60">{user?.email}</p>

        <Link
          href="/my-profile/update"
          className="mt-8 inline-block rounded-md bg-gold px-6 py-2.5 text-sm font-semibold text-forest-dark transition-colors hover:bg-gold-light"
        >
          Update Information
        </Link>
      </div>
    </div>
  );
};

const MyProfilePage = () => (
  <PrivateRoute>
    <ProfileContent />
  </PrivateRoute>
);

export default MyProfilePage;
