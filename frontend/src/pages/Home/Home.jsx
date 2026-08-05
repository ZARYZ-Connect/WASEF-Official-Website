import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SERVICES_DATA, STATS_DATA, INDUSTRIES } from '../../data/staticData';
import ServiceIcon from '../../components/ServiceIcon/ServiceIcon';
import './Home.css';

/* ── Animated counter hook ─── */
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count, ref };
}

/* ── Fade-in on scroll ─── */
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
    >
      {children}
    </motion.div>
  );
}

/* ── Stat Card ─── */
function StatCard({ stat }) {
  const { count, ref } = useCounter(stat.value);
  return (
    <div ref={ref} className="stat-card">
      <span className="stat-card__number stat-number">
        {count.toLocaleString()}{stat.suffix}
      </span>
      <span className="stat-card__label">{stat.label}</span>
    </div>
  );
}

/* ── Service Card ─── */
function ServiceCard({ service, index }) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isMobile) {
        videoRef.current.play().catch(() => {});
      } else {
        if (isHovered) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      }
    }
  }, [isHovered, isMobile]);

  const tags = service.applications ? service.applications.split(',').map(t => t.trim()) : [];

  let mediaType = 'image';
  let mediaSrc = '';

  if (service.slug === 'laser-cutting') {
    mediaType = 'video';
    mediaSrc = '/videos/services page video/Laser Cutting Services.mp4';
  } else if (service.slug === 'cnc-bending-forming') {
    mediaType = 'video';
    mediaSrc = '/videos/services page video/CNC Bending.mp4';
  } else if (service.slug === 'custom-metal-fabrication') {
    mediaType = 'video';
    mediaSrc = '/videos/services page video/Bandsaw Metal Cutting.mp4';
  } else if (service.slug === 'fabrication-assembly') {
    mediaType = 'image';
    mediaSrc = '/videos/image1.webp';
  } else if (service.slug === 'precision-sheet-metal') {
    mediaType = 'image';
    mediaSrc = '/videos/image2.webp';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="service-card-wrapper"
    >
      <Link
        to={`/services/${service.slug}`}
        className="service-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Header info */}
        <div className="service-card__header-top">
          <span className="service-card__num">{String(index + 1).padStart(2, '0')}</span>
        </div>

        {/* Media area */}
        <div className="service-card__img-container">
          {mediaType === 'video' ? (
            <video
              ref={videoRef}
              src={mediaSrc}
              className="service-card__img"
              preload="auto"
              muted
              loop
              playsInline
              autoPlay={isMobile}
            />
          ) : (
            <img
              src={mediaSrc}
              alt={service.title}
              className="service-card__img"
              loading="lazy"
            />
          )}
          <div className="service-card__img-overlay" />
        </div>

        {/* Bottom content panel */}
        <div className="service-card__bottom-panel">
          <div className="service-card__title-row">
            <div className="service-card__icon-container">
              <ServiceIcon slug={service.slug} />
            </div>
            <h3 className="service-card__title">{service.title}</h3>
          </div>
          <p className="service-card__desc">{service.description}</p>
          <span className="service-card__link">
            Learn more <span className="arrow">→</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}


/* ── Capability Icon component ── */
function CapabilityIcon({ iconKey }) {
  switch (iconKey) {
    case 'tools':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-tools" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4" />
          <path d="M14.5 5.5l4 4" />
          <path d="M12 8l-5.03 -5.03a1.5 1.5 0 0 0 -2.12 2.12l5.03 5.03" />
          <path d="M7 10.5l-3.5 -3.5" />
        </svg>
      );
    case 'bolt':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bolt" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0z" />
        </svg>
      );
    case 'users':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-users" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
          <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
        </svg>
      );
    case 'coin':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-coin" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1" />
          <path d="M12 6v2m0 8v2" />
        </svg>
      );
    case 'link':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-link" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M9 15l6 -6" />
          <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
          <path d="M13 18l-.397 .534a5.07 5.07 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
        </svg>
      );
    case 'target':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-target" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          <path d="M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        </svg>
      );
    case 'factory':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-building-factory-2" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M3 21h18" />
          <path d="M5 21v-12l5 4v-4l5 4h4v8" />
          <path d="M19 21v-8" />
          <path d="M9 17h1" />
          <path d="M14 17h1" />
          <path d="M14 13h1" />
          <path d="M5 14h1" />
        </svg>
      );
    case 'package':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-package" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9z" />
          <path d="M12 12l8 -4.5" />
          <path d="M12 12l0 9" />
          <path d="M12 12l-8 -4.5" />
          <path d="M16 5.25l-8 4.5" />
        </svg>
      );
    case 'clock':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-clock" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 7l0 5l3 3" />
        </svg>
      );
    default:
      return null;
  }
}

