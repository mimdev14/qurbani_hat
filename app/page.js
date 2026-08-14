import Link from "next/link";
import AnimalCard from "@/components/AnimalCard";

const tips = [
  {
    title: "Check the teeth, not just the size",
    body: "A bigger animal isn't always healthier. Look for clean, even teeth and alert eyes before you commit.",
  },
  {
    title: "Ask for the feeding history",
    body: "Animals fattened quickly with unknown feed can carry health risks. Ask sellers how the animal was raised.",
  },
  {
    title: "Book early, not on Eid eve",
    body: "Prices climb and good animals sell out in the final days. Booking a week ahead gets you better choices.",
  },
];

const breeds = [
  { name: "Deshi", note: "Hardy local breed, lean meat, easiest to manage." },
  { name: "Sahiwal", note: "Reddish-brown coat, strong build, great for families." },
  { name: "Black Bengal", note: "Small, tender-meat goat breed, popular nationwide." },
  { name: "Jamunapari", note: "Tall goat breed with high meat yield." },
];

const steps = [
  { label: "Browse", detail: "Filter cows and goats by price, weight and location." },
  { label: "Compare", detail: "Open full details, photos and seller notes side by side." },
  { label: "Book", detail: "Log in and reserve with a simple booking form." },
];

async function getFeaturedAnimals() {
  // Reads the local JSON file directly on the server -- no network round trip.
  const animals = (await import("@/public/animals.json")).default;
  return animals.slice(0, 4);
}

export default async function Home() {
  const animals = await getFeaturedAnimals();

  return (
    <div>
      {/* Hero */}
      <section className="bg-noise relative overflow-hidden bg-forest text-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-24">
          <div className="animate__animated animate__fadeIn">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
              Eid-ul-Adha, Booking Now Open
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] sm:text-5xl md:text-6xl">
              Your Qurbani,
              <br />
              chosen with <span className="italic text-gold-light">care.</span>
            </h1>
            <p className="mt-5 max-w-md text-paper/75">
              Browse verified cows and goats from trusted sellers across Bangladesh. Compare animals with confidence and book the right one before the haat gets crowded.

            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/animals"
                className="rounded-md bg-gold px-6 py-3 text-sm font-semibold text-forest-dark shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-gold-light"
              >
                Browse Animals →
              </Link>
              <a
                href="#tips"
                className="rounded-md border border-paper/30 px-6 py-3 text-sm font-medium transition-colors hover:border-gold hover:text-gold-light"
              >
                Read Qurbani Tips
              </a>
            </div>
          </div>

          <div className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold/40 animate-[spin_40s_linear_infinite]" />
            <div className="absolute inset-6 flex items-center justify-center rounded-full bg-forest-dark/60">
              <svg viewBox="0 0 200 200" className="h-40 w-40 sm:h-52 sm:w-52" fill="none">
                <path
                  d="M55 80c5-18 22-28 45-28s40 10 45 28M60 80c-12 6-16 20-8 28s20 8 28 4M140 80c12 6 16 20 8 28s-20 8-28 4M75 105c5 26 15 42 25 42s20-16 25-42"
                  stroke="var(--color-gold)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="72" cy="98" r="3" fill="var(--color-gold)" />
                <circle cx="128" cy="98" r="3" fill="var(--color-gold)" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Animals */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-rust">
              Featured
            </span>
            <h2 className="font-display text-3xl font-semibold text-ink">
              This week&apos;s picks
            </h2>
          </div>
          <Link
            href="/animals"
            className="hidden text-sm font-semibold text-forest hover:text-rust sm:block"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {animals.map((animal, i) => (
            <AnimalCard key={animal.id} animal={animal} index={i + 1} />
          ))}
        </div>
      </section>

      {/* Qurbani Tips */}
      <section id="tips" className="bg-sage/60 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-rust">
            Before You Buy
          </span>
          <h2 className="font-display text-3xl font-semibold text-ink">
            Qurbani tips
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {tips.map((tip, i) => (
              <div
                key={tip.title}
                className="rounded-xl border border-ink/10 bg-paper p-6 shadow-sm"
              >
                <span className="font-mono text-2xl font-bold text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                  {tip.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {tip.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Breeds */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-rust">
          Know Your Animal
        </span>
        <h2 className="font-display text-3xl font-semibold text-ink">
          Top breeds on QurbaniHat
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {breeds.map((breed) => (
            <div
              key={breed.name}
              className="rounded-xl border-l-4 border-gold bg-white p-5 shadow-sm"
            >
              <h3 className="font-display text-lg font-semibold text-forest">
                {breed.name}
              </h3>
              <p className="mt-1.5 text-sm text-ink/60">{breed.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works - extra section */}
     <section className="bg-sage/60 py-20">
  <div className="mx-auto max-w-7xl px-5 sm:px-8">
    <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
      Three Steps
    </span>

    <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
      How QurbaniHat work
    </h2>

    <div className="mt-12 grid gap-10 md:grid-cols-3">
      {steps.map((step, i) => (
        <div key={step.label} className="relative pl-14">
          <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold font-mono text-sm font-bold text-ink">
            {i + 1}
          </span>

          <h3 className="font-display text-xl font-semibold text-ink">
            {step.label}
          </h3>

          <p className="mt-2 text-sm leading-6 text-ink">
            {step.detail}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

<div className="h-16" />
    </div>
  );
}
