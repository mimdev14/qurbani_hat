import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-forest-dark text-paper/90">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <Link href="/" className="font-display text-2xl font-semibold text-paper">
            Qurbani<span className="text-gold">Hat</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/65">
            A trusted haat for finding, comparing and booking cows and goats
            for Qurbani, connecting families with verified sellers across
            Bangladesh.
          </p>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-paper/75">
            <li>Barisal, Bangladesh</li>
            <li>
              <a href="mailto:hello@qurbanihat.com" className="hover:text-gold-light">
                hello@qurbanihat.com
              </a>
            </li>
            <li>
              <a href="tel:+8801xxxxxx" className="hover:text-gold-light">
                +880 1xxxxxxxxxx
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
            About &amp; Social
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-paper/75">
            QurbaniHat was built to make Qurbani planning simple: browse
            verified animals, compare prices honestly, and book with
            confidence before Eid.
          </p>
          <div className="mt-4 flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 transition-colors hover:border-gold hover:text-gold-light"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H17V3.7c-.28-.04-1.25-.12-2.37-.12-2.35 0-3.96 1.43-3.96 4.06V10H8v3.1h2.67V21h2.83Z" />
              </svg>
            </a>
            <a
              href="https://wa.me/xxxxxxxx"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 transition-colors hover:border-gold hover:text-gold-light"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.05-1.33A10 10 0 1 0 12 2Zm0 18.2a8.15 8.15 0 0 1-4.16-1.14l-.3-.18-3 .79.8-2.93-.19-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.13c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.17-.7-.62-1.18-1.39-1.32-1.63-.14-.24-.02-.36.1-.48.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.8-.2-.47-.4-.4-.55-.41h-.47c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.34 1 2.5c.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
              </svg>
            </a>
            <a
              href="https://github.com/mimdev14"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 transition-colors hover:border-gold hover:text-gold-light"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.85-2.35 4.7-4.58 4.94.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-paper/10 py-4 text-center font-mono text-xs text-paper/50">
        © {new Date().getFullYear()} QurbaniHat. Built for Eid-ul-Adha.
      </div>
    </footer>
  );
};

export default Footer;
