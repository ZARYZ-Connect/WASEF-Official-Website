import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const PROJECTS = [
  { 
    id: 1, 
    title: 'Cleanroom Lab Workstation Benches', 
    industry: 'Pharmaceuticals & Lab', 
    service: 'Precision Assembly & Bending', 
    year: 2024, 
    client: 'WASEF Industry', 
    desc: 'High-precision manufacturing and multi-tier assembly of cleanroom-rated grey lab workstation benches, featuring drawer units and adjustable overhead storage racks.',
    image: '/images/cleanroom-workstation-benches.png'
  },
  { 
    id: 2, 
    title: 'Industrial Workstations & Storage Systems', 
    industry: 'Industrial Automation & Workspace', 
    service: 'Precision Assembly & Fabrication', 
    year: 2024, 
    client: 'WASEF Industry', 
    desc: 'High-volume fabrication and assembly of modular workstation tables, single-user desks with integrated drawers, and heavy-duty steel tool storage cabinets with blue powder finish.',
    image: '/images/workstation-storage-systems.png'
  },
  { 
    id: 3, 
    title: 'Modular Industrial Workstation Table', 
    industry: 'Industrial Automation & Assembly', 
    service: 'Custom Furniture Fabrication', 
    year: 2024, 
    client: 'WASEF Industry', 
    desc: 'Heavy-duty modular L-shaped assembly workstation tables fabricated with integrated electrical switch channels, adjustable multi-tier shelving, and powder-coated steel framework.',
    image: '/images/workstation-table.png'
  },
  { 
    id: 4, 
    title: 'Electric Tow Tug Integration & Assembly', 
    industry: 'Material Handling & EV', 
    service: 'Vehicle Integration & Assembly', 
    year: 2024, 
    client: 'WASEF Industry', 
    desc: 'Complete mechanical integration and final assembly of 250-ton electric industrial tow tug vehicles, including steering, drivetrains, and body panels.',
    image: '/images/electric-tow-tug-assembly.png'
  },
  { 
    id: 5, 
    title: 'Electric Tow Tug Structural Chassis (250 Ton)', 
    industry: 'Material Handling & EV', 
    service: 'Heavy Structural Fabrication', 
    year: 2024, 
    client: 'WASEF Industry', 
    desc: 'Heavy structural chassis fabrication and assembly for 250-ton capacity electric industrial tow tugs, built with reinforced structural plates.',
    image: '/images/electric-tow-tug-chassis.png'
  },
  { 
    id: 6, 
    title: 'Automated Control Panel Integration', 
    industry: 'Industrial Automation', 
    service: 'Control Panel Assembly', 
    year: 2024, 
    client: 'WASEF Industry', 
    desc: 'Fully integrated industrial control panels and test rigs with HMI screen touchpoints, status indicators, and automated wire routing for factory assembly lines.',
    image: '/images/control-panel-assembly.png'
  },
  { 
    id: 7, 
    title: 'Bus Battery Charger Enclosure', 
    industry: 'Automotive & EV', 
    service: 'Enclosure Fabrication', 
    year: 2024, 
    client: 'Ashok Leyland', 
    desc: 'Heavy-duty sheet metal ventilation enclosure fabricated for transit bus battery charging systems, featuring integrated cooling grilles.',
    image: '/images/battery-charger-enclosure.png'
  },
  { 
    id: 8, 
    title: 'Heavy Plate Structural Welding (50mm)', 
    industry: 'Heavy Engineering', 
    service: 'Heavy Plate Welding', 
    year: 2024, 
    client: 'WASEF Industry', 
    desc: 'High-thickness multi-pass structural welding on 50mm mild steel plates for mechanical press frames, verified by ultrasonic testing.',
    image: '/images/heavy-plate-welding.png'
  },
  { 
    id: 9, 
    title: 'Stainless Steel (SS) Support Frame', 
    industry: 'Pharmaceuticals & Food', 
    service: 'SS Fabrication & Welding', 
    year: 2024, 
    client: 'WASEF Industry', 
    desc: 'Precision-fabricated stainless steel support frames with satin/polished finish designed for cleanroom environments.',
    image: '/images/ss-support-frame.png'
  },
  { 
    id: 10, 
    title: 'Stainless Steel Pipe Elbow Assembly', 
    industry: 'Chemical & Piping', 
    service: 'TIG Welding & Assembly', 
    year: 2024, 
    client: 'WASEF Industry', 
    desc: 'Precision-welded curved stainless steel pipe elbows and flanged elbow conduits fabricated for high-pressure fluid transportation.',
    image: '/images/ss-pipe-elbow.png'
  },
  { 
    id: 11, 
    title: 'Structural Steel Base Frame', 
    industry: 'Industrial Equipment', 
    service: 'Fabrication & Finishing', 
    year: 2024, 
    client: 'WASEF Industry', 
    desc: 'Heavy-duty structural steel frame fixture welded and finished with industrial white protective coating for machinery support.',
    image: '/images/structural-base-frame.png'
  },
  { 
    id: 12, 
    title: 'Sheet Metal Enclosures & Columns', 
    industry: 'Electronics & Machinery', 
    service: 'Bending & Welding', 
    year: 2024, 
    client: 'WASEF Industry', 
    desc: 'Precision-bent and welded rectangular steel enclosures and vertical columns fabricated for robust industrial machinery housings.',
    image: '/images/sheet-metal-enclosures.png'
  },
  { 
    id: 13, 
    title: 'Agricultural Metal Components', 
    industry: 'Agriculture', 
    service: 'Fabrication & Welding', 
    year: 2024, 
    client: 'WASEF Industry', 
    desc: 'Heavy-duty steel rotary cage wheels and custom agricultural attachments fabricated for challenging soil tillage applications.',
    image: '/images/agricultural-components.png'
  },
  { 
    id: 14, 
    title: 'Bumper Welded Assembly', 
    industry: 'Automotive', 
    service: 'Welding & Assembly', 
    year: 2024, 
    client: 'WASEF Industry', 
    desc: 'Precision-welded automotive bumpers and structural safety guards assembled for commercial transportation fleets.',
    image: '/images/bumper-welded-assembly.png'
  },
  { 
    id: 15, 
    title: 'Mild Steel (MS) Fabricated Components', 
    industry: 'Industrial Automation', 
    service: 'Structure Assembly', 
    year: 2024, 
    client: 'WASEF Industry', 
    desc: 'High-precision mild steel structural assembly and panel alignment designed for automation systems and machine beds.',
    image: '/images/ms-fabricated-assembly.png'
  },
  { 
    id: 16, 
    title: 'Industrial Automation Heavy Structure', 
    industry: 'Industrial Automation', 
    service: 'Fabrication & Assembly', 
    year: 2024, 
    client: 'WASEF Industry', 
    desc: 'Heavy-duty steel structural frame fabrication for industrial automation assembly, welded to strict geometric tolerances.',
    image: '/images/automation-structure.png'
  },
  { 
    id: 17, 
    title: 'High-Load Precision Press Assembly', 
    industry: 'Manufacturing', 
    service: 'Welding & Assembly', 
    year: 2024, 
    client: 'WASEF Industry', 
    desc: 'Precision-welded mechanical press assembly and fixture designed for high-load production automation systems.',
    image: '/images/press-assembly.png'
  }
];

