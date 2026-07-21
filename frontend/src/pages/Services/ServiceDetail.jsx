import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { SERVICES_DATA } from '../../data/staticData';
import ServiceIcon from '../../components/ServiceIcon/ServiceIcon';
import './Services.css';

const SPECS = {
  'laser-cutting': [
    { param: 'Max Sheet Size', value: '3000 × 1500 mm' },
    { param: 'Max Thickness (Steel)', value: '25 mm' },
    { param: 'Max Thickness (Aluminium)', value: '20 mm' },
    { param: 'Positional Accuracy', value: '±0.05 mm' },
    { param: 'Laser Type', value: 'Fiber & CO₂' },
    { param: 'Max Power', value: '12 kW' },
    { param: 'Cutting Modes', value: '2D, 3D, Tube, 5-Axis' },
    { param: 'Materials', value: 'SS, MS, Al, Ti, Cu, Brass, Inconel' },
  ],
  'cnc-bending-forming': [
    { param: 'Machine Type', value: 'CNC Hydraulic Press Brake' },
    { param: 'Maximum Length', value: '3100 mm' },
    { param: 'Bending Force', value: '100 – 220 Tons' },
    { param: 'Thickness Range', value: '0.5 – 12 mm' },
    { param: 'Angle Precision', value: '±0.1°' },
    { param: 'Backgauge Axes', value: 'Multi-Axis (X, R, Z1, Z2)' },
  ],
  'fabrication-assembly': [
    { param: 'Welding Processes', value: 'MIG, TIG, Laser, Spot Welding' },
    { param: 'Materials Welded', value: 'Stainless Steel, Carbon Steel, Aluminium' },
    { param: 'Assembly Capacity', value: 'Custom structural component fabrication & line fitting' },
    { param: 'Jigging & Fixtures', value: 'Dedicated design & build capability for complex geometry' },
    { param: 'Welding Standards', value: 'Qualified welders with industry-grade testing' },
  ],
  'precision-sheet-metal': [
    { param: 'Material Thickness', value: '0.4 – 6.0 mm' },
    { param: 'Tolerance Standards', value: 'High precision (ISO 2768-m or custom)' },
    { param: 'Design Formats', value: 'CAD, STEP, DXF, IGES, SolidWorks' },
    { param: 'Enclosure Rating', value: 'IP55, IP65, IP66 custom options' },
    { param: 'Surface Treatment', value: 'Powder coating, plating, anodizing' },
  ],
  'custom-metal-fabrication': [
    { param: 'Raw Material Formats', value: 'Plates, Sheets, Channels, Angles, Pipes' },
    { param: 'Sawing Capacity', value: 'Automatic band saw up to 300 mm diameter' },
    { param: 'Laser Power', value: 'Fiber laser cutting up to 12 kW' },
    { param: 'Lifting Capacity', value: 'EOT Overhead Crane (Heavy Duty)' },
    { param: 'Final Delivery', value: 'Completely finished, painted, and assembled units' },
  ],
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = SERVICES_DATA.find(s => s.slug === slug);

  if (!service) return (
    <div style={{ padding: '8rem 0', textAlign: 'center' }}>
      <p style={{ color: 'var(--gray-400)' }}>Service not found.</p>
      <Link to="/services" className="btn btn-outline" style={{ marginTop: '1rem' }}>← Back to Services</Link>
    </div>
  );

  const specs = SPECS[slug] || [];
  const related = SERVICES_DATA.filter(s => s.slug !== slug).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{service.title} — WASEF Manufacturing</title>
        <meta name="description" content={service.description.slice(0, 155)} />
      </Helmet>

      {/* Hero */}
      <section className={`svc-detail-hero ${service.video || service.image ? 'svc-detail-hero--video-bg' : ''}`}>
        {service.video ? (
          <div className="svc-detail-hero__video-container">
            <video
              src={service.video}
              className="svc-detail-hero__video-asset"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="svc-detail-hero__video-overlay" />
          </div>
        ) : service.image ? (
          <div className="svc-detail-hero__video-container">
            <img
              src={service.image}
              alt={service.title}
              className="svc-detail-hero__video-asset"
              style={{ objectFit: 'cover' }}
            />
            <div className="svc-detail-hero__video-overlay" />
          </div>
        ) : (
          <div className="page-hero__bg" />
        )}
        <div className="container svc-detail-hero__inner">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link to="/services" className="svc-breadcrumb">
              ← Back to Services
            </Link>
            <div className="svc-detail-hero__icon">
              <ServiceIcon slug={service.slug} />
            </div>
            <h1 className="heading-display heading-h1">
              {service.title}<br /><span className="text-yellow">{service.tagline}</span>
            </h1>
            <p className="svc-detail-hero__desc">{service.description}</p>
            <div className="btn-group-responsive">
              <Link to={`/contact?type=quote&service=${encodeURIComponent(service.title)}`} className="btn btn-primary btn-lg">Request Quote</Link>
              <Link to="/contact" className="btn btn-outline btn-lg">Talk to an Engineer</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech specs */}
      {specs.length > 0 && (
        <section className="section section-mid">
          <div className="container">
            <div className="section-label">
              <span className="laser-line" />
              <span className="text-upper text-yellow">Technical Specifications</span>
            </div>
            <h2 className="heading-display heading-h2" style={{ marginBottom: '2rem' }}>
              The Numbers<br /><span className="text-yellow">That Matter.</span>
            </h2>
            <div className="specs-table">
              {specs.map(s => (
                <div key={s.param} className="specs-row">
                  <span className="specs-row__param">{s.param}</span>
                  <span className="specs-row__value">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Applications */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-label">
            <span className="laser-line" />
            <span className="text-upper text-yellow">Applications</span>
          </div>
          <h2 className="heading-display heading-h2" style={{ marginBottom: '2rem' }}>
            Where We<br /><span className="text-yellow">Deliver Value.</span>
          </h2>
          <p style={{ color: 'var(--gray-400)', fontSize: '1.0625rem', lineHeight: 1.75, maxWidth: '640px' }}>
            {service.applications}
          </p>
        </div>
      </section>

      {/* Related Services */}
      <section className="section section-mid">
        <div className="container">
          <h2 className="heading-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '2rem' }}>
            Related <span className="text-yellow">Services</span>
          </h2>
          <div className="grid-3">
            {related.map(svc => (
              <Link key={svc.id} to={`/services/${svc.slug}`} className="svc-row svc-row--compact card">
                <div className="svc-row__icon">
                  <ServiceIcon slug={svc.slug} />
                </div>
                <div>
                  <div className="svc-row__title" style={{ fontSize: '1rem' }}>{svc.title}</div>
                  <div className="svc-row__tag">{svc.tagline}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--yellow-500)" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
