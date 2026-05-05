export type ProjectLink = {
  github?: string
  demo?: string
}

export type ProjectPreview = {
  label: string
  metric: string
  accent: string
  secondary: string
}

export type Project = {
  status?: 'live' | 'in-progress' | 'archived'
  id: string
  title: string
  subtitle: string
  summary: string
  description: string
  problem: string
  impact: string
  contribution: string
  uiOverview?: string
  systemBehavior?: string
  confidentiality?: string
  icon: string
  features: string[]
  tech: string[]
  highlight: string
  tags: string[]
  category: string
  year: number
  links?: ProjectLink
  preview?: ProjectPreview
}

export const projects: Project[] = [
  {
    id: 'nirogya',
    icon: '🏥',
    title: 'Nirogya',
    subtitle: 'Smart Health Surveillance System',
    summary: 'District-level public health command center for early outbreak detection.',
    description:
      'Smart health surveillance and early warning system for water-borne diseases, combining dashboards, disease mapping, symptom reporting, water quality monitoring, and ML prediction.',
    problem:
      'Water-borne disease outbreaks cause preventable deaths due to lack of real-time surveillance and early warning at the district level.',
    impact:
      'Built for Smart India Hackathon - enables district health officers to detect outbreaks 2-3 weeks earlier through predictive analytics and real-time symptom reporting.',
    contribution:
      'Led frontend architecture and UX flows, built dashboards and map-based insights, and translated ML risk signals into actionable UI states.',
    uiOverview:
      'Operator-focused layout with alert lanes, map heat layers, and drill-down trend panels for quick field response.',
    systemBehavior:
      'Streams symptom reports and water quality data, scores risk, and flags districts with escalating signals.',
    confidentiality: 'Hackathon Project',
    features: [
      'Real-time dashboards with public health analytics',
      'Disease mapping with symptom reporting and heat layers',
      'Water quality monitoring with alert thresholds',
      'ML-based early warning predictions for outbreaks',
    ],
    tech: ['React + TypeScript', 'FastAPI', 'Leaflet', 'Chart.js', 'CatBoost ML'],
    highlight: 'Built for district-level outbreak response workflows',
    tags: ['Public Health', 'Mapping', 'Analytics', 'ML'],
    category: 'HealthTech',
    year: 2023,
    preview: {
      label: 'District Ops Dashboard',
      metric: '2-3 week early signals',
      accent: '#38bdf8',
      secondary: '#f59e0b',
    },
  },
  {
    id: 'annam',
    icon: '🍱',
    title: 'ANNAM',
    subtitle: 'Food Rescue Platform',
    summary: 'Food rescue logistics platform connecting donors, NGOs, drivers, and beneficiaries.',
    description:
      'Multi-role system connecting farmers, NGOs, drivers, and customers with ML-driven shelf life prediction, auto-donation, delivery tracking, and impact metrics.',
    problem:
      'Surplus food lacks a fast, coordinated pathway to reach NGOs before spoilage.',
    impact:
      'Automated donation workflows and live logistics reduce waste while improving safe delivery to NGOs.',
    contribution:
      'Built the multi-role React interface, designed workflow states, and integrated tracking and analytics views.',
    features: [
      'Role-based portal for donors, NGOs, drivers, and customers',
      'ML-based shelf life prediction and auto-donation logic',
      'Delivery tracking with real-time impact metrics',
      'Background schedulers for automated operations',
    ],
    tech: ['React', 'FastAPI', 'MongoDB', 'Twilio', 'ML'],
    highlight: 'Scalable architecture with automated logistics routing',
    tags: ['Logistics', 'Impact', 'Marketplace', 'Analytics'],
    category: 'Logistics',
    year: 2023,
    links: {
      github: 'https://github.com/aaditya95-parab/Annam.git',
    },
    preview: {
      label: 'Rescue Logistics UI',
      metric: 'Auto-routing + tracking',
      accent: '#14b8a6',
      secondary: '#facc15',
    },
  },
  {
    id: 'coderedai',
    icon: '🚨',
    title: 'CodeRedAI',
    subtitle: 'Emergency Dispatch System',
    summary: 'Emergency coordination platform for hospitals and ambulances with live dispatch.',
    description:
      'Emergency coordination platform for hospitals and ambulances, enabling real-time dispatch, geospatial matching, and WhatsApp integration.',
    problem:
      'Ambulance response times are delayed by manual coordination between hospitals, ambulances, and patients.',
    impact:
      'Geospatial matching and automated alerts reduce dispatch time to under 3 minutes.',
    contribution:
      'Designed the dispatch UI, built map and status workflows, and optimized clarity for emergency operators.',
    features: [
      'Real-time dispatch operations with mission lifecycle tracking',
      'Geospatial matching for hospitals and ambulances',
      'WhatsApp integration for urgent alerts',
      'Operational dashboards for live coordination',
    ],
    tech: ['React', 'FastAPI', 'MongoDB', 'Mapbox'],
    highlight: 'Mission lifecycle system with real-time coordination',
    tags: ['Real-time', 'Maps', 'Emergency Tech'],
    category: 'HealthTech',
    year: 2024,
    links: {
      github: 'https://github.com/aaditya95-parab/Codered.git',
    },
    preview: {
      label: 'Emergency Dispatch UI',
      metric: '<3 min dispatch',
      accent: '#f97316',
      secondary: '#22c55e',
    },
  },
  {
    id: 'learnify',
    icon: '📚',
    title: 'Learnify',
    subtitle: 'Online Learning Platform',
    summary: 'Lightweight LMS with quizzes, certificates, and analytics for educators.',
    description:
      'Streamlit-based LMS featuring quizzes, course flow, PDF certificate generation, and an analytics dashboard.',
    problem:
      'Small educators lack affordable LMS tools with built-in assessment, certification, and analytics.',
    impact:
      'Delivers a self-hosted LMS that reduces admin overhead with automated certificates and progress analytics.',
    contribution:
      'Crafted the learner experience, quiz flows, and certificate UI; focused on clarity and rapid delivery.',
    uiOverview:
      'Course overview dashboard with progress cards, quick quizzes, and a one-click certificate flow.',
    systemBehavior:
      'Tracks progress per module, unlocks quizzes sequentially, and generates certificates after completion.',
    confidentiality: 'Academic Project',
    features: [
      'Structured course flow with interactive quizzes',
      'Automated PDF certificate generation',
      'Learner analytics and progress dashboards',
      'Lightweight UI optimized for quick delivery',
    ],
    tech: ['Python', 'Streamlit', 'Plotly'],
    highlight: 'EdTech platform with built-in analytics',
    tags: ['EdTech', 'UX', 'Analytics'],
    category: 'EdTech',
    year: 2023,
    preview: {
      label: 'Learning Experience',
      metric: 'Self-serve LMS',
      accent: '#60a5fa',
      secondary: '#f59e0b',
    },
  },
  {
    id: 'startup-predictor',
    icon: '📊',
    title: 'Startup Success Predictor',
    subtitle: 'ML Outcome Intelligence',
    summary: 'Explainable ML dashboard that scores startup success probability.',
    description:
      'ML-powered app predicting startup success with probability insights, feature impact visualization, and recommendations.',
    problem:
      'Founders and investors make decisions with limited data and lack clear probability signals.',
    impact:
      'Delivers explainable predictions and recommendations to guide better strategic choices.',
    contribution:
      'Built responsive analytics UI, feature impact visuals, and investor-ready reports.',
    features: [
      'Probability prediction with explainable outputs',
      'Feature impact visualization for founders',
      'Actionable recommendations based on inputs',
      'Fast, responsive UI for investor demos',
    ],
    tech: ['React', 'FastAPI', 'Logistic Regression'],
    highlight: 'Data-driven recommendations for founders',
    tags: ['ML', 'Data', 'Analytics'],
    category: 'AI/ML',
    year: 2024,
    links: {
      github: 'https://github.com/aaditya95-parab/Startup.git',
    },
    preview: {
      label: 'Investor Analytics',
      metric: 'Explainable ML scores',
      accent: '#22c55e',
      secondary: '#38bdf8',
    },
  },
]
