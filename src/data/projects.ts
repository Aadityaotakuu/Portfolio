export type ProjectLink = {
  github: string
  demo: string
}

export type Project = {
  status?: 'live' | 'in-progress' | 'archived'
  id: string
  title: string
  subtitle: string
  description: string
  problem: string
  impact: string
  icon: string
  features: string[]
  tech: string[]
  highlight: string
  tags: string[]
  category: string
  year: number
  links: ProjectLink
}

export const projects: Project[] = [
  {
    id: 'nirogya',
    icon: '🏥',
    title: 'Nirogya',
    subtitle: 'Smart Health Surveillance System',
    description:
      'Smart health surveillance and early warning system for water-borne diseases, combining dashboards, disease mapping, symptom reporting, water quality monitoring, and ML prediction.',
    problem:
      'Water-borne disease outbreaks in India cause thousands of preventable deaths annually due to lack of real-time surveillance and early warning systems at the district level.',
    impact:
      'Built for Smart India Hackathon — enables district health officers to detect outbreaks 2-3 weeks earlier through predictive analytics and real-time symptom reporting from the field.',
    features: [
      'Real-time dashboards with public health analytics',
      'Disease mapping with symptom reporting and heat layers',
      'Water quality monitoring with alert thresholds',
      'ML-based early warning predictions for outbreaks',
    ],
    tech: ['React + TypeScript', 'FastAPI', 'Leaflet', 'Chart.js', 'CatBoost ML'],
    highlight: 'Smart India Hackathon project',
    tags: ['AI', 'Public Health', 'Mapping', 'IoT Simulation'],
    category: 'HealthTech',
    year: 2023,
    links: {
      github: 'https://github.com/yourusername/nirogya',
      demo: 'https://nirogya.demo',
    },
  },
  {
    id: 'annam',
    icon: '🍱',
    title: 'ANNAM',
    subtitle: 'Food Rescue Platform',
    description:
      'Multi-role system connecting farmers, NGOs, drivers, and customers with ML-driven shelf life prediction, auto-donation, delivery tracking, and impact metrics.',
    problem:
      'India wastes 68 million tonnes of food annually while 190 million go hungry. There is no efficient system to connect surplus food with those who need it most.',
    impact:
      'Reduced food waste by automating donation workflows — ML shelf-life prediction prevents spoilage, while real-time logistics ensures food reaches NGOs within safe consumption windows.',
    features: [
      'Role-based portal for donors, NGOs, drivers, and customers',
      'ML-based shelf life prediction and auto-donation logic',
      'Delivery tracking with real-time impact metrics',
      'Background schedulers for automated operations',
    ],
    tech: ['React', 'FastAPI', 'MongoDB', 'Twilio', 'ML'],
    highlight: 'Scalable architecture with background schedulers',
    tags: ['Logistics', 'AI', 'Marketplace', 'Impact'],
    category: 'Logistics',
    year: 2023,
    links: {
      github: 'https://github.com/Aadityaotakuu/Annam.git',
      demo: 'https://annam.demo',
    },
  },
  {
    id: 'coderedai',
    icon: '🚨',
    title: 'CodeRedAI',
    subtitle: 'Emergency Dispatch System',
    description:
      'Emergency coordination platform for hospitals and ambulances, enabling real-time dispatch, geospatial matching, and WhatsApp integration.',
    problem:
      'In emergencies, the average ambulance response time in India exceeds 30 minutes due to manual coordination between hospitals, ambulances, and patients.',
    impact:
      'Automated geospatial matching reduces dispatch time to under 3 minutes. WhatsApp integration ensures instant alerts reach all stakeholders in the chain.',
    features: [
      'Real-time dispatch operations with mission lifecycle tracking',
      'Geospatial matching for hospitals and ambulances',
      'WhatsApp integration for urgent alerts',
      'Operational dashboards for live coordination',
    ],
    tech: ['React', 'FastAPI', 'MongoDB', 'Mapbox'],
    highlight: 'Mission lifecycle system with real-time coordination',
    tags: ['Real-time Systems', 'Maps', 'Emergency Tech'],
    category: 'HealthTech',
    year: 2024,
    links: {
      github: 'https://github.com/Aadityaotakuu/Codered.git',
      demo: 'https://coderedai.demo',
    },
  },
  {
    id: 'learnify',
    icon: '📚',
    title: 'Learnify',
    subtitle: 'Online Learning Platform',
    description:
      'Streamlit-based LMS featuring quizzes, course flow, PDF certificate generation, and an analytics dashboard.',
    problem:
      'Small educators and trainers lack affordable LMS tools with built-in assessment, certification, and analytics — most platforms are expensive and over-engineered.',
    impact:
      'Provides a lightweight, deployable LMS that any educator can self-host. Automated certificate generation and analytics reduce admin overhead by 80%.',
    features: [
      'Structured course flow with interactive quizzes',
      'Automated PDF certificate generation',
      'Learner analytics and progress dashboards',
      'Lightweight UI optimized for quick delivery',
    ],
    tech: ['Python', 'Streamlit', 'Plotly'],
    highlight: 'EdTech platform with built-in analytics',
    tags: ['EdTech', 'UI', 'Analytics'],
    category: 'EdTech',
    year: 2023,
    links: {
      github: 'https://github.com/yourusername/learnify',
      demo: 'https://learnify.demo',
    },
  },
  {
    id: 'startup-predictor',
    icon: '📊',
    title: 'Startup Success Predictor',
    subtitle: 'ML Outcome Intelligence',
    description:
      'ML-powered app predicting startup success with probability insights, feature impact visualization, and recommendations.',
    problem:
      'Founders and investors make high-stakes decisions with limited data. There is no accessible tool that quantifies startup success probability based on key factors.',
    impact:
      'Provides explainable ML predictions with actionable recommendations — founders can identify which factors most influence their success probability and optimize accordingly.',
    features: [
      'Probability prediction with explainable outputs',
      'Feature impact visualization for founders',
      'Actionable recommendations based on inputs',
      'Fast, responsive UI for investor demos',
    ],
    tech: ['React', 'FastAPI', 'Logistic Regression'],
    highlight: 'Data-driven recommendations for founders',
    tags: ['AI', 'Data Science', 'Prediction'],
    category: 'AI/ML',
    year: 2024,
    links: {
      github: 'https://github.com/Aadityaotakuu/Startup.git',
      demo: 'https://startup-predictor.demo',
    },
  },
]