const MACHINES = [
  { id: 1, name: 'Amada F3015NT Laser Machine', type: 'Laser Cutting', specs: '4kW Laser Power - High precision cutting system', qty: '1 Unit', image: '/images/amada-laser.jpg' },
  { id: 2, name: 'Bodor LASER Cutting Machine', type: 'Laser Cutting', specs: '3kW Laser Power - Speed & productivity sheet cutting', qty: '1 Unit', image: '/images/bodor-laser.jpg' },
  { id: 3, name: 'SMS Bending Machine', type: 'CNC Bending & Forming', specs: '160 Ton capacity, folds sheets up to 3000mm length', qty: '1 Unit', image: '/images/sms-bending.jpg' },
  { id: 4, name: 'Amada Bending Machine', type: 'CNC Bending & Forming', specs: '80 Ton capacity, folds sheets up to 2500mm length', qty: '1 Unit', image: '/images/amada-bending.jpg' },
  { id: 5, name: 'Bandsaw Metal Cutting Machine', type: 'Sawing', specs: 'Automated bandsaw for heavy industrial sections and pipes', qty: '1 Unit', image: '/images/bandsaw.jpg' },
  { id: 6, name: 'EOT Crane', type: 'Material Handling', specs: '3 Ton capacity heavy duty overhead crane system', qty: '1 Unit', image: '/images/eot-crane.webp' },
  { id: 7, name: 'MIG Welding Machines', type: 'Welding & Assembly', specs: 'High-strength structural gas metal arc welding units', qty: '6 Units', image: '/images/mig-welding.jpg' },
  { id: 8, name: 'TIG Welding Machines', type: 'Welding & Assembly', specs: 'Precision tungsten inert gas welding stations', qty: '2 Units', image: '/images/tig-welding.jpg' },
  { id: 9, name: 'Fly Press', type: 'Bending & Pressing', specs: 'Hand-operated mechanical press for secondary operations', qty: '1 Unit', image: '/images/fly-press.jpg' },
];

