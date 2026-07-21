import React from 'react';
import './ServiceIcon.css';

export default function ServiceIcon({ slug, className = '' }) {
  const iconClass = `service-icon service-icon--${slug} ${className}`;

  switch (slug) {
    case 'laser-cutting':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Metal Plate */}
          <line className="icon-laser-plate" x1="2" y1="18" x2="22" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Laser Head / Nozzle */}
          <g className="icon-laser-head">
            <path d="M 9,2 H 15 L 13.5,7 H 10.5 Z" fill="currentColor" opacity="0.8" />
            <path d="M 11.5,7 H 12.5 L 12,10 Z" fill="var(--yellow-500)" />
            {/* Laser Beam */}
            <line className="icon-laser-beam" x1="12" y1="10" x2="12" y2="18" stroke="var(--yellow-500)" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          {/* Sparks */}
          <g className="icon-laser-sparks">
            <line x1="12" y1="18" x2="8" y2="15" stroke="var(--yellow-500)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12" y1="18" x2="16" y2="15" stroke="var(--yellow-500)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12" y1="18" x2="12" y2="22" stroke="var(--yellow-500)" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'cnc-bending-forming':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Lower Die */}
          <path d="M 2,20 H 22 V 16 L 18,16 L 12,20 L 6,16 L 2,16 Z" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Sheet Metal Plate (Bends on hover) */}
          <path className="icon-bend-sheet" d="M 2,13 L 12,13 L 22,13" stroke="var(--yellow-500)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Upper Punch */}
          <path className="icon-bend-punch" d="M 6,3 H 18 L 12,10 Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );

    case 'fabrication-assembly':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Parts being joined */}
          <rect x="3" y="14" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="2" opacity="0.6" />
          <rect x="13" y="14" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="2" opacity="0.6" />
          {/* Joint seam line */}
          <line x1="12" y1="14" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
          {/* Welding Torch */}
          <g className="icon-weld-torch">
            <path d="M 20,4 L 14,10 L 11.5,11.5 L 12.5,12.5 L 14,10 Z" fill="currentColor" />
            <line x1="20" y1="4" x2="22" y2="2" stroke="currentColor" strokeWidth="2" />
            <path d="M 11.5,11.5 L 10.5,13.5 L 11,14 L 12.5,12.5 Z" fill="var(--yellow-500)" />
          </g>
          {/* Welding Sparks */}
          <g className="icon-weld-sparks">
            <circle cx="9.5" cy="11.5" r="1" fill="var(--yellow-500)" />
            <circle cx="14.5" cy="11.5" r="1" fill="var(--yellow-500)" />
            <circle cx="12" cy="9.5" r="1.2" fill="var(--yellow-500)" />
            <circle cx="12" cy="15.5" r="0.8" fill="var(--yellow-500)" />
          </g>
        </svg>
      );

    case 'precision-sheet-metal':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Chassis Grid/Panel */}
          <rect x="3" y="11" width="18" height="10" rx="1.5" stroke="currentColor" strokeWidth="2" opacity="0.4" />
          {/* Dial / Controls inside panel */}
          <circle cx="7" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="7" y1="16" x2="8.5" y2="14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="14" cy="16" r="1" fill="currentColor" />
          <circle cx="17" cy="16" r="1" fill="currentColor" />
          {/* Caliper measuring tool */}
          <g className="icon-caliper">
            {/* Caliper Beam */}
            <path d="M 2,5 H 22 V 7 H 2 Z" fill="currentColor" opacity="0.8" />
            {/* Fixed Jaw */}
            <path d="M 3,7 V 13 L 4.5,11.5 V 7 Z" fill="currentColor" />
            {/* Sliding Jaw */}
            <g className="icon-caliper-jaw">
              <path d="M 13,3 H 15 V 13 L 13.5,11.5 V 3 Z" fill="var(--yellow-500)" />
            </g>
          </g>
        </svg>
      );

    case 'custom-metal-fabrication':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Crane Lift Assembly */}
          <g className="icon-crane-lift">
            {/* Cable */}
            <line x1="12" y1="2" x2="12" y2="11" stroke="currentColor" strokeWidth="1.5" />
            {/* Hook */}
            <path d="M 12,11 C 12,12.5 10.5,13.5 10.5,12 C 10.5,11 12,10 13,11.5" stroke="var(--yellow-500)" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Sling cables */}
            <line x1="12" y1="12" x2="6" y2="16" stroke="var(--yellow-500)" strokeWidth="1.2" />
            <line x1="12" y1="12" x2="18" y2="16" stroke="var(--yellow-500)" strokeWidth="1.2" />
            {/* H-Beam */}
            <rect x="4" y="16" width="16" height="4" rx="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
            <line x1="4" y1="18" x2="20" y2="18" stroke="var(--charcoal-950)" strokeWidth="1.5" />
          </g>
        </svg>
      );

    default:
      return null;
  }
}
