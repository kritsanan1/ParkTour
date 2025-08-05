import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run performance monitoring in development
    if (process.env.NODE_ENV !== 'development') return;

    // Monitor Core Web Vitals - only if web-vitals is available
    const loadWebVitals = async () => {
      try {
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
        getCLS(console.log);
        getFID(console.log);  
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      } catch (error) {
        console.log('Web Vitals not available:', error);
      }
    };
    loadWebVitals();

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            console.warn('Long task detected:', entry);
          }
        });
      });
      observer.observe({ entryTypes: ['longtask'] });
    }

    // Monitor largest contentful paint
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP candidate:', lastEntry.startTime);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }, []);

  return null;
}