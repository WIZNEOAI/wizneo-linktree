import posthog from 'posthog-js';

const DEFAULT_HOST = 'https://us.i.posthog.com';

let enabled = false;

/**
 * Inicializa PostHog solo si existe VITE_POSTHOG_KEY. Sin llave no hace nada.
 * $pageview se captura automático al inicializar.
 */
export const initPosthog = (): void => {
  enabled = false;
  const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
  if (!key) return;
  try {
    posthog.init(key, {
      api_host: (import.meta.env.VITE_POSTHOG_HOST as string | undefined) || DEFAULT_HOST,
      capture_pageview: true,
    });
    enabled = true;
  } catch (error) {
    console.error('Error initializing PostHog:', error);
  }
};

export const captureEvent = (event: string, properties?: Record<string, unknown>): void => {
  if (!enabled) return;
  try {
    posthog.capture(event, properties);
  } catch (error) {
    console.error('Error capturing PostHog event:', error);
  }
};
