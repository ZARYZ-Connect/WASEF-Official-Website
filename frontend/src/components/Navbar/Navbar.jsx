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
  const location = useLocation();
  const megaRef  = useRef(null);
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${!isHome && !scrolled ? 'navbar--dark' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar__container container">

          {/* Logo */}
          <Link to="/" className="navbar__logo" aria-label="WASIF and KS INDUSTRIES home">
            <img src="/Wasef logo.png" alt="WASIF and KS Logo" className="navbar__logo-img" />
            <div className="navbar__logo-text">
              <span className="navbar__logo-brand">WASIF &amp; KS</span>
              <span className="navbar__logo-sub">INDUSTRIES</span>
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

          {/* Mobile toggle */}
          <button
            className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Backdrop overlay to close drawer on screen click */}
              <motion.div
                className="navbar__overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMenuOpen(false)}
              />

              <motion.div
                className="navbar__drawer"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                aria-modal="true"
              >
                <div className="navbar__drawer-content">
                  {NAV_LINKS.map((link) => (
                    <div key={link.label}>
                      {link.hasMega ? (
                        <>
                          <button
                            type="button"
                            className="navbar__drawer-link"
                            onClick={() => setMobileServicesOpen(prev => !prev)}
                            style={{
                              width: '100%',
                              textAlign: 'left',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              background: 'none',
                              border: 'none',
                              padding: '0.875rem 0.5rem',
                              borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
                            }}
                          >
                            <span>{link.label}</span>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              style={{
                                transition: 'transform 0.2s ease',
                                transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                color: 'var(--gray-400)'
                              }}
                            >
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          </button>
                          <AnimatePresence>
                            {mobileServicesOpen && (
                              <motion.div
                                className="navbar__drawer-sub"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                style={{ overflow: 'hidden' }}
                              >
                                {SERVICES_MENU.map((s) => (
                                  <Link
                                    key={s.href}
                                    to={s.href}
                                    className="navbar__drawer-sub-link"
                                    onClick={() => setMenuOpen(false)}
                                  >
                                    {s.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <NavLink
                          to={link.href}
                          className={({ isActive }) => `navbar__drawer-link ${isActive ? 'navbar__drawer-link--active' : ''}`}
                          end={link.href === '/'}
                          onClick={() => setMenuOpen(false)}
                        >
                          {link.label}
                        </NavLink>
                      )}
                    </div>
                  ))}
                  <Link to="/contact?type=quote" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
                    Get a Quote
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
