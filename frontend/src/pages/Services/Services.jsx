import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SERVICES_DATA } from '../../data/staticData';
import ServiceIcon from '../../components/ServiceIcon/ServiceIcon';
import './Services.css';

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  );
}

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Our Services — WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING)</title>
        <meta name="description" content="Precision laser cutting, welding, cladding, drilling, fabrication, 3D printing, and hardening. Custom laser manufacturing services." />
      </Helmet>

      {/* Header */}
      <section className="page-hero page-hero--services">
        <div className="container page-hero__inner">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="section-label">
              <span className="laser-line" />
              <span className="text-upper text-yellow">Services</span>
            </div>
            <h1 className="heading-display heading-h1">
              Our Core<br /><span className="text-yellow">Capabilities.</span>
            </h1>
            <p style={{ color: 'var(--gray-200)', maxWidth: '560px', marginTop: '1rem', fontSize: '1.0625rem', lineHeight: 1.75 }}>
              From raw materials to finished precision assemblies. Custom solutions built to exact tolerances.
            </p>
          </motion.div>
        </div>
      </section>


      {/* Services list */}
      <section className="section section-mid">
        <div className="container">
          <div className="services-list">
            {SERVICES_DATA.map((svc, i) => (
              <FadeUp key={svc.id} delay={i * 0.07}>
                <Link
                  to={`/services/${svc.slug}`}
                  className="svc-row"
                >
                  {svc.video && (
                    <div className="svc-row__video-bg">
                      <video
                        src={svc.video}
                        className="svc-row__video-asset"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                      />
                      <div className="svc-row__video-overlay" />
                    </div>
                  )}
                  <div className="svc-row__header-meta">
                    <div className="svc-row__icon">
                      <ServiceIcon slug={svc.slug} />
                    </div>
                    <div className="svc-row__num">0{i + 1}</div>
                  </div>
                  <div className="svc-row__content">
                    <p className="svc-row__tag">{svc.tagline}</p>
                    <h2 className="svc-row__title">{svc.title}</h2>
                    <p className="svc-row__desc">{svc.description}</p>
                    <p className="svc-row__apps">
                      <strong>Applications: </strong>
                      {svc.applications}
                    </p>
                  </div>
                  <div className="svc-row__footer">
                    <span>Explore Capability</span>
                    <span className="svc-row__arrow">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Quote CTA */}
      <section className="cta-strip">
        <div className="container cta-strip__inner">
          <div>
            <h2 className="heading-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
              Need a custom capability? <span className="text-yellow">Talk to our engineers.</span>
            </h2>
          </div>
          <Link to="/contact?type=quote" className="btn btn-primary btn-lg">Request a Quote →</Link>
        </div>
      </section>
    </>
  );
}
