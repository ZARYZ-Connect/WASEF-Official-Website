import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  },
  {
    id: 18,
    title: '13.5 M Bus Chassis Fabrication',
    industry: 'Automotive & Heavy Transit',
    service: 'Heavy Structural Fabrication',
    year: 2024,
    client: 'Ashok Leyland',
    desc: 'Complete heavy structural fabrication, alignment, and full-penetration welding of 13.5-meter passenger coach bus chassis frameworks.',
    image: '/images/bus-chassis-fabrication.png'
  }
];

const MACHINES = [
  {
    id: 1,
    name: 'Bodor LASER Cutting Machine',
    type: 'Laser Cutting',
    specs: 'Type: CNC Fiber Laser Cutting Machine | Laser Power: 3 kW (3000 W) | Laser Type: Fiber Laser | Positioning Accuracy: ±0.03 mm | Repeat Positioning Accuracy: ±0.02 mm | Electrical Supply: 380–415 V AC, 3 Phase, 50/60 Hz | Cooling: Industrial Water Chiller (Closed-loop) | Gas Requirements: Oxygen (O₂), Nitrogen (N₂), Compressed Air | Application: Precision metal sheet cutting',
    qty: '1 Unit',
    image: '/images/BODOR LASER CUTTING MACHINE.jpg',
    materials: [
      'Mild Steel (Carbon Steel)',
      'Stainless Steel',
      'Aluminum',
      'Galvanized Steel',
      'Brass (depends on configuration)',
      'Copper (depends on laser source and settings)'
    ],
    features: [
      'CNC-controlled cutting system',
      'Automatic laser cutting head',
      'High-speed precision cutting',
      'Automatic height control',
      'Industrial water cooling system',
      'Servo motor drive system',
      'Precision linear guide rails',
      'Rack and pinion transmission',
      'Automatic lubrication system',
      'Safety enclosure (model dependent)'
    ],
    applications: [
      'Industrial fabrication',
      'Steel furniture manufacturing',
      'Electrical panels',
      'Agricultural equipment',
      'Machine parts',
      'Architectural metalwork',
      'Automotive components',
      'Sheet metal fabrication'
    ],
    advantages: [
      'High cutting speed',
      'Smooth cutting edges',
      'High precision',
      'Low operating cost',
      'Minimal material waste',
      'Suitable for mass production'
    ],
    factorySpecsNote: [
      'Bodor model number (for example: C3, P3, A3, i5, BCL, etc.)',
      'Machine serial number',
      'Laser source brand (IPG, Raycus, MAX, nLIGHT, etc.)',
      'A photo of the machine nameplate'
    ]
  },
  {
    id: 2,
    name: 'Bodor K230 CNC Fiber Laser Tube Cutting Machine',
    type: 'Laser Cutting',
    specs: 'Model: Bodor K230 | Round Tube Capacity: Ø20–Ø230 mm | Square Tube Capacity: 20 × 20 mm to 230 × 230 mm | Rectangular Tube Capacity: Up to 230 mm side length | Tube Length Capacity: 6.5 m standard (9.2 m optional) | Maximum Tube Weight: Up to 300 kg | Laser Power Options: 1.5 kW, 3 kW, or 6 kW | Max Chuck Rotation Speed: Up to 90–150 rpm | Laser Type: Fiber Laser | Chuck Clamping Time: Under 2.0 s | Tailing Length: Ultra-short (Down to 45 mm) | Control System: BodorThinker CNC Control with BodorGenius T Auto-focus Laser Head | Cooling: Closed-Loop Industrial Water Chiller | Gas Requirements: Oxygen (O₂), Nitrogen (N₂), Compressed Air | Application: Precision metal tube and profile cutting',
    qty: '1 Unit',
    image: '/images/Bodor K.png',
    materials: [
      'Mild Steel (MS)',
      'Stainless Steel (SS)',
      'Aluminium',
      'Brass',
      'Copper',
      'Channel Steel & Angle Bars'
    ],
    features: [
      'Bodor Genius T needle-nose auto-focusing laser head for processing angle steel and I-beams',
      'Dual high-speed pneumatic chuck system (clamping in under 2 seconds)',
      'BodorThinker CNC system with BodorNest Tube intelligent nesting software',
      'Automatic edge collision prevention and corner rotation optimization',
      'One-click cutting start with automated tube dimension graphics mapping',
      'Ultra-short tailings design to minimize raw material remnant waste',
      'Integrated closed-loop industrial water cooling and automatic lubrication system'
    ],
    applications: [
      'Structural framework and hollow-section fabrication',
      'Steel furniture & racking systems',
      'Agricultural machinery parts & chassis',
      'Automotive structural tubing',
      'Fitness Equipment & playground structures',
      'Custom elliptical & multi-shaped profile cutting'
    ],
    advantages: [
      'High-speed feeding up to 100 m/min for rapid processing cycle times',
      'Automatic centering and clamping eliminates manual setup adjustments',
      'High material yield with ultra-short scrap remnants',
      'Smooth, burr-free cuts matching strict engineering drawings'
    ],
    factorySpecsNote: [
      'Bodor K series specific model number (e.g., K1, K2, K3, K5)',
      'Laser source manufacturer and configuration (IPG/Maxphotonics)',
      'Automation loader attachments requested (K-Trans / K-Loader)',
      'Specific profile drawing files (.dxf / .step / .igs)'
    ],
    importantNotice: 'If your requirement is 250 mm pipe cutting, the K230 is not suitable because its maximum round pipe diameter is 230 mm. For 250 mm pipes, you should consider a larger model such as the Bodor K350, which supports larger tube diameters.'
  },
  {
    id: 3,
    name: 'SMS CNC Press Brake',
    type: 'CNC Bending & Forming',
    specs: 'Manufacturer: SMS | Machine Type: CNC Hydraulic Press Brake | Bending Capacity: 160 Tons | Bending Length: 3000 mm (3.0 Meters) | Maximum Pressing Force: 160 Tons | Control System: CNC Controller | Application: Precision sheet metal bending',
    qty: '1 Unit',
    image: '/images/sms-bending.png',
    materials: [
      'Mild Steel (MS)',
      'Stainless Steel (SS)',
      'Aluminum (Al)',
      'Copper (Cu)'
    ],
    features: [
      'High-precision bending',
      'Multi-angle bending capability',
      'Repeatable accuracy',
      'Suitable for heavy and medium-duty fabrication',
      'Fast setup and efficient production'
    ],
    applications: [
      'Precision sheet metal bending',
      'Box fabrication',
      'Panels & brackets',
      'Enclosures & cabinets',
      'Frames',
      'Custom metal components'
    ]
  },
  {
    id: 4,
    name: 'Amada Press Brake (RG 80)',
    type: 'CNC Bending & Forming',
    specs: 'Manufacturer: Amada | Model: RG 80 | Machine Type: Hydraulic Press Brake | Bending Capacity: 80 Tons | Bending Length: 2500 mm (2.5 Meters) | Maximum Pressing Force: 80 Tons | Control System: NC/CNC | Application: Precision sheet metal bending',
    qty: '1 Unit',
    image: '/images/amada-bending.png',
    materials: [
      'Mild Steel (MS)',
      'Stainless Steel (SS)',
      'Aluminum (Al)',
      'Copper (Cu)'
    ],
    features: [
      'High bending accuracy',
      'Smooth hydraulic operation',
      'Reliable and durable construction',
      'Suitable for medium-duty fabrication',
      'Easy tooling setup',
      'Consistent repeatability',
      'Supports various punch and die combinations'
    ],
    applications: [
      'Precision sheet metal bending',
      'Brackets',
      'Cabinets',
      'Electrical panels',
      'Enclosures',
      'Channels & frames',
      'Custom fabrication'
    ]
  },
  {
    id: 5,
    name: 'Bandsaw Metal Cutting Machine',
    type: 'Sawing',
    specs: 'Automated bandsaw for heavy industrial sections and pipes',
    qty: '1 Unit',
    image: '/images/bandsaw.png',
    materials: ['Mild Steel sections & beams', 'Stainless Steel pipes & solid bars', 'Structural Steel channels', 'Aluminum profiles'],
    features: [
      'Automated hydraulic blade feed control',
      'Heavy-duty quick-action clamping vise',
      'Precision carbide guide rollers for straight cuts',
      'Integrated coolant pump & chip filtration system'
    ]
  },
  {
    id: 6,
    name: 'EOT Crane',
    type: 'Material Handling',
    specs: '3 Ton capacity heavy duty overhead crane system',
    qty: '1 Unit',
    image: '/images/eot-crane.png',
    materials: ['Heavy metal plates', 'Industrial machinery structures', 'Raw material stock', 'Welded fabrication sub-assemblies'],
    features: [
      '3 Ton lifting capacity',
      'Overhead traveling bridge structure',
      'Dual-speed hoisting & cross-travel control',
      'Pendant remote and integrated safety limit switches'
    ]
  },
  {
    id: 7,
    name: 'MIG Welding Machines',
    type: 'Welding & Assembly',
    specs: 'High-strength structural gas metal arc welding units',
    qty: '6 Units',
    image: '/images/mig-welding.jpg',
    materials: ['Mild Steel', 'Stainless Steel', 'Structural Carbon Steel'],
    features: [
      'Gas Metal Arc Welding (GMAW / MIG) technology',
      'Stable electronic wire feed mechanism',
      'Ideal for heavy-duty structural welding applications',
      'Multiple independent units for parallel line assembly'
    ]
  },
  {
    id: 8,
    name: 'TIG Welding Machines',
    type: 'Welding & Assembly',
    specs: 'Precision tungsten inert gas welding stations',
    qty: '2 Units',
    image: '/images/tig-welding.jpg',
    materials: ['Stainless Steel', 'Aluminum', 'Thin sheet metals', 'Specialized alloys'],
    features: [
      'Tungsten Inert Gas Welding (GTAW / TIG) technology',
      'High-frequency arc ignition for precise start',
      'Excellent weld quality and aesthetic appearance',
      'Fine current control for thin sheet sheet-metal joining'
    ]
  },
  {
    id: 9,
    name: 'Fly Press',
    type: 'Bending & Pressing',
    specs: 'Hand-operated mechanical press for secondary operations',
    qty: '1 Unit',
    image: '/images/fly-press.png',
    materials: ['Thin sheet metal parts', 'Steel bars & brackets', 'Copper shims'],
    features: [
      'Manual screw-driven mechanical press design',
      'Used for secondary forming, punch, and assembly operations',
      'Quick tool swap mounting system for versatility'
    ]
  },
  {
    id: 10,
    name: 'JFY Make Press Brake',
    type: 'CNC Bending & Forming',
    specs: 'Model: TPR8 160/3000 | Capacity: 160 Tonnes | Bending Length: 3000 mm (3.0 meters)',
    qty: '1 Unit',
    image: '/images/JFY Make Press Brake.jpg',
    materials: ['Mild Steel', 'Stainless Steel', 'Aluminum', 'Brass & Copper'],
    features: [
      'Model: TPR8 160/3000',
      'Bending Force: 160 Tonnes',
      'Bending Length: 3000 mm (3.0 meters)',
      'CNC multi-axis programmable backgauge',
      'Graphical CNC control interface for easy job setup',
      'High-precision hydraulic system for high repeatability'
    ]
  },
  {
    id: 11,
    name: 'Bodor E-Series Fiber Laser Cutting Machine',
    type: 'Laser Cutting',
    specs: 'Laser Power: 6 kW (6000 W) | Bed Size: 4000 × 1500 mm | Laser Type: Fiber Laser | Maximum Positioning Speed: 120 m/min | Maximum Acceleration: 1.5 G | Positioning Accuracy: ±0.03 mm | Repeat Positioning Accuracy: ±0.02 mm | Control System: CNC Intelligent Control | Drive System: AC Servo Motors | Transmission: Helical Rack & Pinion | Guide Rails: Precision Linear Guide Rails | Cooling System: Industrial Water Chiller | Automatic Lubrication: Yes | Electrical Supply: 380–415 V AC, 3 Phase, 50/60 Hz | Assist Gases: Oxygen (O₂), Nitrogen (N₂), Compressed Air',
    qty: '1 Unit',
    image: '/images/BODOR LASER CUTTING MACHINE E-SERIES.jpg',
    materials: [
      'Mild Steel (up to 25 mm)',
      'Stainless Steel (up to 20 mm)',
      'Aluminum (up to 16 mm)',
      'Brass (up to 10 mm)',
      'Copper (up to 8 mm)',
      'Galvanized Steel (up to 12 mm)',
      'Carbon Steel'
    ],
    features: [
      'Auto Focus Laser Cutting Head',
      'Automatic Nozzle Calibration',
      'Intelligent Nesting Software',
      'Collision Protection System',
      'Automatic Height Control',
      'Fast Piercing Technology',
      'High-Speed Edge Cutting',
      'Real-Time Process Monitoring',
      'Emergency Safety System'
    ],
    applications: [
      'Sheet Metal Fabrication',
      'Steel Furniture',
      'Electrical Panels',
      'Agricultural Equipment',
      'Automotive Components',
      'Industrial Machinery',
      'Kitchen Equipment',
      'Architectural Metalwork',
      'Signage Manufacturing'
    ],
    advantages: [
      'High cutting speed',
      'Excellent edge quality',
      'High precision',
      'Low maintenance',
      'Energy-efficient fiber laser',
      'Minimal material waste',
      'Suitable for continuous industrial production'
    ]
  }
];