const WHY_CHOOSE_US = [
  {
    title: 'Fabrication & Reverse Engineering',
    iconKey: 'tools',
    color: '#818cf8',      // Indigo/Purple
    bgColor: 'rgba(129, 140, 248, 0.1)',
    desc: 'Expert capabilities in custom sheet metal fabrication, assembly, and precise reverse engineering of components.'
  },
  {
    title: 'Laser Cutting & Sheet Metal',
    iconKey: 'bolt',
    color: '#fb7185',      // Coral
    bgColor: 'rgba(251, 113, 133, 0.1)',
    desc: 'Advanced precision laser cutting and professional sheet metal forming to tight specifications.'
  },
  {
    title: 'Design & Development',
    iconKey: 'users',
    color: '#2dd4bf',      // Teal
    bgColor: 'rgba(45, 212, 191, 0.1)',
    desc: 'Backed by a strong engineering team to support product design, CAD optimization, and prototyping.'
  },
  {
    title: 'Cost Effective Solutions',
    iconKey: 'coin',
    color: '#fbbf24',      // Amber
    bgColor: 'rgba(251, 191, 36, 0.1)',
    desc: 'Highly competitive pricing achieved by meeting customer requirements precisely without unnecessary overheads.'
  },
  {
    title: 'Welding Jigs & Fixtures',
    iconKey: 'link',
    color: '#f472b6',      // Pink
    bgColor: 'rgba(244, 114, 182, 0.1)',
    desc: 'Specialized focus in designing and manufacturing large-scale welding jigs and precision tooling fixtures.'
  },
  {
    title: 'Precision Tolerance',
    iconKey: 'target',
    color: '#60a5fa',      // Blue
    bgColor: 'rgba(96, 165, 250, 0.1)',
    desc: 'Committed to meeting stringent dimensions and geometric tolerances as per customer drawings.'
  },
  {
    title: 'Skilled Infrastructure',
    iconKey: 'factory',
    color: '#4ade80',      // Green
    bgColor: 'rgba(74, 222, 128, 0.1)',
    desc: 'State-of-the-art facilities in Bommasandra equipped with modern machinery run by skilled professionals.'
  },
  {
    title: 'Material Handling Equipment',
    iconKey: 'package',
    color: '#c084fc',      // Muted Purple
    bgColor: 'rgba(192, 132, 252, 0.1)',
    desc: 'Full suite of handling gear to ensure safe storage, processing, and transportation of heavy components.'
  },
  {
    title: 'On Time Delivery',
    iconKey: 'clock',
    color: '#22d3ee',      // Cyan/Teal
    bgColor: 'rgba(34, 211, 238, 0.1)',
    desc: 'Robust project scheduling and logistics management to guarantee prompt delivery of orders.'
  }
];

/* ── Client Marquee ─── */
const CUSTOMER_LOGOS = [
  '/valuable customer logos/image.png',
  '/valuable customer logos/image copy.png',
  '/valuable customer logos/image copy 2.png',
  '/valuable customer logos/image copy 3.png',
  '/valuable customer logos/image copy 4.png',
  '/valuable customer logos/image copy 5.png',
  '/valuable customer logos/image copy 6.png',
  '/valuable customer logos/image copy 7.png',
  '/valuable customer logos/image copy 8.png',
  '/valuable customer logos/image copy 9.png',
  '/valuable customer logos/image copy 10.png',
  '/valuable customer logos/image copy 11.png',
  '/valuable customer logos/image copy 12.png',
  '/valuable customer logos/image copy 13.png',
  '/valuable customer logos/image copy 14.png',
  '/valuable customer logos/image copy 15.png'
];

