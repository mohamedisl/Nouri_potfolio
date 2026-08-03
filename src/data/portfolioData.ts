import { SkillCategory, Project, TimelineItem, AIQuestionAnswer } from '../types';

export const PROFILE_DATA = {
  fullName: "NOURI Mohammed Islam",
  displayName: "Mohammed Islam NOURI",
  role: "AI Engineer – IT Systems, Web Developer",
  tagline: "Computer Engineering specialization in Deep Learning, Computer Vision, Cisco Networking, and Full-Stack MERN Development.",
  bio: "AI Engineer, Data Analyst, Computer Vision, and Full-Stack Developer with a strong background in Machine Learning, Deep Learning, and Software Engineering. Experienced in analyzing and transforming data into actionable insights using Python, SQL, and data visualization, while also building intelligent vision systems and AI-powered web applications with PyTorch, TensorFlow, OpenCV, YOLO, React, Node.js, and MongoDB Passionate about solving real-world problems through data and AI, with a particular interest in medical AI, computer vision, and scalable software development. Always eager to collaborate on innovative projects, leverage data-driven decision-making, and contribute to advancing Artificial Intelligence.",
  email: "nouri.mohammed.islam@gmail.com",
  github: "https://github.com/nouri-mohammed-islam",
  linkedin: "https://linkedin.com/in/nouri-mohammed-islam",
  twitter: "https://x.com/Nouri_mohaa",
  location: "Available for Global & Remote Roles",
  // Default high-quality AI Engineer portrait placeholder (can be customized or uploaded in UI)
  defaultPicture: "/images/nouri.jpg",
  // Alternative avatars for quick preview testing in the UI
  presetPictures: [
    {
      id: 'cyber-eng',
      label: 'Tech Studio Portrait',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'ai-workspace',
      label: 'Developer Workspace',
      url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'minimal-dark',
      label: 'Minimalist Monolith',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
    }
  ],
  stats: [
    { label: "Computer Engineer", value: "100%", percentage: 100, iconName: "GraduationCap", subtitle: "Data Science & AI" },
    { label: "AI & Vision Projects", value: "10+", percentage: 85, iconName: "Cpu", subtitle: "Deep Learning & XAI" }
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'ai',
    title: 'AI & Computer Vision',
    badge: 'Deep Learning & XAI',
    description: 'Developing AI systems for medical image analysis, emotion recognition, CNN architectures, and Explainable AI.',
    color: 'emerald',
    iconName: 'Cpu',
    skills: [
      { name: 'PyTorch', level: 'Advanced', category: 'ai' },
      { name: 'TensorFlow / Keras', level: 'Advanced', category: 'ai' },
      { name: 'OpenCV & YOLO', level: 'Advanced', category: 'ai' },
      { name: 'CNN Architectures', level: 'Advanced', category: 'ai' },
      { name: 'Explainable AI (XAI / Grad-CAM)', level: 'Advanced', category: 'ai' },
      { name: 'Generative AI & LLM Usage', level: 'Advanced', category: 'ai' },
      { name: 'Prompt Engineering', level: 'Advanced', category: 'ai' },
    ]
  },
  // {
  //   id: 'web',
  //   title: 'Networking & IT Systems',
  //   badge: 'Infrastructure & Cisco',
  //   description: 'Cisco configuration, SIL-3 industrial safety systems, data center infrastructure, and PLC programming.',
  //   color: 'cyan',
  //   iconName: 'Code2',
  //   skills: [
  //     { name: 'Cisco Switches & Configuration', level: 'Advanced', category: 'web' },
  //     { name: 'Triconex SIL-3 Safety Systems', level: 'Advanced', category: 'web' },
  //     { name: 'Fiber Optic & Network Troubleshooting', level: 'Advanced', category: 'web' },
  //     { name: 'PLC Programming (TIA Portal)', level: 'Advanced', category: 'web' },
  //     { name: 'Data Center Infrastructure', level: 'Advanced', category: 'web' },
  //     { name: 'Embedded Systems Integration', level: 'Advanced', category: 'web' }
  //   ]
  // },
  {
    id: 'tools',
    title: 'Programming, Web & Data',
    badge: 'MERN Stack & Analytics',
    description: 'Full-stack MERN web apps, data analytics with Python/Tableau/Power BI, and UI/UX design.',
    color: 'blue',
    iconName: 'Code2',
    skills: [
      { name: 'Python (Advanced)', level: 'Expert', category: 'tools' },
      { name: 'MERN Stack (MongoDB, Express, React, Node.js)', level: 'Advanced', category: 'tools' },
      { name: 'C, Java & JavaScript', level: 'Advanced', category: 'tools' },
      { name: 'Pandas & NumPy', level: 'Advanced', category: 'tools' },
      { name: 'Tableau & Power BI', level: 'Advanced', category: 'tools' },
      { name: 'Figma (UI/UX) & Adobe Suite', level: 'Advanced', category: 'tools' },
      { name: 'Git', level: 'Advanced', category: 'tools' },
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'diabetic-retinopathy',
    title: 'AI System for Early Detection of Diabetic Retinopathy',
    subtitle: 'Deep learning retinal lesion detection & classification pipeline with XAI',
    description: 'Designed an advanced deep learning pipeline for early retinal lesion detection and classification with Explainable AI (XAI) for clinical transparency and interpretability. Annotated high-resolution medical dataset using MakeSense to ensure high-quality ground truth.',
    category: 'ai',
    image: '/images/DR.png',
    tags: ['PyTorch', 'TensorFlow', 'XAI / Grad-CAM', 'CNN Architectures', 'Computer Vision', 'Medical Imaging'],
    githubUrl: 'https://github.com/nouri-mohammed-islam/diabetic-retinopathy-xai',
    featured: true,
    stats: [
      { label: 'Diagnostic Recall', value: '96.8%' },
      {label : 'Detection Statistical probability', value :'99%'},
      { label: 'classfication accuracy', value: '85%' },
      { label: 'Macro AUC ROC', value: '94.92 %' },
      { label: 'Annotated Lesions', value: '3,500+' }
    ],
    architecture: {
      summary: 'End-to-end medical computer vision pipeline leveraging convolutional neural networks with integrated Grad-CAM visual explanations for clinical interpretability.',
      techStack: ['PyTorch', 'TensorFlow / Keras', 'OpenCV', 'MakeSense', 'Python', 'NumPy'],
      pipeline: [
        { step: '1. Data Annotation & Preprocessing', description: 'Curated and annotated clinical fundus photographs using MakeSense with strict ground-truth lesion boundaries.' },
        { step: '2. CNN Lesion Classifier', description: 'Trained deep CNN architectures with data augmentation and class imbalance handling for multi-stage retinopathy classification.' },
        { step: '3. XAI Interpretability Layer', description: 'Integrated Grad-CAM and saliency maps to highlight specific retinal lesions (microaneurysms, hemorrhages) guiding clinical diagnosis.' }
      ],
      keyChallenges: [
        'Addressing class imbalance in early-stage retinopathy samples through synthetic data augmentation.',
        'Providing interpretable visual heatmaps that clinicians can verify against standard ophthalmic diagnostic criteria.'
      ]
    }
  },
  {
    id: 'emotion-detection',
    title: 'Emotion Detection System',
    subtitle: 'Real-time facial emotion recognition CNN trained on FER-2013',
    description: 'Built a real-time CNN-based facial emotion recognition system trained on the FER-2013 dataset using TensorFlow and Keras, capable of classifying 7 distinct human emotional states with live webcam feed processing.',
    category: 'ai',
    image: '/images/emotion.png',
    tags: ['TensorFlow', 'Keras', 'OpenCV', 'CNN', 'FER-2013', 'Real-Time Vision'],
    githubUrl: 'https://github.com/nouri-mohammed-islam/emotion-detection-cnn',
    featured: true,
    stats: [
      { label: 'Emotion Classes', value: '7 Emotions' },
      { label: 'Webcam FPS', value: '60+ FPS' },
      { label: 'FER-2013 Acc.', value: '89%' }
    ],
    architecture: {
      summary: 'High-speed real-time computer vision system that extracts facial bounding boxes via OpenCV and classifies emotional expressions frame-by-frame.',
      techStack: ['TensorFlow', 'Keras', 'OpenCV', 'Python', 'NumPy', 'Matplotlib'],
      pipeline: [
        { step: '1. Face Detection & Cropping', description: 'Detects facial regions in live video frames and normalizes them to 48x48 grayscale matrices.' },
        { step: '2. Deep CNN Inference', description: 'Passes normalized tensors through a deep convolutional network with batch normalization and dropout layers.' },
        { step: '3. Emotion Probability Overlay', description: 'Renders bounding boxes and softmax confidence distributions over real-time video stream.' }
      ],
      keyChallenges: [
        'Optimizing CNN inference speed for smooth real-time video processing without frame drops.',
        'Mitigating lighting variation and head pose rotation artifacts in live webcam conditions.'
      ]
    }
  },
  {
    id: 'volontech',
    title: 'تطوع – Intelligent Volunteering Platform',
    subtitle: 'AI recommendation engine matching volunteers to NGOs by skills & location',
    description: 'Implemented an intelligent volunteering web platform powered by an AI recommendation engine that matches volunteers to non-governmental organizations (NGOs) based on skill compatibility, geolocation, and mission preferences.',
    category: 'hybrid',
    image: '/images/tawa3.png',
    tags: ['MERN Stack', 'AI Recommendation Engine', 'React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    githubUrl: 'https://github.com/nouri-mohammed-islam/volontech-platform',
    demoUrl: 'https://volontech.example.com',
    featured: true,
    stats: [
      { label: 'Matching Accuracy', value: '94.5%' },
      { label: 'Response Time', value: '<80ms' },
      { label: 'Platform Stack', value: 'MERN + AI' }
    ],
    architecture: {
      summary: 'Full-stack MERN web application with an integrated machine learning recommendation service that scores volunteer profiles against NGO opportunity requirements.',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Python ML API', 'Tailwind CSS'],
      pipeline: [
        { step: '1. Skill & Profile Indexing', description: 'Volunteers input structured technical/interpersonal skills and geographical availability.' },
        { step: '2. Cosine Similarity & Location Matching', description: 'Engine computes weighted similarity scores between volunteer vectors and active NGO mission requirements.' },
        { step: '3. Interactive Opportunity Feed', description: 'React frontend dynamically renders personalized opportunity cards with match percentage indicators.' }
      ],
      keyChallenges: [
        'Designing a hybrid recommendation algorithm balancing skills relevance with physical location proximity.',
        'Creating a responsive, accessible interface suitable for diverse volunteer demographics.'
      ]
    }
  },
  {
    id: 'abwab',
    title: ' بوابتك الجامعية',
    subtitle: 'Your Gateway to the Right University Major',
    description: 'An intelligent platform that empowers new Baccalaureate graduates to explore university programs, compare specialties, and confidently choose the academic path that best matches their interests and career goals.',
    category: 'web',
    image: '/images/abwab2.png',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    demoUrl: 'https://abwab-eight.vercel.app/',
    featured: true,
    stats: [
      { label: 'Matching Accuracy', value: '94.5%' },
      { label: 'Response Time', value: '<80ms' },
      { label: 'Platform Stack', value: 'React + TS' }
    ]
  },
  {
    id: 'diabetes-prediction',
    title: 'Diabetes Prediction System',
    subtitle: 'ML risk profile prediction models for preventive healthcare decision support',
    description: 'An interactive healthcare decision support web application that applies supervised machine learning models to predict patient diabetes risk profiles based on diagnostic biomarkers, empowering preventive healthcare decision support.',
    category: 'ai',
    image: '/images/diabetes.png',
    tags: ['Python ML', 'React', 'Node.js', 'Scikit-Learn', 'Pandas & NumPy', 'Power BI'],
    githubUrl: 'https://github.com/nouri-mohammed-islam/diabetes-prediction-system',
    demoUrl: 'https://github.com/nouri-mohammed-islam/diabetes-prediction-system',
    featured: true,
    stats: [
      { label: 'Prediction Accuracy', value: '88.6%' },
      { label: 'Biomarkers Analyzed', value: '8 Features' },
      { label: 'Decision Support', value: 'Instant' }
    ],
    architecture: {
      summary: 'Full-stack predictive analytics dashboard combining data preprocessing pipelines in Pandas/NumPy with interactive React visualizations.',
      techStack: ['Python', 'Scikit-Learn', 'React', 'Node.js', 'Pandas', 'Power BI'],
      pipeline: [
        { step: '1. Biomarker Ingestion & Cleaning', description: 'Processes patient diagnostic measurements (glucose, BMI, insulin, age, blood pressure) with outlier detection.' },
        { step: '2. Risk Stratification Inference', description: 'Evaluates patient features against calibrated ML classifiers to output probability risk scores.' },
        { step: '3. Interactive Visual Report', description: 'Generates clear charts and risk breakdowns to aid practitioners in preventive intervention.' }
      ],
      keyChallenges: [
        'Ensuring model fairness across diverse patient age groups and demographic distributions.',
        'Translating complex probabilistic model outputs into intuitive clinical decision indicators.'
      ]
    }
  }
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 'gtim-intern',
    title: 'IT Intern',
    organization: 'Groupement Timimoun (GTIM)',
    location: 'Timimoun, Algeria',
    period: 'January 2025',
    type: 'work',
    description: 'Configured and maintained Cisco network switches in a critical gas production environment and worked with Triconex SIL-3 safety systems.',
    achievements: [
      'Configured and maintained Cisco network switches in a critical gas production environment.',
      'Worked with Triconex SIL-3 safety systems, gaining exposure to high-availability IT infrastructure.',
      'Participated in industrial IT infrastructure reliability and security protocols.'
    ],
    skills: ['Cisco Switches', 'Triconex SIL-3 Safety Systems', 'Network Administration', 'High-Availability IT', 'Industrial Networks']
  },
  {
    id: 'algerie-telecom-intern',
    title: 'Network Intern',
    organization: 'Algérie Télécom',
    location: 'Algeria',
    period: 'July 2024',
    type: 'work',
    description: 'Participated in fiber optic deployment and real-world network troubleshooting for national telecommunications infrastructure.',
    achievements: [
      'Participated in fiber optic deployment across national telecommunications infrastructure.',
      'Performed real-world network troubleshooting and fiber link diagnostics.',
      'Gained hands-on experience in telecom network architecture and data transmission.'
    ],
    skills: ['Cisco Configuration', 'Fiber Optic Networks', 'Network Troubleshooting', 'Telecommunications', 'Network Protocols']
  },
  {
    id: 'siemens-intern',
    title: 'Industrial Automation Intern',
    organization: 'SIEMENS',
    location: 'Algeria',
    period: 'March 2023',
    type: 'work',
    description: 'Developed and tested PLC programs for industrial automation using TIA Portal and gained practical experience in embedded systems.',
    achievements: [
      'Developed and tested PLC programs for industrial automation using TIA Portal.',
      'Gained practical experience in embedded systems and hardware-software integration.',
      'Collaborated with automation engineers on PLC testing and industrial systems control.'
    ],
    skills: ['PLC Programming', 'TIA Portal', 'Industrial Automation', 'Embedded Systems', 'Hardware-Software Integration']
  },
  {
    id: 'eng-degree',
    title: 'Engineering Degree in Computer Engineering',
    organization: 'National Higher School of Renewable Energies, Environment & Sustainable Development',
    location: 'Batna, Algeria',
    period: '2021 - 2026',
    type: 'education',
    description: 'Specialization in Artificial Intelligence, Industrial Networks, and Intelligent Systems.',
    achievements: [
      'Main Courses: Network Architecture, Machine Learning, Deep Learning, Computer Vision.',
      'Selected Member: DZ Young Leaders Program (1000 Leaders) — among Algeria’s 1000 most promising talents.',
      'Leadership Roles: Vice President of AIELEC Club (2023–2025) and Relations Manager at SEC Club ESI Algiers (2025–2026).'
    ],
    skills: ['Artificial Intelligence', 'Computer Vision', 'Machine Learning', 'Network Architecture', 'Industrial Networks', 'Python / C / Java']
  }
];

export const AI_INTERVIEW_QA: AIQuestionAnswer[] = [
  {
    id: 'who-is-nouri',
    category: 'background',
    question: 'Who is NOURI Mohammed Islam and what are his core specializations?',
    answer: 'NOURI Mohammed Islam is a Computer Engineer specializing in IT Systems, Networks, and Artificial Intelligence. He combines proven deep learning and computer vision expertise (such as retinal lesion detection with Explainable AI and facial emotion recognition) with practical hands-on experience in Cisco network administration, telecommunications, and industrial safety systems.'
  },
  {
    id: 'ai-stack',
    category: 'ai_engineering',
    question: 'What is Mohammed Islam\'s AI & Computer Vision technical stack?',
    answer: 'He works extensively with PyTorch, TensorFlow/Keras, OpenCV, and YOLO for Computer Vision and CNN architectures. He also specializes in Explainable Artificial Intelligence (XAI) such as Grad-CAM for clinical interpretability, alongside foundational Generative AI prompt engineering and LLM usage.'
  },
  {
    id: 'web-stack',
    category: 'web_dev',
    question: 'What is his web development & data analytics background?',
    answer: 'Mohammed Islam builds full-stack applications using the MERN stack (MongoDB, Express, React, Node.js) and integrates machine learning engines directly into modern web platforms. For data analysis and visualization, he leverages Python (Pandas, NumPy), Tableau, and Power BI.'
  },
  {
    id: 'why-hire',
    category: 'collaboration',
    question: 'What unique industry experience does Mohammed Islam bring?',
    answer: 'In addition to his Computer Engineering degree and AI projects, he has valuable real-world engineering experience across critical infrastructure: Cisco networking & Triconex SIL-3 safety systems at Groupement Timimoun (GTIM), national fiber optic deployment at Algérie Télécom, and PLC automation programming with TIA Portal at SIEMENS.'
  }
];
