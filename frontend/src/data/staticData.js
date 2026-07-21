// Static data for when API is not yet seeded
export const SERVICES_DATA = [
  {
    id: 1,
    slug: 'laser-cutting',
    title: 'Laser Cutting Services',
    tagline: 'High-Precision 2D & 3D Laser Cutting',
    icon: '✂',
    description: 'Advanced laser cutting for a wide range of metals including stainless steel, carbon steel, and aluminum. Delivering clean, burr-free cuts with exceptional dimensional accuracy.',
    applications: 'Sheet metal components, structural profiles, custom brackets, automotive parts',
    video: '/videos/services page video/Laser Cutting Services.mp4',
    color: '#FFC72C',
  },
  {
    id: 2,
    slug: 'cnc-bending-forming',
    title: 'CNC Bending & Forming',
    tagline: 'Precision Metal Folding & Press Brake Solutions',
    icon: '📐',
    description: 'High-accuracy CNC press brake bending and forming. We work with various sheet thicknesses and complex bend profiles to ensure structural integrity and perfect fitting.',
    applications: 'Chassis parts, custom enclosures, panels, brackets, structural channels',
    video: '/videos/services page video/CNC Bending.mp4',
    color: '#FFC72C',
  },
  {
    id: 3,
    slug: 'fabrication-assembly',
    title: 'Fabrication & Assembly',
    tagline: 'High-Strength Structural Welding (MIG/TIG) & Precision Assembly',
    icon: '⚡',
    description: 'Expert welding services using MIG and TIG processes, coupled with mechanical assembly. Delivering highly durable joints and precise alignment for structural components.',
    applications: 'Welding jigs, fixtures, operator desks, industrial frames, machine bases',
    image: '/images/fabrication-assembly.png',
    color: '#FFC72C',
  },
  {
    id: 4,
    slug: 'precision-sheet-metal',
    title: 'Precision Sheet Metal Solutions',
    tagline: 'Custom Tolerances & End-to-End Solutions',
    icon: '🎛',
    description: 'Comprehensive sheet metal processing from design optimization to final fabrication. Tailored to meet tight tolerances for industrial and control applications.',
    applications: 'Control panels, operator cabins, enclosures, automation cabinets',
    image: '/images/precision-sheet-metal.png',
    color: '#FFC72C',
  },
  {
    id: 5,
    slug: 'custom-metal-fabrication',
    title: 'Custom Metal Fabrication',
    tagline: 'Raw Material to Finished Assembly',
    icon: '🏗',
    description: 'Full-cycle fabrication workflow: raw material sawing → laser cutting → bending → welding → EOT crane-assisted heavy assembly. We manage the entire pipeline from scratch.',
    applications: 'Heavy machinery frames, large structural works, conveyor components, material handling equipment',
    video: '/videos/services page video/Bandsaw Metal Cutting.mp4',
    color: '#FFC72C',
  },
];

export const STATS_DATA = [
  { label: 'Promoter Experience', value: 5, suffix: ' Yrs+' },
  { label: 'Established', value: 2019, suffix: '' },
  { label: 'Manufacturing Facility', value: 1, suffix: '' },
  { label: 'Client Satisfaction', value: 100, suffix: '%' },
];

export const CERTIFICATIONS_DATA = [];

export const INDUSTRIES = [
  { name: 'Aerospace', key: 'aerospace' },
  { name: 'Control Panels', key: 'control-panels' },
  { name: 'Medical Devices', key: 'medical-devices' },
  { name: 'Material Handling', key: 'material-handling' },
  { name: 'Industrial Automation', key: 'industrial-automation' },
  { name: 'Automotive', key: 'automotive' },
  { name: 'Heavy Infrastructure', key: 'heavy-infrastructure' },
];

export const FACILITIES = [
  { id: 1, name: 'Headquarters & Main Plant', city: 'Bangalore', state: 'Karnataka', is_headquarters: true },
  { id: 2, name: 'Aerospace Division', city: 'Bangalore', state: 'Karnataka', is_headquarters: false },
  { id: 3, name: 'North India Plant', city: 'Pune', state: 'Maharashtra', is_headquarters: false },
  { id: 4, name: 'West India Facility', city: 'Ahmedabad', state: 'Gujarat', is_headquarters: false },
  { id: 5, name: 'South India Service Centre', city: 'Chennai', state: 'Tamil Nadu', is_headquarters: false },
  { id: 6, name: 'East India Plant', city: 'Hyderabad', state: 'Telangana', is_headquarters: false },
  { id: 7, name: 'NCR Logistics Hub', city: 'Gurugram', state: 'Haryana', is_headquarters: false },
];