const PROCESS_STEPS = [
  {
    num: '01',
    name: 'Material Purchasing',
    shortName: 'Material Purchasing',
    subtitle: 'Sourcing & Sizing Verification',
    desc: 'Raw materials are purchased and verified as per design specifications. Inventory is structured into sheets (Mild Steel, Stainless Steel, Aluminium) and structural tube/pipe sections.',
    specs: 'Sheets (MS): 0.8 mm to 26 mm | Sheets (SS): 0.5 mm to 16 mm | Sheets (Aluminium): 1 mm to 6 mm | Tube & Pipe: Up to 230 Dia / Pipe | Tube Dimensions: 230 x 230 mm',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    visual: 'material'
  },
  {
    num: '02',
    name: 'As per customer requirements make a Drawing',
    shortName: 'Customer Drawing',
    subtitle: 'Design Engineering',
    desc: 'We model and engineer detailed CAD blueprints and technical schematics based on customer requirements.',
    specs: 'Drafting: 2D Schematics & 3D CAD Modeling | Optimization: Structural limits check | Review: Customer design sign-off | Formats: .DXF, .DWG, .STEP, .IGS',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M12 20h9M3 20v-8a2 2 0 0 1 2-2h4l2 3h9a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
    visual: 'cad'
  },
  {
    num: '03',
    name: 'As Per Drawing start the laser cutting thickness viz.',
    shortName: 'Laser Cutting',
    subtitle: 'CNC Laser Profiling',
    desc: 'CNC fiber laser cutting of sheets and tube profiles matching the established drawing thickness specifications.',
    specs: 'Laser Systems: 3 kW & 6 kW Fiber Lasers | Cutting Accuracy: ±0.03 mm | Features: Auto-Focus, Auto-Nesting | Process Control: High-speed edge profiling',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    visual: 'laser'
  },
  {
    num: '04',
    name: 'Separate -> Bending -> Non-Bending -> Fabrication',
    shortName: 'Separate Workflow',
    subtitle: 'Routing & Processing',
    desc: 'Sorting cut panels and parts into their respective processing lines: CNC bending, non-bending operations, and structural welding/fabrication.',
    specs: 'Bending Route: CNC Hydraulic Bending | Non-Bending Route: Punching, Countersinking | Fabrication Route: Heavy MIG/TIG welding | Tolerance Range: Structural assembly jig-fit',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 17v-5a3 3 0 0 1 6 0v5" />
      </svg>
    ),
    visual: 'routing'
  },
  {
    num: '05',
    name: 'Move to Plating And Powder Coating',
    shortName: 'Plating & Coating',
    subtitle: 'Surface Treatment',
    desc: 'Directing components to surface coating lines for zinc plating (blue, yellow, or black) or applying customized powder coating finishes.',
    specs: 'Plating Modes: Zinc Blue, Zinc Yellow, Zinc Black | Powder Coating: Electrostatic paint shield | Spec: As per customer requirement | Corrosion Finish: Heavy-duty protection',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    visual: 'coating'
  },
  {
    num: '06',
    name: 'Packing',
    shortName: 'Packing',
    subtitle: 'Dispatch Standards',
    desc: 'Components are packed securely in compliance with the customer standard to prevent damage during transit.',
    specs: 'Packaging Style: As per customer standard | Protection: Foam, film, cardboard layering | Quality Gate: 100% finished parts sign-off | Dispatch: Logistics logistics ready',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="2" y1="20" x2="22" y2="20" />
        <line x1="12" y1="17" x2="12" y2="20" />
      </svg>
    ),
    visual: 'packing'
  }
];

