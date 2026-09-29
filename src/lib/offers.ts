/**
 * El WIZ AI Club todavía no abre (decisión de Ulises, 2026-09-29): mientras
 * CLUB_OPEN sea false, el bloque del Club es una lista de espera que apunta a la
 * suscripción de la newsletter.
 *
 * Para abrirlo: pon la URL real de la comunidad en CLUB_URL, cambia CLUB_OPEN a
 * true, y actualiza copy y JSON-LD (index.html: quita `availability: PreOrder`
 * y agrega `url`), `public/llms.txt` y `public/llms-full.txt`. Los tests de
 * src/test/offers.test.ts fallarán a propósito hasta que se actualicen.
 */
export const CLUB_OPEN = false;
export const CLUB_URL: string | null = null;

export const CLUB_WAITLIST_URL = 'https://newsletter.wizneo.org/';

export const CLUB_PRICE_LABEL = 'USD 49/mes o USD 490/año';

const withUtm = (base: string, campaign: string): string => {
  const url = new URL(base);
  url.searchParams.set('utm_source', 'wizneo_linkhub');
  url.searchParams.set('utm_medium', 'primary_cta');
  url.searchParams.set('utm_campaign', campaign);
  return url.toString();
};

/** Destino del bloque del Club: la comunidad si está abierta; si no, la lista de espera. */
export const clubHref = (url: string | null = CLUB_URL, open: boolean = CLUB_OPEN): string =>
  open && url ? withUtm(url, 'wiz_ai_club') : withUtm(CLUB_WAITLIST_URL, 'wiz_ai_club_waitlist');
