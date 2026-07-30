import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING)</title>
        <meta name="description" content="Privacy policy for WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING). Learn how we protect your personal and industrial project data." />
      </Helmet>

      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__inner">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="section-label">
              <span className="laser-line" />
              <span className="text-upper text-yellow">Legal &amp; Trust</span>
            </div>
            <h1 className="heading-display heading-h1">
              Privacy <span className="text-yellow">Policy.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="section section-mid" style={{ background: '#f8fafc', color: '#334155' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="legal-content" style={{ lineHeight: '1.8', fontSize: '0.95rem' }}>
            <p style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: '500', marginBottom: '2rem' }}>
              Last Updated: July 28, 2026
            </p>
            
            <p>
              At <strong>WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING)</strong>, we respect your privacy and are committed to protecting the personal and project-related data you share with us. This Privacy Policy describes how we collect, use, and secure your information when you visit our website or interact with our manufacturing services.
            </p>

            <h2 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              1. Information We Collect
            </h2>
            <p>
              We collect information to provide high-quality precision manufacturing and custom fabrication services. This includes:
            </p>
            <ul>
              <li><strong>Contact Information:</strong> Name, job title, email address, phone number, and company name when you fill out quote request or contact forms.</li>
              <li><strong>Design &amp; CAD Data:</strong> Engineering blueprints, drawings, CAD/3D files, and technical specifications submitted for quoting or manufacturing purposes.</li>
              <li><strong>Usage Data:</strong> Technical logs, IP addresses, browser information, and details about how you navigate our website via cookies.</li>
            </ul>

            <h2 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              2. How We Use Your Information
            </h2>
            <p>
              Your data is utilized for operational and quality control purposes, including:
            </p>
            <ul>
              <li>Reviewing design files to provide accurate manufacturing feasibility assessments and pricing quotes.</li>
              <li>Processing, manufacturing, and shipping custom fabricated or machined components.</li>
              <li>Communicating with you regarding your order status, technical inquiries, or support requests.</li>
              <li>Maintaining and improving the functionality of our website and services.</li>
            </ul>

            <h2 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              3. Data Security and Confidentiality
            </h2>
            <p>
              As a manufacturing partner for precise industrial sectors, we understand the critical nature of intellectual property and proprietary designs. 
            </p>
            <p>
              We enforce strict confidentiality standards. Access to your CAD files, blueprints, and project data is strictly limited to authorized engineering and production personnel who require the information to perform their duties. We implement technical and administrative safeguards to prevent unauthorized access, loss, or disclosure.
            </p>

            <h2 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              4. Sharing of Information
            </h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share project data with trusted logistics partners to arrange transportation, or as required by law to comply with national safety regulations.
            </p>

            <h2 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              5. Your Rights and Choices
            </h2>
            <p>
              You have the right to request access to the personal data we hold about you, request corrections to inaccurate information, or request the secure deletion of your files and records once manufacturing contracts are completed, subject to regulatory retention guidelines.
            </p>

            <h2 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              6. Contact Us
            </h2>
            <p>
              If you have any questions or concerns regarding our privacy practices or the handling of your design files, please contact us at:
            </p>
            <address style={{ fontStyle: 'normal', background: '#f1f5f9', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--yellow-500)', marginTop: '1rem' }}>
              <strong>WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING)</strong><br />
              Bommasandra Industrial Area,<br />
              Bangalore, Karnataka, India<br />
              Email: <a href="mailto:info@wasefmanufacturing.com" style={{ color: '#d97706', fontWeight: '600' }}>info@wasefmanufacturing.com</a>
            </address>
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <div className="container cta-strip__inner">
          <h2 className="heading-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
            Need a manufacturing quote? <span className="text-yellow">Get in touch.</span>
          </h2>
          <Link to="/contact?type=quote" className="btn btn-primary btn-lg">Contact Us Now →</Link>
        </div>
      </section>
    </>
  );
}
