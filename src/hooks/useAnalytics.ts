import { useCallback } from 'react';
import { captureEvent } from '@/lib/posthog';

export interface LinkClickEvent {
  link_id: string;
  link_url: string;
  position: number;
}

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const useAnalytics = () => {
  const trackEvent = useCallback(({ action, category, label, value }: AnalyticsEvent) => {
    try {
      // Google Analytics tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value,
        });
      }

      // Console log for development
      if (process.env.NODE_ENV === 'development') {
        console.log('Analytics Event:', { action, category, label, value });
      }

      // Custom analytics service (if needed)
      // You can add your own analytics service here
      
    } catch (error) {
      console.error('Error tracking analytics event:', error);
    }
  }, []);

  // Clic en un link o red social: un solo punto de entrada para PostHog.
  const trackLinkClick = useCallback((event: LinkClickEvent) => {
    captureEvent('link_click', { ...event });
  }, []);

  const trackPageView = useCallback((pageName: string) => {
    try {
      // gtag('config', 'GA_MEASUREMENT_ID', ...) intentionally removed —
      // placeholder ID would send bogus hits. Page-view tracking is handled
      // by the Vercel Analytics <Analytics /> component rendered in App.tsx.
      if (process.env.NODE_ENV === 'development') {
        console.log('Page View:', pageName);
      }
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }, []);

  const trackTiming = useCallback((name: string, value: number, category: string = 'performance') => {
    try {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'timing_complete', {
          name: name,
          value: value,
          event_category: category,
        });
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('Timing Event:', { name, value, category });
      }
    } catch (error) {
      console.error('Error tracking timing:', error);
    }
  }, []);

  return {
    trackEvent,
    trackLinkClick,
    trackPageView,
    trackTiming,
  };
};