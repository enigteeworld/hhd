import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, Utensils, Moon, Trees, BookOpen, Heart } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { SITE } from '@/lib/site';
import EmojiIcon from '@/components/EmojiIcon';
import ImageShowcase from '@/components/ImageShowcase';
import useCmsContent from '@/hooks/useCmsContent';

const Programs = () => {
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
  const phone = getSetting('phone', SITE.phoneDisplay);
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, '')}`;

  const programsBanner = getImage(
    'programs_banner_image',
    '/children-playing.jpg',
    'Children enjoying play and learning',
  );

  const dayHighlights = [
    {
      emoji: '🎨',
      title: 'Creative play',
      description:
        'Arts, crafts, messy play, puzzles, and sensory activities that keep children engaged and happy.',
    },
    {
      emoji: '📚',
      title: 'Stories and songs',
      description:
        'Story time, songs, and calm group moments that support language, confidence, and listening.',
    },
    {
      emoji: '🌿',
      title: 'Outdoor time',
      description:
        'Garden play, walks, fresh air, and active movement are an important part of the day.',
    },
    {
      emoji: '🍎',
      title: 'Meals and snacks',
      description:
        'Healthy snacks, lunch, and home-made meals prepared with children’s needs in mind.',
    },
    {
      emoji: '😴',
      title: 'Nap and quiet time',
      description:
        'Younger children can rest while older children enjoy calmer activities such as reading and drawing.',
    },
    {
      emoji: '🤍',
      title: 'Warm daily care',
      description:
        'A gentle routine that helps children feel safe, settled, and cared for from arrival to home time.',
    },
  ];

  const ageGroups = [
    {
      emoji: '👶',
      title: 'Babies and younger children',
      age: '0 - 2 years',
      description:
        'A calm, caring routine with sensory play, naps, meals, cuddles, and gentle support throughout the day.',
      features: [
        'Individual sleep and rest needs',
        'Sensory play and early discovery',
        'Milk, meals, and snack support',
        'Warm and responsive care',
      ],
      tint: 'from-[#eef6fb] to-white',
      accent: 'text-[#6f94c9]',
    },
    {
      emoji: '🧸',
      title: 'Toddlers',
      age: '2 - 3 years',
      description:
        'Busy little ones enjoy creative play, songs, movement, outdoor time, and simple routines that build confidence.',
      features: [
        'Messy play and creative activities',
        'Outdoor play and movement',
        'Story time and songs',
        'Support with independence',
      ],
      tint: 'from-[#fff3e9] to-white',
      accent: 'text-[#e28061]',
    },
    {
      emoji: '🚀',
      title: 'Older children',
      age: '3 - 5 years',
      description:
        'Children continue to learn through play, conversation, routines, and activities that match their stage of development.',
      features: [
        'Early learning through play',
        'Creative and imaginative activities',
        'Small-group and quiet-time moments',
        'Confidence-building daily routine',
      ],
      tint: 'from-[#eef7e8] to-white',
      accent: 'text-[#4a8a61]',
    },
  ];

  const dailySchedule = [
    {
      time: '7:30 AM - 9:00 AM',
      activity: 'Arrival and free play',
      description:
        'Children arrive, settle in, and choose from toys, books, or quiet activities.',
    },
    {
      time: '9:00 AM - 9:30 AM',
      activity: 'Breakfast / snack time',
      description:
        'Healthy snacks and drinks, with time for social interaction and a calm start to the day.',
    },
    {
      time: '9:30 AM - 10:30 AM',
      activity: 'Learning and activity time',
      description:
        'Planned activities such as arts and crafts, puzzles, early learning, and sensory play.',
    },
    {
      time: '10:30 AM - 11:30 AM',
      activity: 'Outdoor play / walk / garden time',
      description:
        'Outdoor play, park visits, or nature walks for fresh air and exercise.',
    },
    {
      time: '11:30 AM - 12:00 PM',
      activity: 'Story time and wind down',
      description:
        'Stories, songs, and calming activities to help children settle before lunch.',
    },
    {
      time: '12:00 PM - 12:30 PM',
      activity: 'Lunch time',
      description:
        'Nutritious meals prepared with allergy, special, and religious needs taken into account.',
    },
    {
      time: '12:30 PM - 2:00 PM',
      activity: 'Nap / quiet time',
      description:
        'Younger children nap while older children enjoy quiet activities such as reading and drawing.',
    },
    {
      time: '2:00 PM - 2:45 PM',
      activity: 'Snack time',
      description:
        'A light snack and drinks to recharge for the afternoon.',
    },
    {
      time: '2:45 PM - 3:30 PM',
      activity: 'Free play / preschool pick up',
      description:
        'Free play and transitions for children being collected from preschool.',
    },
    {
      time: '3:30 PM - 4:30 PM',
      activity: 'Dinner time',
      description:
        'Home-made meals, with children’s dietary, allergy, special, and religious needs respected.',
    },
    {
      time: '4:30 PM - 5:00 PM',
      activity: 'Free play',
      description:
        'Calm and happy play before the end of the day.',
    },
    {
      time: '6:00 PM',
      activity: 'Home time',
      description:
        'A warm handover at the end of the day.',
    },
  ];

  const routineBenefits = [
    {
      icon: Clock,
      title: 'Routine and consistency',
      description:
        'A familiar daily flow helps children feel safe, settled, and secure.',
    },
    {
      icon: Heart,
      title: 'Individual care',
      description:
        'Children are supported according to their age, needs, interests, and personality.',
    },
    {
      icon: BookOpen,
      title: 'Play-based learning',
      description:
        'Learning happens naturally through stories, conversation, creative play, and everyday activities.',
    },
    {
      icon: Trees,
      title: 'Outdoor experiences',
      description:
        'Fresh air, walks, and active play are built into the week.',
    },
    {
      icon: Utensils,
      title: 'Healthy meals',
      description:
        'Meals and snacks are part of the routine and children’s individual needs are respected.',
    },
    {
      icon: Moon,
      title: 'Rest and quiet time',
      description:
        'Children have time to rest, nap, or enjoy calm activities during the day.',
    },
  ];

  return (
    <div className="min-h-screen bg-nursery-cream">
      <Navigation />

      <section className="relative overflow-hidden pb-20 pt-32">
        <div className="absolute left-0 top-0 -z-10 h-96 w-full bg-nursery-mint/30" />
        <div className="section-container">
          <div className="mx-auto max-w-3xl text-center scroll-animate opacity-0">
            <span className="label-uppercase mb-4 block">Daily Routine</span>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-nursery-slate md:text-5xl lg:text-6xl">
              A calm, caring day filled with{' '}
              <span className="text-nursery-tangerine">play and routine</span>
            </h1>
            <p className="text-lg text-nursery-slate-muted">
              At {siteName}, each day is built around a gentle routine that includes
              play, learning, meals, outdoor time, rest, and warm care throughout the day.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="grid gap-8 lg:grid-cols-3">
            {ageGroups.map((group, index) => (
              <div
                key={group.title}
                className="scroll-animate overflow-hidden rounded-[2.2rem] bg-white opacity-0 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`bg-gradient-to-br ${group.tint} p-7`}>
                  <EmojiIcon emoji={group.emoji} className="mb-5 drift-soft" />
                  <p className={`mb-2 text-sm font-semibold uppercase tracking-[0.16em] ${group.accent}`}>
                    {group.age}
                  </p>
                  <h3 className="text-2xl font-bold text-nursery-slate sm:text-3xl">
                    {group.title}
                  </h3>
                </div>

                <div className="p-7">
                  <p className="mb-6 leading-relaxed text-nursery-slate-muted">
                    {group.description}
                  </p>

                  <ul className="space-y-3">
                    {group.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-nursery-tangerine" />
                        <span className="text-sm text-nursery-slate">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-nursery-mint/30 py-20">
        <div className="section-container">
          <div className="mx-auto mb-16 max-w-2xl text-center scroll-animate opacity-0">
            <span className="label-uppercase mb-4 block">What the day includes</span>
            <h2 className="mb-6 text-3xl font-bold text-nursery-slate md:text-4xl">
              Everyday moments that support{' '}
              <span className="text-nursery-tangerine">happy little learners</span>
            </h2>
            <p className="text-nursery-slate-muted">
              Children enjoy a balanced mix of play, care, meals, stories, outdoor time,
              rest, and activities tailored to their age and interests.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dayHighlights.map((activity, index) => (
              <div
                key={activity.title}
                className="soft-rise scroll-animate flex items-start gap-4 rounded-[2rem] bg-white p-6 opacity-0 shadow-soft"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <EmojiIcon
                  emoji={activity.emoji}
                  sizeClassName="h-14 w-14"
                  className="shrink-0"
                />
                <div>
                  <h4 className="mb-1 text-lg font-bold text-nursery-slate">
                    {activity.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-nursery-slate-muted">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div className="scroll-animate opacity-0">
              <span className="label-uppercase mb-4 block">A Typical Day</span>
              <h2 className="mb-6 text-3xl font-bold text-nursery-slate md:text-4xl">
                The daily rhythm at{' '}
                <span className="text-nursery-tangerine">{siteName}</span>
              </h2>
              <p className="mb-8 text-nursery-slate-muted">
                Daily routine helps create structure, consistency, and a sense of security
                for children. It includes meals, playtime, naps, learning activities,
                outdoor time, and calm transitions through the day.
              </p>

              <div className="rounded-[2rem] bg-white p-6 shadow-soft">
                <div className="mb-3 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-nursery-tangerine" />
                  <span className="font-medium text-nursery-slate">
                    Opening hours
                  </span>
                </div>
                <p className="text-sm text-nursery-slate-muted">{openingHours}</p>
              </div>
            </div>

            <div className="space-y-4 scroll-animate opacity-0">
              {dailySchedule.map((item) => (
                <div
                  key={`${item.time}-${item.activity}`}
                  className="rounded-[1.8rem] bg-white p-4 shadow-soft"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                    <div className="sm:w-32 sm:shrink-0">
                      <span className="text-xs font-semibold uppercase tracking-[0.08em] text-nursery-tangerine">
                        {item.time}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="mb-1 text-sm font-bold text-nursery-slate sm:text-base">
                        {item.activity}
                      </h4>
                      <p className="text-xs leading-relaxed text-nursery-slate-muted sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-nursery-mint/30 py-20">
        <div className="section-container">
          <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="order-2 scroll-animate opacity-0 lg:order-1">
              <ImageShowcase
                src={programsBanner.src}
                alt={programsBanner.alt}
                tilt="left"
                badge={{
                  emoji: '💛',
                  eyebrow: 'Daily routine',
                  text: 'Play, meals, rest, and outdoor time',
                  position: 'bottom-right',
                }}
                imageClassName="h-[420px] sm:h-[540px]"
              />
            </div>

            <div className="order-1 scroll-animate opacity-0 lg:order-2">
              <span className="label-uppercase mb-4 block">Why routine matters</span>
              <h2 className="mb-6 text-3xl font-bold text-nursery-slate md:text-4xl">
                A day that feels{' '}
                <span className="text-nursery-tangerine">safe, familiar, and happy</span>
              </h2>
              <p className="mb-8 text-nursery-slate-muted">
                A well-balanced daily routine helps children settle more easily, feel
                secure, and enjoy the confidence that comes from knowing what their day looks like.
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                {routineBenefits.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-[1.8rem] bg-white p-5 shadow-soft"
                  >
                    <div className="icon-circle mb-4">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h4 className="mb-2 text-lg font-bold text-nursery-slate">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-nursery-slate-muted">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="scroll-animate rounded-[2.4rem] bg-nursery-tangerine p-8 text-center opacity-0 sm:p-12">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Looking for childcare that feels warm and personal?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
              Get in touch to arrange a visit, ask questions, and see whether this
              daily routine and setting are the right fit for your child.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-block rounded-full bg-white px-8 py-4 font-bold text-nursery-tangerine transition-colors hover:bg-nursery-cream"
              >
                Arrange a Visit
              </Link>
              <a
                href={phoneHref}
                className="inline-block rounded-full border-2 border-white bg-nursery-tangerine px-8 py-4 font-bold text-white transition-colors hover:bg-white hover:text-nursery-tangerine"
              >
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

export default Programs;