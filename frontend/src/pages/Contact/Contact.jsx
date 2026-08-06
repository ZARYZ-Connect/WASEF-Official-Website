import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { submitContact } from '../../services/api';
import { SERVICES_DATA } from '../../data/staticData';
import './Contact.css';

const schema = z.object({
  name:         z.string().min(2, 'Name must be at least 2 characters'),
  company:      z.string().optional(),
  email:        z.string().email('Enter a valid email address'),
  phone:        z.string().optional().refine(val => !val || /^\d{10}$/.test(val), { message: 'Phone number must be exactly 10 digits' }),
  inquiry_type: z.enum(['quote', 'general', 'service', 'partnership']),
  service_interest: z.string().optional(),
  message:      z.string().min(20, 'Please describe your requirements (min 20 characters)'),
});

const INQUIRY_OPTIONS = [
  { value: 'quote', label: 'Request a Quote' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'service', label: 'Service Information' },
  { value: 'partnership', label: 'Partnership' },
];

const SERVICE_OPTIONS = [
  { value: '', label: '— Select a service —' },
  ...SERVICES_DATA.map(s => ({ value: s.id, label: s.title }))
];

function CustomDropdown({ label, options, value, onChange, error, placeholder, id }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(o => o.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-dropdown-container" ref={dropdownRef}>
      <label className="form-label" htmlFor={id}>{label}</label>
      <button
        type="button"
        id={id}
        className={`custom-dropdown-trigger ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="custom-dropdown-selected-text">{selectedOption ? selectedOption.label : placeholder}</span>
        <svg className={`custom-dropdown-arrow ${isOpen ? 'is-open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <ul className="custom-dropdown-menu" role="listbox">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`custom-dropdown-option ${opt.value === value ? 'is-selected' : ''}`}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              <span>{opt.label}</span>
              {opt.value === value && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--yellow-500)" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="form-error">{error.message}</p>}
    </div>
  );
}

export default function Contact() {
  const [showModal, setShowModal] = useState(false);
  const [submissionDetails, setSubmissionDetails] = useState(null);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { inquiry_type: 'quote', service_interest: '' },
  });

  const inquiryTypeVal = watch('inquiry_type', 'quote');
  const serviceInterestVal = watch('service_interest', '');

  useEffect(() => {
    register('inquiry_type');
    register('service_interest');
  }, [register]);

  const onSubmit = async (data) => {
    setServerError('');
    if (data.honeypot) {
      setSubmissionDetails(data);
      setShowModal(true);
      return;
    }
    const { honeypot, ...payload } = data;
    try {
      await submitContact(payload);
      setSubmissionDetails(payload);
      setShowModal(true);
      reset({ inquiry_type: 'quote', name: '', company: '', email: '', phone: '', service_interest: '', message: '' });
    } catch {
      setServerError(
        'Something went wrong sending your inquiry. Please try again, or email us directly at quotes@wasefmanufacturing.com'
      );
    }
  };

  const getInquiryLabel = (val) => {
    const found = INQUIRY_OPTIONS.find(o => o.value === val);
    return found ? found.label : val;
  };

  return (
    <>
      <Helmet>
        <title>Contact Us — WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING)</title>
        <meta name="description" content="Get a quote or talk to our engineers. WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING) — precision laser manufacturing partner for aerospace, defence, and industrial applications." />
      </Helmet>

      {/* Header */}
      <section className="page-hero page-hero--contact">
        <div className="container page-hero__inner">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="section-label">
              <span className="laser-line" />
              <span className="text-upper text-yellow">Get in Touch</span>
            </div>
            <h1 className="heading-display heading-h1">
              Let's Build<br /><span className="text-yellow">Something Precise.</span>
            </h1>
            <p style={{ color: 'var(--gray-400)', maxWidth: '480px', marginTop: '1rem', lineHeight: 1.75 }}>
              Our engineering team responds to every inquiry within 24 hours.
              Share your specs and we'll propose the right process, timeline, and price.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section section-mid">
        <div className="container">
          <div className="contact-grid">

            {/* Form */}
            <div className="contact-form-wrap">
              <h2 className="heading-display" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', marginBottom: '2rem' }}>
                Request a Quote
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="contact-form" noValidate>

                {/* Honeypot */}
                <input
                  type="text"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ display: 'none' }}
                  {...register('honeypot')}
                />

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="c-name">Full Name *</label>
                    <input id="c-name" type="text" className="form-input" placeholder="Enter your full name" {...register('name')} />
                    {errors.name && <p className="form-error">{errors.name.message}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="c-company">Company</label>
                    <input id="c-company" type="text" className="form-input" placeholder="Enter your company name" {...register('company')} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="c-email">Email Address *</label>
                    <input id="c-email" type="email" className="form-input" placeholder="Enter your email ID" {...register('email')} />
                    {errors.email && <p className="form-error">{errors.email.message}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="c-phone">Phone</label>
                    <input
                      id="c-phone"
                      type="tel"
                      className="form-input"
                      placeholder="Enter your phone number"
                      maxLength={10}
                      {...register('phone', {
                        onChange: (e) => {
                          e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                        }
                      })}
                    />
                    {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <CustomDropdown
                      id="c-type"
                      label="Inquiry Type *"
                      options={INQUIRY_OPTIONS}
                      value={inquiryTypeVal}
                      onChange={(val) => setValue('inquiry_type', val, { shouldValidate: true })}
                      error={errors.inquiry_type}
                    />
                  </div>
                  <div className="form-group">
                    <CustomDropdown
                      id="c-service"
                      label="Service of Interest"
                      options={SERVICE_OPTIONS}
                      value={serviceInterestVal}
                      onChange={(val) => setValue('service_interest', val, { shouldValidate: true })}
                      error={errors.service_interest}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="c-message">Requirements / Message *</label>
                  <textarea
                    id="c-message"
                    className="form-input"
                    rows={6}
                    placeholder="Enter your requirements (material, thickness, quantity, tolerance, timeline...)"
                    {...register('message')}
                  />
                  {errors.message && <p className="form-error">{errors.message.message}</p>}
                </div>

                {serverError && <p className="form-error" style={{ marginBottom: '1rem' }}>{serverError}</p>}

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={isSubmitting}
                  id="contact-submit-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {isSubmitting ? 'Sending…' : 'Send Inquiry →'}
                </button>

                <p style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.75rem', textAlign: 'center' }}>
                  We respect your privacy. Your data is never shared with third parties.
                </p>
              </form>
            </div>

            {/* Sidebar info */}
            <div className="contact-info">
              <div className="contact-info__card">
                <h3 className="contact-info__title">Response Times</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {[
                    { label: 'Quote Requests', time: 'Within 24 hours' },
                    { label: 'Technical Queries', time: 'Same business day' },
                    { label: 'General Inquiries', time: 'Within 48 hours' },
                  ].map(rt => (
                    <div key={rt.label} className="contact-info__rt">
                      <span className="contact-info__rt-label">{rt.label}</span>
                      <span className="contact-info__rt-time">{rt.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <motion.div
              className="modal-card"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setShowModal(false)} aria-label="Close modal">✕</button>

              <div className="modal-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--yellow-500)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>

              <h3 className="modal-title">Inquiry Submitted!</h3>
              <p className="modal-body">
                Thank you, <strong>{submissionDetails?.name}</strong>. We have successfully received your{' '}
                <span className="text-yellow" style={{ fontWeight: 600 }}>{getInquiryLabel(submissionDetails?.inquiry_type)}</span> submission.
              </p>
              <p className="modal-body-sub">
                Our engineering team is reviewing your project details. We will send a confirmation and quote to <strong>{submissionDetails?.email}</strong> within 24 business hours.
              </p>

              <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}
                onClick={() => setShowModal(false)}
              >
                Close &amp; Return
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
