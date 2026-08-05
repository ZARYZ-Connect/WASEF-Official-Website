import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Careers.css';

const OPENINGS = [
  { id: 1, title: 'Senior Laser Process Engineer', dept: 'Engineering', type: 'Full Time', location: 'Bangalore', exp: '5–8 years', posted: '2 weeks ago' },
  { id: 2, title: 'Quality Assurance Manager', dept: 'Quality', type: 'Full Time', location: 'Bangalore', exp: '8–12 years', posted: '1 week ago' },
  { id: 3, title: 'CNC Programmer — 5-Axis Laser', dept: 'Operations', type: 'Full Time', location: 'Pune', exp: '3–5 years', posted: '3 days ago' },
  { id: 4, title: 'R&D Engineer — Metal 3D Printing', dept: 'R&D', type: 'Full Time', location: 'Bangalore', exp: '2–4 years', posted: '5 days ago' },
  { id: 5, title: 'Business Development Manager — Aerospace', dept: 'Sales', type: 'Full Time', location: 'Bangalore / Remote', exp: '6–10 years', posted: '1 month ago' },
  { id: 6, title: 'Laser Welding Technician', dept: 'Operations', type: 'Full Time', location: 'Bangalore', exp: '2–5 years', posted: '4 days ago' },
];

const DEPT_COLORS = { Engineering: 'var(--yellow-500)', Quality: '#4FC3F7', 'R&D': '#81C784', Operations: '#FF8A65', Sales: '#CE93D8' };

export default function Careers() {
  const [filter, setFilter] = useState('All');
  const depts = ['All', ...new Set(OPENINGS.map(o => o.dept))];
  const filtered = filter === 'All' ? OPENINGS : OPENINGS.filter(o => o.dept === filter);

  return (
    <>
      <Helmet>
        <title>Careers — WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING)</title>
        <meta name="description" content="Join WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING). Open positions in engineering, quality, R&D, and operations at India's leading precision laser manufacturing company." />
      </Helmet>

      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__inner">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="section-label">
              <span className="laser-line" />
              <span className="text-upper text-yellow">Join Our Team</span>
            </div>
            <h1 className="heading-display heading-h1">
              Engineer the<br /><span className="text-yellow">Future of Precision.</span>
            </h1>
            <p style={{ color: 'var(--gray-400)', maxWidth: '520px', marginTop: '1rem', lineHeight: 1.75 }}>
              At WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING), you'll work on the most advanced laser manufacturing systems in India,
              alongside engineers who take pride in micron-level accuracy and industrial-grade quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Culture */}
      <section className="section section-mid">
        <div className="container">
          <div className="culture-grid">
            {[
              { icon: '🎯', title: 'Mission-Driven', desc: 'Every component we make goes into systems that matter — aircraft, defence, medical devices.' },
              { icon: '🔬', title: 'Continuous Learning', desc: 'R&D budget, certification sponsorship, and access to the latest laser technology.' },
              { icon: '🌱', title: 'Grow with Us', desc: 'Structured career progression, leadership programs, and exposure to global supply chains.' },
              { icon: '⚡', title: 'Fast-Paced', desc: 'From prototype to production in weeks. You will see the direct impact of your work.' },
            ].map((c, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div key={c.title} className="culture-card card"
                  initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}>
                  <span className="culture-card__icon">{c.icon}</span>
                  <h3 className="culture-card__title">{c.title}</h3>
                  <p className="culture-card__desc">{c.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-label">
            <span className="laser-line" />
            <span className="text-upper text-yellow">Open Positions</span>
          </div>
          <div className="careers-header">
            <h2 className="heading-display heading-h2" style={{ marginBottom: '0' }}>
              {filtered.length} Opening{filtered.length !== 1 ? 's' : ''}
            </h2>
            <div className="careers-filters">
              {depts.map(d => (
                <button
                  key={d}
                  className={`careers-filter ${filter === d ? 'careers-filter--active' : ''}`}
                  onClick={() => setFilter(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="openings-list">
            {filtered.map((job, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div key={job.id} className="job-card card"
                  initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 15 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}>
                <div className="job-card__header">
                  <div>
                    <h3 className="job-card__title">{job.title}</h3>
                    <div className="job-card__meta">
                      <span className="badge badge-yellow">{job.dept}</span>
                      <span className="job-card__meta-item">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {job.location}
                      </span>
                      <span className="job-card__meta-item">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        {job.exp}
                      </span>
                      <span className="job-card__meta-item">{job.type}</span>
                    </div>
                  </div>
                  <div className="job-card__right">
                    <span className="job-card__posted">Posted {job.posted}</span>
                    <Link to={`/contact?type=career&job=${encodeURIComponent(job.title)}`} className="btn btn-primary btn-sm">
                      Apply Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem', background: 'var(--charcoal-700)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ color: 'var(--gray-400)', marginBottom: '1rem' }}>
              Don't see a role that fits? We're always looking for exceptional engineers.
            </p>
            <Link to="/contact" className="btn btn-outline">Send a Speculative Application</Link>
          </div>
        </div>
      </section>
    </>
  );
}
