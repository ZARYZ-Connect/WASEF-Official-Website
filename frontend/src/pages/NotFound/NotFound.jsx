import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found — WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING)</title>
      </Helmet>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '80vh', textAlign: 'center',
        padding: '2rem', gap: '1.5rem',
      }}>
        <div style={{
          fontSize: '6rem', fontFamily: 'var(--font-heading)', fontWeight: 900,
          color: 'var(--yellow-500)', lineHeight: 1, letterSpacing: '-0.04em',
        }}>404</div>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--gray-100)', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--gray-400)', maxWidth: '400px', lineHeight: 1.7 }}>
          This page doesn't exist or has been moved. Check the URL or navigate back to our homepage.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary btn-lg">Go to Homepage</Link>
          <Link to="/contact" className="btn btn-outline btn-lg">Contact Us</Link>
        </div>
      </div>
    </>
  );
}