function ProjectSchematic({ title }) {
  const accentColor = "var(--yellow-500)";
  const strokeColor = "#00d2ff";

  // Render specific SVG drawing path elements based on project title
  let drawing = null;
  let subtitle = "TECHNICAL SCHEMATIC";

  if (title.includes("Cleanroom Lab")) {
    subtitle = "LAB-WS-01: CLEANROOM LAB WORKSTATION";
    drawing = (
      <>
        {/* Workstation Frame */}
        <rect x="60" y="90" width="280" height="12" rx="1" fill="none" stroke={accentColor} strokeWidth="1.5" />
        <rect x="60" y="102" width="280" height="60" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="2,2" />
        {/* Upright posts */}
        <line x1="90" y1="30" x2="90" y2="162" stroke={strokeColor} strokeWidth="1.5" />
        <line x1="310" y1="30" x2="310" y2="162" stroke={strokeColor} strokeWidth="1.5" />
        <line x1="200" y1="30" x2="200" y2="90" stroke={strokeColor} strokeWidth="1" strokeDasharray="3,3" />
        {/* Shelves */}
        <line x1="75" y1="50" x2="325" y2="50" stroke={strokeColor} strokeWidth="1.5" />
        <line x1="75" y1="70" x2="325" y2="70" stroke={strokeColor} strokeWidth="1.5" />
        {/* Drawers */}
        <rect x="100" y="112" width="60" height="40" rx="1" fill="none" stroke={strokeColor} strokeWidth="1.2" />
        <line x1="100" y1="132" x2="160" y2="132" stroke={strokeColor} strokeWidth="1" />
        <circle cx="130" cy="122" r="1.5" fill={accentColor} />
        <circle cx="130" cy="142" r="1.5" fill={accentColor} />
        {/* Dimensions */}
        <line x1="50" y1="90" x2="50" y2="102" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
        <line x1="45" y1="90" x2="45" y2="102" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
        <text x="38" y="100" fill="rgba(255,255,255,0.4)" fontSize="7" textAnchor="middle" transform="rotate(-90 38 100)">H=750</text>
      </>
    );
  } else if (title.includes("Storage Systems") || title.includes("Modular Industrial") || title.includes("Workstation Table")) {
    subtitle = "IND-WS-04: MODULAR ASSEMBLY TABLE";
    drawing = (
      <>
        {/* Desk top */}
        <polygon points="50,110 220,70 350,110 180,150" fill="none" stroke={accentColor} strokeWidth="1.5" />
        {/* Desk legs */}
        <line x1="50" y1="110" x2="50" y2="170" stroke={strokeColor} strokeWidth="1.2" />
        <line x1="180" y1="150" x2="180" y2="170" stroke={strokeColor} strokeWidth="1.2" />
        <line x1="350" y1="110" x2="350" y2="170" stroke={strokeColor} strokeWidth="1.2" />
        <line x1="220" y1="70" x2="220" y2="130" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="2,2" />
        {/* Shelving unit top back */}
        <polygon points="90,60 220,30 310,60 180,90" fill="none" stroke={strokeColor} strokeWidth="1" />
        <line x1="90" y1="60" x2="90" y2="100" stroke={strokeColor} strokeWidth="1" />
        <line x1="310" y1="60" x2="310" y2="93" stroke={strokeColor} strokeWidth="1" />
        {/* Dimension markings */}
        <path d="M 50,115 L 180,155" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" strokeDasharray="2,2" />
        <text x="110" y="145" fill="rgba(255,255,255,0.4)" fontSize="8" transform="rotate(17 110 145)">L = 2400 mm</text>
      </>
    );
  } else if (title.includes("Tow Tug Integration") || title.includes("Tow Tug Structural")) {
    subtitle = "EV-TT-250T: TUG ASSEMBLY OUTLINE";
    drawing = (
      <>
        {/* Chassis layout */}
        <path d="M 60,130 L 120,130 L 140,80 L 260,80 L 280,105 L 340,105 L 340,140 L 60,140 Z" fill="none" stroke={strokeColor} strokeWidth="1.5" />
        {/* Cabin area */}
        <path d="M 140,80 L 140,40 L 230,40 L 250,80" fill="none" stroke={strokeColor} strokeWidth="1.2" />
        <rect x="170" y="55" width="30" height="20" rx="1" fill="none" stroke={strokeColor} strokeWidth="1" />
        <line x1="215" y1="60" x2="225" y2="80" stroke={accentColor} strokeWidth="1.5" />
        {/* Wheels */}
        <circle cx="110" cy="140" r="22" fill="none" stroke={accentColor} strokeWidth="2" />
        <circle cx="110" cy="140" r="8" fill="none" stroke={accentColor} strokeWidth="1" />
        <circle cx="290" cy="140" r="22" fill="none" stroke={accentColor} strokeWidth="2" />
        <circle cx="290" cy="140" r="8" fill="none" stroke={accentColor} strokeWidth="1" />
        {/* Specifications */}
        <text x="200" y="115" fill={accentColor} fontSize="8" fontWeight="bold" textAnchor="middle">250 TON CAPACITY</text>
      </>
    );
  } else if (title.includes("Control Panel")) {
    subtitle = "AUT-CP-09: PLC PANEL ASSEMBLY";
    drawing = (
      <>
        {/* Cabinet casing */}
        <rect x="80" y="30" width="240" height="140" rx="2" fill="none" stroke={strokeColor} strokeWidth="1.5" />
        <rect x="85" y="35" width="230" height="130" rx="1" fill="none" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="3,3" />
        {/* PLC Rail 1 */}
        <rect x="100" y="50" width="200" height="25" fill="none" stroke={strokeColor} strokeWidth="1" />
        <line x1="130" y1="50" x2="130" y2="75" stroke={strokeColor} strokeWidth="0.8" />
        <line x1="160" y1="50" x2="160" y2="75" stroke={strokeColor} strokeWidth="0.8" />
        <line x1="190" y1="50" x2="190" y2="75" stroke={strokeColor} strokeWidth="0.8" />
        {/* HMI module */}
        <rect x="100" y="90" width="80" height="50" fill="none" stroke={accentColor} strokeWidth="1.2" />
        <rect x="108" y="96" width="64" height="38" fill="none" stroke={accentColor} strokeWidth="0.8" />
        {/* Status indicators */}
        <circle cx="230" cy="100" r="5" fill="none" stroke={strokeColor} strokeWidth="1" />
        <circle cx="250" cy="100" r="5" fill="none" stroke={strokeColor} strokeWidth="1" />
        <circle cx="270" cy="100" r="5" fill="none" stroke={strokeColor} strokeWidth="1" />
        <circle cx="290" cy="100" r="6" fill="none" stroke="#ff3b30" strokeWidth="1.5" />
        <path d="M 286,96 L 294,104 M 294,96 L 286,104" stroke="#ff3b30" strokeWidth="1" />
      </>
    );
  } else if (title.includes("Battery Charger Enclosure")) {
    subtitle = "EV-BC-02: CHARGER ENCLOSURE";
    drawing = (
      <>
        {/* Charger casing */}
        <rect x="100" y="30" width="200" height="140" rx="3" fill="none" stroke={strokeColor} strokeWidth="1.5" />
        {/* Grilles */}
        <line x1="120" y1="50" x2="280" y2="50" stroke={strokeColor} strokeWidth="1" />
        <line x1="120" y1="56" x2="280" y2="56" stroke={strokeColor} strokeWidth="1" />
        <line x1="120" y1="62" x2="280" y2="62" stroke={strokeColor} strokeWidth="1" />
        {/* Charger screen */}
        <rect x="130" y="80" width="140" height="50" rx="1" fill="none" stroke={accentColor} strokeWidth="1.2" />
        <path d="M 150,110 L 170,95 L 200,115 L 250,90" fill="none" stroke={accentColor} strokeWidth="1.2" />
        <circle cx="250" cy="90" r="2" fill={accentColor} />
        {/* Text specs */}
        <text x="200" y="150" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">VENTILATED STEEL ENCLOSURE</text>
      </>
    );
  } else if (title.includes("Heavy Plate") || title.includes("Welding")) {
    subtitle = "WLD-SYM-01: GROOVE WELD PREPARATION";
    drawing = (
      <>
        {/* Plates cross section */}
        <path d="M 50,70 L 160,70 L 180,120 L 50,120 Z" fill="none" stroke={strokeColor} strokeWidth="1.5" />
        <path d="M 350,70 L 240,70 L 220,120 L 350,120 Z" fill="none" stroke={strokeColor} strokeWidth="1.5" />
        {/* Backing bar */}
        <rect x="175" y="120" width="50" height="10" fill="none" stroke={strokeColor} strokeWidth="1" />
        {/* Weld beads */}
        <circle cx="200" cy="110" r="8" fill="none" stroke={accentColor} strokeWidth="1.2" />
        <circle cx="192" cy="95" r="10" fill="none" stroke={accentColor} strokeWidth="1.2" />
        <circle cx="208" cy="95" r="10" fill="none" stroke={accentColor} strokeWidth="1.2" />
        <circle cx="200" cy="80" r="12" fill="none" stroke={accentColor} strokeWidth="1.2" />
        {/* Weld symbol callout */}
        <path d="M 200,60 L 230,35 L 290,35" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
        <path d="M 200,60 L 205,53 M 200,60 L 207,63" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
        <text x="260" y="30" fill={accentColor} fontSize="8" fontWeight="bold">50mm V-GROOVE</text>
      </>
    );
  } else if (title.includes("Support Frame") || title.includes("Structural Steel")) {
    subtitle = "STR-FR-08: SUPPORT FRAME FIXTURE";
    drawing = (
      <>
        {/* 3D Box frame */}
        <rect x="100" y="50" width="160" height="100" fill="none" stroke={strokeColor} strokeWidth="1.5" />
        <rect x="140" y="30" width="160" height="100" fill="none" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="2,2" />
        {/* Connecting lines */}
        <line x1="100" y1="50" x2="140" y2="30" stroke={strokeColor} strokeWidth="1" />
        <line x1="260" y1="50" x2="300" y2="30" stroke={strokeColor} strokeWidth="1" />
        <line x1="100" y1="150" x2="140" y2="130" stroke={strokeColor} strokeWidth="1" strokeDasharray="2,2" />
        <line x1="260" y1="150" x2="300" y2="130" stroke={strokeColor} strokeWidth="1" />
        {/* Braces */}
        <line x1="100" y1="100" x2="260" y2="150" stroke={accentColor} strokeWidth="1.2" />
        <line x1="260" y1="100" x2="100" y2="150" stroke={accentColor} strokeWidth="1.2" />
      </>
    );
  } else if (title.includes("Pipe Elbow") || title.includes("SS Pipe")) {
    subtitle = "PP-EL-90: 90 DEGREE PIPE ELBOW";
    drawing = (
      <>
        {/* Curved Pipe */}
        <path d="M 120,150 A 130,130 0 0,1 250,20" fill="none" stroke={strokeColor} strokeWidth="15" strokeLinecap="butt" />
        <path d="M 120,150 A 130,130 0 0,1 250,20" fill="none" stroke="#0a0f1d" strokeWidth="13" strokeLinecap="butt" />
        {/* Center line */}
        <path d="M 120,150 A 130,130 0 0,1 250,20" fill="none" stroke={accentColor} strokeWidth="0.8" strokeDasharray="4,2" />
        {/* Flanges */}
        <rect x="95" y="145" width="50" height="10" rx="1" fill="none" stroke={strokeColor} strokeWidth="1.5" />
        <rect x="225" y="15" width="50" height="10" rx="1" fill="none" stroke={strokeColor} strokeWidth="1.5" transform="rotate(90 250 20)" />
        {/* Bolt centers */}
        <circle cx="107" cy="150" r="1.5" fill={accentColor} />
        <circle cx="133" cy="150" r="1.5" fill={accentColor} />
        <circle cx="250" cy="7" r="1.5" fill={accentColor} />
        <circle cx="250" cy="33" r="1.5" fill={accentColor} />
      </>
    );
  } else {
    // Default blueprint
    subtitle = "MECH-DWG: STRUCTURAL COMPONENT";
    drawing = (
      <>
        <rect x="80" y="40" width="240" height="120" rx="2" fill="none" stroke={strokeColor} strokeWidth="1.5" />
        <line x1="80" y1="100" x2="320" y2="100" stroke={strokeColor} strokeWidth="1" strokeDasharray="3,3" />
        <line x1="200" y1="40" x2="200" y2="160" stroke={strokeColor} strokeWidth="1" strokeDasharray="3,3" />
        <circle cx="200" cy="100" r="30" fill="none" stroke={accentColor} strokeWidth="1.5" />
        <circle cx="200" cy="100" r="5" fill="none" stroke={accentColor} strokeWidth="1" />
        <line x1="140" y1="70" x2="260" y2="130" stroke={strokeColor} strokeWidth="1" />
        <line x1="140" y1="130" x2="260" y2="70" stroke={strokeColor} strokeWidth="1" />
      </>
    );
  }

  return (
    <svg width="100%" height="100%" viewBox="0 0 400 200" style={{ background: "#0c1322", display: "block" }}>
      <defs>
        <pattern id="blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 210, 255, 0.05)" strokeWidth="0.8" />
        </pattern>
        <filter id="schematic-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Grid background */}
      <rect width="400" height="200" fill="url(#blueprint-grid)" />
      
      {/* Outer borders */}
      <rect x="5" y="5" width="390" height="190" fill="none" stroke="rgba(0, 210, 255, 0.15)" strokeWidth="0.5" />
      <rect x="8" y="8" width="384" height="184" fill="none" stroke="rgba(0, 210, 255, 0.25)" strokeWidth="1.2" />

      {/* Schematic content */}
      <g filter="url(#schematic-glow)">
        {drawing}
      </g>

      {/* Title block / metadata */}
      <rect x="8" y="167" width="210" height="25" fill="#090f1d" stroke="rgba(0, 210, 255, 0.25)" strokeWidth="1" />
      <text x="14" y="177" fill="rgba(255,255,255,0.3)" fontSize="6" fontWeight="bold">WASEF FABRICATION DIVISION</text>
      <text x="14" y="186" fill={strokeColor} fontSize="7" fontWeight="bold" letterSpacing="0.05em">{subtitle}</text>

      <rect x="330" y="167" width="62" height="25" fill="#090f1d" stroke="rgba(0, 210, 255, 0.25)" strokeWidth="1" />
      <text x="361" y="177" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="middle">SCALE</text>
      <text x="361" y="186" fill={accentColor} fontSize="7" fontWeight="bold" textAnchor="middle">1 : 15</text>
    </svg>
  );
}

