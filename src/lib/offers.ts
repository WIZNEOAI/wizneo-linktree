/**
 * El WIZ AI Club abrió el 2026-10-04 (decisión de Ulises) en Skool. Sin precio
 * en la página: el precio vive en Skool.
 *
 * Si el Club vuelve a cerrar: CLUB_OPEN = false, CLUB_URL = null y la card
 * vuelve a apuntar a la lista de espera (CLUB_WAITLIST_URL).
 */
export const CLUB_OPEN = true;
export const CLUB_URL: string | null = 'https://www.skool.com/wiz-ai-club-4087/about';

export const CLUB_WAITLIST_URL = 'https://newsletter.wizneo.org/';

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
