import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  Image as ImageIcon,
  Quote,
  LogOut,
  Save,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Clock,
  Loader2,
  Upload,
  User,
  LayoutDashboard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { supabase } from '@/lib/supabase';
import {
  createTestimonial,
  getSiteImages,
  getSiteSettings,
  getTestimonials,
  updateSiteImage,
  updateSiteSetting,
  uploadSiteImage,
  type SiteImage,
  type Testimonial,
} from '@/lib/cms';

type SettingsState = {
  site_name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  opening_hours: string;
  hero_title: string;
  hero_subtitle: string;
  footer_text: string;
  meta_description: string;
  about_text: string;
};

const defaultSettings: SettingsState = {
  site_name: 'Happy Hearts Daycare',
  phone: '+44 7449 529831',
  whatsapp: '+44 7449 529831',
  email: 'happyheart1925@outlook.com',
  address: '173 Ashley Lane, Manchester, M9 4NQ',
  opening_hours: 'Mon - Fri: 7:30 AM - 6:00 PM',
  hero_title: 'Nurturing curiosity. Building bright futures.',
  hero_subtitle: 'A warm, secure place where early learning feels like play.',
  footer_text: 'A warm, secure place where early learning feels like play.',
  meta_description:
    'Premium daycare in Manchester providing exceptional care for children aged 6 months to 5 years.',
  about_text:
    'Happy Hearts Daycare started with a simple vision: to create a childcare setting that we would want for our own children.',
};

