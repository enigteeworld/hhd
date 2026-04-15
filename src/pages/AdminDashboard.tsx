import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Settings, Image, Phone, Mail, MapPin, 
  LogOut, Save, CheckCircle2, Edit3, User
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
import { SITE } from '@/lib/site';

interface SiteSettings {
  nurseryName: string;
  address: string;
  email: string;
  phone: string;
  openingHours: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  metaDescription: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Site settings state
  const [settings, setSettings] = useState<SiteSettings>({
    nurseryName: 'Happy Hearts Daycare',
    address: SITE.addressLines.join(', '),
    email: SITE.email,
    phone: SITE.phoneDisplay,
    openingHours: 'Mon - Fri: 7:30 AM - 6:00 PM',
    heroTitle: 'Nurturing curiosity. Building bright futures.',
    heroSubtitle: 'A warm, secure place where early learning feels like play.',
    aboutText: 'Happy Hearts Daycare started with a simple vision: to create a childcare setting that we would want for our own children.',
    metaDescription: 'Premium daycare in Manchester providing exceptional care for children aged 6 months to 5 years.',
  });

  // Image management state
  const [images, setImages] = useState([
    { id: 'logo', name: 'Logo', src: '/logo.png', description: 'Main nursery logo' },
    { id: 'hero', name: 'Hero Image', src: '/hero-child.jpg', description: 'Homepage hero image' },
    { id: 'activity', name: 'Activity Image', src: '/activity-painting.jpg', description: 'Learning activities' },
    { id: 'mealtime', name: 'Mealtime Image', src: '/mealtime-child.jpg', description: 'Nutrition & care' },
    { id: 'outdoor', name: 'Outdoor Image', src: '/outdoor-exploration.jpg', description: 'Outdoor play' },
    { id: 'interior', name: 'Nursery Interior', src: '/nursery-interior.jpg', description: 'Facility interior' },
    { id: 'children', name: 'Children Playing', src: '/children-playing.jpg', description: 'Group activities' },
  ]);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin');
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setShowSaveDialog(true);
  };

  const handleImageUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(images.map(img => 
          img.id === id ? { ...img, src: reader.result as string } : img
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSettingChange = (key: keyof SiteSettings, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="min-h-screen bg-nursery-cream">
      {/* Header */}
      <header className="bg-white border-b border-nursery-mint sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            <div>
              <h1 className="font-bold text-nursery-slate">Admin Dashboard</h1>
              <p className="text-xs text-nursery-slate-muted">Happy Hearts Daycare</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="btn-primary border-0 flex items-center gap-2"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-nursery-mint text-nursery-slate hover:bg-nursery-mint"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-nursery-mint min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4">
            <Tabs orientation="vertical" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex flex-col w-full h-auto bg-transparent gap-1">
                <TabsTrigger
                  value="general"
                  className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-[state=active]:bg-nursery-tangerine data-[state=active]:text-white"
                >
                  <Settings className="w-5 h-5" />
                  General Settings
                </TabsTrigger>
                <TabsTrigger
                  value="images"
                  className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-[state=active]:bg-nursery-tangerine data-[state=active]:text-white"
                >
                  <Image className="w-5 h-5" />
                  Images
                </TabsTrigger>
                <TabsTrigger
                  value="content"
                  className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-[state=active]:bg-nursery-tangerine data-[state=active]:text-white"
                >
                  <Edit3 className="w-5 h-5" />
                  Content
                </TabsTrigger>
                <TabsTrigger
                  value="account"
                  className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-[state=active]:bg-nursery-tangerine data-[state=active]:text-white"
                >
                  <User className="w-5 h-5" />
                  Account
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* General Settings */}
            <TabsContent value="general" className="mt-0">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold text-nursery-slate mb-6">General Settings</h2>
                
                <div className="bg-white rounded-[2rem] p-8 shadow-soft space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-nursery-slate">Nursery Name</Label>
                      <Input
                        value={settings.nurseryName}
                        onChange={(e) => handleSettingChange('nurseryName', e.target.value)}
                        className="rounded-xl border-nursery-mint"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-nursery-slate">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nursery-slate-muted" />
                        <Input
                          value={settings.phone}
                          onChange={(e) => handleSettingChange('phone', e.target.value)}
                          className="pl-12 rounded-xl border-nursery-mint"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-nursery-slate">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nursery-slate-muted" />
                      <Input
                        value={settings.email}
                        onChange={(e) => handleSettingChange('email', e.target.value)}
                        className="pl-12 rounded-xl border-nursery-mint"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-nursery-slate">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nursery-slate-muted" />
                      <Input
                        value={settings.address}
                        onChange={(e) => handleSettingChange('address', e.target.value)}
                        className="pl-12 rounded-xl border-nursery-mint"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-nursery-slate">Opening Hours</Label>
                    <div className="relative">
                      <LayoutDashboard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nursery-slate-muted" />
                      <Input
                        value={settings.openingHours}
                        onChange={(e) => handleSettingChange('openingHours', e.target.value)}
                        className="pl-12 rounded-xl border-nursery-mint"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Images */}
            <TabsContent value="images" className="mt-0">
              <div>
                <h2 className="text-2xl font-bold text-nursery-slate mb-6">Image Management</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {images.map((image) => (
                    <div key={image.id} className="bg-white rounded-[2rem] p-6 shadow-soft">
                      <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-nursery-cream">
                        <img
                          src={image.src}
                          alt={image.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-nursery-slate mb-1">{image.name}</h3>
                      <p className="text-nursery-slate-muted text-sm mb-4">{image.description}</p>
                      <Label className="cursor-pointer">
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(image.id, e)}
                        />
                        <div className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-nursery-mint rounded-xl text-nursery-slate font-medium hover:bg-nursery-green-light transition-colors">
                          <Image className="w-4 h-4" />
                          Change Image
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Content */}
            <TabsContent value="content" className="mt-0">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold text-nursery-slate mb-6">Content Management</h2>
                
                <div className="bg-white rounded-[2rem] p-8 shadow-soft space-y-6">
                  <div className="space-y-2">
                    <Label className="text-nursery-slate">Hero Title</Label>
                    <Input
                      value={settings.heroTitle}
                      onChange={(e) => handleSettingChange('heroTitle', e.target.value)}
                      className="rounded-xl border-nursery-mint"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-nursery-slate">Hero Subtitle</Label>
                    <Textarea
                      value={settings.heroSubtitle}
                      onChange={(e) => handleSettingChange('heroSubtitle', e.target.value)}
                      className="rounded-xl border-nursery-mint resize-none"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-nursery-slate">About Text</Label>
                    <Textarea
                      value={settings.aboutText}
                      onChange={(e) => handleSettingChange('aboutText', e.target.value)}
                      className="rounded-xl border-nursery-mint resize-none"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-nursery-slate">Meta Description (SEO)</Label>
                    <Textarea
                      value={settings.metaDescription}
                      onChange={(e) => handleSettingChange('metaDescription', e.target.value)}
                      className="rounded-xl border-nursery-mint resize-none"
                      rows={2}
                    />
                    <p className="text-xs text-nursery-slate-muted">
                      This description appears in search engine results.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Account */}
            <TabsContent value="account" className="mt-0">
              <div className="max-w-xl">
                <h2 className="text-2xl font-bold text-nursery-slate mb-6">Account Settings</h2>
                
                <div className="bg-white rounded-[2rem] p-8 shadow-soft space-y-6">
                  <div className="flex items-center gap-4 pb-6 border-b border-nursery-mint">
                    <div className="w-16 h-16 bg-nursery-tangerine rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      A
                    </div>
                    <div>
                      <h3 className="font-bold text-nursery-slate">Administrator</h3>
                      <p className="text-nursery-slate-muted text-sm">admin</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-nursery-slate">Current Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter current password"
                      className="rounded-xl border-nursery-mint"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-nursery-slate">New Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      className="rounded-xl border-nursery-mint"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-nursery-slate">Confirm New Password</Label>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      className="rounded-xl border-nursery-mint"
                    />
                  </div>

                  <Button className="w-full btn-primary border-0">
                    Update Password
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Save Success Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="rounded-[2rem]">
          <DialogHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-nursery-slate">
              Changes Saved!
            </DialogTitle>
            <DialogDescription className="text-nursery-slate-muted">
              Your changes have been saved successfully. They will be reflected on the website.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setShowSaveDialog(false)}
            className="w-full btn-primary border-0 mt-4"
          >
            Got it
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
