import { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Users,
  Baby,
  Palette,
  Music,
  BookOpen,
  Utensils,
  Moon,
  Heart,
  Sun,
  TreePine,
  Bike,
  UserRound,
  MessageCircleHeart,
  ShieldCheck,
  Award,
  CheckCircle2,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { SITE } from '@/lib/site';
import ImageShowcase from '@/components/ImageShowcase';
import useCmsContent from '@/hooks/useCmsContent';

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const { getSetting, getImage } = useCmsContent();

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

  const siteName = getSetting('site_name', SITE.name);
  const openingHours = getSetting('opening_hours', SITE.openingHours);
  const phone = getSetting('phone', SITE.phoneDisplay);
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, '')}`;

  const heroTitle = getSetting(
    'hero_title',
    'Home-from-home childcare where little ones feel safe, happy, and cared for.',
  );
  const heroSubtitle = getSetting(
    'hero_subtitle',
    'A warm and nurturing childminding setting where children can play, learn, rest, and grow at their own pace in a calm, caring environment.',
  );

  const heroImage = getImage(
    'home_hero_image',
    '/hero-child.jpg',
    'Happy child in a warm childminding setting',
  );
  const learningImage = getImage(
    'home_learning_image',
    '/activity-painting.jpg',
    'Child enjoying creative play',
  );
  const nutritionImage = getImage(
    'home_nutrition_image',
    '/mealtime-child.jpg',
    'Child enjoying a healthy meal',
  );
  const outdoorImage = getImage(
    'home_outdoor_image',
    '/outdoor-exploration.jpg',
    'Child enjoying outdoor play',
  );

  const founderImage = getImage(
    'team_member_1',
    '/team-director.jpg',
    'Founder and childminder',
  );

  const titleParts = useMemo(() => {
    const parts = heroTitle.split('. ').filter(Boolean);

    if (parts.length <= 1) {
      const words = heroTitle.split(' ');
      const mid = Math.ceil(words.length / 2);

      return {
        first: words.slice(0, mid).join(' '),
        second: words.slice(mid).join(' '),
      };
    }

    const first = `${parts[0].replace(/\.$/, '')}.`;
    const second = parts
      .slice(1)
      .join('. ')
      .replace(/\.$/, '');

    return { first, second };
  }, [heroTitle]);

  const stats = [
    { icon: Baby, label: 'Home-from-home care' },
    { icon: Clock, label: openingHours },
    { icon: Users, label: 'Small, nurturing setting' },
  ];

  const features = [
    {
      icon: Palette,
      title: 'Creative and sensory play',
      description:
        'Messy play, arts and crafts, and hands-on activities that keep children engaged and curious.',
    },
    {
      icon: Music,
      title: 'Songs, movement and stories',
      description:
        'Music, action songs, and story time help children build confidence, language, and joy.',
    },
    {
      icon: BookOpen,
      title: 'Learning through everyday play',
      description:
        'Children learn naturally through play, conversation, routines, and activities suited to their age and interests.',
    },
  ];

  const careFeatures = [
    { icon: Utensils, title: 'Healthy meals and snacks', desc: 'Fresh meals with dietary needs in mind' },
    { icon: Moon, title: 'Nap and quiet time', desc: 'Calm rest time for younger children' },
    { icon: Heart, title: 'Warm personal care', desc: 'Patient, individual attention every day' },
  ];

  const outdoorFeatures = [
    { icon: Sun, title: 'Fresh air every day', desc: 'Outdoor time built into the routine' },
    {
      icon: TreePine,
      title: 'Walks and garden play',
      desc: 'Nature walks, garden time, and local outings',
    },
    { icon: Bike, title: 'Active free play', desc: 'Movement, play, and exercise in a fun way' },
  ];

  const founderHighlights = [
    {
      icon: Heart,
      title: 'Caring and patient approach',
      description: 'Creating a safe and welcoming environment where children feel valued and confident.',
    },
    {
      icon: UserRound,
      title: 'Every child is unique',
      description: 'Activities are tailored to each child’s interests and developmental stage.',
    },
    {
      icon: MessageCircleHeart,
      title: 'Strong parent partnership',
      description: 'Open and honest communication helps build trust, consistency, and peace of mind.',
    },
    {
      icon: ShieldCheck,
      title: 'Experience and respect',
      description: 'A caring setting that values families from different cultures, backgrounds, and religions.',
    },
  ];

  const founderBioParagraphs = [
    'I am a dedicated and nurturing childminder with a genuine passion for supporting children’s growth, development, and happiness. With a caring and patient approach, I create a safe, welcoming environment where children feel valued, confident, and free to explore the world around them.',
    'I believe every child is unique, and I take pride in tailoring activities to suit each child’s interests and developmental stage. From creative play and story telling to outdoor adventures and early learning activities, I aim to make each day engaging, fun, and enriching.',
    'Building strong relationships with both children and their families is at the heart of what I do. I maintain open, honest communication with parents to help ensure consistency, trust, and peace of mind.',
    'Alongside my hands-on care experience, I have completed key childcare and safeguarding training that supports the safe, thoughtful, and professional care I provide every day.',
  ];

  const qualifications = [
    'Childminding course - Stockport Metropolitan Borough Council',
    'Designated Safeguarding Lead (DSL)',
    'Paediatric first aid training',
    'Pre-School Years course',
    'Incredible Years: Preschool Parent Group',
  ];

  return (
    <div className="min-h-screen bg-nursery-cream">
      <Navigation />

      <section ref={heroRef} className="relative min-h-screen overflow-hidden pb-16 pt-32">
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

        <div className="absolute right-[15%] top-28 h-24 w-24 rounded-full bg-nursery-tangerine opacity-90 animate-pulse-soft float-soft md:h-32 md:w-32" />

        <div className="section-container relative z-10">
          <div className="grid min-h-[80vh] items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <span className="label-uppercase mb-4 block scroll-animate opacity-0">
                {siteName}
              </span>

              <h1
                className="mb-6 text-4xl font-bold leading-tight text-nursery-slate scroll-animate opacity-0 md:text-5xl lg:text-6xl"
                style={{ animationDelay: '100ms' }}
              >
                {titleParts.first}
                {titleParts.second ? (
                  <>
                    <br />
                    <span className="text-nursery-tangerine">{titleParts.second}</span>
                  </>
                ) : null}
              </h1>

              <p
                className="mb-8 max-w-lg text-lg text-nursery-slate-muted scroll-animate opacity-0"
                style={{ animationDelay: '200ms' }}
              >
                {heroSubtitle}
              </p>

              <div
                className="flex flex-wrap gap-4 scroll-animate opacity-0"
                style={{ animationDelay: '300ms' }}
              >
                <Link to="/contact" className="btn-primary">
                  Arrange a Visit
                </Link>
                <Link to="/programs" className="btn-outline">
                  See Daily Routine
                </Link>
              </div>

              <div
                className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 scroll-animate opacity-0"
                style={{ animationDelay: '400ms' }}
              >
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-white/80 p-4 text-center shadow-soft backdrop-blur-sm transition-shadow hover:shadow-soft-lg"
                  >
                    <stat.icon className="mx-auto mb-2 h-6 w-6 text-nursery-tangerine" />
                    <p className="text-xs text-nursery-slate-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="order-1 scroll-animate opacity-0 lg:order-2"
              style={{ animationDelay: '200ms' }}
            >
              <ImageShowcase
                src={heroImage.src}
                alt={heroImage.alt}
                tilt="right"
                badge={{
                  emoji: '⭐',
                  eyebrow: 'Trusted care',
                  text: 'A warm, home-from-home setting',
                  position: 'bottom-left',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section ref={featuresRef} className="relative overflow-hidden py-24">
        <div className="section-container">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="scroll-animate opacity-0">
              <ImageShowcase
                src={learningImage.src}
                alt={learningImage.alt}
                tilt="left"
                badge={{
                  emoji: '🎨',
                  eyebrow: 'Daily play',
                  text: 'Creative, sensory, and child-led activities',
                  position: 'top-right',
                }}
              />
            </div>

            <div className="scroll-animate opacity-0">
              <span className="label-uppercase mb-4 block">Play, learning and little discoveries</span>
              <h2 className="mb-6 text-3xl font-bold text-nursery-slate md:text-4xl lg:text-5xl">
                A caring routine filled with{' '}
                <span className="text-nursery-tangerine">play and learning.</span>
              </h2>
              <p className="mb-8 text-lg text-nursery-slate-muted">
                Every day includes creative play, stories, songs, sensory activities,
                and time for children to explore in a way that feels natural, happy,
                and engaging.
              </p>

              <div className="mb-8 space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="icon-circle flex-shrink-0">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-bold text-nursery-slate">{feature.title}</h4>
                      <p className="text-sm text-nursery-slate-muted">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/programs" className="btn-outline">
                View the Daily Routine
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-nursery-mint/30 py-24">
        <div className="section-container">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="order-2 scroll-animate opacity-0 lg:order-1">
              <span className="label-uppercase mb-4 block">Meals, rest and routine</span>
              <h2 className="mb-6 text-3xl font-bold text-nursery-slate md:text-4xl lg:text-5xl">
                A calm daily rhythm.
                <br />
                <span className="text-nursery-tangerine">Happy, settled children.</span>
              </h2>
              <p className="mb-8 text-lg text-nursery-slate-muted">
                From arrival and free play to meals, naps, quiet time, and home time,
                children are supported through a gentle routine that helps them feel
                safe, secure, and cared for.
              </p>

              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {careFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-white p-5 shadow-soft transition-shadow hover:shadow-soft-lg"
                  >
                    <div className="icon-circle mb-3">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <h4 className="mb-1 text-sm font-bold text-nursery-slate">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-nursery-slate-muted">{feature.desc}</p>
                  </div>
                ))}
              </div>

              <Link to="/about" className="btn-outline">
                Learn More About Me
              </Link>
            </div>

            <div className="order-1 scroll-animate opacity-0 lg:order-2">
              <ImageShowcase
                src={nutritionImage.src}
                alt={nutritionImage.alt}
                tilt="right"
                badge={{
                  emoji: '🍽️',
                  eyebrow: 'Meals and snacks',
                  text: 'Healthy food and care throughout the day',
                  position: 'bottom-right',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="section-container">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="scroll-animate opacity-0">
              <ImageShowcase
                src={outdoorImage.src}
                alt={outdoorImage.alt}
                tilt="left"
                badge={{
                  emoji: '🌿',
                  eyebrow: 'Outdoor time',
                  text: 'Walks, garden play, and fresh air every day',
                  position: 'top-right',
                }}
              />
            </div>

            <div className="scroll-animate opacity-0">
              <span className="label-uppercase mb-4 block">Outdoor play and fresh air</span>
              <h2 className="mb-6 text-3xl font-bold text-nursery-slate md:text-4xl lg:text-5xl">
                Outdoor time for
                <br />
                <span className="text-nursery-tangerine">play, movement, and discovery.</span>
              </h2>
              <p className="mb-8 text-lg text-nursery-slate-muted">
                Outdoor play is an important part of the day, whether that means garden
                play, nature walks, park visits, or simply enjoying fresh air and active fun.
              </p>

              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {outdoorFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-white p-5 shadow-soft transition-shadow hover:shadow-soft-lg"
                  >
                    <div className="icon-circle mb-3">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <h4 className="mb-1 text-sm font-bold text-nursery-slate">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-nursery-slate-muted">{feature.desc}</p>
                  </div>
                ))}
              </div>

              <Link to="/contact" className="btn-primary">
                Arrange a Visit
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-nursery-mint/30 py-24">
        <div className="section-container">
          <div className="mx-auto mb-14 max-w-2xl text-center scroll-animate opacity-0">
            <span className="label-uppercase mb-4 block">About your childminder</span>
            <h2 className="mb-6 text-3xl font-bold text-nursery-slate md:text-4xl lg:text-5xl">
              A caring, personal approach built on{' '}
              <span className="text-nursery-tangerine">trust</span>
            </h2>
            <p className="text-lg text-nursery-slate-muted">
              A warm and welcoming setting where children feel safe, supported, and free to grow in their own way.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="scroll-animate opacity-0">
              <div className="overflow-hidden rounded-[2rem] bg-white p-4 shadow-soft sm:p-5">
                
                 <div className="overflow-hidden rounded-[1.5rem]">
  <img
    src={founderImage.src}
    alt={founderImage.alt}
    className="h-[700px] w-full rounded-[1.5rem] object-cover object-center"
  />
</div>

                <div className="mt-5 rounded-[1.5rem] bg-nursery-cream p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-nursery-tangerine">
                    Home-from-home care
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-nursery-slate-muted">
                    A nurturing environment built around patience, routine, play, communication, and genuine care.
                  </p>
                </div>
              </div>
            </div>

            <div className="scroll-animate opacity-0">
              <div className="rounded-[2rem] bg-white p-6 shadow-soft sm:p-8">
                <div className="space-y-5">
                  {founderBioParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base leading-8 text-nursery-slate-muted sm:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-8 rounded-[1.75rem] bg-nursery-cream p-5 sm:p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="icon-circle">
                      <Award className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-nursery-slate sm:text-xl">
                      Training and qualifications
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {qualifications.map((qualification, index) => (
                      <div key={index} className="flex items-start gap-3 rounded-2xl bg-white p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-nursery-tangerine" />
                        <p className="text-sm leading-6 text-nursery-slate">{qualification}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {founderHighlights.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-[1.5rem] bg-nursery-cream p-5 transition-shadow hover:shadow-soft"
                    >
                      <div className="icon-circle mb-3">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <h4 className="mb-2 text-sm font-bold text-nursery-slate">
                        {item.title}
                      </h4>
                      <p className="text-xs leading-6 text-nursery-slate-muted">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/about" className="btn-primary">
                    Read More About Me
                  </Link>
                  <Link to="/contact" className="btn-outline">
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-nursery-tangerine/10" />
        <div className="section-container relative z-10">
          <div className="mx-auto max-w-3xl text-center scroll-animate opacity-0">
            <h2 className="mb-6 text-3xl font-bold text-nursery-slate md:text-4xl lg:text-5xl">
              Looking for warm, reliable{' '}
              <span className="text-nursery-tangerine">childcare?</span>
            </h2>
            <p className="mb-8 text-lg text-nursery-slate-muted">
              Get in touch to ask a question, arrange a visit, and see whether this
              home-from-home setting is right for your child.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary">
                Arrange a Visit
              </Link>
              <a href={phoneHref} className="btn-outline">
                Call {phone}
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