import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Use — WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING)</title>
        <meta name="description" content="Terms of use for WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING). Guidelines for design files and manufacturing consultations." />
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
              Terms of <span className="text-yellow">Use.</span>
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
              Welcome to the website of <strong>WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING)</strong>. By accessing or using this website, you agree to comply with and be bound by the following terms and conditions of use. Please review them carefully.
            </p>

            <h2 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or submitting project parameters on this site, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Use, our Privacy Policy, and all applicable national industrial regulations.
            </p>

            <h2 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              2. Intellectual Property and Content Ownership
            </h2>
            <p>
              All materials displayed on this website, including but not limited to text, graphics, technical schematics, logos, and custom photography, are the property of WASEF PVT LTD &amp; KS INDUSTRIES or our equipment partners (such as Bodor, JFY, etc.) and are protected by trademark and copyright laws.
            </p>
            <p>
              You are permitted to download resources, brochures, and data sheets from the site for internal evaluation purposes, but you may not republish, distribute, or modify the content without our express written consent.
            </p>

            <h2 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              3. Project Submissions and Engineering Files
            </h2>
            <p>
              Clients frequently submit CAD models, technical drawings, and specifications through our quote request channels. 
            </p>
            <ul>
              <li><strong>Ownership:</strong> You retain complete ownership and intellectual property rights over all files and drawings submitted to us.</li>
              <li><strong>Confidentiality:</strong> WASEF PVT LTD &amp; KS INDUSTRIES maintains strict commercial confidentiality regarding all submissions. We do not use your designs for any purpose other than preparing quotes and executing fabrication orders.</li>
              <li><strong>Accuracy:</strong> You are responsible for ensuring that all files, dimensions, tolerance specs, and materials listed in your RFQ are accurate and structurally sound.</li>
            </ul>

            <h2 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              4. Disclaimer of Liability
            </h2>
            <p>
              The information, technical specifications, and machine descriptions listed on this website are provided for general guidance and catalog information only. While we keep our specifications (such as positioning accuracy and cutting speeds) up to date, actual production capacities depend on raw material variations, thickness parameters, gas options, and exact model modifications.
            </p>
            <p>
              WASEF PVT LTD &amp; KS INDUSTRIES will not be liable for any damages or production delays arising from reliance on website catalog data. Exact parameters are established under signed manufacturing contracts.
            </p>

            <h2 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              5. Governing Law and Dispute Resolution
            </h2>
            <p>
              These Terms of Use and your use of this website are governed by and construed in accordance with the laws of India. Any legal disputes or claims arising out of the website use will be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.
            </p>

            <h2 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              6. Contact Information
            </h2>
            <p>
              If you have any questions or require clarifications regarding these terms, please contact our administrative desk:
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
            Have questions about terms? <span className="text-yellow">Get in touch.</span>
          </h2>
          <Link to="/contact" className="btn btn-primary btn-lg">Contact Us →</Link>
        </div>
      </section>
    </>
  );
}
