import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Shield, Award, Sparkles,
  CheckCircle2, Calendar, Clock, MapPin
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { SITE } from '@/lib/site';
import ImageShowcase from '@/components/ImageShowcase';

const About = () => {
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

  const values = [
    {
      icon: Heart,
      title: 'Nurturing Care',
      description: 'Every child is treated with individual attention, respect, and unconditional positive regard.',
    },
    {
      icon: Shield,
      title: 'Safe Environment',
      description: 'Our premises are designed with child safety as the top priority, with secure access and constant supervision.',
    },
    {
      icon: Award,
      title: 'Qualified Staff',
      description: 'All our educators are fully qualified, DBS checked, and passionate about early years development.',
    },
    {
      icon: Sparkles,
      title: 'Learning Through Play',
      description: 'We follow the EYFS framework, ensuring children learn naturally through guided play and exploration.',
    },
  ];

  const features = [
    'OFSTED-registered nursery',
    'Fully qualified staff team',
    'Nutritious meals provided',
    'Daily outdoor activities',
    'Regular progress updates',
    'Secure premises with CCTV',
    'Flexible session options',
    'Sibling discounts available',
  ];

  return (
    <div className="min-h-screen bg-nursery-cream">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-nursery-mint/30 rounded-l-[100px] -z-10" />
        
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-animate opacity-0">
              <span className="label-uppercase mb-4 block">About Us</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-nursery-slate leading-tight mb-6">
                More than a nursery,<br />
                <span className="text-nursery-tangerine">we are family.</span>
              </h1>
              <p className="text-lg text-nursery-slate-muted mb-8">
                Happy Hearts Daycare started with a simple vision: to create a childcare setting that we would want for our own children. A place that feels less like an institution and more like an extension of your home.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">
                  Book a Tour
                </Link>
                <Link to="/programs" className="btn-outline">
                  Our Programs
                </Link>
              </div>
            </div>
            <div className="scroll-animate opacity-0">
              <ImageShowcase
                src="/nursery-interior.jpg"
                alt="Happy Hearts Daycare interior"
                tilt="right"
                badge={{ emoji: '🤍', eyebrow: 'Warm welcome', text: 'A calm, homely setting for little learners', position: 'bottom-left' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center scroll-animate opacity-0">
            <span className="label-uppercase mb-4 block">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-bold text-nursery-slate mb-6">
              Building Foundations for the <span className="text-nursery-tangerine">Future</span>
            </h2>
            <p className="text-nursery-slate-muted text-lg leading-relaxed mb-8">
              Founded in 2014, Happy Hearts Daycare has grown from a small home-based nursery to a trusted childcare provider in the Manchester community. Our journey has been guided by one simple principle: every child deserves the best possible start in life.
            </p>
            <p className="text-nursery-slate-muted text-lg leading-relaxed">
              We believe that the early years are the most critical in a child's development. Learning is encouraged through curiosity, play, and supportive adult guidance. Our dedicated team works closely with parents to ensure each child receives personalized care that meets their unique needs.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-nursery-mint/30">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-animate opacity-0">
            <span className="label-uppercase mb-4 block">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-bold text-nursery-slate mb-6">
              What We <span className="text-nursery-tangerine">Stand For</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-[2rem] p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 scroll-animate opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="icon-circle mb-6">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-nursery-slate text-xl mb-3">{value.title}</h3>
                <p className="text-nursery-slate-muted text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Facilities */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-animate opacity-0">
              <span className="label-uppercase mb-4 block">Facilities</span>
              <h2 className="text-3xl md:text-4xl font-bold text-nursery-slate mb-6">
                A Space Designed for <span className="text-nursery-tangerine">Learning & Play</span>
              </h2>
              <p className="text-nursery-slate-muted mb-8">
                Our purpose-built facilities provide a safe, stimulating environment where children can explore, learn, and grow at their own pace.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-nursery-tangerine flex-shrink-0" />
                    <span className="text-nursery-slate text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="scroll-animate opacity-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-[2rem] border-4 border-white shadow-soft transition-transform duration-500 hover:-translate-y-1 hover:rotate-[-1deg]">
                  <img
                    src="/children-playing.jpg"
                    alt="Children playing"
                    className="h-48 w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-8 overflow-hidden rounded-[2rem] border-4 border-white shadow-soft transition-transform duration-500 hover:-translate-y-1 hover:rotate-[1deg]">
                  <img
                    src="/activity-painting.jpg"
                    alt="Art activities"
                    className="h-48 w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                  />
                </div>
                <div className="-mt-8 overflow-hidden rounded-[2rem] border-4 border-white shadow-soft transition-transform duration-500 hover:-translate-y-1 hover:rotate-[1deg]">
                  <img
                    src="/mealtime-child.jpg"
                    alt="Meal time"
                    className="h-48 w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                  />
                </div>
                <div className="overflow-hidden rounded-[2rem] border-4 border-white shadow-soft transition-transform duration-500 hover:-translate-y-1 hover:rotate-[-1deg]">
                  <img
                    src="/outdoor-exploration.jpg"
                    alt="Outdoor play"
                    className="h-48 w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opening Hours & Location */}
      <section className="py-20 bg-nursery-mint/30">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Opening Hours */}
            <div className="bg-white rounded-[2rem] p-8 shadow-soft scroll-animate opacity-0">
              <div className="flex items-center gap-4 mb-6">
                <div className="icon-circle">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-nursery-slate text-2xl">Opening Hours</h3>
              </div>
              <div className="space-y-3">
                {[
                  { day: 'Monday - Friday', hours: '7:30 AM - 6:00 PM' },
                  { day: 'Saturday', hours: 'Closed' },
                  { day: 'Sunday', hours: 'Closed' },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-nursery-mint last:border-0">
                    <span className="text-nursery-slate">{item.day}</span>
                    <span className="font-medium text-nursery-tangerine">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-[2rem] p-8 shadow-soft scroll-animate opacity-0">
              <div className="flex items-center gap-4 mb-6">
                <div className="icon-circle">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-nursery-slate text-2xl">Find Us</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-nursery-tangerine flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-nursery-slate font-medium">Happy Hearts Daycare</p>
                    {SITE.addressLines.map((line) => (
                      <p key={line} className="text-nursery-slate-muted">{line}</p>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-nursery-tangerine flex-shrink-0" />
                  <p className="text-nursery-slate-muted">Open 51 weeks per year (closed Bank Holidays)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="bg-nursery-tangerine rounded-[2rem] p-12 text-center scroll-animate opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Come and See Us!
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              We'd love to show you around our nursery. Book a personal tour and see why families choose Happy Hearts Daycare.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-nursery-tangerine font-bold px-8 py-4 rounded-full hover:bg-nursery-cream transition-colors"
            >
              Book Your Tour Today
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
