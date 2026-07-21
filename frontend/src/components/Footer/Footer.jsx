import { Link } from 'react-router-dom';
import './Footer.css';

const SERVICES_LINKS = [
  { label: 'Laser Cutting Services',        href: '/services/laser-cutting' },
  { label: 'CNC Bending & Forming',         href: '/services/cnc-bending-forming' },
  { label: 'Fabrication & Assembly',        href: '/services/fabrication-assembly' },
  { label: 'Precision Sheet Metal Solutions', href: '/services/precision-sheet-metal' },
  { label: 'Custom Metal Fabrication',      href: '/services/custom-metal-fabrication' },
];

const COMPANY_LINKS = [
  { label: 'About Us',       href: '/about' },
  { label: 'Contact',        href: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">

            {/* Brand column */}
            <div className="footer__brand">
              <Link to="/" className="footer__logo">
                <img src="/Wasef logo.png" alt="WASIF and KS Logo" className="footer__logo-img" />
                <div>
                  <span className="footer__logo-brand">WASIF &amp; KS</span>
                  <span className="footer__logo-sub">INDUSTRIES</span>
                </div>
              </Link>
              <p className="footer__tagline">
                Precision laser manufacturing and custom fabrication solutions.
                Delivered with engineering excellence and high quality standards.
              </p>

              <div className="footer__socials">
                <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="footer__social">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="footer__social">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="#0D0D0D" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
                </a>
                <a href="mailto:info@wasefmanufacturing.com" aria-label="Email" className="footer__social">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="footer__col">
              <h3 className="footer__col-title">Services</h3>
              <ul className="footer__links">
                {SERVICES_LINKS.map(l => (
                  <li key={l.href}><Link to={l.href} className="footer__link">{l.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="footer__col">
              <h3 className="footer__col-title">Company</h3>
              <ul className="footer__links">
                {COMPANY_LINKS.map(l => (
                  <li key={l.href}><Link to={l.href} className="footer__link">{l.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer__col">
              <h3 className="footer__col-title">Contact</h3>
              <address className="footer__address">
                <div className="footer__contact-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--yellow-500)" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Industrial Area, Phase II<br/>Bangalore, Karnataka 560 058</span>
                </div>
                <div className="footer__contact-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--yellow-500)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.09 6.09l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <a href="tel:+918012345678" className="footer__link">+91 80 1234 5678</a>
                </div>
                <div className="footer__contact-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--yellow-500)" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <a href="mailto:info@wasefmanufacturing.com" className="footer__link">info@wasefmanufacturing.com</a>
                </div>
              </address>

              {/* Newsletter */}
              <div className="footer__newsletter">
                <p className="footer__newsletter-label">Industry Insights Newsletter</p>
                <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="your@company.com" className="footer__newsletter-input" aria-label="Email address" />
                  <button type="submit" className="btn btn-primary btn-sm">Subscribe</button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">© {year} WASIF &amp; KS INDUSTRIES Pvt. Ltd. All rights reserved.</p>

          <div className="footer__legal">
            <Link to="/privacy" className="footer__legal-link">Privacy Policy</Link>
            <Link to="/terms" className="footer__legal-link">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
