import { useEffect, useState } from 'react';
import {
  getSiteImages,
  getSiteSettings,
  getTestimonials,
  type SiteImage,
  type Testimonial,
} from '@/lib/cms';

const useCmsContent = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [images, setImages] = useState<Record<string, SiteImage>>({});
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const [settingsData, imagesData, testimonialsData] = await Promise.all([
          getSiteSettings(),
          getSiteImages(),
          getTestimonials(),
        ]);

        if (!isMounted) return;

        setSettings(settingsData);
        setImages(imagesData);
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error('Failed to load CMS content:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const getSetting = (key: string, fallback: string) => {
    const value = settings[key];
    return value && value.trim().length ? value : fallback;
  };

  const getImage = (key: string, fallbackSrc: string, fallbackAlt: string) => {
    const image = images[key];

    return {
      src: image?.image_url || fallbackSrc,
      alt: image?.alt_text || fallbackAlt,
      title: image?.title || '',
      page: image?.page || '',
    };
  };

  return {
    settings,
    images,
    testimonials,
    isLoading,
    getSetting,
    getImage,
  };
};

export default useCmsContent;