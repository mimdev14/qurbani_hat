"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useAuth from "@/contexts/useAuth";

const linkClass = (active) =>
  `relative font-medium tracking-wide transition-colors ${
    active ? "text-gold" : "text-paper/85 hover:text-gold-light"
  }`;

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await logoutUser();
    if (error) {
      toast.error("Could not log out. Try again.");
      return;
    }
    toast.success("Logged out. See you next Qurbani!");
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-forest text-paper shadow-[0_2px_0_0_var(--color-gold)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="19" stroke="var(--color-gold)" strokeWidth="2" />
            <path
              d="M12 16c1-3 4-5 8-5s7 2 8 5M13 16c-2 1-3 3-2 5s3 2 5 1M27 16c2 1 3 3 2 5s-3 2-5 1M15 21c1 5 3 8 5 8s4-3 5-8"
              stroke="var(--color-gold)"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span className="font-display text-2xl font-semibold tracking-tight">
            Qurbani<span className="text-gold">Hat</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className={linkClass(pathname === "/")}>
            Home
          </Link>
          <Link href="/animals" className={linkClass(pathname.startsWith("/animals"))}>
            All Animals
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full border border-gold/40 py-1 pl-1 pr-3 transition-colors hover:border-gold"
              >
                <img
                  src={
                    user.image ||
                    `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                      user.name || user.email || "User"
                    )}&backgroundColor=d4a017&textColor=1b4332`
                  }
                  alt={user.name || "User avatar"}
                  className="h-8 w-8 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="max-w-[110px] truncate text-sm">
                  {user.name || "My Account"}
                </span>
              </button>
              {open && (
                <div
                  onMouseLeave={() => setOpen(false)}
                  className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border border-forest/10 bg-paper text-ink shadow-xl animate__animated animate__fadeIn animate__faster"
                >
                  <Link
                    href="/my-profile"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm hover:bg-sage"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2.5 text-left text-sm text-rust hover:bg-sage"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-md border border-gold/50 px-4 py-1.5 text-sm font-medium transition-colors hover:border-gold hover:text-gold-light"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-gold px-4 py-1.5 text-sm font-semibold text-forest-dark transition-colors hover:bg-gold-light"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen((m) => !m)}
          aria-label="Toggle menu"
        >
          <span className="h-0.5 w-6 bg-paper" />
          <span className="h-0.5 w-6 bg-paper" />
          <span className="h-0.5 w-4 bg-paper" />
        </button>
      </nav>

      {menuOpen && (
        <div className="flex flex-col gap-1 border-t border-gold/20 bg-forest-dark px-5 py-4 md:hidden">
          <Link href="/" onClick={() => setMenuOpen(false)} className={linkClass(pathname === "/")}>
            Home
          </Link>
          <Link
            href="/animals"
            onClick={() => setMenuOpen(false)}
            className={linkClass(pathname.startsWith("/animals"))}
          >
            All Animals
          </Link>
          {user ? (
            <>
              <Link
                href="/my-profile"
                onClick={() => setMenuOpen(false)}
                className={linkClass(pathname.startsWith("/my-profile"))}
              >
                My Profile
              </Link>
              <button onClick={handleLogout} className="mt-2 text-left text-rust">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)} className={linkClass(pathname === "/login")}>
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className={linkClass(pathname === "/register")}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