function MachinerySchematic({ name }) {
  const accentColor = "var(--yellow-500)";
  const strokeColor = "#00d2ff";

  let drawing = null;
  let subtitle = "MACHINE SPECIFICATION";

  if (name.toLowerCase().includes("laser")) {
    subtitle = "CNC LASER CUTTER HEAD";
    drawing = (
      <>
        {/* Laser Head Assembly */}
        <rect x="180" y="30" width="40" height="60" rx="1" fill="none" stroke={strokeColor} strokeWidth="1.5" />
        <polygon points="185,90 215,90 200,110" fill="none" stroke={strokeColor} strokeWidth="1.5" />
        {/* Laser beam */}
        <line x1="200" y1="110" x2="200" y2="155" stroke="#ff3b30" strokeWidth="2.5" />
        <circle cx="200" cy="155" r="4" fill="#ff3b30" />
        {/* Metal Sheet */}
        <line x1="100" y1="155" x2="300" y2="155" stroke={accentColor} strokeWidth="3" />
        {/* Sparks */}
        <line x1="200" y1="155" x2="185" y2="140" stroke={accentColor} strokeWidth="0.8" />
        <line x1="200" y1="155" x2="215" y2="140" stroke={accentColor} strokeWidth="0.8" />
        <line x1="200" y1="155" x2="190" y2="170" stroke={accentColor} strokeWidth="0.8" />
        <line x1="200" y1="155" x2="210" y2="170" stroke={accentColor} strokeWidth="0.8" />
      </>
    );
  } else if (name.toLowerCase().includes("bending") || name.toLowerCase().includes("press")) {
    subtitle = "CNC PRESS BRAKE DIE SET";
    drawing = (
      <>
        {/* Upper punch tool */}
        <polygon points="160,30 240,30 200,100" fill="none" stroke={strokeColor} strokeWidth="1.8" />
        {/* Lower V-Die */}
        <polygon points="150,160 185,115 215,115 250,160" fill="none" stroke={strokeColor} strokeWidth="1.8" />
        {/* Metal sheet being bent */}
        <path d="M 100,85 L 180,114 L 200,123 L 220,114 L 300,85" fill="none" stroke={accentColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {/* Center line */}
        <line x1="200" y1="20" x2="200" y2="170" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" strokeDasharray="4,3" />
      </>
    );
  } else if (name.toLowerCase().includes("bandsaw")) {
    subtitle = "AUTOMATED METAL BANDSAW";
    drawing = (
      <>
        {/* Drive Wheels */}
        <circle cx="120" cy="70" r="30" fill="none" stroke={strokeColor} strokeWidth="1.5" />
        <circle cx="120" cy="70" r="5" fill="none" stroke={strokeColor} strokeWidth="1" />
        <circle cx="280" cy="70" r="30" fill="none" stroke={strokeColor} strokeWidth="1.5" />
        <circle cx="280" cy="70" r="5" fill="none" stroke={strokeColor} strokeWidth="1" />
        {/* Saw blade loop */}
        <rect x="120" y="40" width="160" height="60" rx="30" fill="none" stroke={strokeColor} strokeWidth="1" />
        {/* Guide blocks */}
        <rect x="170" y="94" width="15" height="12" fill="none" stroke={accentColor} strokeWidth="1" />
        <rect x="215" y="94" width="15" height="12" fill="none" stroke={accentColor} strokeWidth="1" />
        {/* Pipe being cut */}
        <circle cx="200" cy="100" r="16" fill="none" stroke={accentColor} strokeWidth="2.5" />
      </>
    );
  } else if (name.toLowerCase().includes("crane")) {
    subtitle = "EOT OVERHEAD SYSTEM";
    drawing = (
      <>
        {/* Bridge Girder */}
        <rect x="60" y="40" width="280" height="20" fill="none" stroke={strokeColor} strokeWidth="1.5" />
        <line x1="60" y1="50" x2="340" y2="50" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="3,3" />
        {/* Trolley */}
        <rect x="180" y="55" width="40" height="15" fill="none" stroke={accentColor} strokeWidth="1.2" />
        {/* Hook block & wire ropes */}
        <line x1="195" y1="70" x2="195" y2="115" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <line x1="205" y1="70" x2="205" y2="115" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <path d="M 195,115 L 205,115 A 5,5 0 0,1 210,120 A 5,5 0 0,1 205,125 A 5,5 0 0,1 200,120 A 5,5 0 0,0 195,125" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
      </>
    );
  } else {
    // Default welding station
    subtitle = "WASEF FABRICATION STATION";
    drawing = (
      <>
        {/* Gas Cylinder */}
        <rect x="80" y="50" width="50" height="90" rx="2" fill="none" stroke={strokeColor} strokeWidth="1.5" />
        <rect x="90" y="60" width="30" height="30" fill="none" stroke={strokeColor} strokeWidth="0.8" />
        {/* Welding Torch */}
        <path d="M 230,110 L 260,95 L 275,100" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
        <path d="M 275,100 L 290,115" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="2,2" />
        {/* Spark node */}
        <circle cx="290" cy="115" r="3" fill="#ffb800" />
        <line x1="290" y1="115" x2="280" y2="105" stroke={accentColor} strokeWidth="0.8" />
        <line x1="290" y1="115" x2="305" y2="110" stroke={accentColor} strokeWidth="0.8" />
      </>
    );
  }

  return (
    <svg width="100%" height="100%" viewBox="0 0 400 200" style={{ background: "#0c1322", display: "block" }}>
      <defs>
        <pattern id="blueprint-grid-mach" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 210, 255, 0.05)" strokeWidth="0.8" />
        </pattern>
        <filter id="mach-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Grid background */}
      <rect width="400" height="200" fill="url(#blueprint-grid-mach)" />
      
      {/* Outer borders */}
      <rect x="5" y="5" width="390" height="190" fill="none" stroke="rgba(0, 210, 255, 0.15)" strokeWidth="0.5" />
      <rect x="8" y="8" width="384" height="184" fill="none" stroke="rgba(0, 210, 255, 0.25)" strokeWidth="1.2" />

      {/* Schematic drawing */}
      <g filter="url(#mach-glow)">
        {drawing}
      </g>

      {/* Title block / metadata */}
      <rect x="8" y="167" width="210" height="25" fill="#090f1d" stroke="rgba(0, 210, 255, 0.25)" strokeWidth="1" />
      <text x="14" y="177" fill="rgba(255,255,255,0.3)" fontSize="6" fontWeight="bold">WASEF INFRASTRUCTURE SPECS</text>
      <text x="14" y="186" fill={strokeColor} fontSize="7" fontWeight="bold" letterSpacing="0.05em">{subtitle}</text>

      <rect x="330" y="167" width="62" height="25" fill="#090f1d" stroke="rgba(0, 210, 255, 0.25)" strokeWidth="1" />
      <text x="361" y="177" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="middle">PLANT UNIT</text>
      <text x="361" y="186" fill={accentColor} fontSize="7" fontWeight="bold" textAnchor="middle">W-24</text>
    </svg>
  );
}

