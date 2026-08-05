import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const SERVICES_MENU = [
  { label: 'Laser Cutting Services',    href: '/services/laser-cutting',           desc: 'High-precision 2D & 3D laser cutting' },
  { label: 'CNC Bending & Forming',      href: '/services/cnc-bending-forming',      desc: 'Precision metal folding & press brake solutions' },
  { label: 'Fabrication & Assembly',     href: '/services/fabrication-assembly',     desc: 'High-strength MIG/TIG welding & precision assembly' },
  { label: 'Precision Sheet Metal Solutions', href: '/services/precision-sheet-metal', desc: 'Custom tolerances & end-to-end sheet metal' },
  { label: 'Custom Metal Fabrication',   href: '/services/custom-metal-fabrication',  desc: 'Raw material to finished heavy assembly' },
];

const NAV_LINKS = [
  { label: 'Home',         href: '/' },
  { label: 'About',        href: '/about' },
  { label: 'Services',     href: '/services', hasMega: true },
  { label: 'Projects',     href: '/projects' },
  { label: 'Contact',      href: '/contact' },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [megaOpen,   setMegaOpen]   = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isMobile,   setIsMobile]   = useState(false);
  const location = useLocation();
  const megaRef  = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('mobile-menu-active');
    } else {
      document.body.classList.remove('mobile-menu-active');
    }
    return () => {
      document.body.classList.remove('mobile-menu-active');
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (!isMobile) {
    // ── DESKTOP VIEW ──
    return (
      <>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
          <div className="navbar__container container">
            {/* Logo */}
            <Link to="/" className="navbar__logo" aria-label="WASEF PVT LTD &amp; KS INDUSTRIES home">
              <img src="/wasef-logo.png" alt="WASEF and KS Logo" className="navbar__logo-img" />
              <div className="navbar__logo-text">
                <span className="navbar__logo-brand">WASEF PVT LTD &amp; KS</span>
                <span className="navbar__logo-sub">INDUSTRIES (SLE LASER CUTTING)</span>
              </div>
            </Link>

            {/* Desktop links */}
            <ul className="navbar__links" role="list">
              {NAV_LINKS.map((link) =>
                link.hasMega ? (
                  <li
                    key={link.label}
                    ref={megaRef}
                    className="navbar__item navbar__item--mega"
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                  >
                    <Link
                      to={link.href}
                      className={`navbar__link navbar__link--btn ${(location.pathname.startsWith('/services') || megaOpen) ? 'navbar__link--active' : ''}`}
                      onClick={() => setMegaOpen(false)}
                      aria-expanded={megaOpen}
                      aria-haspopup="true"
                      id="services-menu-btn"
                    >
                      {link.label}
                      <svg className={`navbar__chevron ${megaOpen ? 'navbar__chevron--open' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </Link>

                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          className="navbar__mega"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          role="menu"
                          aria-labelledby="services-menu-btn"
                        >
                          <div className="navbar__mega-header">
                            <p className="text-upper text-yellow">Our Services</p>
                            <p className="navbar__mega-sub">Precision manufacturing across 5 core capabilities</p>
                          </div>
                          <div className="navbar__mega-grid">
                            {SERVICES_MENU.map((s) => (
                              <Link key={s.href} to={s.href} className="navbar__mega-item" role="menuitem">
                                <span className="navbar__mega-title">{s.label}</span>
                                <span className="navbar__mega-desc">{s.desc}</span>
                              </Link>
                            ))}
                            <Link to="/services" className="navbar__mega-all">
                              View all services →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={link.label} className="navbar__item">
                    <NavLink
                      to={link.href}
                      className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                      end={link.href === '/'}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                )
              )}
            </ul>

            {/* CTA */}
            <div className="navbar__cta">
              <Link to="/contact?type=quote" className="btn btn-primary btn-sm">
                Get a Quote
              </Link>
            </div>
          </div>
        </nav>
      </>
    );
  }

  // ── MOBILE FLOATING PILL VIEW (Dynamic Island Style) ──
  return (
    <>
      <div
        className={`navbar__overlay ${menuOpen ? 'navbar__overlay--open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      <div className={`navbar-mobile-pill ${menuOpen ? 'navbar-mobile-pill--open' : ''} ${scrolled ? 'navbar-mobile-pill--scrolled' : ''}`}>
        {/* Closed / Open Header Clickable Pill Row */}
        <div className="navbar-mobile-header" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="navbar-mobile-brand">
            <img src="/wasef-logo.png" alt="WASEF Logo" className="navbar-mobile-logo" />
            <span className="navbar-mobile-title">WASEF Menu</span>
          </div>
          <div className={`navbar-mobile-chevron ${menuOpen ? 'navbar-mobile-chevron--open' : ''}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Expanded Pill Links Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="navbar-mobile-body"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  {link.hasMega ? (
                    <>
                      <button
                        type="button"
                        className={`navbar-mobile-services-btn ${location.pathname.startsWith('/services') ? 'navbar-mobile-link-item--active' : ''}`}
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      >
                        <span>Services</span>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          style={{
                            transition: 'transform 0.2s ease',
                            transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            color: 'var(--yellow-600)'
                          }}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            className="navbar-mobile-sublist"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            style={{ overflow: 'hidden' }}
                          >
                            <NavLink
                              to="/services"
                              className={({ isActive }) => `navbar-mobile-sublink ${isActive ? 'navbar-mobile-sublink--active' : ''}`}
                              end
                              onClick={() => setMenuOpen(false)}
                            >
                              All Services →
                            </NavLink>
                            {SERVICES_MENU.map((s) => (
                              <NavLink
                                key={s.href}
                                to={s.href}
                                className={({ isActive }) => `navbar-mobile-sublink ${isActive ? 'navbar-mobile-sublink--active' : ''}`}
                                onClick={() => setMenuOpen(false)}
                              >
                                {s.label}
                              </NavLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink
                      to={link.href}
                      className={({ isActive }) => `navbar-mobile-link-item ${isActive ? 'navbar-mobile-link-item--active' : ''}`}
                      end={link.href === '/'}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  )}
                </div>
              ))}
              <Link
                to="/contact?type=quote"
                className="btn btn-primary"
                onClick={() => setMenuOpen(false)}
                style={{ marginTop: '0.75rem', width: '100%', justifyContent: 'center', height: '42px', fontSize: '0.9rem' }}
              >
                Get a Quote
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  </>
);
}
