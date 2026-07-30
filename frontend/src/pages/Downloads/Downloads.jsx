import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import './Downloads.css';

const DOCUMENTS = [
  { id: 1, title: 'Company Brochure 2024', type: 'Brochure', size: '4.2 MB', format: 'PDF', icon: '📋' },
  { id: 2, title: 'Laser Cutting Capabilities Datasheet', type: 'Data Sheet', size: '1.8 MB', format: 'PDF', icon: '📄' },
  { id: 3, title: 'Laser Welding Process Guide', type: 'White Paper', size: '2.5 MB', format: 'PDF', icon: '📝' },
  { id: 4, title: 'Metal 3D Printing Material Portfolio', type: 'Data Sheet', size: '3.1 MB', format: 'PDF', icon: '📄' },
  { id: 5, title: 'Technical Capabilities Overview', type: 'White Paper', size: '1.2 MB', format: 'PDF', icon: '📝' },
  { id: 6, title: 'Component Fabrication Case Study', type: 'Case Study', size: '5.6 MB', format: 'PDF', icon: '📊' },
];

const DOC_TYPE_COLORS = {
  'Brochure':   'rgba(255,199,44,0.12)',
  'Data Sheet': 'rgba(79,195,247,0.12)',
  'White Paper':'rgba(129,199,132,0.12)',
  'Case Study': 'rgba(255,138,101,0.12)',
};

export default function Downloads() {
  return (
    <>
      <Helmet>
        <title>Downloads &amp; Resources — WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING)</title>
        <meta name="description" content="Download WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING) brochures, capability datasheets, and case studies." />
      </Helmet>

      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__inner">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="section-label">
              <span className="laser-line" />
              <span className="text-upper text-yellow">Resource Centre</span>
            </div>
            <h1 className="heading-display heading-h1">
              Downloads<br /><span className="text-yellow">& Resources.</span>
            </h1>
          </motion.div>
        </div>
      </section>



      {/* Documents */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-label">
            <span className="laser-line" />
            <span className="text-upper text-yellow">Technical Documents</span>
          </div>
          <h2 className="heading-display heading-h2" style={{ marginBottom: '2.5rem' }}>
            Datasheets &<br /><span className="text-yellow">Resources.</span>
          </h2>
          <div className="docs-list">
            {DOCUMENTS.map((doc, i) => (
              <motion.div key={doc.id} className="doc-row"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}>
                <span className="doc-row__icon">{doc.icon}</span>
                <div className="doc-row__info">
                  <h3 className="doc-row__title">{doc.title}</h3>
                  <div className="doc-row__meta">
                    <span className="badge badge-gray">{doc.type}</span>
                    <span className="doc-row__size">{doc.format} · {doc.size}</span>
                  </div>
                </div>
                <button className="btn btn-primary btn-sm doc-row__dl">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
