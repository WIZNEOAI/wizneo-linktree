import { useCallback } from 'react';

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

  const trackPageView = useCallback((pageName: string) => {
    try {
      if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: pageName,
          page_location: window.location.href,
        });
      }

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
    trackPageView,
    trackTiming,
  };
};