import { useEffect, useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SITE } from '@/lib/site';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    childAge: '',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        childAge: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: SITE.addressLines,
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [SITE.email],
      link: `mailto:${SITE.email}`,
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [SITE.phoneDisplay],
      link: SITE.phoneHref,
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      details: ['Mon - Fri: 7:30 AM - 6:00 PM', 'Sat - Sun: Closed'],
    },
  ];

  return (
    <div className="min-h-screen bg-nursery-cream">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-nursery-mint/30 rounded-l-[100px] -z-10" />
        
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto scroll-animate opacity-0">
            <span className="label-uppercase mb-4 block">Get In Touch</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-nursery-slate leading-tight mb-6">
              Ready to join?<br />
              <span className="text-nursery-tangerine">Let's talk.</span>
            </h1>
            <p className="text-lg text-nursery-slate-muted">
              Tell us a little about your family and we'll get back within 1 business day to arrange a visit.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 scroll-animate opacity-0">
              <h2 className="text-2xl font-bold text-nursery-slate mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="icon-circle flex-shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-nursery-slate mb-1">{item.title}</h4>
                      {item.details.map((detail, dIndex) => (
                        item.link ? (
                          <a
                            key={dIndex}
                            href={item.link}
                            className="block text-nursery-slate-muted hover:text-nursery-tangerine transition-colors text-sm"
                          >
                            {detail}
                          </a>
                        ) : (
                          <p key={dIndex} className="text-nursery-slate-muted text-sm">
                            {detail}
                          </p>
                        )
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
                {[
                  { label: 'Free Tour', desc: 'No obligation' },
                  { label: 'No Waiting List', desc: 'Enquire today' },
                  { label: 'Flexible Sessions', desc: 'Full or part-time' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-4 text-center shadow-soft"
                  >
                    <p className="font-bold text-nursery-slate text-sm">{item.label}</p>
                    <p className="text-nursery-slate-muted text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 scroll-animate opacity-0">
              <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-soft">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-nursery-slate mb-3">
                      Thank You!
                    </h3>
                    <p className="text-nursery-slate-muted">
                      We've received your message and will get back to you within 1 business day.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-nursery-slate mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-nursery-slate-muted mb-8">
                      Fill out the form below and we'll be in touch soon.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-nursery-slate">
                            Your Name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Smith"
                            required
                            className="rounded-xl border-nursery-mint focus:border-nursery-tangerine focus:ring-nursery-tangerine"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-nursery-slate">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                            className="rounded-xl border-nursery-mint focus:border-nursery-tangerine focus:ring-nursery-tangerine"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-nursery-slate">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={SITE.phoneDisplay}
                            className="rounded-xl border-nursery-mint focus:border-nursery-tangerine focus:ring-nursery-tangerine"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="childAge" className="text-nursery-slate">
                            Child's Age
                          </Label>
                          <Select
                            value={formData.childAge}
                            onValueChange={(value) => setFormData({ ...formData, childAge: value })}
                          >
                            <SelectTrigger className="rounded-xl border-nursery-mint focus:border-nursery-tangerine focus:ring-nursery-tangerine">
                              <SelectValue placeholder="Select age range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="6-12m">6 - 12 months</SelectItem>
                              <SelectItem value="1-2y">1 - 2 years</SelectItem>
                              <SelectItem value="2-3y">2 - 3 years</SelectItem>
                              <SelectItem value="3-5y">3 - 5 years</SelectItem>
                              <SelectItem value="not-born">Not born yet</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-nursery-slate">
                          Your Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your requirements, preferred start date, or any questions you have..."
                          rows={5}
                          className="rounded-xl border-nursery-mint focus:border-nursery-tangerine focus:ring-nursery-tangerine resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full btn-primary border-0"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Send Inquiry
                      </Button>

                      <p className="text-xs text-nursery-slate-muted text-center">
                        By submitting this form, you agree to our privacy policy. We'll only use your information to respond to your inquiry.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-nursery-mint/30">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-12 scroll-animate opacity-0">
            <span className="label-uppercase mb-4 block">Find Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-nursery-slate mb-6">
              Come and Say <span className="text-nursery-tangerine">Hello!</span>
            </h2>
            <p className="text-nursery-slate-muted">
              We're conveniently located in Manchester with easy access and parking available.
            </p>
          </div>

          <div className="rounded-[2rem] overflow-hidden shadow-soft scroll-animate opacity-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d75933.03499508977!2d-2.3090288!3d53.5444298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a4d4c5226f5db%3A0xd9be143804fe6baa!2sManchester%20M9%2C%20UK!5e0!3m2!1sen!2sus!4v1704067200000!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Happy Hearts Daycare Location"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="bg-nursery-tangerine rounded-[2rem] p-12 text-center scroll-animate opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Prefer to Call?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Speak directly with our friendly team. We're available Monday to Friday, 7:30 AM to 6:00 PM.
            </p>
            <a
              href={SITE.phoneHref}
              className="inline-block bg-white text-nursery-tangerine font-bold px-8 py-4 rounded-full hover:bg-nursery-cream transition-colors"
            >
              <Phone className="w-5 h-5 inline mr-2" />
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
