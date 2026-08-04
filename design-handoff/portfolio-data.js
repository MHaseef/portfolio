// Shared content store for the portfolio + admin DCs. No backend — persists
// to localStorage so admin edits show up on the live portfolio (same
// browser). Cross-tab updates ride the native 'storage' event.
const KEY = 'om-portfolio-data-v1';

export const DEFAULTS = {
  hero: {
    headline: 'Spatial thinking, engineered.',
    intro: "Welcome. I'm Haseef — a GIS developer and spatial data analyst who enjoys turning raw geographic data into tools people can actually use. I build WebGIS platforms, automate spatial workflows, and dig into geospatial datasets to find patterns worth acting on.",
  },
  about: {
    bio: [
      "At my core, I'm a builder who enjoys solving puzzle-like problems.",
      "I've always been fascinated by how small, intentional design choices can completely change the way we interact with information. For me, the beauty of technical work lies in the process: peeling back layers of a problem, asking the right questions, and finding the most elegant, efficient path forward.",
      "I don't believe in overcomplicating things for the sake of it. I value clarity, precision, and building tools that make people's lives just a little bit simpler and more intuitive.",
    ],
    education: {
      degree: 'BE Geoinformatics Engineering',
      university: 'National University of Sciences and Technology, Islamabad',
      dates: '2024 — 2028',
    },
    achievements: [
      'Best Final Year Project — Spatial AI for Flood Risk Mapping',
      'Google Earth Engine certified developer',
      'Published technical writing on WebGIS architecture',
    ],
  },
  skills: [
    { id: 's1', name: 'Python', category: 'Languages & Frameworks' },
    { id: 's2', name: 'JavaScript', category: 'Languages & Frameworks' },
    { id: 's3', name: 'C++', category: 'Languages & Frameworks' },
    { id: 's4', name: 'Java', category: 'Languages & Frameworks' },
    { id: 's5', name: 'React', category: 'Languages & Frameworks' },
    { id: 's6', name: 'Astro', category: 'Languages & Frameworks' },
    { id: 's7', name: 'Angular', category: 'Languages & Frameworks' },
    { id: 's8', name: 'Node.js', category: 'Languages & Frameworks' },
    { id: 's9', name: 'Tailwind CSS', category: 'Languages & Frameworks' },
    { id: 's10', name: 'Leaflet', category: 'Tools & Platforms' },
    { id: 's11', name: 'MapLibre GL', category: 'Tools & Platforms' },
    { id: 's12', name: 'Turf.js', category: 'Tools & Platforms' },
    { id: 's13', name: 'GeoServer', category: 'Tools & Platforms' },
    { id: 's14', name: 'PostGIS', category: 'Tools & Platforms' },
    { id: 's15', name: 'QGIS', category: 'Tools & Platforms' },
    { id: 's16', name: 'Google Earth Engine', category: 'Tools & Platforms' },
    { id: 's17', name: 'Firebase', category: 'Tools & Platforms' },
    { id: 's18', name: 'Supabase', category: 'Tools & Platforms' },
    { id: 's19', name: 'Geopandas', category: 'Tools & Platforms' },
  ],
  experience: [
    { id: 'e1', title: 'GIS Developer & Analyst', company: 'GeoSpatial Solutions Pvt Ltd', location: 'Islamabad, PK', dates: '2024 — Present',
      teaser: 'Building WebGIS platforms and spatial data pipelines for municipal clients.',
      bullets: ['Architected a PostGIS + GeoServer stack serving live municipal asset data to a React/MapLibre front-end.', 'Built automated Python ETL pipelines converting shapefiles and satellite imagery into queryable spatial layers.', 'Reduced map-tile load times 60% by restructuring vector tile generation and caching.', 'Mentored two junior developers on spatial SQL and Leaflet integration.'] },
    { id: 'e2', title: 'Research Assistant, Spatial AI Lab', company: 'NUST', location: 'Islamabad, PK', dates: '2023 — 2024',
      teaser: 'Applied remote sensing and machine learning to land-cover change detection.',
      bullets: ['Trained land-cover classification models on Sentinel-2 imagery using Google Earth Engine and Python.', 'Co-authored a workflow for flood-risk prediction combining DEM analysis with historical rainfall data.', 'Presented findings at the department research symposium.'] },
    { id: 'e3', title: 'WebGIS Intern', company: 'Survey of Pakistan', location: 'Rawalpindi, PK', dates: '2022 — 2023',
      teaser: 'Digitized cadastral records and built internal mapping tools.',
      bullets: ['Digitized legacy cadastral maps into PostGIS-backed spatial datasets.', 'Built an internal Leaflet-based viewer for field surveyors to validate parcel boundaries.', 'Assisted senior GIS analysts with coordinate system transformations and QA workflows.'] },
  ],
  projects: [
    { id: 'p1', title: 'UrbanFlow', category: 'WebGIS', teaser: 'Real-time transit mapping platform tracking city bus routes and delays.', tags: ['Leaflet', 'PostGIS', 'React', 'Node.js'],
      problem: 'Commuters had no reliable way to see live bus positions or delays across the city transit network.',
      solution: 'Built a Node.js service ingesting GPS pings into PostGIS, exposed via a tiled API, rendered live on a Leaflet front-end with sub-5-second refresh.',
      demoUrl: 'https://example.com', githubUrl: 'https://github.com/yourhandle/p1' },
    { id: 'p2', title: 'TerraWatch', category: 'Spatial AI', teaser: 'Satellite land-cover change detector for agricultural monitoring.', tags: ['Google Earth Engine', 'Python', 'Geopandas', 'MapLibre GL'],
      problem: 'Regional agencies lacked an accessible way to monitor deforestation and land-use change over time.',
      solution: 'Combined Earth Engine time-series analysis with a Python/Geopandas backend, surfacing change heatmaps on a MapLibre GL viewer.',
      demoUrl: 'https://example.com', githubUrl: 'https://github.com/yourhandle/p2' },
    { id: 'p3', title: 'GeoServe Analytics', category: 'WebGIS', teaser: 'Municipal asset management WebGIS for utility infrastructure.', tags: ['GeoServer', 'PostGIS', 'Angular', 'Java'],
      problem: 'A municipal utility tracked infrastructure assets across disconnected spreadsheets and paper maps.',
      solution: 'Delivered a GeoServer/PostGIS backend with an Angular dashboard for asset lifecycle tracking and map-based inspection scheduling.',
      demoUrl: 'https://example.com', githubUrl: 'https://github.com/yourhandle/p3' },
    { id: 'p4', title: 'FloodRisk AI', category: 'Spatial AI', teaser: 'Predictive flood risk mapping using terrain and rainfall data.', tags: ['Remote Sensing', 'Python', 'Turf.js', 'Firebase'],
      problem: 'Flood-prone districts had no forward-looking risk model to guide evacuation planning.',
      solution: 'Fused DEM-derived terrain features with rainfall forecasts in a Python model, serving risk zones through Firebase to a Turf.js-powered map client.',
      demoUrl: 'https://example.com', githubUrl: 'https://github.com/yourhandle/p4' },
    { id: 'p5', title: 'CampusNav', category: 'WebGIS', teaser: 'Indoor/outdoor wayfinding app for a university campus.', tags: ['MapLibre GL', 'React', 'Supabase', 'JavaScript'],
      problem: 'New students struggled to navigate a sprawling campus with mixed indoor/outdoor routes.',
      solution: 'Built a React + MapLibre GL wayfinding app with Supabase-backed routing graphs spanning indoor floor plans and outdoor paths.',
      demoUrl: 'https://example.com', githubUrl: 'https://github.com/yourhandle/p5' },
    { id: 'p6', title: 'AgriSense', category: 'Spatial AI', teaser: 'Crop health monitoring dashboard using satellite vegetation indices.', tags: ['QGIS', 'Google Earth Engine', 'Astro', 'Python'],
      problem: 'Smallholder farmers lacked affordable tools to catch crop stress before yield loss.',
      solution: 'Automated NDVI extraction via Earth Engine, processed in Python, published to an Astro dashboard for weekly field health reports.',
      demoUrl: 'https://example.com', githubUrl: 'https://github.com/yourhandle/p6' },
  ],
  blogs: [
    { id: 'b1', category: 'MAPPING', date: 'Jun 2026', title: 'Building Real-Time Tile Pipelines with MapLibre GL', excerpt: 'How to structure a vector tile pipeline that keeps up with live-updating spatial data.', readTime: '7 min' },
    { id: 'b2', category: 'BACKEND', date: 'May 2026', title: 'From Shapefile to API: Serving Spatial Data with GeoServer & PostGIS', excerpt: 'A practical walkthrough of standing up a production-grade spatial data service.', readTime: '9 min' },
    { id: 'b3', category: 'SPATIAL AI', date: 'Apr 2026', title: 'Detecting Land-Cover Change with Google Earth Engine + Python', excerpt: 'Combining Earth Engine time-series queries with a Python analysis layer.', readTime: '11 min' },
    { id: 'b4', category: 'FRONTEND', date: 'Mar 2026', title: 'Turf.js Recipes for Client-Side Spatial Analysis', excerpt: 'Buffer, intersect, and route entirely in the browser — no backend round-trip.', readTime: '6 min' },
  ],
  contact: {
    email: 'hello@haseef.gis',
    github: 'https://github.com/yourhandle',
    linkedin: 'https://linkedin.com/in/yourhandle',
  },
};

function deepClone(v) { return JSON.parse(JSON.stringify(v)); }

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return deepClone(DEFAULTS);
    const parsed = JSON.parse(raw);
    // Shallow-merge top-level keys so a partially-saved blob (or a schema
    // upgrade) still fills in any missing section from defaults.
    return Object.assign(deepClone(DEFAULTS), parsed);
  } catch (e) {
    return deepClone(DEFAULTS);
  }
}

export function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('portfolio-data-updated'));
  } catch (e) {}
}

export function resetToDefaults() {
  try { localStorage.removeItem(KEY); } catch (e) {}
  window.dispatchEvent(new CustomEvent('portfolio-data-updated'));
}

export function uid(prefix) {
  return prefix + '-' + Math.random().toString(36).slice(2, 9);
}
