import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-5 text-center">
      <span className="font-mono text-8xl font-bold text-gold/70">404</span>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink">
        This animal wandered off the haat.
      </h1>
      <p className="mt-2 max-w-md text-ink/60">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved from the website.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-forest px-6 py-2.5 text-sm font-semibold text-paper hover:bg-forest-dark"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
