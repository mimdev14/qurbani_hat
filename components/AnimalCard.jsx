import Link from "next/link";

const AnimalCard = ({ animal, index }) => {
  const { id, name, type, breed, price, weight, location, image, category } = animal;

  return (
    <div className="token-edge group relative overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <span className="stamp-rotate absolute right-3 top-3 z-10 rounded-full border-2 border-gold bg-forest/90 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-gold-light">
        {category === "Large Animal" ? "Large" : "Small"}
      </span>
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-0 left-0 rounded-tr-lg bg-ink/70 px-2 py-0.5 font-mono text-[10px] text-paper">
          No. {String(index).padStart(3, "0")}
        </span>
      </div>

      <div className="px-4 pb-4 pt-6">
        <h3 className="font-display text-lg font-semibold leading-tight text-ink">
          {name}
        </h3>
        <p className="mt-0.5 text-xs text-ink/60">
          {breed} &middot; {type} &middot; {location}
        </p>

        <div className="mt-3 flex items-center justify-between font-mono text-xs text-ink/70">
          <span>{weight} kg</span>
          <span className="text-base font-bold text-rust">
            ৳{price.toLocaleString("en-BD")}
          </span>
        </div>

        <Link
          href={`/animals/${id}`}
          className="mt-4 block rounded-md bg-forest py-2 text-center text-sm font-semibold text-paper transition-colors hover:bg-forest-dark"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default AnimalCard;
