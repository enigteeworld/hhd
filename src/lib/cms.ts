import { supabase } from './supabase';

export type SiteSetting = {
  id: string;
  key: string;
  value: string;
};

export type Testimonial = {
  id: string;
  author: string;
  quote: string;
  rating: number;
  is_active: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
};

export async function getSiteSettings() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*');

  if (error) throw error;

  const map = Object.fromEntries((data ?? []).map((item) => [item.key, item.value]));
  return map as Record<string, string>;
}

export async function getTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data ?? []) as Testimonial[];
}

export async function getTeamMembers() {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return (data ?? []) as TeamMember[];
}