function ProjectCard({ proj }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="proj-card card" style={{ overflow: 'hidden', padding: proj.image ? '0' : '1.75rem' }}>
      {proj.image ? (
        <div className="proj-card__img-container">
          {!imgErr ? (
            <img 
              src={proj.image} 
              alt={proj.title} 
              className="proj-card__img" 
              onError={() => setImgErr(true)}
            />
          ) : (
            <ProjectSchematic title={proj.title} />
          )}
        </div>
      ) : null}
      <div className="proj-card__body" style={{ padding: proj.image ? '1.5rem 1.75rem 1.75rem 1.75rem' : '0', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
        <div className="proj-card__header">
          <div className="proj-card__meta">
            <span className="badge badge-yellow">{proj.industry}</span>
          </div>
        </div>
        <h3 className="proj-card__title">{proj.title}</h3>
        <div className="proj-card__service">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--yellow-500)" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          {proj.service}
        </div>
        <p className="proj-card__desc">{proj.desc}</p>
      </div>
    </div>
  );
}

function MachineryCard({ mach }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="machinery-card card">
      <div className="machinery-card__img-container">
        {!imgErr ? (
          <img 
            src={mach.image} 
            alt={mach.name} 
            className="machinery-card__img" 
            onError={() => setImgErr(true)}
          />
        ) : (
          <MachinerySchematic name={mach.name} />
        )}
      </div>
      <div className="machinery-card__body">
        <span className="badge badge-yellow" style={{ alignSelf: 'flex-start' }}>{mach.type}</span>
        <h3 className="machinery-card__title">{mach.name}</h3>
        <p className="machinery-card__specs">{mach.specs}</p>
        <span className="machinery-card__qty">{mach.qty}</span>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <>
      <Helmet>
        <title>Case Studies & Projects — WASEF Manufacturing</title>
        <meta name="description" content="Explore precision laser manufacturing case studies from WASEF — aerospace, defence, medical, automotive, and industrial applications." />
      </Helmet>

      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__inner">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="section-label">
              <span className="laser-line" />
              <span className="text-upper text-yellow">Case Studies</span>
            </div>
            <h1 className="heading-display heading-h1">
              Problems Solved.<br /><span className="text-yellow">Results Delivered.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section section-mid">
        <div className="container">
          <div className="projects-grid">
            {PROJECTS.map((proj, i) => (
              <motion.div key={proj.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}>
                <ProjectCard proj={proj} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Machinery Section */}
      <section className="section section-dark" id="machinery">
        <div className="container">
          <div className="section-label">
            <span className="laser-line" />
            <span className="text-upper text-yellow">Our Infrastructure</span>
          </div>
          <h2 className="heading-display heading-h2" style={{ marginBottom: '2.5rem' }}>
            List of <span className="text-yellow">Machineries.</span>
          </h2>
          
          <div className="machinery-grid">
            {MACHINES.map((mach, i) => (
              <motion.div key={mach.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}>
                <MachineryCard mach={mach} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <div className="container cta-strip__inner">
          <h2 className="heading-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
            Ready to become our next success story? <span className="text-yellow">Get a quote.</span>
          </h2>
          <Link to="/contact?type=quote" className="btn btn-primary btn-lg">Request a Quote →</Link>
        </div>
      </section>

      <style>{`
        .projects-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.25rem; }
        .projects-grid > * { width: 100%; }
        @media (min-width: 640px) { .projects-grid > * { width: calc(50% - 0.625rem); } }
        @media (min-width: 1024px) { .projects-grid > * { width: calc(33.333% - 0.833rem); } }
        .proj-card { padding: 1.75rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .proj-card__img-container { position: relative; width: 100%; height: 180px; overflow: hidden; background: rgba(0,0,0,0.02); border-bottom: 1px solid rgba(0,0,0,0.06); }
        .proj-card__img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s var(--ease-out); }
        .proj-card:hover .proj-card__img { transform: scale(1.05); }
        .proj-card__placeholder { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; color: var(--gray-400); padding: 1.25rem; text-align: center; border: 2px dashed rgba(0, 0, 0, 0.08); border-bottom: 1px solid rgba(0,0,0,0.06); margin: 0; box-sizing: border-box; }
        .proj-card__placeholder svg { color: var(--yellow-500); opacity: 0.8; }
        .proj-card__placeholder-text { font-weight: 600; font-size: 0.875rem; color: var(--gray-200); }
        .proj-card__placeholder-sub { font-size: 0.75rem; color: var(--gray-400); }
        .proj-card__placeholder-sub code { background: rgba(0, 0, 0, 0.04); padding: 0.125rem 0.25rem; border-radius: 4px; font-family: monospace; color: var(--gray-100); }
        
        /* Before After Slider Badges */
        .ba-slider__label { position: absolute; bottom: 10px; font-size: 0.625rem; font-weight: 700; text-transform: uppercase; padding: 3px 8px; border-radius: var(--radius-sm); z-index: 5; pointer-events: none; letter-spacing: 0.05em; font-family: var(--font-heading); }
        .ba-slider__label--before { left: 10px; background: rgba(0,0,0,0.7); color: var(--gray-200); border: 0.5px solid rgba(255,255,255,0.15); }
        .ba-slider__label--after { right: 10px; background: var(--yellow-500); color: var(--gray-900); border: 0.5px solid rgba(0,0,0,0.15); }
        .proj-card__header { display: flex; justify-content: space-between; }
        .proj-card__meta { display: flex; align-items: center; gap: 0.625rem; }
        .proj-card__year { font-size: 0.75rem; color: var(--gray-500); font-weight: 600; }
        .proj-card__title { font-family: var(--font-heading); font-weight: 700; font-size: 1rem; color: var(--gray-100); }
        .proj-card__service { display: flex; align-items: center; gap: 0.375rem; font-size: 0.8125rem; font-weight: 600; color: var(--yellow-500); }
        .proj-card__desc { font-size: 0.8125rem; color: var(--gray-400); line-height: 1.65; flex: 1; }
        .proj-card__client { font-size: 0.8125rem; margin-top: 0.25rem; }

        .machinery-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-top: 1.5rem; }
        @media (min-width: 640px) { .machinery-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .machinery-grid { grid-template-columns: repeat(3, 1fr); } }
        .machinery-card { display: flex; flex-direction: column; height: 100%; }
        .machinery-card__img-container { position: relative; width: 100%; height: 180px; background: rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.06); border-radius: var(--radius-lg) var(--radius-lg) 0 0; overflow: hidden; }
        .machinery-card__img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s var(--ease-out); }
        .machinery-card:hover .machinery-card__img { transform: scale(1.05); }
        .machinery-card__placeholder { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; color: var(--gray-400); padding: 1.25rem; text-align: center; border: 2px dashed rgba(0, 0, 0, 0.08); border-radius: var(--radius-lg) var(--radius-lg) 0 0; margin: 0; box-sizing: border-box; }
        .machinery-card__placeholder svg { color: var(--yellow-500); opacity: 0.8; }
        .machinery-card__placeholder-text { font-weight: 600; font-size: 0.875rem; color: var(--gray-200); }
        .machinery-card__placeholder-sub { font-size: 0.75rem; color: var(--gray-400); }
        .machinery-card__placeholder-sub code { background: rgba(0, 0, 0, 0.04); padding: 0.125rem 0.25rem; border-radius: 4px; font-family: monospace; color: var(--gray-100); }
        .machinery-card__body { padding: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; flex: 1; }
        .machinery-card__title { font-family: var(--font-heading); font-weight: 700; font-size: 1.05rem; color: var(--gray-100); margin: 0; }
        .machinery-card__specs { font-size: 0.875rem; color: var(--gray-400); line-height: 1.5; margin: 0; flex: 1; }
        .machinery-card__qty { font-size: 0.8125rem; font-weight: 700; color: var(--yellow-600); background: rgba(255, 184, 0, 0.08); padding: 0.25rem 0.625rem; border-radius: var(--radius-sm); align-self: flex-start; }
      `}</style>
    </>
  );
}