const imageFallbacks: Record<string, Omit<SiteImage, 'id'>> = {
  home_hero_image: {
    key: 'home_hero_image',
    title: 'Homepage Hero',
    image_url: '/hero-banner.jpg',
    alt_text: 'Happy child at daycare',
    page: 'home',
  },
  home_learning_image: {
    key: 'home_learning_image',
    title: 'Homepage Learning',
    image_url: '/activity-painting.jpg',
    alt_text: 'Child painting',
    page: 'home',
  },
  home_nutrition_image: {
    key: 'home_nutrition_image',
    title: 'Homepage Nutrition',
    image_url: '/mealtime-child.jpg',
    alt_text: 'Child enjoying healthy meal',
    page: 'home',
  },
  home_outdoor_image: {
    key: 'home_outdoor_image',
    title: 'Homepage Outdoor',
    image_url: '/outdoor-exploration.jpg',
    alt_text: 'Child exploring nature',
    page: 'home',
  },
  about_hero_image: {
    key: 'about_hero_image',
    title: 'About Hero',
    image_url: '/nursery-interior.jpg',
    alt_text: 'Happy Hearts Daycare interior',
    page: 'about',
  },
  about_gallery_one: {
    key: 'about_gallery_one',
    title: 'About Gallery One',
    image_url: '/children-playing.jpg',
    alt_text: 'Children playing',
    page: 'about',
  },
  about_gallery_two: {
    key: 'about_gallery_two',
    title: 'About Gallery Two',
    image_url: '/activity-painting.jpg',
    alt_text: 'Art activities',
    page: 'about',
  },
  about_gallery_three: {
    key: 'about_gallery_three',
    title: 'About Gallery Three',
    image_url: '/mealtime-child.jpg',
    alt_text: 'Meal time',
    page: 'about',
  },
  about_gallery_four: {
    key: 'about_gallery_four',
    title: 'About Gallery Four',
    image_url: '/outdoor-exploration.jpg',
    alt_text: 'Outdoor play',
    page: 'about',
  },
  programs_banner_image: {
    key: 'programs_banner_image',
    title: 'Programs Banner',
    image_url: '/programs-banner.jpg',
    alt_text: 'Children in class',
    page: 'programs',
  },
  contact_banner_image: {
    key: 'contact_banner_image',
    title: 'Contact Banner',
    image_url: '/contact-banner.jpg',
    alt_text: 'Nursery contact banner',
    page: 'contact',
  },
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('general');
  const [isBooting, setIsBooting] = useState(true);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [images, setImages] = useState<Record<string, SiteImage>>({});
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const [testimonialForm, setTestimonialForm] = useState({
    author: '',
    quote: '',
    rating: 5,
  });
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);

  useEffect(() => {
    const boot = async () => {
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        navigate('/admin');
        return;
      }

      try {
        const [settingsMap, imagesMap, testimonialsData] = await Promise.all([
          getSiteSettings(),
          getSiteImages(),
          getTestimonials(),
        ]);

        setSettings({
          site_name: settingsMap.site_name ?? defaultSettings.site_name,
          phone: settingsMap.phone ?? defaultSettings.phone,
          whatsapp: settingsMap.whatsapp ?? defaultSettings.whatsapp,
          email: settingsMap.email ?? defaultSettings.email,
          address: settingsMap.address ?? defaultSettings.address,
          opening_hours: settingsMap.opening_hours ?? defaultSettings.opening_hours,
          hero_title: settingsMap.hero_title ?? defaultSettings.hero_title,
          hero_subtitle: settingsMap.hero_subtitle ?? defaultSettings.hero_subtitle,
          footer_text: settingsMap.footer_text ?? defaultSettings.footer_text,
          meta_description:
            settingsMap.meta_description ?? defaultSettings.meta_description,
          about_text: settingsMap.about_text ?? defaultSettings.about_text,
        });

        setImages(imagesMap);
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error('Failed to load admin data:', error);
      } finally {
        setIsBooting(false);
      }
    };

    boot();
  }, [navigate]);

  const mergedImages = useMemo(() => {
    const result: Record<string, SiteImage> = { ...images };
    Object.entries(imageFallbacks).forEach(([key, value]) => {
      if (!result[key]) {
        result[key] = { id: key, ...value };
      }
    });
    return result;
  }, [images]);

  const imageList = useMemo(
    () =>
      Object.values(mergedImages).sort((a, b) =>
        (a.page ?? '').localeCompare(b.page ?? '') || (a.title ?? '').localeCompare(b.title ?? ''),
      ),
    [mergedImages],
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const handleSettingChange = (key: keyof SettingsState, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    setIsSavingSettings(true);

    try {
      await Promise.all(
        Object.entries(settings).map(([key, value]) => updateSiteSetting(key, value)),
      );
      setShowSaveDialog(true);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleImageFieldChange = (
    key: string,
    field: 'title' | 'alt_text' | 'page',
    value: string,
  ) => {
    setImages((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] ?? { id: key, ...imageFallbacks[key] }),
        [field]: value,
      },
    }));
  };

  const handleImageMetaSave = async (key: string) => {
    const current = mergedImages[key];
    if (!current) return;

    try {
      await updateSiteImage({
        key: current.key,
        title: current.title ?? '',
        image_url: current.image_url,
        alt_text: current.alt_text ?? '',
        page: current.page ?? '',
      });
      setShowSaveDialog(true);
    } catch (error) {
      console.error('Failed to save image metadata:', error);
    }
  };

  const handleImageUpload = async (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingKey(key);

    try {
      const extension = file.name.split('.').pop() || 'jpg';
      const filePath = `${key}-${Date.now()}.${extension}`;
      const publicUrl = await uploadSiteImage(file, filePath);

      const current = mergedImages[key] ?? {
        id: key,
        ...imageFallbacks[key],
      };

      await updateSiteImage({
        key,
        title: current.title ?? '',
        image_url: publicUrl,
        alt_text: current.alt_text ?? '',
        page: current.page ?? '',
      });

      setImages((prev) => ({
        ...prev,
        [key]: {
          ...current,
          image_url: publicUrl,
        },
      }));

      setShowSaveDialog(true);
    } catch (error) {
      console.error('Failed to upload image:', error);
    } finally {
      setUploadingKey(null);
      event.target.value = '';
    }
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingTestimonial(true);

    try {
      await createTestimonial({
        author: testimonialForm.author.trim(),
        quote: testimonialForm.quote.trim(),
        rating: testimonialForm.rating,
      });

      const refreshed = await getTestimonials();
      setTestimonials(refreshed);
      setTestimonialForm({
        author: '',
        quote: '',
        rating: 5,
      });
      setShowSaveDialog(true);
    } catch (error) {
      console.error('Failed to add testimonial:', error);
    } finally {
      setIsAddingTestimonial(false);
    }
  };

  if (isBooting) {
    return (
      <div className="min-h-screen bg-nursery-cream flex items-center justify-center">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-soft">
          <Loader2 className="h-5 w-5 animate-spin text-nursery-tangerine" />
          <p className="font-medium text-nursery-slate">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nursery-cream">
      <header className="sticky top-0 z-50 border-b border-nursery-mint bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <img src="/logo-cropped.png" alt="Logo" className="h-10 w-auto" />
            <div>
              <h1 className="font-bold text-nursery-slate">Admin Dashboard</h1>
              <p className="text-xs text-nursery-slate-muted">
                Happy Hearts Daycare
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleSaveSettings}
              disabled={isSavingSettings}
              className="btn-primary border-0 flex items-center gap-2"
            >
              {isSavingSettings ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Settings
            </Button>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-nursery-mint text-nursery-slate hover:bg-nursery-mint"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="sticky top-[73px] min-h-[calc(100vh-73px)] w-64 border-r border-nursery-mint bg-white">
          <nav className="p-4">
            <Tabs
              orientation="vertical"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="flex h-auto w-full flex-col gap-1 bg-transparent">
                <TabsTrigger
                  value="general"
                  className="w-full justify-start gap-3 rounded-xl px-4 py-3 data-[state=active]:bg-nursery-tangerine data-[state=active]:text-white"
                >
                  <Settings className="h-5 w-5" />
                  General Settings
                </TabsTrigger>

                <TabsTrigger
                  value="images"
                  className="w-full justify-start gap-3 rounded-xl px-4 py-3 data-[state=active]:bg-nursery-tangerine data-[state=active]:text-white"
                >
                  <ImageIcon className="h-5 w-5" />
                  Images
                </TabsTrigger>

                <TabsTrigger
                  value="testimonials"
                  className="w-full justify-start gap-3 rounded-xl px-4 py-3 data-[state=active]:bg-nursery-tangerine data-[state=active]:text-white"
                >
                  <Quote className="h-5 w-5" />
                  Testimonials
                </TabsTrigger>

                <TabsTrigger
                  value="account"
                  className="w-full justify-start gap-3 rounded-xl px-4 py-3 data-[state=active]:bg-nursery-tangerine data-[state=active]:text-white"
                >
                  <User className="h-5 w-5" />
                  Account
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="general" className="mt-0">
              <div className="max-w-4xl">
                <h2 className="mb-6 text-2xl font-bold text-nursery-slate">
                  General Settings
                </h2>

                <div className="space-y-6 rounded-[2rem] bg-white p-8 shadow-soft">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Site Name</Label>
                      <Input
                        value={settings.site_name}
                        onChange={(e) =>
                          handleSettingChange('site_name', e.target.value)
                        }
                        className="rounded-xl border-nursery-mint"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-nursery-slate-muted" />
                        <Input
                          value={settings.phone}
                          onChange={(e) =>
                            handleSettingChange('phone', e.target.value)
                          }
                          className="rounded-xl border-nursery-mint pl-12"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>WhatsApp Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-nursery-slate-muted" />
                        <Input
                          value={settings.whatsapp}
                          onChange={(e) =>
                            handleSettingChange('whatsapp', e.target.value)
                          }
                          className="rounded-xl border-nursery-mint pl-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-nursery-slate-muted" />
                        <Input
                          value={settings.email}
                          onChange={(e) =>
                            handleSettingChange('email', e.target.value)
                          }
                          className="rounded-xl border-nursery-mint pl-12"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-nursery-slate-muted" />
                      <Input
                        value={settings.address}
                        onChange={(e) =>
                          handleSettingChange('address', e.target.value)
                        }
                        className="rounded-xl border-nursery-mint pl-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Opening Hours</Label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-nursery-slate-muted" />
                      <Input
                        value={settings.opening_hours}
                        onChange={(e) =>
                          handleSettingChange('opening_hours', e.target.value)
                        }
                        className="rounded-xl border-nursery-mint pl-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Hero Title</Label>
                    <Textarea
                      value={settings.hero_title}
                      onChange={(e) =>
                        handleSettingChange('hero_title', e.target.value)
                      }
                      className="resize-none rounded-xl border-nursery-mint"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Hero Subtitle</Label>
                    <Textarea
                      value={settings.hero_subtitle}
                      onChange={(e) =>
                        handleSettingChange('hero_subtitle', e.target.value)
                      }
                      className="resize-none rounded-xl border-nursery-mint"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>About Text</Label>
                    <Textarea
                      value={settings.about_text}
                      onChange={(e) =>
                        handleSettingChange('about_text', e.target.value)
                      }
                      className="resize-none rounded-xl border-nursery-mint"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Footer Text</Label>
                    <Textarea
                      value={settings.footer_text}
                      onChange={(e) =>
                        handleSettingChange('footer_text', e.target.value)
                      }
                      className="resize-none rounded-xl border-nursery-mint"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Meta Description</Label>
                    <Textarea
                      value={settings.meta_description}
                      onChange={(e) =>
                        handleSettingChange('meta_description', e.target.value)
                      }
                      className="resize-none rounded-xl border-nursery-mint"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="images" className="mt-0">
              <div>
                <h2 className="mb-6 text-2xl font-bold text-nursery-slate">
                  Image Management
                </h2>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                  {imageList.map((image) => (
                    <div key={image.key} className="rounded-[2rem] bg-white p-6 shadow-soft">
                      <div className="mb-4 aspect-video overflow-hidden rounded-2xl bg-nursery-cream">
                        <img
                          src={image.image_url}
                          alt={image.alt_text ?? image.title ?? image.key}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input
                            value={image.title ?? ''}
                            onChange={(e) =>
                              handleImageFieldChange(image.key, 'title', e.target.value)
                            }
                            className="rounded-xl border-nursery-mint"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Alt Text</Label>
                          <Input
                            value={image.alt_text ?? ''}
                            onChange={(e) =>
                              handleImageFieldChange(image.key, 'alt_text', e.target.value)
                            }
                            className="rounded-xl border-nursery-mint"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Page</Label>
                          <Input
                            value={image.page ?? ''}
                            onChange={(e) =>
                              handleImageFieldChange(image.key, 'page', e.target.value)
                            }
                            className="rounded-xl border-nursery-mint"
                          />
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <Label className="cursor-pointer">
                            <Input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(image.key, e)}
                            />
                            <div className="inline-flex items-center justify-center gap-2 rounded-xl bg-nursery-mint px-4 py-3 font-medium text-nursery-slate transition-colors hover:bg-nursery-green-light">
                              {uploadingKey === image.key ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Upload className="h-4 w-4" />
                              )}
                              {uploadingKey === image.key ? 'Uploading...' : 'Change Image'}
                            </div>
                          </Label>

                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleImageMetaSave(image.key)}
                            className="rounded-xl border-nursery-mint"
                          >
                            <Save className="mr-2 h-4 w-4" />
                            Save Details
                          </Button>
                        </div>

                        <p className="break-all text-xs text-nursery-slate-muted">
                          {image.image_url}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="mt-0">
              <div className="grid grid-cols-1 gap-8 xl:grid-cols-[420px_1fr]">
                <div className="rounded-[2rem] bg-white p-8 shadow-soft">
                  <h2 className="mb-6 text-2xl font-bold text-nursery-slate">
                    Add Testimonial
                  </h2>

                  <form onSubmit={handleAddTestimonial} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Author</Label>
                      <Input
                        value={testimonialForm.author}
                        onChange={(e) =>
                          setTestimonialForm((prev) => ({
                            ...prev,
                            author: e.target.value,
                          }))
                        }
                        className="rounded-xl border-nursery-mint"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Quote</Label>
                      <Textarea
                        value={testimonialForm.quote}
                        onChange={(e) =>
                          setTestimonialForm((prev) => ({
                            ...prev,
                            quote: e.target.value,
                          }))
                        }
                        className="resize-none rounded-xl border-nursery-mint"
                        rows={5}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Rating</Label>
                      <Input
                        type="number"
                        min={1}
                        max={5}
                        value={testimonialForm.rating}
                        onChange={(e) =>
                          setTestimonialForm((prev) => ({
                            ...prev,
                            rating: Number(e.target.value || 5),
                          }))
                        }
                        className="rounded-xl border-nursery-mint"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isAddingTestimonial}
                      className="w-full border-0 btn-primary"
                    >
                      {isAddingTestimonial ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Quote className="mr-2 h-4 w-4" />
                      )}
                      Add Testimonial
                    </Button>
                  </form>
                </div>

                <div className="rounded-[2rem] bg-white p-8 shadow-soft">
                  <h2 className="mb-6 text-2xl font-bold text-nursery-slate">
                    Current Testimonials
                  </h2>

                  <div className="space-y-4">
                    {testimonials.length ? (
                      testimonials.map((testimonial) => (
                        <div
                          key={testimonial.id}
                          className="rounded-2xl border border-nursery-mint/70 bg-nursery-cream/60 p-5"
                        >
                          <div className="mb-2 flex items-center justify-between gap-4">
                            <p className="font-bold text-nursery-slate">
                              {testimonial.author}
                            </p>
                            <p className="text-sm font-medium text-nursery-tangerine">
                              {testimonial.rating}/5
                            </p>
                          </div>
                          <p className="text-sm leading-relaxed text-nursery-slate-muted">
                            “{testimonial.quote}”
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-2xl border border-dashed border-nursery-mint p-6 text-center text-sm text-nursery-slate-muted">
                        No testimonials yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="account" className="mt-0">
              <div className="max-w-xl">
                <h2 className="mb-6 text-2xl font-bold text-nursery-slate">
                  Account
                </h2>

                <div className="space-y-6 rounded-[2rem] bg-white p-8 shadow-soft">
                  <div className="flex items-center gap-4 border-b border-nursery-mint pb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-nursery-tangerine text-2xl font-bold text-white">
                      A
                    </div>
                    <div>
                      <h3 className="font-bold text-nursery-slate">Administrator</h3>
                      <p className="text-sm text-nursery-slate-muted">
                        Signed in with Supabase Auth
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-nursery-cream p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <LayoutDashboard className="h-5 w-5 text-nursery-tangerine" />
                      <p className="font-semibold text-nursery-slate">
                        Account is now protected by Supabase
                      </p>
                    </div>
                    <p className="text-sm text-nursery-slate-muted">
                      Password changes should be handled through your Supabase Auth
                      user settings or a future reset flow.
                    </p>
                  </div>

                  <Button
                    onClick={handleLogout}
                    className="w-full border-0 btn-primary"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="rounded-[2rem]">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-nursery-slate">
              Changes Saved
            </DialogTitle>
            <DialogDescription className="text-nursery-slate-muted">
              Your admin updates have been saved successfully.
            </DialogDescription>
          </DialogHeader>

          <Button
            onClick={() => setShowSaveDialog(false)}
            className="mt-4 w-full border-0 btn-primary"
          >
            Got it
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;