import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Shield,
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  MessageCircleHeart,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { SITE } from '@/lib/site';
import ImageShowcase from '@/components/ImageShowcase';
import useCmsContent from '@/hooks/useCmsContent';

const About = () => {
  const { getSetting, getImage } = useCmsContent();

  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const siteName = getSetting('site_name', SITE.name);
  const openingHours = getSetting('opening_hours', SITE.openingHours);
  const address = getSetting('address', SITE.addressLines.join(', '));

  const addressLines = useMemo(() => {
    const parts = address
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean);

    return parts.length ? parts : SITE.addressLines;
  }, [address]);

  const heroImage = getImage(
    'about_hero_image',
    '/nursery-interior.jpg',
    'Warm and welcoming childminding setting',
  );
  const galleryOne = getImage(
    'about_gallery_one',
    '/children-playing.jpg',
    'Children enjoying play time',
  );
  const galleryTwo = getImage(
    'about_gallery_two',
    '/activity-painting.jpg',
    'Creative play and painting activities',
  );
  const galleryThree = getImage(
    'about_gallery_three',
    '/mealtime-child.jpg',
    'Meal time in a calm setting',
  );
  const galleryFour = getImage(
    'about_gallery_four',
    '/outdoor-exploration.jpg',
    'Outdoor play and exploration',
  );

  const values = [
    {
      icon: Heart,
      title: 'Nurturing care',
      description:
        'Every child is treated with warmth, patience, individual attention, and genuine care.',
    },
    {
      icon: Shield,
      title: 'Safe and welcoming setting',
      description:
        'Children are cared for in an environment where they can feel secure, valued, and confident.',
    },
    {
      icon: Sparkles,
      title: 'Tailored daily activities',
      description:
        'Activities are adapted to each child’s interests, stage of development, and personality.',
    },
    {
      icon: MessageCircleHeart,
      title: 'Strong parent partnership',
      description:
        'Open and honest communication helps build trust, consistency, and peace of mind for families.',
    },
  ];

  const features = [
    'Home-from-home childminding setting',
    'Creative play, story time, and songs',
    'Healthy meals and snacks',
    'Daily outdoor play and walks',
    'Nap and quiet time built into the day',
    'Activities tailored to each child',
    'Warm communication with parents',
    'Inclusive care for different backgrounds and needs',
  ];

  const bioParagraphs = [
    'I am a dedicated and nurturing childminder with a genuine passion for supporting children’s growth, development, and happiness. With a caring and patient approach, I create a safe, welcoming environment where children feel valued, confident, and free to explore the world around them.',
    'I believe every child is unique, and I take pride in tailoring activities to suit each child’s interests and developmental stage. From creative play and story telling to outdoor adventures and early learning activities, I aim to make each day engaging, fun, and enriching.',
    'Building strong relationships with both children and their families is at the heart of what I do. I maintain open, honest communication with parents to help ensure consistency, trust, and peace of mind.',
    'Having lots of experience in adult and elderly care, I have now dedicated myself to caring for children. Over time I have completed mandatory training and worked with people from different cultures and ethnic backgrounds, helping me build a respectful and inclusive approach to care.',
  ];

  return (
    <div className="min-h-screen bg-nursery-cream">
      <Navigation />

      <section className="relative overflow-hidden pb-20 pt-32">
        <div className="absolute top-0 right-0 -z-10 h-full w-1/2 rounded-l-[100px] bg-nursery-mint/30" />

        <div className="section-container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="scroll-animate opacity-0">
              <span className="label-uppercase mb-4 block">About Me</span>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-nursery-slate md:text-5xl lg:text-6xl">
                A caring childminder
                <br />
                <span className="text-nursery-tangerine">you can trust.</span>
              </h1>
              <p className="mb-8 text-lg text-nursery-slate-muted">
                At {siteName}, the focus is on providing warm, home-from-home childcare
                where children feel safe, supported, and happy while learning through
                play and everyday routine.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">
                  Arrange a Visit
                </Link>
                <Link to="/programs" className="btn-outline">
                  See Daily Routine
                </Link>
              </div>
            </div>

            <div className="scroll-animate opacity-0">
              <ImageShowcase
                src={heroImage.src}
                alt={heroImage.alt}
                tilt="right"
                badge={{
                  emoji: '🤍',
                  eyebrow: 'Warm welcome',
                  text: 'A calm, home-from-home setting for little ones',
                  position: 'bottom-left',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="mx-auto max-w-4xl scroll-animate opacity-0">
            <div className="mb-8 text-center">
              <span className="label-uppercase mb-4 block">My Approach</span>
              <h2 className="mb-6 text-3xl font-bold text-nursery-slate md:text-4xl">
                A personal approach to <span className="text-nursery-tangerine">care</span>
              </h2>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-soft sm:p-8 lg:p-10">
              <div className="space-y-6">
                {bioParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base leading-8 text-nursery-slate-muted sm:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-nursery-mint/30 py-20">
        <div className="section-container">
          <div className="mx-auto mb-16 max-w-2xl text-center scroll-animate opacity-0">
            <span className="label-uppercase mb-4 block">What Matters Most</span>
            <h2 className="mb-6 text-3xl font-bold text-nursery-slate md:text-4xl">
              Care built on <span className="text-nursery-tangerine">trust and warmth</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="scroll-animate rounded-[2rem] bg-white p-8 opacity-0 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="icon-circle mb-6">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-nursery-slate">{value.title}</h3>
                <p className="text-sm leading-relaxed text-nursery-slate-muted">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="scroll-animate opacity-0">
              <span className="label-uppercase mb-4 block">A Typical Day</span>
              <h2 className="mb-6 text-3xl font-bold text-nursery-slate md:text-4xl">
                A gentle routine for <span className="text-nursery-tangerine">play, rest, and learning</span>
              </h2>
              <p className="mb-8 text-nursery-slate-muted">
                Children benefit from a calm and consistent routine that includes play,
                meals, stories, outdoor time, naps or quiet time, and warm support
                throughout the day.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-nursery-tangerine" />
                    <span className="text-sm text-nursery-slate">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="scroll-animate opacity-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-[2rem] border-4 border-white shadow-soft transition-transform duration-500 hover:-translate-y-1 hover:rotate-[-1deg]">
                  <img
                    src={galleryOne.src}
                    alt={galleryOne.alt}
                    className="h-40 w-full object-cover transition-transform duration-700 hover:scale-[1.04] sm:h-48"
                  />
                </div>
                <div className="mt-8 overflow-hidden rounded-[2rem] border-4 border-white shadow-soft transition-transform duration-500 hover:-translate-y-1 hover:rotate-[1deg]">
                  <img
                    src={galleryTwo.src}
                    alt={galleryTwo.alt}
                    className="h-40 w-full object-cover transition-transform duration-700 hover:scale-[1.04] sm:h-48"
                  />
                </div>
                <div className="-mt-4 sm:-mt-8 overflow-hidden rounded-[2rem] border-4 border-white shadow-soft transition-transform duration-500 hover:-translate-y-1 hover:rotate-[1deg]">
                  <img
                    src={galleryThree.src}
                    alt={galleryThree.alt}
                    className="h-40 w-full object-cover transition-transform duration-700 hover:scale-[1.04] sm:h-48"
                  />
                </div>
                <div className="overflow-hidden rounded-[2rem] border-4 border-white shadow-soft transition-transform duration-500 hover:-translate-y-1 hover:rotate-[-1deg]">
                  <img
                    src={galleryFour.src}
                    alt={galleryFour.alt}
                    className="h-40 w-full object-cover transition-transform duration-700 hover:scale-[1.04] sm:h-48"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-nursery-mint/30 py-20">
        <div className="section-container">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="scroll-animate rounded-[2rem] bg-white p-6 opacity-0 shadow-soft sm:p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="icon-circle">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-nursery-slate">Opening Hours</h3>
              </div>

              <div className="space-y-3">
                {[
                  { day: 'Monday - Friday', hours: openingHours.replace('Mon - Fri: ', '') },
                  { day: 'Saturday', hours: 'Closed' },
                  { day: 'Sunday', hours: 'Closed' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-1 border-b border-nursery-mint py-2 last:border-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="text-nursery-slate">{item.day}</span>
                    <span className="font-medium text-nursery-tangerine">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="scroll-animate rounded-[2rem] bg-white p-6 opacity-0 shadow-soft sm:p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="icon-circle">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-nursery-slate">Find Me</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-nursery-tangerine" />
                  <div>
                    <p className="font-medium text-nursery-slate">{siteName}</p>
                    {addressLines.map((line) => (
                      <p key={line} className="text-nursery-slate-muted">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="mt-1 h-5 w-5 flex-shrink-0 text-nursery-tangerine" />
                  <p className="text-nursery-slate-muted">
                    A calm and caring setting with daily routine, play, meals, outdoor
                    time, and rest built into the day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="scroll-animate rounded-[2rem] bg-nursery-tangerine p-8 text-center opacity-0 sm:p-12">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Come and See the Setting
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
              If you would like to know more, ask questions, or arrange a visit, I would
              be happy to hear from you and talk about your childcare needs.
            </p>
            <Link
              to="/contact"
              className="inline-block rounded-full bg-white px-8 py-4 font-bold text-nursery-tangerine transition-colors hover:bg-nursery-cream"
            >
              Arrange a Visit
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;