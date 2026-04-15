import { supabase } from './supabase';

export type SiteSettingsMap = Record<string, string>;

export type SiteImage = {
  id: string;
  key: string;
  title: string | null;
  image_url: string;
  alt_text: string | null;
  page: string | null;
};

export type Testimonial = {
  id: string;
  author: string;
  quote: string;
  rating: number;
  is_active: boolean;
};

export async function getSiteSettings(): Promise<SiteSettingsMap> {
  const { data, error } = await supabase.from('site_settings').select('key, value');

  if (error) throw error;

  return Object.fromEntries((data ?? []).map((item) => [item.key, item.value ?? '']));
}

export async function getSiteImages(): Promise<Record<string, SiteImage>> {
  const { data, error } = await supabase.from('site_images').select('*');

  if (error) throw error;

  return Object.fromEntries((data ?? []).map((item) => [item.key, item]));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function updateSiteSetting(key: string, value: string) {
  const { error } = await supabase.from('site_settings').upsert(
    { key, value, updated_at: new Date().toISOString() },
    { onConflict: 'key' },
  );

  if (error) throw error;
}

export async function updateSiteImage(input: {
  key: string;
  title?: string;
  image_url: string;
  alt_text?: string;
  page?: string;
}) {
  const { error } = await supabase.from('site_images').upsert(
    {
      key: input.key,
      title: input.title ?? null,
      image_url: input.image_url,
      alt_text: input.alt_text ?? null,
      page: input.page ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'key' },
  );

  if (error) throw error;
}

export async function uploadSiteImage(file: File, path: string) {
  const { error } = await supabase.storage.from('site-media').upload(path, file, {
    upsert: true,
  });

  if (error) throw error;

  const { data } = supabase.storage.from('site-media').getPublicUrl(path);
  return data.publicUrl;
}

export async function createTestimonial(input: {
  author: string;
  quote: string;
  rating: number;
}) {
  const { error } = await supabase.from('testimonials').insert({
    author: input.author,
    quote: input.quote,
    rating: input.rating,
    is_active: true,
  });

  if (error) throw error;
}