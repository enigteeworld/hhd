import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock, Users, Baby,
  Palette, Music, BookOpen,
  Utensils, Moon, Heart,
  Sun, TreePine, Bike,
  Star, Quote
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { SITE } from '@/lib/site';
import ImageShowcase from '@/components/ImageShowcase';

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Baby, label: 'Ages 6 months – 5 years' },
    { icon: Clock, label: 'Open 7:30 AM – 6:00 PM' },
    { icon: Users, label: 'Small group sizes' },
  ];

  const features = [
    {
      icon: Palette,
      title: 'Sensory & Messy Play',
      description: 'Hands-on exploration that sparks creativity and cognitive development.',
    },
    {
      icon: Music,
      title: 'Music & Movement',
      description: 'Rhythm, dance, and song to develop coordination and self-expression.',
    },
    {
      icon: BookOpen,
      title: 'Early Literacy',
      description: 'Storytime and phonics games that build a love for reading.',
    },
  ];

  const careFeatures = [
    { icon: Utensils, title: 'Nutritious Meals', desc: 'Balanced, child-friendly menus' },
    { icon: Moon, title: 'Restful Naps', desc: 'Calm environment for quality sleep' },
    { icon: Heart, title: 'Personal Care', desc: 'Individual attention to each child' },
  ];

  const outdoorFeatures = [
    { icon: Sun, title: 'Daily Outdoor Time', desc: 'Fresh air and sunshine every day' },
    { icon: TreePine, title: 'Nature Exploration', desc: 'Gardening and wildlife discovery' },
    { icon: Bike, title: 'Physical Play', desc: 'Bikes, climbing, and active games' },
  ];

  const testimonials = [
    {
      quote: "The team made settling in so gentle—our daughter runs in smiling every morning. We couldn't be happier with the care she receives.",
      author: 'Sarah & James Mitchell',
      rating: 5,
    },
    {
      quote: "Communication is brilliant. We get daily updates and photos that really matter. It feels like we're part of their day.",
      author: 'Amina Khan',
      rating: 5,
    },
    {
      quote: "It feels like a second home—caring, organized, and genuinely fun. Our son has learned so much since joining.",
      author: 'David Richardson',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-nursery-cream">
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden pb-16 pt-32">
        {/* Background Hills */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 1440 400"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 400L60 380C120 360 240 320 360 300C480 280 600 280 720 290C840 300 960 320 1080 330C1200 340 1320 340 1380 340L1440 340V400H1380C1320 400 1200 400 1080 400C960 400 840 400 720 400C600 400 480 400 360 400C240 400 120 400 60 400H0Z"
              fill="#B6D7A8"
              opacity="0.6"
            />
          </svg>
          <svg
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 1440 320"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 320L80 300C160 280 320 240 480 230C640 220 800 240 960 250C1120 260 1280 260 1360 260L1440 260V320H1360C1280 320 1120 320 960 320C800 320 640 320 480 320C320 320 160 320 80 320H0Z"
              fill="#D8E8C8"
              opacity="0.8"
            />
          </svg>
          <svg
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 1440 240"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 240L100 220C200 200 400 160 600 150C800 140 1000 150 1200 160C1300 165 1400 170 1450 172.5L1500 175V240H1450C1400 240 1300 240 1200 240C1000 240 800 240 600 240C400 240 200 240 100 240H0Z"
              fill="#E8F4D8"
            />
          </svg>
        </div>

        {/* Sun decoration */}
        <div className="absolute right-[15%] top-28 h-24 w-24 rounded-full bg-nursery-tangerine opacity-90 animate-pulse-soft float-soft md:h-32 md:w-32" />

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <span className="label-uppercase mb-4 block scroll-animate opacity-0">
                Happy Hearts Daycare
              </span>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-nursery-slate leading-tight mb-6 scroll-animate opacity-0"
                style={{ animationDelay: '100ms' }}
              >
                Nurturing curiosity.<br />
                <span className="text-nursery-tangerine">Building bright futures.</span>
              </h1>
              <p
                className="text-lg text-nursery-slate-muted mb-8 max-w-lg scroll-animate opacity-0"
                style={{ animationDelay: '200ms' }}
              >
                A warm, secure place where early learning feels like play. We provide exceptional care for children aged 6 months to 5 years.
              </p>
              <div
                className="flex flex-wrap gap-4 scroll-animate opacity-0"
                style={{ animationDelay: '300ms' }}
              >
                <Link to="/contact" className="btn-primary">
                  Book a Tour
                </Link>
                <Link to="/programs" className="btn-outline">
                  Explore Programs
                </Link>
              </div>

              {/* Stats */}
              <div
                className="grid grid-cols-3 gap-4 mt-12 scroll-animate opacity-0"
                style={{ animationDelay: '400ms' }}
              >
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-soft hover:shadow-soft-lg transition-shadow"
                  >
                    <stat.icon className="w-6 h-6 text-nursery-tangerine mx-auto mb-2" />
                    <p className="text-xs text-nursery-slate-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div
              className="order-1 lg:order-2 scroll-animate opacity-0"
              style={{ animationDelay: '200ms' }}
            >
              <ImageShowcase
                src="/hero-child.jpg"
                alt="Happy child at daycare"
                tilt="right"
                badge={{ emoji: '⭐', eyebrow: '5.0 Rating', text: 'From 50+ parents', position: 'bottom-left' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Learning Through Play Section */}
      <section ref={featuresRef} className="relative py-24 overflow-hidden">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="scroll-animate opacity-0">
              <ImageShowcase
                src="/activity-painting.jpg"
                alt="Child painting"
                tilt="left"
                badge={{ emoji: '🎨', eyebrow: 'Creative play', text: 'Messy play every single day', position: 'top-right' }}
              />
            </div>

            {/* Content */}
            <div className="scroll-animate opacity-0">
              <span className="label-uppercase mb-4 block">Learning Through Play</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-nursery-slate mb-6">
                Hands-on activities that <span className="text-nursery-tangerine">spark joy.</span>
              </h2>
              <p className="text-nursery-slate-muted mb-8 text-lg">
                We follow a child-led approach with plenty of sensory play, art, music, and movement—so every day feels like an adventure.
              </p>

              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="icon-circle flex-shrink-0">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-nursery-slate mb-1">{feature.title}</h4>
                      <p className="text-sm text-nursery-slate-muted">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/programs" className="btn-outline">
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Care & Nutrition Section */}
      <section className="relative py-24 overflow-hidden bg-nursery-mint/30">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1 scroll-animate opacity-0">
              <span className="label-uppercase mb-4 block">Care & Nutrition</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-nursery-slate mb-6">
                A cozy routine.<br />
                <span className="text-nursery-tangerine">Happy kids.</span>
              </h2>
              <p className="text-nursery-slate-muted mb-8 text-lg">
                From settling-in moments to mealtimes and rest, we create a calm rhythm that helps children feel secure and loved.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {careFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-5 shadow-soft hover:shadow-soft-lg transition-shadow"
                  >
                    <div className="icon-circle mb-3">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-nursery-slate text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs text-nursery-slate-muted">{feature.desc}</p>
                  </div>
                ))}
              </div>

              <Link to="/about" className="btn-outline">
                See a Typical Day
              </Link>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2 scroll-animate opacity-0">
              <ImageShowcase
                src="/mealtime-child.jpg"
                alt="Child enjoying healthy meal"
                tilt="right"
                badge={{ emoji: '🍽️', eyebrow: 'Fresh meals', text: 'Prepared daily with little ones in mind', position: 'bottom-right' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Outdoor Exploration Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="scroll-animate opacity-0">
              <ImageShowcase
                src="/outdoor-exploration.jpg"
                alt="Child exploring nature"
                tilt="left"
                badge={{ emoji: '🌿', eyebrow: 'Outdoor time', text: 'Fresh air and big discoveries', position: 'top-right' }}
              />
            </div>

            {/* Content */}
            <div className="scroll-animate opacity-0">
              <span className="label-uppercase mb-4 block">Outdoor Exploration</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-nursery-slate mb-6">
                Fresh air,<br />
                <span className="text-nursery-tangerine">big discoveries.</span>
              </h2>
              <p className="text-nursery-slate-muted mb-8 text-lg">
                Our outdoor time is built into every day—gardening, obstacle play, and nature walks that build confidence and coordination.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {outdoorFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-5 shadow-soft hover:shadow-soft-lg transition-shadow"
                  >
                    <div className="icon-circle mb-3">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-nursery-slate text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs text-nursery-slate-muted">{feature.desc}</p>
                  </div>
                ))}
              </div>

              <Link to="/contact" className="btn-primary">
                Book a Tour
              </Link>
            </div>
          </div>
        </div>
      </section>

     
{/* Team Section */}
      <section className="relative py-24 overflow-hidden bg-nursery-mint/30">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-animate opacity-0">
            <span className="label-uppercase mb-4 block">Meet Our Team</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-nursery-slate mb-6">
              Dedicated <span className="text-nursery-tangerine">professionals</span>
            </h2>
            <p className="text-nursery-slate-muted text-lg">
              Our qualified educators bring passion, experience, and genuine love for early childhood development.
            </p>
          </div>

          <div className="sm:hidden -mx-1 overflow-x-auto px-1 pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-4 pr-6">
              {[
                { name: 'Emma Thompson', role: 'Nursery Director', image: '/team-director.jpg' },
                { name: 'Sophie Williams', role: 'Lead Teacher', image: '/team-teacher1.jpg' },
                { name: 'James Anderson', role: 'Early Years Educator', image: '/team-teacher2.jpg' },
                { name: 'Margaret Chen', role: 'Nursery Nurse', image: '/team-nurse.jpg' },
              ].map((member, index) => (
                <div
                  key={index}
                  className="w-[82%] flex-shrink-0 snap-start bg-white rounded-[2rem] p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 scroll-animate opacity-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-square object-cover rounded-2xl"
                    />
                  </div>
                  <h4 className="font-bold text-nursery-slate text-lg">{member.name}</h4>
                  <p className="text-nursery-tangerine text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Emma Thompson', role: 'Nursery Director', image: '/team-director.jpg' },
              { name: 'Sophie Williams', role: 'Lead Teacher', image: '/team-teacher1.jpg' },
              { name: 'James Anderson', role: 'Early Years Educator', image: '/team-teacher2.jpg' },
              { name: 'Margaret Chen', role: 'Nursery Nurse', image: '/team-nurse.jpg' },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-[2rem] p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 scroll-animate opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover rounded-2xl"
                  />
                </div>
                <h4 className="font-bold text-nursery-slate text-lg">{member.name}</h4>
                <p className="text-nursery-tangerine text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-animate opacity-0">
            <span className="label-uppercase mb-4 block">Testimonials</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-nursery-slate mb-6">
              What <span className="text-nursery-tangerine">parents</span> say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-[2rem] p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 scroll-animate opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Quote className="w-10 h-10 text-nursery-tangerine/30 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-nursery-tangerine fill-nursery-tangerine" />
                  ))}
                </div>
                <p className="text-nursery-slate mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <p className="font-bold text-nursery-slate">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-nursery-tangerine/10" />
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center scroll-animate opacity-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-nursery-slate mb-6">
              Ready to give your child the <span className="text-nursery-tangerine">best start?</span>
            </h2>
            <p className="text-nursery-slate-muted text-lg mb-8">
              Book a personal tour to see our nursery in action. We'd love to show you around!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary">
                Book a Tour
              </Link>
              <a href={SITE.phoneHref} className="btn-outline">
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;