function ProcessVisual({ type }) {
  const imgSrc = (() => {
    switch (type) {
      case 'material': return '/images/process/material-purchasing.png';
      case 'cad': return '/images/process/customer-drawing.png';
      case 'laser': return '/images/process/laser-cutting.png';
      case 'routing': return '/images/process/bending-fabrication.png';
      case 'coating': return '/images/process/plating-coating.png';
      case 'packing': return '/images/process/packing.png';
      default: return '';
    }
  })();

  if (imgSrc) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '250px', background: '#090f1d', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
        <img 
          src={imgSrc}
          alt={type}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    );
  }

  return null;
}

const getProjectDetails = (proj) => {
  if (!proj) return { specs: '', materials: [], steps: [] };
  if (proj.customDetails) return proj.customDetails;
  
  let specs = '';
  let materials = [];
  let steps = [];

  const titleLower = proj.title.toLowerCase();

  if (titleLower.includes('bus chassis') || titleLower.includes('13.5 m bus')) {
    specs = 'Overall Length: 13,500 mm | Overall Width: 2,550 mm | Overall Height: 3,400 mm | Wheelbase: 6,600 mm (Approx.) | Front Overhang: 2,300 mm (Approx.) | Rear Overhang: 4,600 mm (Approx.) | Passenger Capacity: 49 - 57 Seater (Approx.)';
    materials = ['High-Tensile Rectangular Hollow Sections (RHS)', 'Mild Steel Structural Channels', 'Reinforced Chassis Mounting Plates', 'Heavy-Duty Anti-Corrosive Enamel Paint'];
    steps = [
      { name: 'Material Loading', desc: 'Sourcing, sizing, and loading high-tensile hollow sections and steel channels.' },
      { name: 'Cutting', desc: 'Precision CNC bandsaw and high-power laser profile cutting of frame tubes.' },
      { name: 'Fitting', desc: 'Aligning main frame chassis beams, outriggers, and pillars using a heavy-duty alignment jig.' },
      { name: 'Welding', desc: 'Fully qualified multi-pass CO₂/MIG structural welding of joints to engineering tolerances.' },
      { name: 'Assembly', desc: 'Integrating engine brackets, suspension cross-members, axle hangers, and luggage compartments.' },
      { name: 'Finishing', desc: 'Shot blasting, applying premium zinc-rich anti-corrosive primer, and topcoat safety paint.' }
    ];
  } else if (titleLower.includes('workstation') || titleLower.includes('desk') || titleLower.includes('bench')) {
    specs = 'Overall Dimensions: 1800mm (L) x 900mm (W) x 1500mm (H) | Sheet Thickness: 1.2 mm - 2.5 mm | Drawer Capacity: 40 kg per drawer | Frame Load Limit: 350 kg | Coating: Anti-static ESD powder coat';
    materials = ['Cold Rolled Mild Steel', 'Stainless Steel (SS304/SS316L)', 'Aluminum extrusion channels', 'ESD Laminate Sheet'];
    steps = [
      { name: 'Material Loading', desc: 'Loading premium cold-rolled steel and cleanroom-grade stainless steel sheets.' },
      { name: 'Laser Cutting', desc: 'CNC fiber laser cutting of panels, sheet brackets, and drawer slides to ±0.05mm accuracy.' },
      { name: 'CNC Bending', desc: 'Precision hydraulic press brake folding of drawers, frame uprights, and shelf channels.' },
      { name: 'Fitting & Tacking', desc: 'Jig alignment and tack welding of L-frame supports and structural braces.' },
      { name: 'Welding', desc: 'Seamless TIG welding of cleanroom joints, followed by surface grinding and polishing.' },
      { name: 'Assembly & ESD Check', desc: 'Integrating drawers, electrical switch channels, overhead lights, and testing anti-static resistivity.' }
    ];
  } else if (titleLower.includes('tow tug') || titleLower.includes('chassis')) {
    specs = 'Vehicle Traction Capacity: 250 Tons | Chassis Plate Thickness: 20 mm - 50 mm heavy plate | Overall Length: 4200 mm | Width: 1850 mm | Ground Clearance: 220 mm | Total Weight: Approx 4500 kg';
    materials = ['High-Tensile Structural Carbon Steel (Grade E350)', 'Thick Mild Steel Plates', 'Forged Steel Coupling Pins', 'Polyurethane Industrial Wheels'];
    steps = [
      { name: 'Material Loading', desc: 'Sourcing and loading heavy 50mm structural plates and high-tensile steel members.' },
      { name: 'Cutting', desc: 'Bevel and straight cutting of thick plates using 6kW high-power fiber laser machines.' },
      { name: 'Fitting', desc: 'Aligning steering columns, drivetrain mounts, and suspension frames on a heavy-duty jig table.' },
      { name: 'Structural Welding', desc: 'Multi-pass MIG welding of high-load joints, subject to ultrasonic and dye-penetrant testing.' },
      { name: 'Assembly', desc: 'Mechanical integration of axle beams, heavy couplings, electrical drive systems, and body panel shields.' },
      { name: 'Finishing & Testing', desc: 'Applying anti-corrosion primer and yellow/grey safety paint, followed by static load testing.' }
    ];
  } else if (titleLower.includes('enclosure') || titleLower.includes('panel') || titleLower.includes('cabinet')) {
    specs = 'Protection Class: IP55 / IP66 rated | Cabinet Dimensions: 1200 x 800 x 400 mm | Sheet Metal Thickness: 1.5 mm | Door Angle: 120-degree opening with gas struts | Mounting: Rear plate & floor mount';
    materials = ['Galvanized Iron (GI) Sheet', 'Stainless Steel (SS304)', 'Neoprene gasket seals', 'Powder coating pigments'];
    steps = [
      { name: 'Material Loading', desc: 'Loading rust-resistant galvanized steel sheets and hardware inserts.' },
      { name: 'Laser Cutting', desc: 'Cutting ventilation slots, cable gland plates, and door hinges with fiber laser.' },
      { name: 'CNC Bending', desc: 'Intricate multi-stage bending for double-return water channels and door seals.' },
      { name: 'Fitting & PEM Press', desc: 'Pressing threaded studs and nuts (PEM fasteners) into chassis parts.' },
      { name: 'Welding', desc: 'MIG welding of corners and seam sealing with high-performance industrial sealant.' },
      { name: 'Assembly & Gasketing', desc: 'Powder coating, applying continuous polyurethane liquid gasket, and door latch assembly.' }
    ];
  } else if (titleLower.includes('welding') || titleLower.includes('pipe') || titleLower.includes('elbow') || titleLower.includes('frame')) {
    specs = 'Pipe Diameter: Ø50 mm - Ø250 mm | Wall Thickness: 3 mm - 8 mm schedule pipe | Weld Spec: ASME Section IX qualified TIG/MIG | Dimension Tolerance: ±1.0 mm | Test Pressure: Up to 15 Bar';
    materials = ['Stainless Steel Pipes (SS316L)', 'Carbon Steel Elbows', 'ANSI Slip-On Flanges', 'Welding Argon Gas (99.99%)'];
    steps = [
      { name: 'Material Loading', desc: 'Selecting certified pipes, raw fittings, and backing rings.' },
      { name: 'Sawing & Beveling', desc: 'Automated bandsaw metal cutting and pipe end beveling to 37.5 degrees.' },
      { name: 'Fitting & Alignment', desc: 'Aligning pipe sections and flanges with pipe-fitters jacks and leveling tools.' },
      { name: 'TIG/MIG Welding', desc: 'High-purity root pass TIG welding with argon gas backing, followed by cap welding.' },
      { name: 'Assembly', desc: 'Fitting secondary support lugs, pipe clamps, and pressure gauge sockets.' },
      { name: 'Finishing & Inspection', desc: 'Passivation wash to prevent corrosion, and carrying out hydrostatic leak testing.' }
    ];
  } else if (titleLower.includes('agricultural') || titleLower.includes('bumper') || titleLower.includes('fabricated') || titleLower.includes('automation')) {
    specs = 'Material Thickness: 2.0 mm - 10 mm | Overall Dimensions: Varying by drawing profiles | Surface Coating: Heavy-duty industrial paint / Hot-dip galvanized | Weld Joint: Full penetration MIG';
    materials = ['Mild Steel Plates & Sections', 'Hot-Rolled Steel Bars', 'High-Tensile Fasteners', 'Anti-Rust Primers'];
    steps = [
      { name: 'Material Loading', desc: 'Loading hot-rolled steel bars, structural channels, and steel plates.' },
      { name: 'Cutting', desc: 'CNC laser cutting of bracket profiles and bandsaw sawing of tube members.' },
      { name: 'Fitting', desc: 'Assembling structural arms, bumper brackets, or cage frames in precision fixture jigs.' },
      { name: 'Full Weld Out', desc: 'Heavy MIG welding with shielding gas to achieve maximum load-bearing strength.' },
      { name: 'Assembly', desc: 'Integrating fasteners, linkage pins, and secondary rubber pads/bumpers.' },
      { name: 'Finishing', desc: 'Shot blasting, zinc-rich primer spray coating, and glossy yellow/grey enamel topcoat.' }
    ];
  } else {
    specs = 'Material Grade: MS / SS / Aluminum | Thickness Range: 1.0 mm - 6.0 mm | Dimensions: Built to custom drawing specifications | Inspection: 100% Vernier/CMM inspection';
    materials = ['Mild Steel', 'Stainless Steel', 'Aluminum Alloys', 'Fastening Hardware'];
    steps = [
      { name: 'Material Loading', desc: 'Loading raw sheet metal plates and profiles into the production bay.' },
      { name: 'Cutting', desc: 'CNC fiber laser cutting to translate drawing patterns onto raw sheets.' },
      { name: 'Fitting', desc: 'Manual fit-up and clamping of sheet metal components using assembly jigs.' },
      { name: 'Welding & Joining', desc: 'Precise welding (MIG/TIG) or riveting to join components securely.' },
      { name: 'Assembly', desc: 'Integrating multiple sub-assemblies, hinges, brackets, and accessories.' },
      { name: 'Finishing & Quality', desc: 'Grinding, powder coating or painting, and strict QA dimension check.' }
    ];
  }

  return { specs, materials, steps };
};

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

