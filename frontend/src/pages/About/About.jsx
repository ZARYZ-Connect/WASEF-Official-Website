import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './About.css';

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  );
}

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`timeline-item ${isLeft ? 'timeline-item--left' : 'timeline-item--right'}`}
      initial={{ opacity: 0, x: isLeft ? -45 : 45, y: 15 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="timeline-item__year-wrapper">
        <div className="timeline-item__year">{item.year}</div>
      </div>
      <div className="timeline-item__dot-container">
        <div className="timeline-item__dot" />
      </div>
      <div className="timeline-item__content">
        <h3 className="timeline-item__title">{item.title}</h3>
        <p className="timeline-item__desc">{item.desc}</p>
      </div>
    </motion.div>
  );
}

const TIMELINE = [
  { year: '2007', title: 'Founding & Operations', desc: 'WASEF PVT LTD & KS INDUSTRIES (SLE LASER CUTTING) established operations in Bommasandra, Bangalore, focusing on machined and fabricated components.' },
  { year: '2021', title: 'Facility Expansion', desc: 'Installed advanced machinery and expanded production capacity to meet growing customer demands.' },
  { year: '2023', title: 'Project Management Cell', desc: 'Established a dedicated cell to handle end-to-end integration and deliver complex manufacturing projects.' },
  { year: '2026', title: 'Industry Leadership', desc: 'Recognized for top-tier design, engineering competence, and high-fidelity project execution.' },
];

