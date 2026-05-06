import { useState, FormEvent } from 'react';
import { Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const SUBSCRIBE_URL = 'https://newsletter.wizneo.org/api/subscribe';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = 'idle' | 'loading' | 'success' | 'error';

const NewsletterCapture = () => {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (website.trim() !== '') {
      setStatus('success');
      return;
    }

    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus('error');
      setErrorMsg('Email inválido. Revisá el formato.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(SUBSCRIBE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, first_name: '' }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        return;
      }

      if (res.status === 409) {
        setStatus('success');
        setEmail('');
        return;
      }

      const body = await res.json().catch(() => ({}));
      setStatus('error');
      setErrorMsg(body.error || 'Algo falló — intentá de nuevo en unos segundos.');
    } catch {
      setStatus('error');
      setErrorMsg('No pudimos conectar. Probá de nuevo.');
    }
  };

  return (
    <section
      className="w-full rounded-xl border border-matrix-green/40 bg-black/60 backdrop-blur-sm
                 p-5 sm:p-6 matrix-border-glow"
      aria-labelledby="newsletter-heading"
    >
      <div className="flex items-center gap-3 mb-3">
        <Mail className="w-5 h-5 text-matrix-green" aria-hidden />
        <h3
          id="newsletter-heading"
          className="text-lg sm:text-xl font-bold font-matrix text-matrix-green tracking-wide"
        >
          Newsletter WIZNEO
        </h3>
      </div>

      <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 font-matrix">
        Resumen del mundo IA cada lunes. Sin jerga, en español, con la voz de Ulises.
      </p>

      {status === 'success' ? (
        <div
          className="flex items-start gap-3 rounded-lg border border-matrix-green/50
                     bg-matrix-green/5 px-4 py-3"
          role="status"
        >
          <CheckCircle2 className="w-5 h-5 text-matrix-green shrink-0 mt-0.5" aria-hidden />
          <p className="text-sm text-gray-200 font-matrix leading-relaxed">
            Listo. Revisá tu email — hay un mensaje de bienvenida con todo lo que vas a recibir.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-3">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
            aria-hidden="true"
          />

          <div className="flex flex-col sm:flex-row gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              disabled={status === 'loading'}
              className="flex-1 rounded-lg bg-black/80 border border-matrix-green/30
                         px-4 py-3 text-sm sm:text-base text-white placeholder-gray-500
                         font-matrix
                         focus:outline-none focus:border-matrix-green focus:ring-1
                         focus:ring-matrix-green
                         disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-lg bg-matrix-green text-black font-bold font-matrix
                         px-5 py-3 text-sm sm:text-base tracking-wide
                         transition-all duration-200
                         hover:bg-matrix-green/90 hover:shadow-[0_0_20px_rgba(0,255,65,0.4)]
                         active:scale-[0.98]
                         disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2 min-w-[140px]"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                  <span>Enviando…</span>
                </>
              ) : (
                <span>Suscribirme</span>
              )}
            </button>
          </div>

          {status === 'error' && (
            <div className="flex items-start gap-2 text-xs sm:text-sm text-red-400" role="alert">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden />
              <span>{errorMsg}</span>
            </div>
          )}

          <p className="text-[11px] sm:text-xs text-gray-500 font-matrix opacity-70">
            Sin spam. Te podés desuscribir cuando quieras.
          </p>
        </form>
      )}
    </section>
  );
};

export default NewsletterCapture;
