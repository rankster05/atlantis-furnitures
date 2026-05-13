import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'atlantis_cookie_consent_v1';

type Consent = 'accepted' | 'rejected';

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // SSR/prerender safety
    if (typeof window === 'undefined') return;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Show after a short delay so it does not clash with the loader animation
        const timer = window.setTimeout(() => setVisible(true), 1500);
        return () => window.clearTimeout(timer);
      }
    } catch {
      // localStorage blocked (private mode etc.) — still show banner
      setVisible(true);
    }
  }, []);

  const persist = (value: Consent) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, timestamp: new Date().toISOString() })
      );
    } catch {
      // ignore — user is in private mode; banner will reappear next visit
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Notificare cookie-uri"
      className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:max-w-md z-[9500] animate-cookie-in"
    >
      <style>{`
        @keyframes cookieIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-cookie-in {
          animation: cookieIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

      <div className="relative bg-atl-dark/95 backdrop-blur-md text-atl-bg rounded-2xl border border-white/10 shadow-2xl p-5 md:p-6">
        <button
          onClick={() => persist('rejected')}
          aria-label="Inchide bannerul de cookie-uri"
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-atl-bg/50 hover:text-atl-bg hover:bg-white/5 transition-all duration-200"
        >
          <X size={14} strokeWidth={1.5} />
        </button>

        <div className="flex items-start gap-3 mb-4">
          <div className="shrink-0 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <Cookie size={16} strokeWidth={1.5} className="text-atl-bg/80" />
          </div>
          <div className="pt-1 pr-6">
            <p className="text-xs uppercase tracking-[0.2em] text-atl-bg/50 font-medium mb-1">
              Confidentialitate
            </p>
            <p className="text-sm md:text-[15px] leading-relaxed text-atl-bg/90 font-light">
              Folosim cookie-uri esentiale pentru a-ti oferi cea mai buna experienta pe site.
              Detalii in{' '}
              <Link
                to="/politica-confidentialitate"
                className="underline underline-offset-2 hover:text-white transition-colors"
              >
                Politica de Confidentialitate
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => persist('accepted')}
            className="flex-1 px-5 py-2.5 bg-atl-bg text-atl-dark text-xs uppercase tracking-[0.15em] font-medium rounded-full hover:bg-white transition-colors duration-300"
          >
            Accept
          </button>
          <button
            onClick={() => persist('rejected')}
            className="px-5 py-2.5 border border-white/15 text-atl-bg/80 text-xs uppercase tracking-[0.15em] font-medium rounded-full hover:border-white/40 hover:text-white transition-all duration-300"
          >
            Refuz
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
