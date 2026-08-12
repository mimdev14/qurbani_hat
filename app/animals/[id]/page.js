"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";
import PrivateRoute from "@/components/PrivateRoute";
import useAuth from "@/contexts/useAuth";

const emptyForm = { name: "", email: "", phone: "", address: "" };

const AnimalDetailsContent = ({ id }) => {
  const { user } = useAuth();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [prefilled, setPrefilled] = useState(false);

  useEffect(() => {
    axios
      .get("/animals.json")
      .then((res) => {
        const found = res.data.find((a) => String(a.id) === id);
        setAnimal(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Prefill the booking form with the logged-in user's name/email once,
  // the first time that data becomes available -- not on every render.
  if (user && !prefilled) {
    setPrefilled(true);
    setForm((f) => ({
      ...f,
      name: user.name || f.name,
      email: user.email || f.email,
    }));
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Booking request received for ${animal.name}!`);
    setForm(emptyForm);
  };

  if (loading) return <LoadingSpinner label="Loading animal details" />;

  if (!animal) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink">
          We couldn&apos;t find that animal.
        </h2>
        <Link href="/animals" className="mt-4 inline-block text-forest hover:text-rust">
          ← Back to all animals
        </Link>
      </div>
    );
  }

  const { name, type, breed, price, weight, age, location, description, image, category } = animal;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <Link href="/animals" className="text-sm font-medium text-forest hover:text-rust">
        ← Back to all animals
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative overflow-hidden rounded-2xl">
            <img src={image} alt={name} className="h-80 w-full object-cover sm:h-96" />
            <span className="stamp-rotate absolute right-4 top-4 rounded-full border-2 border-gold bg-forest/90 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-gold-light">
              {category}
            </span>
          </div>

          <div className="mt-6 rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
            <h1 className="font-display text-3xl font-semibold text-ink">{name}</h1>
            <p className="mt-1 text-sm text-ink/60">
              {breed} &middot; {type} &middot; {location}
            </p>

            <div className="mt-5 grid grid-cols-3 gap-4 border-y border-dashed border-ink/15 py-4 font-mono text-sm">
              <div>
                <p className="text-ink/45">Weight</p>
                <p className="font-semibold text-ink">{weight} kg</p>
              </div>
              <div>
                <p className="text-ink/45">Age</p>
                <p className="font-semibold text-ink">{age} yrs</p>
              </div>
              <div>
                <p className="text-ink/45">Price</p>
                <p className="font-semibold text-rust">৳{price.toLocaleString("en-BD")}</p>
              </div>
            </div>

            <p className="mt-5 leading-relaxed text-ink/70">{description}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-ink/10 bg-sage/50 p-6 sm:p-8">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-rust">
            Reserve This Animal
          </span>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Booking form
          </h2>
          <p className="mt-1 text-sm text-ink/60">
            Fill in your details and we&apos;ll confirm your Qurbani booking.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-ink/80">Full name</label>
              <input
                required
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full rounded-md border border-ink/15 bg-white px-4 py-2.5 text-sm focus:border-forest"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-ink/80">Email</label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-md border border-ink/15 bg-white px-4 py-2.5 text-sm focus:border-forest"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-ink/80">Phone</label>
              <input
                required
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                className="w-full rounded-md border border-ink/15 bg-white px-4 py-2.5 text-sm focus:border-forest"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-ink/80">Delivery address</label>
              <textarea
                required
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={3}
                placeholder="House, road, area, district"
                className="w-full rounded-md border border-ink/15 bg-white px-4 py-2.5 text-sm focus:border-forest"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-gold py-3 text-sm font-semibold text-forest-dark transition-colors hover:bg-gold-light"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const AnimalDetailsPage = ({ params }) => {
  const { id } = use(params);

  return (
    <PrivateRoute>
      <AnimalDetailsContent id={id} />
    </PrivateRoute>
  );
};

export default AnimalDetailsPage;
