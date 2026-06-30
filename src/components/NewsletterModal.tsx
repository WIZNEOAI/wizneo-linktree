import React, { useEffect, useRef, useState } from 'react';

// El modal registra el correo directo al newsletter (mismo source of truth:
// Supabase public.leads brand=wizneo). El endpoint del newsletter ya permite
// CORS desde wizneo.org, así que posteamos cross-origin sin backend propio.
const SUBSCRIBE_URL =
  (import.meta.env.VITE_NEWSLETTER_SUBSCRIBE_URL as string | undefined) ||
  'https://newsletter.wizneo.org/api/subscribe';
const SEEN_KEY = 'wizneo_news_modal_seen';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'loading' | 'success' | 'error';

const NewsletterModal = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let seen = false;
    try { seen = localStorage.getItem(SEEN_KEY) === '1'; } catch { /* ignore */ }
    if (seen) return;
    const t = window.setTimeout(() => setOpen(true), 1400);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const markSeen = () => { try { localStorage.setItem(SEEN_KEY, '1'); } catch { /* ignore */ } };
  const close = () => { setOpen(false); markSeen(); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) { close(); return; } // bot trap
    if (!EMAIL_RE.test(email)) { setError('Escribe un correo válido'); return; }
    setStatus('loading'); setError('');
    try {
      const res = await fetch(SUBSCRIBE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), website: '', consent: true }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false) {
        setStatus('error');
        setError(data.error || 'Algo falló. Intenta de nuevo en un momento.');
        return;
      }
      setStatus('success');
      markSeen();
    } catch {
      setStatus('error');
      setError('No se pudo conectar. Intenta de nuevo.');
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4
                 bg-black/75 backdrop-blur-sm animate-in fade-in-0 duration-200"
      onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="news-modal-title"
    >
      <div
        className="relative w-full max-w-sm rounded-2xl border border-matrix-green/40 bg-black/95 p-6
                   shadow-[0_0_40px_rgba(0,255,136,0.15)] font-matrix
                   animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 sm:slide-in-from-bottom-0 duration-300"
      >
        <button
          onClick={close}
          aria-label="Cerrar"
          className="absolute right-3 top-3 h-8 w-8 rounded-full text-gray-500 hover:text-matrix-green
                     transition-colors text-lg leading-none active:scale-95"
        >
          ×
        </button>

        {status === 'success' ? (
          <div className="text-center space-y-3 py-3">
            <div className="mx-auto w-14 h-14 rounded-full border-2 border-matrix-green bg-matrix-green/15
                            flex items-center justify-center text-matrix-green text-2xl font-bold">✓</div>
            <h2 className="text-xl font-bold text-matrix-green">¡Listo!</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Revisa tu correo para la bienvenida. Nos vemos el viernes.
            </p>
            <button
              onClick={close}
              className="mt-1 w-full rounded-md border border-matrix-green/40 text-matrix-green
                         py-2.5 text-sm font-bold hover:bg-matrix-green/10 transition-colors active:scale-[0.98]"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <p className="text-[10px] uppercase tracking-[0.24em] text-matrix-green/70 mb-2">
              boletín wizneo · gratis
            </p>
            <h2 id="news-modal-title" className="text-xl font-bold text-white leading-tight mb-1">
              Cada viernes, IA sin humo.
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Déjame tu correo y te mando lo que sí importa de inteligencia artificial, aterrizado a la práctica.
            </p>
            <form onSubmit={submit} className="space-y-3">
              <input
                type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
                value={website} onChange={(e) => setWebsite(e.target.value)}
                className="hidden"
              />
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                placeholder="tu@correo.com"
                className="w-full rounded-md border border-matrix-green/30 bg-black/60 px-3 py-2.5
                           text-white placeholder:text-gray-600 focus:outline-none focus:border-matrix-green/70
                           transition-colors"
              />
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-md bg-matrix-green text-black font-bold py-2.5 text-sm
                           transition-all hover:bg-matrix-green/90 active:scale-[0.98] disabled:opacity-60"
              >
                {status === 'loading' ? 'Suscribiendo…' : 'Suscribirme gratis'}
              </button>
            </form>
            <button
              onClick={close}
              className="mt-3 w-full text-center text-xs text-gray-500 hover:text-gray-400 transition-colors"
            >
              Ahora no
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsletterModal;
