import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const Home        = lazy(() => import('./pages/Home/Home'));
const About       = lazy(() => import('./pages/About/About'));
const Services    = lazy(() => import('./pages/Services/Services'));
const ServiceDetail = lazy(() => import('./pages/Services/ServiceDetail'));
const Projects    = lazy(() => import('./pages/Projects/Projects'));
const Contact     = lazy(() => import('./pages/Contact/Contact'));
const NotFound    = lazy(() => import('./pages/NotFound/NotFound'));

function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,199,44,0.2)', borderTopColor: 'var(--yellow-500)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: 'var(--gray-400)', fontSize: '0.875rem' }}>Loading…</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <main id="main-content">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"               element={<Home />} />
              <Route path="/about"          element={<About />} />
              <Route path="/services"       element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/projects"       element={<Projects />} />
              <Route path="/contact"        element={<Contact />} />
              <Route path="*"              element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        {/* Hidden video preloader to guarantee native browser cache hydration */}
        <div style={{ display: 'none', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
          <video src="/videos/video1.mp4" preload="auto" muted playsInline />
          <video src="/videos/services page video/Laser Cutting Services.mp4" preload="auto" muted playsInline />
          <video src="/videos/services page video/CNC Bending.mp4" preload="auto" muted playsInline />
          <video src="/videos/services page video/Bandsaw Metal Cutting.mp4" preload="auto" muted playsInline />
        </div>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </BrowserRouter>
    </HelmetProvider>
  );
}