function ProjectCard({ proj, onClick }) {
  const [imgErr, setImgErr] = useState(false);

  const handleClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log("Project card clicked:", proj.title);
    if (onClick) onClick();
  };

  return (
    <div className="proj-card card clickable-card" onClick={handleClick} style={{ overflow: 'hidden', padding: proj.image ? '0' : '1.75rem', cursor: 'pointer' }}>
      {proj.image ? (
        <div className="proj-card__img-container" onClick={handleClick}>
          {!imgErr ? (
            <img 
              src={proj.image} 
              alt={proj.title} 
              className="proj-card__img" 
              onError={() => setImgErr(true)}
              onClick={handleClick}
            />
          ) : (
            <ProjectSchematic title={proj.title} onClick={handleClick} />
          )}
          <div className="machinery-card__overlay" onClick={handleClick}>
            <button className="btn btn-primary machinery-card__overlay-btn" onClick={handleClick}>
              View Project Details
            </button>
          </div>
        </div>
      ) : null}
      <div 
        className="proj-card__body" 
        style={{ padding: proj.image ? '1.5rem 1.75rem 1.75rem 1.75rem' : '0', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}
        onClick={handleClick}
      >
        <div className="proj-card__header" onClick={handleClick}>
          <div className="proj-card__meta" onClick={handleClick}>
            <span className="badge badge-yellow" onClick={handleClick}>{proj.industry}</span>
          </div>
        </div>
        <h3 className="proj-card__title" onClick={handleClick}>{proj.title}</h3>
        <div className="proj-card__service" onClick={handleClick}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--yellow-500)" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          {proj.service}
        </div>
        <p className="proj-card__desc" onClick={handleClick}>{proj.desc}</p>
        <span className="machinery-card__more-link" style={{ marginTop: 'auto', paddingTop: '0.5rem' }} onClick={handleClick}>
          Technical Details & Materials
        </span>
      </div>
    </div>
  );
}
function MachineryCard({ mach, onClick }) {
  const [imgErr, setImgErr] = useState(false);

  const handleClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log("Machinery card clicked:", mach.name);
    if (onClick) onClick();
  };

  return (
    <div className="machinery-card card clickable-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="machinery-card__img-container" onClick={handleClick}>
        {!imgErr ? (
          <img 
            src={mach.image} 
            alt={mach.name} 
            className="machinery-card__img" 
            onError={() => setImgErr(true)}
            onClick={handleClick}
          />
        ) : (
          <MachinerySchematic name={mach.name} onClick={handleClick} />
        )}
        <div className="machinery-card__overlay" onClick={handleClick}>
          <span className="machinery-card__overlay-btn" onClick={handleClick}>View Specifications →</span>
        </div>
      </div>
      <div className="machinery-card__body" onClick={handleClick}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }} onClick={handleClick}>
          <span className="badge badge-yellow" onClick={handleClick}>{mach.type}</span>
          <span className="machinery-card__qty" onClick={handleClick}>{mach.qty}</span>
        </div>
        <h3 className="machinery-card__title" onClick={handleClick}>{mach.name}</h3>
        <p className="machinery-card__specs-preview" onClick={handleClick}>
          {mach.specs.length > 90 ? mach.specs.substring(0, 87) + '...' : mach.specs}
        </p>
        <span className="machinery-card__more-link" onClick={handleClick}>Technical Details & Materials</span>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [canCloseMachine, setCanCloseMachine] = useState(false);
  const [canCloseProject, setCanCloseProject] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + PROCESS_STEPS.length) % PROCESS_STEPS.length);
  };

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeStep]);

  useEffect(() => {
    if (selectedMachine || selectedProject) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, [selectedMachine, selectedProject]);

  useEffect(() => {
    if (selectedMachine) {
      const timer = setTimeout(() => setCanCloseMachine(true), 400);
      return () => clearTimeout(timer);
    } else {
      setCanCloseMachine(false);
    }
  }, [selectedMachine]);

  useEffect(() => {
    if (selectedProject) {
      const timer = setTimeout(() => setCanCloseProject(true), 400);
      return () => clearTimeout(timer);
    } else {
      setCanCloseProject(false);
    }
  }, [selectedProject]);

  const getParsedSpecs = (specsStr) => {
    return specsStr.split('|').map(s => {
      const parts = s.split(':');
      if (parts.length > 1) {
        return { label: parts[0].trim(), value: parts.slice(1).join(':').trim() };
      }
      return { label: 'Specification', value: s.trim() };
    });
  };

  return (
    <>
      <Helmet>
        <title>Case Studies &amp; Projects — WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING)</title>
        <meta name="description" content="Explore precision laser manufacturing case studies from WASEF PVT LTD &amp; KS INDUSTRIES (SLE LASER CUTTING) — aerospace, defence, medical, automotive, and industrial applications." />
      </Helmet>

      <section className="page-hero page-hero--projects">
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
            {PROJECTS.map((proj, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div key={proj.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedProject(proj)}
                  style={{ cursor: 'pointer' }}>
                  <ProjectCard proj={proj} onClick={() => setSelectedProject(proj)} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Manufacturing Process Pipeline Section */}
      <section className="section section-dark" style={{ background: '#0b111e', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '5rem 0' }}>
        <div className="container">
          <div className="section-label">
            <span className="laser-line" />
            <span className="text-upper text-yellow">Core Workflow</span>
          </div>
          <h2 className="heading-display heading-h2" style={{ marginBottom: '1rem' }}>
            Our Manufacturing <span className="text-yellow">Process.</span>
          </h2>
          <p style={{ color: 'var(--gray-400)', maxWidth: '620px', lineHeight: '1.7', fontSize: '0.9rem', marginBottom: '3rem' }}>
            We follow a structured 6-step manufacturing workflow to translate raw metal stock into high-precision engineering assemblies, conforming to international quality certifications.
          </p>

          {/* Compact Slider Card with Swipability */}
          <div 
            className="process-slider-card"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Mobile Segmented Progress Tracker */}
            <div className="process-mobile-tracker">
              {PROCESS_STEPS.map((_, idx) => {
                const isActive = activeStep === idx;
                const isCompleted = idx < activeStep;
                return (
                  <div 
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`process-tracker-segment ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  />
                );
              })}
            </div>

            {/* Navigation Strip */}
            <div className="process-nav-strip">
              {/* Stepper Dots/Numbers */}
              <div className="process-stepper">
                {PROCESS_STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`process-step-btn ${isActive ? 'active' : ''}`}
                      title={step.name}
                    >
                      <span style={{ 
                        width: '18px', 
                        height: '18px', 
                        borderRadius: '50%', 
                        background: isActive ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.1)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: '0.65rem',
                        flexShrink: 0
                      }}>
                        {step.num}
                      </span>
                      <span>
                        {step.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="process-controls">
                <button 
                  onClick={handlePrev}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.03)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '1rem',
                    lineHeight: '1'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--yellow-500)'; e.currentTarget.style.color = 'var(--yellow-500)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
                  aria-label="Previous Step"
                >
                  ←
                </button>
                
                {/* Auto-Play Indicator bar */}
                <div style={{ width: '40px', height: '2px', background: 'rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden', borderRadius: '1px' }}>
                  <div key={activeStep} style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    background: 'var(--yellow-500)',
                    width: '100%',
                    transformOrigin: 'left',
                    animation: 'fillProgress 5s linear forwards'
                  }} />
                </div>

                <button 
                  onClick={handleNext}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.03)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '1rem',
                    lineHeight: '1'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--yellow-500)'; e.currentTarget.style.color = 'var(--yellow-500)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
                  aria-label="Next Step"
                >
                  →
                </button>
              </div>
            </div>

            {/* Slide Body Container */}
            <div className="process-slide-body">
              {/* Info Column */}
              <div className="process-info-col" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ color: 'var(--yellow-500)', background: 'rgba(255, 199, 44, 0.08)', padding: '0.75rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {PROCESS_STEPS[activeStep].icon}
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--yellow-500)', letterSpacing: '0.05em' }}>
                      Step {PROCESS_STEPS[activeStep].num} — {PROCESS_STEPS[activeStep].subtitle}
                    </span>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', margin: '0.125rem 0 0 0' }}>
                      {PROCESS_STEPS[activeStep].name}
                    </h3>
                  </div>
                </div>

                <p style={{ color: 'var(--gray-300)', fontSize: '0.9rem', lineHeight: '1.7', margin: 0 }}>
                  {PROCESS_STEPS[activeStep].desc}
                </p>

                <div style={{ background: 'rgba(0,210,255,0.03)', border: '1px solid rgba(0,210,255,0.08)', padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#00d2ff', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    Technical Capacities & Options
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {PROCESS_STEPS[activeStep].specs.split('|').map((spec, i) => {
                      const parts = spec.split(':');
                      return (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', borderBottom: '1px dashed rgba(255,255,255,0.05)', paddingBottom: '0.25rem' }}>
                          <span style={{ color: 'var(--gray-400)' }}>{parts[0].trim()}</span>
                          <span style={{ color: '#fff', fontWeight: '600' }}>{parts[1]?.trim() || ''}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Photo Column with overlaid arrows on mobile */}
              <div className="process-photo-col" style={{ minHeight: '300px', display: 'flex', alignItems: 'stretch', position: 'relative' }}>
                <button className="mobile-nav-arrow prev" onClick={handlePrev} aria-label="Previous Step">
                  ←
                </button>
                <ProcessVisual type={PROCESS_STEPS[activeStep].visual} />
                <button className="mobile-nav-arrow next" onClick={handleNext} aria-label="Next Step">
                  →
                </button>
              </div>
            </div>
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
            {MACHINES.map((mach, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div key={mach.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedMachine(mach)}
                  style={{ cursor: 'pointer' }}>
                  <MachineryCard mach={mach} onClick={() => setSelectedMachine(mach)} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedMachine && createPortal(
    
        <div 
          className="machine-modal-wrapper"
          onClick={() => { if (canCloseMachine) setSelectedMachine(null); }}
        >
          <div 
            className="machine-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="machine-modal-close" 
              onClick={() => { if (canCloseMachine) setSelectedMachine(null); }}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="machine-modal-grid">
              <div className="machine-modal-left">
                <div className="machine-modal-img-wrapper">
                  <img 
                    src={selectedMachine.image} 
                    alt={selectedMachine.name}
                    className="machine-modal-img"
                  />
                </div>
                
                <div className="machine-modal-specs">
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Technical Specifications
                  </h4>
                  {getParsedSpecs(selectedMachine.specs).map((spec, i) => (
                    <div key={i} className="machine-modal-spec-item">
                      <span className="machine-modal-spec-label">{spec.label}</span>
                      <span className="machine-modal-spec-value">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="machine-modal-right">
                <span className="badge badge-yellow" style={{ marginBottom: '0.5rem' }}>{selectedMachine.type}</span>
                <h2 className="heading-display" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', margin: '0 0 1rem 0', color: '#0f172a', lineHeight: '1.2' }}>
                  {selectedMachine.name}
                </h2>
                
                {selectedMachine.materials && selectedMachine.materials.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 className="machine-modal-list-title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.25rem' }}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                      Compatible Materials
                    </h4>
                    <ul className="machine-modal-list">
                      {selectedMachine.materials.map((mat, i) => (
                        <li key={i} className="machine-modal-list-item">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--yellow-600)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                          {mat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedMachine.features && selectedMachine.features.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 className="machine-modal-list-title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.25rem' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3"/></svg>
                      Key Features & Capabilities
                    </h4>
                    <ul className="machine-modal-list" style={{ gridTemplateColumns: '1fr' }}>
                      {selectedMachine.features.map((feat, i) => (
                        <li key={i} className="machine-modal-list-item">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--yellow-600)" strokeWidth="3" style={{ marginTop: '0.25rem' }}><polyline points="20 6 9 17 4 12"/></svg>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedMachine.applications && selectedMachine.applications.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 className="machine-modal-list-title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.25rem' }}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                      Typical Applications
                    </h4>
                    <ul className="machine-modal-list">
                      {selectedMachine.applications.map((app, i) => (
                        <li key={i} className="machine-modal-list-item">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--yellow-600)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedMachine.advantages && selectedMachine.advantages.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 className="machine-modal-list-title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.25rem' }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      Key Advantages
                    </h4>
                    <ul className="machine-modal-list">
                      {selectedMachine.advantages.map((adv, i) => (
                        <li key={i} className="machine-modal-list-item">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--yellow-600)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                          <span>{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedMachine.factorySpecsNote && selectedMachine.factorySpecsNote.length > 0 && (
                  <div style={{ marginBottom: '1.5rem', padding: '1.25rem', background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: 'var(--radius-lg)' }}>
                    <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', fontWeight: '700', color: '#b45309', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                      Information Needed for Factory Specifications
                    </h5>
                    <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.75rem', color: '#78350f', lineHeight: '1.5' }}>
                      To request exact factory specifications (e.g., dimensions, acceleration details, chiller models), please share the following details:
                    </p>
                    <ul style={{ margin: '0', paddingLeft: '1.25rem', fontSize: '0.75rem', color: '#78350f', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {selectedMachine.factorySpecsNote.map((item, i) => (
                         <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedMachine.importantNotice && (
                  <div style={{ marginBottom: '1.5rem', padding: '1.25rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-lg)' }}>
                    <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', fontWeight: '700', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                      Important Notice
                    </h5>
                    <p style={{ margin: '0', fontSize: '0.75rem', color: '#7f1d1d', lineHeight: '1.5' }}>
                      {selectedMachine.importantNotice}
                    </p>
                  </div>
                )}
                
                <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#475569' }}>
                    In-House Availability: <strong style={{ color: '#d97706' }}>{selectedMachine.qty}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="machine-modal-actions">
              <Link 
                to={`/contact?type=quote&machine=${encodeURIComponent(selectedMachine.name)}`}
                className="btn btn-primary"
                onClick={() => setSelectedMachine(null)}
              >
                Inquire About Capabilities →
              </Link>
            </div>
          </div>
        </div>
      ,
    document.body
  )}

      {selectedProject && createPortal(
    
        <div 
          className="machine-modal-wrapper"
          onClick={() => { if (canCloseProject) setSelectedProject(null); }}
        >
          <div 
            className="machine-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="machine-modal-close" 
              onClick={() => { if (canCloseProject) setSelectedProject(null); }}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="machine-modal-grid">
              <div className="machine-modal-left">
                <div className="machine-modal-img-wrapper" style={{ aspectRatio: '16/10' }}>
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="machine-modal-img"
                  />
                </div>
                
                {getProjectDetails(selectedProject).specs && (
                  <div className="machine-modal-specs">
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Technical Specifications & Parameters
                    </h4>
                    {getParsedSpecs(getProjectDetails(selectedProject).specs).map((spec, i) => (
                      <div key={i} className="machine-modal-spec-item">
                        <span className="machine-modal-spec-label">{spec.label}</span>
                        <span className="machine-modal-spec-value">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="machine-modal-right">
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  <span className="badge badge-yellow">{selectedProject.industry}</span>
                  <span className="badge" style={{ background: '#f1f5f9', color: '#475569' }}>Client: {selectedProject.client}</span>
                  <span className="badge" style={{ background: '#f1f5f9', color: '#475569' }}>Year: {selectedProject.year}</span>
                </div>
                <h2 className="heading-display" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', margin: '0 0 1rem 0', color: '#0f172a', lineHeight: '1.2' }}>
                  {selectedProject.title}
                </h2>

                <div style={{ color: '#475569', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  <strong>Manufacturing Service:</strong> <span style={{ color: 'var(--yellow-600)', fontWeight: 600 }}>{selectedProject.service}</span>
                  <p style={{ marginTop: '0.5rem', color: '#64748b' }}>{selectedProject.desc}</p>
                </div>
                
                {getProjectDetails(selectedProject).materials && getProjectDetails(selectedProject).materials.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 className="machine-modal-list-title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.25rem' }}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                      Materials Utilized
                    </h4>
                    <ul className="machine-modal-list" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
                      {getProjectDetails(selectedProject).materials.map((mat, i) => (
                        <li key={i} className="machine-modal-list-item">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--yellow-600)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                          <span>{mat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {getProjectDetails(selectedProject).steps && getProjectDetails(selectedProject).steps.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 className="machine-modal-list-title" style={{ marginBottom: '1rem' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.25rem' }}><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                      Manufacturing Process
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', borderLeft: '2px solid rgba(255, 199, 44, 0.3)', paddingLeft: '1.25rem', position: 'relative', marginTop: '0.5rem' }}>
                      {getProjectDetails(selectedProject).steps.map((step, idx) => (
                        <div key={idx} style={{ position: 'relative' }}>
                          <div style={{ 
                            position: 'absolute', 
                            left: 'calc(-1.25rem - 7px - 1px)', 
                            top: '4px',
                            width: '14px', 
                            height: '14px', 
                            borderRadius: '50%', 
                            background: 'var(--yellow-500)', 
                            border: '3px solid #fff',
                            boxShadow: '0 0 0 2px rgba(255, 199, 44, 0.2)',
                            zIndex: 2 
                          }} />
                          <h5 style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', fontWeight: '700', color: '#1e293b' }}>
                            {idx + 1}. {step.name}
                          </h5>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', lineHeight: '1.45' }}>
                            {step.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="machine-modal-actions">
              <Link 
                to={`/contact?type=quote&project=${encodeURIComponent(selectedProject.title)}`}
                className="btn btn-primary"
                onClick={() => setSelectedProject(null)}
              >
                Inquire About Project Solutions →
              </Link>
            </div>
          </div>
        </div>
      ,
    document.body
  )}

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
        .proj-card { padding: 1.75rem; display: flex; flex-direction: column; gap: 0.75rem; transition: transform 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out); }
        .proj-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08); cursor: pointer; }
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

        /* Machinery Modal Styles */
        .machine-modal-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          background: rgba(4, 7, 13, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          pointer-events: auto;
        }

        .machine-modal-backdrop { display: none; }

        .machine-modal-content {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 820px;
          max-height: calc(100vh - 4rem);
          overflow-y: auto;
          margin: 0;
          position: relative;
          display: flex;
          flex-direction: column;
          z-index: 2;
          -webkit-overflow-scrolling: touch;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

                .machine-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #ffffff !important;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          color: #0f172a !important;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 100 !important;
          font-size: 0.9rem;
        }
        .machine-modal-close:hover {
          background: var(--yellow-500) !important;
          color: #000000 !important;
          transform: rotate(90deg);
        }

        .machine-modal-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          padding: 1.5rem;
        }
        @media (min-width: 768px) {
          .machine-modal-grid {
            grid-template-columns: 1fr 1.2fr;
          }
        }

        .machine-modal-img-wrapper {
          position: relative;
          width: 100%;
          max-height: 200px;
          aspect-ratio: 16/10;
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .machine-modal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .machine-modal-specs {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          background: #f8fafc;
          border: 1px solid rgba(0, 0, 0, 0.05);
          padding: 0.85rem;
          border-radius: var(--radius-md);
          margin-top: 1rem;
        }
        .machine-modal-spec-item {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px dashed rgba(0, 0, 0, 0.08);
          padding-bottom: 0.35rem;
          font-size: 0.78rem;
        }
        .machine-modal-spec-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .machine-modal-spec-label {
          color: #64748b;
          font-weight: 500;
        }
        .machine-modal-spec-value {
          color: #0f172a;
          font-weight: 600;
          text-align: right;
        }

        .machine-modal-list-title {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: #d97706;
          margin: 1.5rem 0 0.75rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        .machine-modal-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.5rem 1rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        @media (min-width: 480px) {
          .machine-modal-list {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .machine-modal-list-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: #334155;
          line-height: 1.4;
        }
        .machine-modal-list-item svg {
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .machine-modal-actions {
          display: flex;
          justify-content: flex-end;
          padding: 1.25rem 2.5rem;
          background: #f8fafc;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
        }

        .clickable-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .clickable-card:hover {
          transform: translateY(-4px);
          border-color: rgba(0, 210, 255, 0.3);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }
        .machinery-card__img-container {
          position: relative;
        }
        .machinery-card__overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(12, 19, 34, 0.75);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
        }
        .clickable-card:hover .machinery-card__overlay {
          opacity: 1;
        }
        .machinery-card__overlay-btn {
          background: var(--yellow-500);
          color: var(--gray-900);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.625rem 1.25rem;
          border-radius: var(--radius-md);
          transform: translateY(10px);
          transition: all 0.3s ease;
        }
        .clickable-card:hover .machinery-card__overlay-btn {
          transform: translateY(0);
        }
        .machinery-card__specs-preview {
          font-size: 0.8125rem;
          color: var(--gray-400);
          line-height: 1.5;
          margin: 0;
          flex: 1;
        }
        .machinery-card__more-link {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--yellow-500);
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .machinery-card__more-link::after {
          content: '';
          transition: transform 0.2s ease;
        }
        .clickable-card:hover .machinery-card__more-link::after {
          transform: translateX(3px);
        }

        /* Manufacturing Process Section Animations */
        @keyframes laser-head-move {
          0%, 100% { transform: translate(50px, 0); }
          50%      { transform: translate(150px, 0); }
        }
        @keyframes laser-beam-flicker {
          0%, 100% { stroke-width: 3.5; opacity: 1; }
          50%      { stroke-width: 1.5; opacity: 0.6; }
        }
        @keyframes spark-scatter {
          0%, 100% { transform: translate(0, 0) scale(0.6); opacity: 0.5; }
          50%      { transform: translate(0, 0) scale(1.1); opacity: 1; }
        }
        @keyframes punch-press-down {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(12px); }
        }
        @keyframes bend-sheet-metal {
          0%, 100% { d: path("M 70,80 L 165,123 L 200,135 L 235,123 L 330,80"); }
          50%      { d: path("M 70,60 L 180,105 L 200,132 L 220,105 L 330,60"); }
        }
        @keyframes spray-gun-wave {
          0%, 100% { transform: translate(60px, 110px) rotate(-10deg); }
          50%      { transform: translate(60px, 130px) rotate(15deg); }
        }
        @keyframes spray-mist-fade {
          0%   { transform: translate(45px, 5px) scale(0.6); opacity: 0; }
          50%  { opacity: 1; }
          100% { transform: translate(110px, -10px) scale(1.3); opacity: 0; }
        }
        @keyframes coat-fill-up {
          0%   { height: 0px; }
          100% { height: 80px; }
        }
        @keyframes spin-gear {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50%      { opacity: 1; transform: scale(1.03); }
        }
        @keyframes bounce-soft {
          0%, 100% { transform: translate(110px, 60px) translateY(0); }
          50%      { transform: translate(110px, 60px) translateY(-5px); }
        }

        .anim-laser-head { animation: laser-head-move 6s ease-in-out infinite; }
        .anim-laser-beam { animation: laser-beam-flicker 0.15s ease-in-out infinite; }
        .anim-sparks { animation: spark-scatter 0.12s ease-in-out infinite; }
        .anim-punch-press { animation: punch-press-down 3s ease-in-out infinite; }
        .anim-bending-sheet { animation: bend-sheet-metal 3s ease-in-out infinite; }
        .anim-spray-gun { animation: spray-gun-wave 4s ease-in-out infinite; transform-origin: 60px 110px; }
        .anim-spray-mist circle { animation: spray-mist-fade 1.5s infinite linear; }
        .anim-coat-fill { animation: coat-fill-up 4s ease-in-out infinite; }
        .anim-spin { animation: spin-gear 12s linear infinite; }
        @keyframes fillProgress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        /* Responsive Process Slider Styling */
        .process-slider-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: var(--radius-xl);
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          position: relative;
        }
        
        .process-nav-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: nowrap;
          gap: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-bottom: 1.25rem;
          margin-bottom: 2rem;
        }

        .process-stepper {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          max-width: 100%;
        }
        .process-stepper::-webkit-scrollbar {
          display: none;
        }

        .process-step-btn {
          padding: 0.5rem 0.875rem;
          height: 36px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--gray-300);
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .process-step-btn.active {
          background: var(--yellow-500);
          border-color: var(--yellow-500);
          color: #000;
        }

        .process-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          justify-content: flex-end;
          background: transparent;
        }

        .clickable-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .clickable-card:hover {
          transform: translateY(-4px);
          border-color: rgba(0, 210, 255, 0.3);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }
        .machinery-card__img-container {
          position: relative;
        }

        /* Machinery Modal Styles */
.machine-modal-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          background: rgba(4, 7, 13, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          pointer-events: auto;
        }

        .machine-modal-backdrop { display: none; }

.machine-modal-content {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 820px;
          max-height: calc(100vh - 4rem);
          overflow-y: auto;
          margin: 0;
          position: relative;
          display: flex;
          flex-direction: column;
          z-index: 2;
          -webkit-overflow-scrolling: touch;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .machinery-card__overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(12, 19, 34, 0.75);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
        }
        .clickable-card:hover .machinery-card__overlay {
          opacity: 1;
        }
        .machinery-card__overlay-btn {
          background: var(--yellow-500);
          color: var(--gray-900);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.625rem 1.25rem;
          border-radius: var(--radius-md);
          transform: translateY(10px);
          transition: all 0.3s ease;
        }
        .clickable-card:hover .machinery-card__overlay-btn {
          transform: translateY(0);
        }
        .machinery-card__specs-preview {
          font-size: 0.8125rem;
          color: var(--gray-400);
          line-height: 1.5;
          margin: 0;
          flex: 1;
        }
        .machinery-card__more-link {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--yellow-500);
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .machinery-card__more-link::after {
          content: '';
          transition: transform 0.2s ease;
        }
        .clickable-card:hover .machinery-card__more-link::after {
          transform: translateX(3px);
        }

        /* Manufacturing Process Section Animations */
        @keyframes laser-head-move {
          0%, 100% { transform: translate(50px, 0); }
          50%      { transform: translate(150px, 0); }
        }
        @keyframes laser-beam-flicker {
          0%, 100% { stroke-width: 3.5; opacity: 1; }
          50%      { stroke-width: 1.5; opacity: 0.6; }
        }
        @keyframes spark-scatter {
          0%, 100% { transform: translate(0, 0) scale(0.6); opacity: 0.5; }
          50%      { transform: translate(0, 0) scale(1.1); opacity: 1; }
        }
        @keyframes punch-press-down {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(12px); }
        }
        @keyframes bend-sheet-metal {
          0%, 100% { d: path("M 70,80 L 165,123 L 200,135 L 235,123 L 330,80"); }
          50%      { d: path("M 70,60 L 180,105 L 200,132 L 220,105 L 330,60"); }
        }
        @keyframes spray-gun-wave {
          0%, 100% { transform: translate(60px, 110px) rotate(-10deg); }
          50%      { transform: translate(60px, 130px) rotate(15deg); }
        }
        @keyframes spray-mist-fade {
          0%   { transform: translate(45px, 5px) scale(0.6); opacity: 0; }
          50%  { opacity: 1; }
          100% { transform: translate(110px, -10px) scale(1.3); opacity: 0; }
        }
        @keyframes coat-fill-up {
          0%   { height: 0px; }
          100% { height: 80px; }
        }
        @keyframes spin-gear {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50%      { opacity: 1; transform: scale(1.03); }
        }
        @keyframes bounce-soft {
          0%, 100% { transform: translate(110px, 60px) translateY(0); }
          50%      { transform: translate(110px, 60px) translateY(-5px); }
        }

        .anim-laser-head { animation: laser-head-move 6s ease-in-out infinite; }
        .anim-laser-beam { animation: laser-beam-flicker 0.15s ease-in-out infinite; }
        .anim-sparks { animation: spark-scatter 0.12s ease-in-out infinite; }
        .anim-punch-press { animation: punch-press-down 3s ease-in-out infinite; }
        .anim-bending-sheet { animation: bend-sheet-metal 3s ease-in-out infinite; }
        .anim-spray-gun { animation: spray-gun-wave 4s ease-in-out infinite; transform-origin: 60px 110px; }
        .anim-spray-mist circle { animation: spray-mist-fade 1.5s infinite linear; }
        .anim-coat-fill { animation: coat-fill-up 4s ease-in-out infinite; }
        .anim-spin { animation: spin-gear 12s linear infinite; }
        @keyframes fillProgress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        /* Responsive Process Slider Styling */
        .process-slider-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: var(--radius-xl);
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          position: relative;
        }
        
        .process-nav-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: nowrap;
          gap: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-bottom: 1.25rem;
          margin-bottom: 2rem;
        }

        .process-stepper {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          max-width: 100%;
        }
        .process-stepper::-webkit-scrollbar {
          display: none;
        }

        .process-step-btn {
          padding: 0.5rem 0.875rem;
          height: 36px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--gray-300);
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .process-step-btn.active {
          background: var(--yellow-500);
          border-color: var(--yellow-500);
          color: #000;
        }

        .process-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .process-slide-body {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 2.5rem;
        }

        @media (max-width: 991px) {
          .process-slide-body {
            grid-template-columns: 1fr;
          }
          .process-photo-col {
            order: -1;
            min-height: 220px !important;
          }
          .process-slider-card {
            padding: 1.25rem;
          }
        }

        @media (max-width: 768px) {
          .process-nav-strip {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }
          .process-controls {
            justify-content: space-between;
          }
          .process-step-btn span:last-child {
            display: none;
          }
          .process-step-btn {
            padding: 0;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            justify-content: center;
          }
        }

        /* Projects Page Hero Background */
        section.page-hero.page-hero--projects {
          background: linear-gradient(rgba(13, 13, 13, 0.72), rgba(13, 13, 13, 0.85)), url("/PROJECTS.png") no-repeat center center / cover !important;
          padding: 100px 0 50px !important;
        }
        @media (min-width: 768px) {
          section.page-hero.page-hero--projects {
            padding: 160px 0 100px !important;
          }
        }
        section.page-hero.page-hero--projects h1.heading-display {
          color: #ffffff !important;
        }
        body.modal-open .navbar {
          z-index: 99 !important;
        }
      `}</style>
    </>
  );
}
