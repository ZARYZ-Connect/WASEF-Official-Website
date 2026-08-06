import React from 'react';
import './ServiceIcon.css';

export default function ServiceIcon({ slug, className = '' }) {
  const iconClass = `service-icon service-icon--${slug} ${className}`;

  switch (slug) {
    case 'laser-cutting':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Metal Plate */}
          <line className="icon-laser-plate" x1="2" y1="18" x2="22" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          {/* Laser Head / Nozzle */}
          <g className="icon-laser-head">
            <path d="M 9,2 H 15 L 13.5,7 H 10.5 Z" fill="currentColor" opacity="0.8" />
            <path d="M 11.2,7 H 12.8 L 12,10 Z" fill="var(--yellow-500)" />
            {/* High-End Double Layer Laser Beam */}
            {/* Outer Glow */}
            <line className="icon-laser-beam-glow" x1="12" y1="10" x2="12" y2="18" stroke="var(--yellow-400)" strokeWidth="3.2" opacity="0.4" strokeLinecap="round" />
            {/* Inner Core */}
            <line className="icon-laser-beam-core" x1="12" y1="10" x2="12" y2="18" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
            {/* High-End Spark Shower */}
            <g className="icon-laser-sparks-group">
              <circle className="spark spark--1" cx="12" cy="18" r="0.8" fill="var(--yellow-400)" />
              <circle className="spark spark--2" cx="12" cy="18" r="1.1" fill="var(--yellow-500)" />
              <circle className="spark spark--3" cx="12" cy="18" r="0.6" fill="#ffffff" />
              <circle className="spark spark--4" cx="12" cy="18" r="0.9" fill="var(--yellow-400)" />
              <circle className="spark spark--5" cx="12" cy="18" r="1.3" fill="var(--yellow-500)" />
            </g>
          </g>
        </svg>
      );

    case 'cnc-bending-forming':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Lower Die */}
          <path d="M 2,20 H 22 V 16 L 18,16 L 12,20 L 6,16 L 2,16 Z" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Sheet Metal Plate */}
          <path className="icon-bend-sheet" d="M 2,13 L 12,13 L 22,13" stroke="var(--yellow-500)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Upper Punch */}
          <path className="icon-bend-punch" d="M 6,3 H 18 L 12,10 Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Force Wave rings */}
          <circle className="bend-force-ring bend-force-ring--1" cx="12" cy="17.5" r="1.5" stroke="var(--yellow-400)" strokeWidth="1.2" opacity="0" />
          <circle className="bend-force-ring bend-force-ring--2" cx="12" cy="17.5" r="3.2" stroke="var(--yellow-500)" strokeWidth="1" opacity="0" />
        </svg>
      );

    case 'fabrication-assembly':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Parts being joined */}
          <rect x="3" y="14" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="2" opacity="0.5" />
          <rect x="13" y="14" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="2" opacity="0.5" />
          {/* Joint seam line */}
          <line x1="12" y1="14" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
          {/* Welding Torch */}
          <g className="icon-weld-torch">
            <path d="M 20,4 L 14,10 L 11.5,11.5 L 12.5,12.5 L 14,10 Z" fill="currentColor" />
            <line x1="20" y1="4" x2="22" y2="2" stroke="currentColor" strokeWidth="2" />
            <path d="M 11.5,11.5 L 10.5,13.5 L 11,14 L 12.5,12.5 Z" fill="var(--yellow-500)" />
            {/* Plasma Arc glow at torch tip */}
            <circle className="weld-arc-glow" cx="10.8" cy="13.8" r="2.2" fill="#00e5ff" opacity="0.5" />
            <circle className="weld-arc-core" cx="10.8" cy="13.8" r="0.8" fill="#ffffff" />
          </g>
          {/* Dynamic Welding Spark Shower */}
          <g className="icon-weld-sparks-group">
            <circle className="weld-spark weld-spark--1" cx="12" cy="14" r="0.7" fill="#00e5ff" />
            <circle className="weld-spark weld-spark--2" cx="12" cy="14" r="0.9" fill="var(--yellow-500)" />
            <circle className="weld-spark weld-spark--3" cx="12" cy="14" r="0.6" fill="#ffffff" />
            <circle className="weld-spark weld-spark--4" cx="12" cy="14" r="0.8" fill="var(--yellow-500)" />
          </g>
        </svg>
      );

    case 'precision-sheet-metal':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Chassis Grid/Panel */}
          <rect x="3" y="11" width="18" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.8" opacity="0.4" />
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
          {/* Dimension Tolerance Wave lines */}
          <line className="caliper-dimension-line" x1="4.5" y1="11.5" x2="13.5" y2="11.5" stroke="var(--yellow-500)" strokeWidth="1.2" strokeDasharray="2 2" opacity="0" />
        </svg>
      );

    case 'custom-metal-fabrication':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Crane Lift Assembly */}
          <g className="icon-crane-lift">
            {/* Cable */}
            <line className="crane-cable" x1="12" y1="2" x2="12" y2="11" stroke="currentColor" strokeWidth="1.5" />
            {/* Hook */}
            <path d="M 12,11 C 12,12.5 10.5,13.5 10.5,12 C 10.5,11 12,10 13,11.5" stroke="var(--yellow-500)" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Sling cables */}
            <line x1="12" y1="12" x2="6" y2="16" stroke="var(--yellow-500)" strokeWidth="1.2" />
            <line x1="12" y1="12" x2="18" y2="16" stroke="var(--yellow-500)" strokeWidth="1.2" />
            {/* Tension indicator waves */}
            <path className="crane-tension-wave" d="M 10,6 H 14 M 9,8 H 15" stroke="var(--yellow-400)" strokeWidth="1" opacity="0" strokeLinecap="round" />
            {/* H-Beam */}
            <g className="crane-load-beam">
              <rect x="4" y="16" width="16" height="4" rx="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
              <line x1="4" y1="18" x2="20" y2="18" stroke="var(--charcoal-950)" strokeWidth="1.5" />
            </g>
          </g>
        </svg>
      );

    default:
      return null;
  }
}
