import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { SITE } from '@/lib/site';
import EmojiIcon from '@/components/EmojiIcon';
import ImageShowcase from '@/components/ImageShowcase';

const Programs = () => {
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

  const programs = [
    {
      emoji: '👶',
      title: 'Tweenies',
      age: '0 - 2 years',
      description:
        'Our baby room is calm, cosy, and responsive, helping little ones build secure attachments while discovering the world through sensory play.',
      features: ['Sensory play activities', 'Individual sleep routines', 'Milk and weaning support', 'Daily parent updates', '1:3 staff ratio'],
      tint: 'from-[#eef6fb] to-white',
      accent: 'text-[#6f94c9]',
    },
    {
      emoji: '🚀',
      title: 'Toddlers',
      age: '2 - 3 years',
      description:
        'Busy explorers grow in confidence through messy play, movement, language-rich routines, and plenty of guided choice throughout the day.',
      features: ['Potty training support', 'Early language development', 'Messy play and art', 'Small-group activities', '1:4 staff ratio'],
      tint: 'from-[#fff3e9] to-white',
      accent: 'text-[#e28061]',
    },
    {
      emoji: '🎓',
      title: 'Preschoolers',
      age: '3 - 5 years',
      description:
        'School readiness without the pressure — playful phonics, early maths, social confidence, and independence all woven into joyful daily learning.',
      features: ['Phonics & literacy', 'School readiness programme', 'Independent learning', 'Creative investigations', '1:8 staff ratio'],
      tint: 'from-[#eef7e8] to-white',
      accent: 'text-[#4a8a61]',
    },
  ];

  const activities = [
    { emoji: '🎵', title: 'Music & Movement', description: 'Songs, dance, rhythm, and action games that build confidence and coordination.' },
    { emoji: '🎨', title: 'Creative Arts', description: 'Painting, mark making, collage, and imaginative expression every single week.' },
    { emoji: '🚲', title: 'Physical Play', description: 'Bikes, climbing, balancing, and movement challenges that keep little bodies active.' },
    { emoji: '🌿', title: 'Nature Exploration', description: 'Gardening, outdoor discovery, and first-hand learning from the natural world.' },
    { emoji: '📚', title: 'Story Time', description: 'Daily books, nursery rhymes, storytelling, and language-rich conversations.' },
    { emoji: '☀️', title: 'Outdoor Play', description: 'Fresh air and child-led adventure built into each day, whatever the season.' },
  ];

  const eyfsAreas = [
    {
      emoji: '🗣️',
      eyebrow: 'Prime Area',
      title: 'Communication & Language',
      desc: 'Confidence in listening, understanding, speaking, and expressing ideas.',
      bg: 'bg-[#eef2f2]',
    },
    {
      emoji: '🏃',
      eyebrow: 'Prime Area',
      title: 'Physical Development',
      desc: 'Movement, coordination, health, self-care, and growing independence.',
      bg: 'bg-white',
    },
    {
      emoji: '🤝',
      eyebrow: 'Prime Area',
      title: 'Personal, Social & Emotional',
      desc: 'Positive relationships, self-awareness, resilience, and empathy for others.',
      bg: 'bg-[#dff0ff]',
    },
    {
      emoji: '📖',
      eyebrow: 'Specific Area',
      title: 'Literacy',
      desc: 'Reading, mark making, storytelling, and a love of language.',
      bg: 'bg-[#24493f] text-white',
      descClass: 'text-white/80',
      eyebrowClass: 'text-[#f0a27e]',
    },
    {
      emoji: '🧮',
      eyebrow: 'Specific Area',
      title: 'Mathematics',
      desc: 'Numbers, counting, patterns, shapes, space, and problem solving.',
      bg: 'bg-[#24493f] text-white',
      descClass: 'text-white/80',
      eyebrowClass: 'text-[#f0a27e]',
    },
    {
      emoji: '🌍',
      eyebrow: 'Specific Area',
      title: 'Understanding the World',
      desc: 'People, communities, technology, culture, and nature.',
      bg: 'bg-[#24493f] text-white',
      descClass: 'text-white/80',
      eyebrowClass: 'text-[#f0a27e]',
    },
    {
      emoji: '🖌️',
      eyebrow: 'Specific Area',
      title: 'Expressive Arts & Design',
      desc: 'Imagination, music, movement, role play, making, and creative confidence.',
      bg: 'bg-[#24493f] text-white',
      descClass: 'text-white/80',
      eyebrowClass: 'text-[#f0a27e]',
    },
  ];

  const dailySchedule = [
    { time: '7:30 - 8:30', activity: 'Breakfast Club & Free Play', description: 'Quiet activities and breakfast for early arrivals.' },
    { time: '8:30 - 9:00', activity: 'Welcome & Circle Time', description: 'Greetings, songs, and setting up the day together.' },
    { time: '9:00 - 10:30', activity: 'Learning Activities', description: 'Play-based sessions linked to the EYFS curriculum.' },
    { time: '10:30 - 11:00', activity: 'Snack Time', description: 'Healthy snacks and social time.' },
    { time: '11:00 - 12:00', activity: 'Outdoor Play', description: 'Garden exploration and physical activity.' },
    { time: '12:00 - 13:00', activity: 'Lunch Time', description: 'A nutritious meal enjoyed together.' },
    { time: '13:00 - 14:30', activity: 'Rest / Quiet Time', description: 'Naps for younger children and calm activities for older ones.' },
    { time: '14:30 - 15:00', activity: 'Snack Time', description: 'Afternoon refreshment and reset.' },
    { time: '15:00 - 16:30', activity: 'Afternoon Activities', description: 'Creative play, stories, and free choice.' },
    { time: '16:30 - 18:00', activity: 'Tea Club & Home Time', description: 'Light tea and calm activities until pickup.' },
  ];

  return (
    <div className="min-h-screen bg-nursery-cream">
      <Navigation />

      <section className="relative overflow-hidden pb-20 pt-32">
        <div className="absolute left-0 top-0 -z-10 h-96 w-full bg-nursery-mint/30" />
        <div className="section-container">
          <div className="mx-auto max-w-3xl text-center scroll-animate opacity-0">
            <span className="label-uppercase mb-4 block">Our Programs</span>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-nursery-slate md:text-5xl lg:text-6xl">
              Learning through <span className="text-nursery-tangerine">play</span> at every age
            </h1>
            <p className="text-lg text-nursery-slate-muted">
              Beautifully structured days, warm relationships, and carefully planned experiences that help children feel secure, curious, and ready to grow.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="grid gap-8 lg:grid-cols-3">
            {programs.map((program, index) => (
              <div
                key={program.title}
                className="scroll-animate opacity-0 overflow-hidden rounded-[2.2rem] bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`bg-gradient-to-br ${program.tint} p-7`}>
                  <EmojiIcon emoji={program.emoji} className="mb-5 drift-soft" />
                  <p className={`mb-2 text-sm font-semibold uppercase tracking-[0.16em] ${program.accent}`}>{program.age}</p>
                  <h3 className="text-3xl font-bold text-nursery-slate">{program.title}</h3>
                </div>
                <div className="p-7">
                  <p className="mb-6 leading-relaxed text-nursery-slate-muted">{program.description}</p>
                  <ul className="space-y-3">
                    {program.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-nursery-tangerine" />
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
            <span className="label-uppercase mb-4 block">Activities</span>
            <h2 className="mb-6 text-3xl font-bold text-nursery-slate md:text-4xl">
              A day full of <span className="text-nursery-tangerine">discovery</span>
            </h2>
            <p className="text-nursery-slate-muted">
              Rich daily experiences designed to support confidence, creativity, language, movement, and joyful learning.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity, index) => (
              <div
                key={activity.title}
                className="soft-rise scroll-animate opacity-0 flex items-start gap-4 rounded-[2rem] bg-white p-6 shadow-soft"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <EmojiIcon emoji={activity.emoji} sizeClassName="h-14 w-14" className="shrink-0" />
                <div>
                  <h4 className="mb-1 text-lg font-bold text-nursery-slate">{activity.title}</h4>
                  <p className="text-sm leading-relaxed text-nursery-slate-muted">{activity.description}</p>
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
              <span className="label-uppercase mb-4 block">Daily Routine</span>
              <h2 className="mb-6 text-3xl font-bold text-nursery-slate md:text-4xl">
                A typical day at <span className="text-nursery-tangerine">{SITE.shortName}</span>
              </h2>
              <p className="mb-8 text-nursery-slate-muted">
                Our rhythm gives children the comfort of routine while still making room for play, rest, and spontaneous moments of wonder.
              </p>
              <div className="rounded-[2rem] bg-white p-6 shadow-soft">
                <div className="mb-3 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-nursery-tangerine" />
                  <span className="font-medium text-nursery-slate">Flexible sessions for families</span>
                </div>
                <p className="text-sm text-nursery-slate-muted">
                  We offer full-day, morning, and afternoon sessions to suit different family routines, with a warm handover at both ends of the day.
                </p>
              </div>
            </div>

            <div className="space-y-4 scroll-animate opacity-0">
              {dailySchedule.map((item) => (
                <div key={item.time} className="flex items-start gap-4 rounded-[1.8rem] bg-white p-4 shadow-soft">
                  <div className="w-20 shrink-0">
                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-nursery-tangerine">{item.time}</span>
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-bold text-nursery-slate">{item.activity}</h4>
                    <p className="text-xs leading-relaxed text-nursery-slate-muted">{item.description}</p>
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
                src="/children-playing.jpg"
                alt="Children learning through play"
                tilt="left"
                badge={{ emoji: '💬', eyebrow: 'Focus', text: 'Learning through joyful play', position: 'bottom-right' }}
                imageClassName="h-[420px] sm:h-[540px]"
              />
            </div>
            <div className="order-1 scroll-animate opacity-0 lg:order-2">
              <span className="label-uppercase mb-4 block">EYFS Framework</span>
              <h2 className="mb-6 text-3xl font-bold text-nursery-slate md:text-4xl">
                Learning at every <span className="text-nursery-tangerine">stage</span>
              </h2>
              <p className="mb-8 text-nursery-slate-muted">
                We follow the EYFS framework and turn it into warm, practical experiences that help every child grow socially, emotionally, physically, and academically.
              </p>

              <div className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  {eyfsAreas.slice(0, 3).map((area) => (
                    <div key={area.title} className={`${area.bg} rounded-[2.4rem] p-8 shadow-soft`}>
                      <EmojiIcon emoji={area.emoji} className="mb-6" />
                      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-nursery-slate-muted">{area.eyebrow}</p>
                      <h3 className="mb-3 text-2xl font-bold text-nursery-slate">{area.title}</h3>
                      <p className="leading-relaxed text-nursery-slate-muted">{area.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-[2.8rem] bg-[#143f3a] p-8 text-white shadow-soft-lg">
                  <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#f0a27e]">Plus the 4 specific areas</p>
                  <h3 className="mb-8 text-3xl font-bold">Igniting specific skills</h3>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {eyfsAreas.slice(3).map((area) => (
                      <div key={area.title} className="rounded-[1.8rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                        <EmojiIcon emoji={area.emoji} sizeClassName="h-12 w-12" className="mb-4" />
                        <h4 className="mb-2 text-2xl font-bold text-white">{area.title}</h4>
                        <p className="text-white/78">{area.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="rounded-[2.4rem] bg-nursery-tangerine p-12 text-center scroll-animate opacity-0">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ready to join our family?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
              Contact us to arrange a visit and see our programs in action. We would love to meet you and your little one.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="inline-block rounded-full bg-white px-8 py-4 font-bold text-nursery-tangerine transition-colors hover:bg-nursery-cream">
                Book a Tour
              </Link>
              <a
                href={SITE.phoneHref}
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
