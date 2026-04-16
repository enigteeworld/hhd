import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { getSiteImages, getSiteSettings } from '@/lib/cms';

const HeadManager = () => {
  useEffect(() => {
    let isMounted = true;

    const applyHeadContent = async () => {
      try {
        const [settings, images] = await Promise.all([
          getSiteSettings(),
          getSiteImages(),
        ]);

        if (!isMounted) return;

        const siteName = settings.site_name || 'Happy Hearts Daycare';
        const metaDescription =
          settings.meta_description ||
          'Nurturing curiosity. Building bright futures. A warm, secure place where early learning feels like play.';

        const faviconUrl =
          images.site_favicon?.image_url ||
          '/favicon.png';

        document.title = siteName;

        const setMeta = (
          selector: string,
          attribute: 'name' | 'property',
          key: string,
          content: string,
        ) => {
          let tag = document.head.querySelector<HTMLMetaElement>(selector);

          if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute(attribute, key);
            document.head.appendChild(tag);
          }

          tag.setAttribute('content', content);
        };

        setMeta('meta[name="description"]', 'name', 'description', metaDescription);
        setMeta('meta[property="og:title"]', 'property', 'og:title', siteName);
        setMeta('meta[property="og:description"]', 'property', 'og:description', metaDescription);
        setMeta('meta[property="og:image"]', 'property', 'og:image', faviconUrl);
        setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', siteName);
        setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', metaDescription);
        setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', faviconUrl);

        let favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');

        if (!favicon) {
          favicon = document.createElement('link');
          favicon.rel = 'icon';
          document.head.appendChild(favicon);
        }

        favicon.href = faviconUrl;
      } catch (error) {
        console.error('Failed to apply dynamic head content:', error);
      }
    };

    applyHeadContent();

    return () => {
      isMounted = false;
    };
  }, []);

  return null;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeadManager />
    <App />
  </StrictMode>,
);