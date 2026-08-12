"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AnimalCard from "@/components/AnimalCard";
import LoadingSpinner from "@/components/LoadingSpinner";

const AllAnimalsPage = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("default");
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    axios
      .get("/animals.json")
      .then((res) => {
        setAnimals(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const visibleAnimals = useMemo(() => {
    let list = [...animals];
    if (typeFilter !== "All") {
      list = list.filter((a) => a.type === typeFilter);
    }
    if (sortOrder === "low-high") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [animals, sortOrder, typeFilter]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <div className="mb-8">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-rust">
          The Full Haat
        </span>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          All Animals
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          {visibleAnimals.length} animal{visibleAnimals.length !== 1 && "s"} listed right now.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          {["All", "Cow", "Goat"].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                typeFilter === t
                  ? "border-forest bg-forest text-paper"
                  : "border-ink/15 text-ink/70 hover:border-forest"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <label htmlFor="sort" className="font-mono text-xs uppercase tracking-wider text-ink/50">
            Sort by price
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="rounded-md border border-ink/15 bg-white px-3 py-1.5 text-sm text-ink focus:border-forest"
          >
            <option value="default">Default</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner label="Loading animals" />
      ) : visibleAnimals.length === 0 ? (
        <p className="py-16 text-center text-ink/60">
          No animals match this filter right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleAnimals.map((animal, i) => (
            <AnimalCard key={animal.id} animal={animal} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllAnimalsPage;
