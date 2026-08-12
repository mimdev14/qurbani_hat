const LoadingSpinner = ({ label = "Loading" }) => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-forest/15 border-t-gold" />
      </div>
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-forest/70">
        {label}
      </p>
    </div>
  );
};

export default LoadingSpinner;