const AerospaceIcon = () => (
  <motion.svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    animate={{ y: [0, -3, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5z" />
  </motion.svg>
);

const ControlPanelsIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 10h16M4 14h16M4 18h16" />
    <motion.circle cx="8" cy="10" r="2.5" fill="currentColor" animate={{ cx: [8, 15, 8] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
    <motion.circle cx="16" cy="14" r="2.5" fill="currentColor" animate={{ cx: [16, 9, 16] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} />
    <motion.circle cx="11" cy="18" r="2.5" fill="currentColor" animate={{ cx: [11, 5, 11] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} />
  </svg>
);

const MedicalIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    <motion.path
      d="M2 12h4l3-9 6 18 3-9h4"
      stroke="var(--yellow-500)"
      strokeWidth="2.2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: [0, 1, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>
);

const ConveyorIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <motion.g
      style={{ transformOrigin: '8px 8px' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 2v2M8 12v2M2 8h2M12 8h2" />
    </motion.g>
    <motion.g
      style={{ transformOrigin: '16px 16px' }}
      animate={{ rotate: -360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="16" cy="16" r="2.5" />
      <path d="M16 10v2M16 20v2M10 16h2M20 16h2" />
    </motion.g>
  </svg>
);

const AutomationIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="5" width="14" height="14" rx="2" />
    <path d="M9 9h6v6H9z" />
    <path d="M9 1v4M15 1v4M9 19v4M15 19v4M20 9h3M20 15h3M1 9h3M1 15h3" />
    <motion.rect
      x="9"
      y="9"
      width="6"
      height="6"
      fill="var(--yellow-500)"
      opacity="0.3"
      animate={{ opacity: [0.1, 0.8, 0.1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>
);

const AutomotiveIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <motion.circle
      cx="7"
      cy="17"
      r="2"
      style={{ transformOrigin: '7px 17px' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />
    <path d="M9 17h6" />
    <motion.circle
      cx="17"
      cy="17"
      r="2"
      style={{ transformOrigin: '17px 17px' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />
  </svg>
);

const HeavyStructuralIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 22V2h3l13 10H8" />
    <motion.g
      animate={{ y: [0, 3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M19 12v4" />
      <path d="M17 16h4M19 16c-1 1-1.5 2-1 3s1.5 1 2 0" />
    </motion.g>
  </svg>
);

const LEADERSHIP = [
  { name: 'Mr. G. Sridhar', role: 'Founder & Proprietor', bio: 'A well established business promoter with rich experience of over 5 years in machined and fabricated components, providing direct technical support and operational leadership.' },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us — WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING)</title>
        <meta name="description" content="Learn about WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING), a leading manufacturing concern in Bommasandra, Bangalore specializing in precision machined and fabricated components." />
      </Helmet>

      {/* Page header (with ABOUT.png background) */}
      <section className="page-hero page-hero--about">
        <div className="container page-hero__inner">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="section-label">
              <span className="laser-line" />
              <span className="text-upper text-yellow">About WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING)</span>
            </div>
            <h1 className="heading-display heading-h1">
              Precision Machining &<br /><span className="text-yellow">Fabrication Excellence.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Company Profile (Intro Section) */}
      <section className="section section-mid" id="company-profile">
        <div className="container">
          <div className="about-preview">
            <div className="about-preview__content">
              <FadeUp>
                <div className="section-label">
                  <span className="laser-line" />
                  <span className="text-upper text-yellow">Company Profile</span>
                </div>
                <h2 className="heading-display heading-h2" style={{ marginBottom: '1.5rem' }}>
                  Engineering Solutions,<br />
                  <span className="text-yellow">Delivering Quality.</span>
                </h2>
                <p style={{ color: 'var(--gray-200)', fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  <strong>WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING)</strong> is a proprietorship concern located in Bommasandra, Bangalore, executed by <strong>Mr. G. Sridhar</strong>. He is a well established business promoter, having rich experiences in this field of business over 5 years. He is having technical support and practically well versed in the field of manufacturing of machined and fabricated components.
                </p>
                <p style={{ color: 'var(--gray-300)', lineHeight: 1.8, marginBottom: '2rem' }}>
                  <strong>WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING)</strong> began its operations in the year 2007. It is well equipped to meet customer aspirations through a competent design and engineering team, full fledged manufacturing facilities and project management cell who can piece together the tasks to deliver any manufacturing project that can match the best in the industry.
                </p>
              </FadeUp>
            </div>

            {/* Visual Highlight or Stats */}
            <div className="about-preview__stats">
              <FadeUp delay={0.1}>
                <div className="stat-card" style={{ padding: '2.5rem', borderLeft: '4px solid var(--yellow-500)' }}>
                  <span className="stat-card__number stat-number" style={{ fontSize: '3.5rem' }}>2007</span>
                  <span className="stat-card__label" style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Year of Establishment</span>
                </div>
              </FadeUp>
              <FadeUp delay={0.2}>
                <div className="stat-card" style={{ padding: '2.5rem', borderLeft: '4px solid var(--yellow-500)' }}>
                  <span className="stat-card__number stat-number" style={{ fontSize: '3.5rem' }}>5+</span>
                  <span className="stat-card__label" style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Years Professional Experience</span>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>


      {/* Core Business Verticals */}
      <section className="section section-dark" id="core-business">
        <div className="container">
          <FadeUp>
            <div className="section-label">
              <span className="laser-line" />
              <span className="text-upper text-yellow">Core Business Focus</span>
            </div>
            <h2 className="heading-display heading-h2" style={{ marginBottom: '3rem' }}>
              Our Manufacturing<br /><span className="text-yellow">Verticals.</span>
            </h2>
          </FadeUp>
          <div className="core-business-grid" style={{ marginTop: '2rem' }}>
            <FadeUp delay={0.05}>
              <div className="vertical-card">
                <div className="vertical-card__bg" style={{ backgroundImage: 'url("/images/vertical-aerospace.png?v=2")' }} />
                <div className="vertical-card__icon">
                  <AerospaceIcon />
                </div>
                <h3 className="vertical-card__title">Aerospace Sub-Parts</h3>
                <p className="vertical-card__body">Precision machining and fabrication of high-tolerance aerospace components and structural sub-assemblies.</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="vertical-card">
                <div className="vertical-card__bg" style={{ backgroundImage: 'url("/images/vertical-control-panels.png?v=2")' }} />
                <div className="vertical-card__icon">
                  <ControlPanelsIcon />
                </div>
                <h3 className="vertical-card__title">Control Panels</h3>
                <p className="vertical-card__body">Custom sheet metal enclosures, control desks, and operator panel assemblies.</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="vertical-card">
                <div className="vertical-card__bg" style={{ backgroundImage: 'url("/images/vertical-medical.png?v=2")' }} />
                <div className="vertical-card__icon">
                  <MedicalIcon />
                </div>
                <h3 className="vertical-card__title">Medical Equipment Components</h3>
                <p className="vertical-card__body">High-precision machined parts and frames for medical imaging and healthcare systems.</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="vertical-card">
                <div className="vertical-card__bg" style={{ backgroundImage: 'url("/images/vertical-conveyor.png?v=2")' }} />
                <div className="vertical-card__icon">
                  <ConveyorIcon />
                </div>
                <h3 className="vertical-card__title">Conveyor Fabrication</h3>
                <p className="vertical-card__body">Heavy-duty manufacturing of conveyor systems, rollers, and material handling structures.</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.25}>
              <div className="vertical-card">
                <div className="vertical-card__bg" style={{ backgroundImage: 'url("/images/vertical-automation.png?v=2")' }} />
                <div className="vertical-card__icon">
                  <AutomationIcon />
                </div>
                <h3 className="vertical-card__title">Automation Components</h3>
                <p className="vertical-card__body">Specialized parts, mountings, and frames designed to serve advanced industrial automation setups.</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="vertical-card">
                <div className="vertical-card__bg" style={{ backgroundImage: 'url("/images/vertical-automotive.png?v=2")' }} />
                <div className="vertical-card__icon">
                  <AutomotiveIcon />
                </div>
                <h3 className="vertical-card__title">Automotive Chassis & Assemblies</h3>
                <p className="vertical-card__body">Structural components, chassis brackets, and precision metal assemblies for vehicles.</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.35}>
              <div className="vertical-card">
                <div className="vertical-card__bg" style={{ backgroundImage: 'url("/images/vertical-structural.png?v=2")' }} />
                <div className="vertical-card__icon">
                  <HeavyStructuralIcon />
                </div>
                <h3 className="vertical-card__title">Heavy Structural Works</h3>
                <p className="vertical-card__body">High-durability structural steel fabrication and assembly for infrastructure and machinery.</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Core Competencies / Pillars */}
      <section className="section section-mid">
        <div className="container">
          <FadeUp>
            <div className="section-label" style={{ justifyContent: 'center' }}>
              <span className="laser-line" />
              <span className="text-upper text-yellow">Our Strengths</span>
              <span className="laser-line" />
            </div>
            <h2 className="heading-display heading-h2" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              Built to Deliver<br /><span className="text-yellow">At Scale.</span>
            </h2>
          </FadeUp>
          <div className="mission-grid">
            <FadeUp>
              <div className="mission-card">
                <div className="mission-card__icon">◎</div>
                <h3 className="mission-card__title">Design & Engineering</h3>
                <p className="mission-card__body">
                  A highly competent design and engineering team that understands client requirements and shapes ideas into production-ready technical designs with absolute precision.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="mission-card mission-card--alt">
                <div className="mission-card__icon">✦</div>
                <h3 className="mission-card__title">Full Fledged Facilities</h3>
                <p className="mission-card__body">
                  Equipped with advanced machinery and technology at Bommasandra to ensure robust production of machined and fabricated components.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="mission-card">
                <div className="mission-card__icon">⬡</div>
                <h3 className="mission-card__title">Project Management Cell</h3>
                <p className="mission-card__body">
                  A focused project management cell that pieces together all manufacturing steps to deliver complete projects matching the highest industry benchmarks.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section section-dark">
        <div className="container">
          <FadeUp>
            <div className="section-label">
              <span className="laser-line" />
              <span className="text-upper text-yellow">Leadership</span>
            </div>
            <h2 className="heading-display heading-h2" style={{ marginBottom: '3rem' }}>
              Promoter &<br /><span className="text-yellow">Technical Director.</span>
            </h2>
          </FadeUp>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            {LEADERSHIP.map((l, i) => (
              <FadeUp key={l.name} delay={i * 0.1}>
                <div className="leader-card card" style={{ padding: '3rem 2rem' }}>
                  <div className="leader-card__avatar">{l.name.charAt(4)}</div>
                  <h3 className="leader-card__name" style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{l.name}</h3>
                  <span className="leader-card__role" style={{ fontSize: '0.875rem' }}>{l.role}</span>
                  <p className="leader-card__bio" style={{ fontSize: '0.9375rem', marginTop: '1rem', lineHeight: 1.8 }}>{l.bio}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section section-mid">
        <div className="container">
          <FadeUp>
            <div className="section-label">
              <span className="laser-line" />
              <span className="text-upper text-yellow">Our Timeline</span>
            </div>
            <h2 className="heading-display heading-h2" style={{ marginBottom: '3rem' }}>
              Growing Stronger,<br /><span className="text-yellow">Year by Year.</span>
            </h2>
          </FadeUp>
          <div className="timeline">
            <div className="timeline__line">
              <div className="timeline__line-fill" />
            </div>
            {TIMELINE.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-strip">
        <div className="container cta-strip__inner">
          <FadeUp>
            <h2 className="heading-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
              Partner with WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING) — <span className="text-yellow">Request a Quote Today.</span>
            </h2>
          </FadeUp>
          <Link to="/contact?type=quote" className="btn btn-primary btn-lg">Get a Quote →</Link>
        </div>
      </section>
    </>
  );
}
