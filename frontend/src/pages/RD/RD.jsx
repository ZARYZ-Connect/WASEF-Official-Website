import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './RD.css';

const CAPABILITIES = [
  {
    icon: '🔬',
    title: 'Process R&D Lab',
    desc: 'Dedicated 4,000 sq. ft. facility for laser process development — new material qualification, parameter optimisation, and failure mode analysis.',
    tags: ['Material Testing', 'Process Optimisation', 'Failure Analysis'],
  },
  {
    icon: '🤖',
    title: 'Automation & Robotics',
    desc: 'Six-axis robotic laser welding cells with closed-loop seam tracking and AI-powered defect detection for unattended production.',
    tags: ['6-Axis Robotics', 'Machine Vision', 'AI Defect Detection'],
  },
  {
    icon: '💻',
    title: 'Simulation & Modelling',
    desc: 'FEA thermal modelling of laser processes, residual stress simulation, and distortion prediction before first-article production.',
    tags: ['FEA', 'Thermal Modelling', 'Digital Twin'],
  },
  {
    icon: '🧪',
    title: 'Materials Innovation',
    desc: 'Evaluation of next-generation alloys for additive manufacturing — titanium aluminide, amorphous metals, and multi-material builds.',
    tags: ['Advanced Alloys', 'Additive Materials', 'Characterisation'],
  },
];

const EQUIPMENT = [
  { name: 'IPG Photonics YLS-12000', power: '12 kW Fiber Laser', use: 'High-power cutting research' },
  { name: 'TRUMPF TruDisk 8001', power: '8 kW Disk Laser', use: 'Precision welding & cladding R&D' },
  { name: 'EOS M 400-4', power: 'Quad-beam 4×400W', use: 'DMLS 3D printing research' },
  { name: 'Fraunhofer LZH Scanner', power: '2 kW Beam scanner', use: 'Surface hardening development' },
  { name: 'Spectra Physics ns-pulse', power: '100 W ns Laser', use: 'Micro-drilling & marking' },
  { name: 'Laserline LDM 4000-40', power: '4 kW Diode Laser', use: 'Cladding & hardening production R&D' },
];

export default function RD() {
  return (
    <>
      <Helmet>
        <title>R&D Capabilities — WASEF Manufacturing</title>
        <meta name="description" content="WASEF Manufacturing's Research & Development division — laser process innovation, robotics, simulation, and advanced materials for next-generation precision manufacturing." />
      </Helmet>

      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__inner">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="section-label">
              <span className="laser-line" />
              <span className="text-upper text-yellow">Innovation Division</span>
            </div>
            <h1 className="heading-display heading-h1">
              R&D That Pushes<br /><span className="text-yellow">The Frontier.</span>
            </h1>
            <p style={{ color: 'var(--gray-400)', maxWidth: '560px', marginTop: '1rem', lineHeight: 1.75 }}>
              Our R&D division doesn't just support manufacturing — it leads it.
              With 20+ dedicated researchers and collaborations with IISc, IIT, and international
              laser institutes, we develop processes before the industry needs them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section section-mid">
        <div className="container">
          <div className="section-label">
            <span className="laser-line" />
            <span className="text-upper text-yellow">Core Capabilities</span>
          </div>
          <h2 className="heading-display heading-h2" style={{ marginBottom: '2.5rem' }}>
            Innovation<br /><span className="text-yellow">in Every Beam.</span>
          </h2>
          <div className="grid-2">
            {CAPABILITIES.map((cap, i) => (
              <motion.div key={cap.title} className="rd-cap-card card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}>
                <span className="rd-cap-card__icon">{cap.icon}</span>
                <h3 className="rd-cap-card__title">{cap.title}</h3>
                <p className="rd-cap-card__desc">{cap.desc}</p>
                <div className="rd-cap-card__tags">
                  {cap.tags.map(t => (
                    <span key={t} className="badge badge-gray">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-label">
            <span className="laser-line" />
            <span className="text-upper text-yellow">Equipment List</span>
          </div>
          <h2 className="heading-display heading-h2" style={{ marginBottom: '2.5rem' }}>
            Research-Grade<br /><span className="text-yellow">Infrastructure.</span>
          </h2>
          <div className="equipment-table">
            {EQUIPMENT.map((eq, i) => (
              <motion.div key={eq.name} className="equipment-row"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}>
                <div className="equipment-row__num">0{i + 1}</div>
                <div className="equipment-row__info">
                  <span className="equipment-row__name">{eq.name}</span>
                  <span className="equipment-row__power">{eq.power}</span>
                </div>
                <span className="equipment-row__use">{eq.use}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration */}
      <section className="section section-mid">
        <div className="container">
          <div className="rd-collab">
            <div>
              <div className="section-label">
                <span className="laser-line" />
                <span className="text-upper text-yellow">Partnerships</span>
              </div>
              <h2 className="heading-display heading-h2" style={{ marginBottom: '1.5rem' }}>
                Collaborative<br /><span className="text-yellow">Research.</span>
              </h2>
              <p style={{ color: 'var(--gray-400)', maxWidth: '480px', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                We collaborate with India's premier research institutions to bring the latest
                laser science directly into production processes.
              </p>
              <div className="rd-collab__partners">
                {['IISc Bangalore', 'IIT Bombay', 'IIT Madras', 'Fraunhofer ILT', 'DRDO'].map(p => (
                  <span key={p} className="rd-collab__partner">{p}</span>
                ))}
              </div>
            </div>
            <div className="rd-collab__stats">
              {[
                { val: '20+', label: 'R&D Engineers' },
                { val: '12', label: 'Active Projects' },
                { val: '8', label: 'Patents Filed' },
                { val: '5', label: 'Academic Partners' },
              ].map(s => (
                <div key={s.label} className="rd-stat">
                  <span className="stat-number" style={{ fontSize: '2.5rem' }}>{s.val}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--gray-400)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <div className="container cta-strip__inner">
          <h2 className="heading-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
            Have a challenging process? <span className="text-yellow">Our R&D team can help.</span>
          </h2>
          <Link to="/contact" className="btn btn-primary btn-lg">Talk to an Engineer →</Link>
        </div>
      </section>
    </>
  );
}
