/**
 * URL del WIZ AI Club en Skool.
 *
 * TODO(ulises): URL real de Skool. Al 2026-09-29 ninguna fuente verificada la trae
 * (Notion "Skool — preparar inauguración" la lista como pendiente). Este valor es
 * un placeholder, NO la comunidad: reemplazar antes de mergear.
 */
export const CLUB_URL = 'https://www.skool.com/';

export const CLUB_PRICE_LABEL = 'USD 49/mes o USD 490/año';

/** Une el UTM de esta página a la URL del Club. */
export const clubUrlWithUtm = (base: string = CLUB_URL): string => {
  const url = new URL(base);
  url.searchParams.set('utm_source', 'wizneo_linkhub');
  url.searchParams.set('utm_medium', 'primary_cta');
  url.searchParams.set('utm_campaign', 'wiz_ai_club');
  return url.toString();
};