function ClientMarquee() {
  return (
    <div className="marquee-wrapper" aria-label="Our valuable customers">
      <div className="marquee-track">
        {[...CUSTOMER_LOGOS, ...CUSTOMER_LOGOS].map((src, i) => (
          <span key={i} className="marquee-item">
            <img src={src} alt={`Valuable Customer ${i + 1}`} loading="lazy" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Media slides definition ─── */
const MEDIA_SLIDES = [
  {
    type: 'video',
    src: '/videos/video1.mp4',
    headline: 'Precision Beyond\nTolerance.',
    sub: "India's leading laser manufacturing partner for aerospace, defence, and industrial excellence.",
  },
  {
    type: 'image',
    src: '/images/BODOR LASER CUTTING MACHINE E-SERIES.jpg',
    headline: '6kW Bodor E-Series\nFiber Laser System.',
    sub: 'Advanced 6kW CNC fiber laser cutting machine with automatic autofocus head and positioning accuracy of ±0.03 mm.',
  },
  {
    type: 'image',
    src: '/images/JFY Make Press Brake.jpg',
    headline: 'JFY Make CNC\nBending & Folding.',
    sub: '160-tonne capacity CNC press brake for high-repeatability sheet metal forming up to 3000mm.',
  },
  {
    type: 'image',
    src: '/images/Bodor K.png',
    headline: 'Bodor K230\nTube Laser Cutting.',
    sub: 'Advanced CNC fiber laser tube cutting machine supporting up to Ø230 mm round pipes, 6.5 m standard lengths, and 300 kg max weight.',
  },
  {
    type: 'image',
    src: '/images/sms-bending.png',
    headline: 'SMS CNC Press Brake\nBending & Forming.',
    sub: '160 Ton capacity hydraulic press brake for multi-axis bending of complex steel profiles.',
  },
  {
    type: 'image',
    src: '/images/tig-welding.jpg',
    headline: 'Precision MIG & TIG\nWelding Stations.',
    sub: 'High-strength structural gas metal arc welding and cleanroom-rated alloy joining.',
  },
];

/* ── Hero ─── */
function Hero() {
  const [slide, setSlide]     = useState(0);
  const [prevSlide, setPrev]  = useState(null);
  const [fading, setFading]   = useState(false);
  const videoRef              = useRef(null);
  const intervalRef           = useRef(null);
  const total                 = MEDIA_SLIDES.length;

  const goTo = (idx) => {
    if (idx === slide || fading) return;
    setPrev(slide);
    setFading(true);
    setTimeout(() => {
      setSlide(idx);
      setPrev(null);
      setFading(false);
    }, 600);
  };

  const next = () => goTo((slide + 1) % total);
  const prev = () => goTo((slide - 1 + total) % total);

  /* Auto-advance */
  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 6500);
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [slide]); // eslint-disable-line

  /* Replay video when it becomes active */
  useEffect(() => {
    if (MEDIA_SLIDES[slide].type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [slide]);

  const current = MEDIA_SLIDES[slide];

  return (
    <section className="hero hero--media" aria-label="Hero banner">

      {/* ── Full-bleed media background ── */}
      <div className="hero__media-bg" aria-hidden="true">

        {/* Prev slide (fading out) */}
        {prevSlide !== null && (
          <div className={`hero__media-layer hero__media-layer--out`}>
            {MEDIA_SLIDES[prevSlide].type === 'video' ? (
              <video
                src={MEDIA_SLIDES[prevSlide].src}
                autoPlay muted playsInline preload="none"
                className="hero__media-asset"
              />
            ) : (
              <img
                src={MEDIA_SLIDES[prevSlide].src}
                alt=""
                className="hero__media-asset"
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
        )}

        {/* Current slide (fading in) */}
        <div className={`hero__media-layer hero__media-layer--in ${fading ? 'hero__media-layer--fading' : ''}`}>
          {current.type === 'video' ? (
            <video
              ref={videoRef}
              src={current.src}
              autoPlay muted playsInline loop preload="auto"
              className="hero__media-asset"
              onEnded={next}
            />
          ) : (
            <img
              src={current.src}
              alt=""
              className="hero__media-asset"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          )}
        </div>

        {/* Dark gradient overlays for text legibility */}
        <div className="hero__media-overlay" />
        <div className="hero__media-overlay hero__media-overlay--bottom" />
      </div>

      {/* ── Content ── */}
      <div className="container hero__inner hero__inner--media">
        <div className="hero__content">

          {/* Label */}
          <motion.div
            className="section-label"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="laser-line" />
            <span className="text-upper text-yellow">Est. 2007 · Bangalore, India</span>
          </motion.div>

          {/* Headline — re-animates on slide change */}
          <motion.h1
            key={`h-${slide}`}
            className="hero__headline heading-display heading-h1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {current.headline.split('\n').map((line, i) => (
              <span key={i} className={i === 1 ? 'text-yellow' : ''}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
          </motion.h1>

          <motion.p
            key={`s-${slide}`}
            className="hero__sub"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {current.sub}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="hero__ctas btn-group-responsive"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28 }}
          >
            <Link to="/contact?type=quote" className="btn btn-primary btn-lg" id="hero-quote-cta">
              Request a Quote
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link to="/services" className="btn btn-outline btn-lg" id="hero-services-cta">
              Explore Services
            </Link>
          </motion.div>


        </div>
      </div>

      {/* ── Prev / Next arrows ── */}
      <button
        className="hero__arrow hero__arrow--prev"
        onClick={() => { prev(); startInterval(); }}
        aria-label="Previous slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button
        className="hero__arrow hero__arrow--next"
        onClick={() => { next(); startInterval(); }}
        aria-label="Next slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      {/* ── Slide dots / progress ── */}
      <div className="hero__dots" aria-label="Slide indicators">
        {MEDIA_SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === slide ? 'hero__dot--active' : ''}`}
            onClick={() => { goTo(i); startInterval(); }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Slide counter ── */}
      <div className="hero__counter" aria-hidden="true">
        <span className="hero__counter-cur">{String(slide + 1).padStart(2, '0')}</span>
        <span className="hero__counter-sep">/</span>
        <span className="hero__counter-total">{String(total).padStart(2, '0')}</span>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="hero__scroll-cue"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        aria-hidden="true"
      >
        <span className="hero__scroll-text">Scroll Down</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </motion.div>
    </section>
  );
}

/* ── Industry consistent line icons ─── */
function IndustryIcon({ industryKey, color }) {
  const strokeColor = color || '#F5C518';
  switch (industryKey) {
    case 'aerospace':
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17.8 14H2c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h15.8l-3.5-5.5c-.3-.4-.2-1 .2-1.3l1.5-1.1c.4-.3 1-.2 1.3.2l5.4 7.2c.4.5.4 1.2 0 1.7l-5.4 7.2c-.3.4-.9.5-1.3.2l-1.5-1.1c-.4-.3-.5-.9-.2-1.3l3.5-5.5z" />
        </svg>
      );
    case 'control-panels':
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 10h4M4 14h4M12 10h8M12 14h8M16 6v8M8 10v8M12 4v6" />
        </svg>
      );
    case 'medical-devices':
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      );
    case 'material-handling':
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 9h6M9 13h6M9 17h6" />
        </svg>
      );
    case 'industrial-automation':
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    case 'automotive':
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11.1 2 11.5 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2.5" />
          <circle cx="17" cy="17" r="2.5" />
        </svg>
      );
    case 'heavy-infrastructure':
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 21h18M5 21V7l7-4 7 4v14M5 12h14M12 3v18" />
        </svg>
      );
    default:
      return null;
  }
}

/* ── Main Home page ─── */
export default function Home() {
  const sliderRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScroll = (e) => {
    const el = e.currentTarget;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(el.scrollLeft / maxScroll);
    }
  };

  const handleScrollPrev = () => {
    if (sliderRef.current) {
      const card = sliderRef.current.querySelector('.service-card-wrapper');
      const cardWidth = card ? card.clientWidth : 340;
      const gap = 24;
      sliderRef.current.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
    }
  };

  const handleScrollNext = () => {
    if (sliderRef.current) {
      const card = sliderRef.current.querySelector('.service-card-wrapper');
      const cardWidth = card ? card.clientWidth : 340;
      const gap = 24;
      sliderRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    }
  };
  return (
    <>
      <Helmet>
        <title>WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING) — Precision Laser Manufacturing in India</title>
        <meta name="description" content="India's premier precision laser manufacturing concern located in Bommasandra, Bangalore. Specializing in high quality laser cutting, welding, cladding, CNC bending, and fabrication." />
        <meta property="og:title" content="WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING) — Precision Laser Manufacturing" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Hero />

      {/* ── WHO WE ARE ─── */}
      <section className="section section-mid" id="about-preview">
        <div className="container">
          <div className="about-preview">
            <div className="about-preview__content">
              <FadeUp>
                <div className="section-label">
                  <span className="laser-line" />
                  <span className="text-upper text-yellow">Who We Are</span>
                </div>
                <h2 className="heading-display heading-h2" style={{ marginBottom: '1.25rem' }}>
                  Engineering Excellence<br />
                  <span className="text-yellow">Since 2007.</span>
                </h2>
                <p style={{ color: 'var(--gray-400)', lineHeight: 1.8, marginBottom: '1.5rem', maxWidth: '520px' }}>
                  <strong>WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING)</strong> is a leading proprietorship concern located in Bommasandra, Bangalore, executed by <strong>Mr. G. Sridhar</strong>. With rich experience in machined and fabricated components, we deliver high-quality, precise industrial solutions.
                </p>
                <p style={{ color: 'var(--gray-400)', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '520px' }}>
                  Our competent design, engineering team, and full-fledged manufacturing facilities allow us to execute complex projects that match the highest standards in the industry.
                </p>
                <Link to="/about" className="btn btn-outline">
                  Our Full Story →
                </Link>
              </FadeUp>
            </div>

            {/* Stats */}
            <div className="about-preview__stats">
              {STATS_DATA.map((stat, i) => (
                <FadeUp key={stat.label} delay={i * 0.1}>
                  <StatCard stat={stat} />
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* ── SERVICES ─── */}
      <section className="section section-mid" id="services-overview">
        <div className="container">
          <FadeUp>
            <div className="section-label">
              <span className="laser-line" />
              <span className="text-upper text-yellow">Our Capabilities</span>
            </div>
            <div className="services-overview__header">
              <h2 className="heading-display heading-h2">
                Core Manufacturing<br /><span className="text-yellow">Services.</span>
              </h2>
              <div className="services-overview__actions">
                <Link to="/services" className="btn btn-outline">View All Services →</Link>
                <div className="services-slider__arrows-header">
                  <button className="services-slider__arrow-header" onClick={handleScrollPrev} aria-label="Scroll left">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <button className="services-slider__arrow-header" onClick={handleScrollNext} aria-label="Scroll right">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </FadeUp>
          <div className="services-slider-container">
            <div 
              className="services-grid"
              ref={sliderRef}
              onScroll={handleScroll}
            >
              {SERVICES_DATA.map((svc, i) => (
                <ServiceCard key={svc.id} service={svc} index={i} />
              ))}
            </div>

            {/* Scroll progress bar (scrubber) */}
            <div className="services-slider__progress-container">
              <div 
                className="services-slider__progress-bar" 
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ─── */}
      <section className="section section-dark industries-section">
        <div className="container">
          <FadeUp>
            <div className="section-label" style={{ justifyContent: 'center' }}>
              <span className="laser-line" />
              <span className="text-upper text-yellow">Industries We Serve</span>
              <span className="laser-line" />
            </div>
            <h2 className="heading-display heading-h2" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              Industries We<br /><span className="text-yellow">Serve.</span>
            </h2>
          </FadeUp>
          <div className="industries-grid">
            {INDUSTRIES.map((ind, i) => {
              // Determine initial animation state based on mobile viewport and position
              let initialProps = { opacity: 0, y: 24, x: 0 };
              let inViewProps = { opacity: 1, y: 0, x: 0 };

              if (isMobile) {
                if (i === INDUSTRIES.length - 1) {
                  // Last card comes from down
                  initialProps = { opacity: 0, y: 40, x: 0 };
                } else if (i % 2 === 0) {
                  // Even index (Aerospace, Medical, Automation) -> Left column comes from left
                  initialProps = { opacity: 0, x: -40, y: 0 };
                } else {
                  // Odd index (Control Panels, Material Handling, Automotive) -> Right column comes from right
                  initialProps = { opacity: 0, x: 40, y: 0 };
                }
              }

              return (
                <motion.div
                  key={ind.name}
                  className="industry-card"
                  initial={initialProps}
                  whileInView={inViewProps}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    '--theme-color': ind.color,
                    '--theme-bg': `rgba(${ind.colorRgb}, 0.07)`,
                    '--theme-bg-hover': `rgba(${ind.colorRgb}, 0.14)`,
                    '--theme-border-hover': `rgba(${ind.colorRgb}, 0.4)`,
                    '--theme-shadow-hover': `0 12px 24px -10px rgba(${ind.colorRgb}, 0.25)`,
                  }}
                >
                  <div className="industry-card__icon-wrapper">
                    <IndustryIcon industryKey={ind.key} color={ind.color} />
                  </div>
                  <span className="industry-card__name">{ind.name}</span>
                  <span className="industry-card__subtitle">{ind.subtitle}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─── */}
      <section className="section section-mid" id="why-choose-us" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <FadeUp>
            <div className="section-label" style={{ justifyContent: 'center' }}>
              <span className="laser-line" />
              <span className="text-upper text-yellow">Why Choose Us</span>
              <span className="laser-line" />
            </div>
            <h2 className="heading-display heading-h2" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              Precision. Quality.<br /><span className="text-yellow">Engineering Trust.</span>
            </h2>
          </FadeUp>

          <div className="why-choose-us-grid">
            {WHY_CHOOSE_US.map((item, i) => {
              const isLeft = i % 2 === 0;
              const initialProps = isMobile 
                ? { opacity: 0, x: isLeft ? -45 : 45, y: 15 } 
                : { opacity: 0, y: 24, x: 0 };
              return (
                <motion.div
                  key={item.title}
                  className="why-choose-us-card"
                  initial={initialProps}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div 
                    className="why-choose-us-card__icon-badge"
                    style={{ '--badge-color': item.color, '--badge-bg': item.bgColor }}
                  >
                    <div className="why-choose-us-card__pulse-ring"></div>
                    <CapabilityIcon iconKey={item.iconKey} />
                  </div>
                  <h3 className="why-choose-us-card__title">{item.title}</h3>
                  <p className="why-choose-us-card__desc">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CLIENTS ─── */}
      <section className="section-mid clients-section">
        <div className="container">
          <FadeUp>
            <p className="text-upper text-muted" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              Trusted by Industry Leaders
            </p>
          </FadeUp>
        </div>
        <ClientMarquee />
      </section>

      {/* ── CTA BANNER ─── */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner__inner">
            <div className="cta-banner__beam" aria-hidden="true" />
            <FadeUp>
              <h2 className="heading-display heading-h2 cta-banner__title">
                Ready to Build<br /><span className="text-yellow">Something Precise?</span>
              </h2>
              <p className="cta-banner__sub">
                Share your requirements and our engineers will respond within 24 hours with a tailored solution and competitive quote.
              </p>
              <div className="cta-banner__btns btn-group-responsive">
                <Link to="/contact?type=quote" className="btn btn-primary btn-lg" id="cta-banner-quote">
                  Request a Quote →
                </Link>
                <Link to="/contact" className="btn btn-ghost btn-lg">
                  Talk to an Engineer
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
