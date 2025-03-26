import { GenerationParams, InsertAppIdea } from "@shared/schema";

interface CategoryData {
  name: string;
  prefixes: string[];
  suffixes: string[];
  descriptions: string[];
  features: string[][];
  technicalConsiderations: string[][];
  tags: string[];
}

// Category data for idea generation
const categoriesData: Record<string, CategoryData> = {
  productivity: {
    name: "Productivity",
    prefixes: ["Smart", "Efficient", "Quick", "Streamlined", "Automated", "Intelligent"],
    suffixes: ["Task Manager", "Planner", "Organizer", "Assistant", "Tracker", "Hub", "Workspace"],
    descriptions: [
      "A productivity app that helps users organize tasks with smart categorization and AI-powered priority suggestions.",
      "A time management tool that uses machine learning to analyze user productivity patterns and suggest optimal work schedules.",
      "A digital workspace that combines notes, tasks, and calendar in one interface with automated task sorting and reminder features.",
      "A collaborative project management tool that adapts to team workflows and provides real-time progress tracking with predictive analytics."
    ],
    features: [
      ["Task categorization", "Priority sorting", "Deadline tracking", "Recurring tasks", "Note attachments"],
      ["Time tracking", "Productivity analytics", "Focus timer", "Break reminders", "Work pattern insights"],
      ["Kanban boards", "Calendar integration", "Document storage", "Team collaboration", "Activity reports"],
      ["Voice input", "Cross-device sync", "Smart notifications", "Natural language processing", "Template library"]
    ],
    technicalConsiderations: [
      ["User activity tracking algorithm", "Data visualization", "Cross-platform synchronization", "Backend task scheduling"],
      ["Machine learning for pattern recognition", "Real-time data processing", "Secure data storage", "Calendar API integration"],
      ["User authentication system", "Drag-and-drop interfaces", "Search optimization", "Notification management"],
      ["Cloud storage integration", "Offline functionality", "Real-time collaboration infrastructure", "PWA capabilities"]
    ],
    tags: ["productivity", "timemanagement", "organization", "workflow", "efficiency", "planner", "tasks"]
  },
  social: {
    name: "Social Media",
    prefixes: ["Social", "Connect", "Community", "Friend", "Group", "Network", "Share"],
    suffixes: ["Hub", "Space", "Circle", "Feed", "Connect", "Link", "Tribe", "Pulse"],
    descriptions: [
      "A niche social platform that connects users based on specific interests, featuring algorithmic matching and interest-based content feeds.",
      "A privacy-focused social network that gives users complete control over their data and content visibility with encrypted messaging.",
      "A creative social media app that encourages authentic sharing through timed content challenges and community feedback loops.",
      "A location-based social networking app that helps users discover events, activities, and people in their vicinity with augmented reality features."
    ],
    features: [
      ["Interest matching", "Content discovery feed", "Group creation", "Personalized recommendations", "Direct messaging"],
      ["End-to-end encryption", "Custom privacy settings", "Content lifespan controls", "Data export tools", "Viewing history management"],
      ["Creative challenges", "Community voting", "Achievement badges", "Temporary content", "Collaborative creation tools"],
      ["Location-based feeds", "Event discovery", "Interactive maps", "Check-ins", "Local business integration"]
    ],
    technicalConsiderations: [
      ["Recommendation algorithms", "Real-time content delivery", "User graph database", "Content moderation system"],
      ["Encryption protocols", "Privacy-preserving analytics", "Secure messaging infrastructure", "User control paradigms"],
      ["Real-time interaction systems", "Content scheduling", "Gamification framework", "Media processing"],
      ["Geolocation services", "Map integration", "Proximity detection", "Local data caching"]
    ],
    tags: ["social", "community", "networking", "sharing", "communication", "friends", "content"]
  },
  entertainment: {
    name: "Entertainment",
    prefixes: ["Fun", "Play", "Joy", "Amuse", "Enjoy", "Delight", "Thrill"],
    suffixes: ["Player", "Theater", "Arena", "Station", "Box", "Zone", "Hub", "Fest"],
    descriptions: [
      "An interactive storytelling app where users make choices that affect the narrative, featuring branching storylines and character development.",
      "A social gaming platform that combines casual games with video chat, allowing friends to play together while maintaining visual connection.",
      "A music discovery app that creates personalized playlists based on mood, activity, and listening history with social sharing features.",
      "A virtual reality experience platform offering immersive entertainment from concerts to guided meditations with customizable environments."
    ],
    features: [
      ["Branching narratives", "Character customization", "Voice acted content", "Progress tracking", "Story creation tools"],
      ["Multiplayer mini-games", "Video chat integration", "Tournament creation", "Leaderboards", "Game recommendation engine"],
      ["Mood detection", "Activity-based playlists", "Artist discovery", "Social sharing", "Lyrics visualization"],
      ["VR environment library", "Experience scheduling", "Quality adjustment settings", "Social viewing", "Content creation tools"]
    ],
    technicalConsiderations: [
      ["Narrative management system", "Decision tree architecture", "Content delivery network", "User choice tracking"],
      ["WebRTC implementation", "Low-latency networking", "Game state synchronization", "Video optimization"],
      ["Audio analysis algorithms", "Recommendation engine", "Music licensing integration", "Social graph management"],
      ["3D rendering optimization", "VR hardware integration", "Spatial audio", "Motion tracking"]
    ],
    tags: ["entertainment", "fun", "gaming", "media", "interactive", "streaming", "immersive"]
  },
  education: {
    name: "Education",
    prefixes: ["Learn", "Study", "Edu", "Scholar", "Knowledge", "Brain", "Smart"],
    suffixes: ["Academy", "Tutor", "Class", "Lab", "School", "Quest", "Mind"],
    descriptions: [
      "An adaptive learning platform that customizes educational content based on individual learning styles, progress, and goals.",
      "A language learning app that uses conversation simulation with AI to provide immersive speaking practice with real-time feedback.",
      "A collaborative study tool that allows students to create and share interactive study materials with built-in quizzing and progress tracking.",
      "A skill development platform that breaks down complex topics into daily micro-learning sessions with practical exercises and projects."
    ],
    features: [
      ["Learning style assessment", "Adaptive content", "Progress tracking", "Knowledge gap analysis", "Interactive exercises"],
      ["Speech recognition", "Conversation scenarios", "Vocabulary tracking", "Grammar assistance", "Cultural context notes"],
      ["Study group creation", "Document collaboration", "Quiz generation", "Flashcard system", "Study schedule optimizer"],
      ["Skill roadmaps", "Daily challenges", "Project-based learning", "Expert verification", "Portfolio building"]
    ],
    technicalConsiderations: [
      ["Learning pattern analytics", "Content adaptation algorithms", "Progress tracking database", "Assessment generation"],
      ["Natural language processing", "Speech analysis", "Conversation branching system", "Pronunciation scoring"],
      ["Real-time collaboration", "Content versioning", "Quiz generation algorithms", "Spaced repetition system"],
      ["Learning path algorithms", "Content sequencing", "Achievement system", "Skill taxonomy database"]
    ],
    tags: ["education", "learning", "study", "knowledge", "skills", "courses", "academic"]
  },
  health: {
    name: "Health & Wellness",
    prefixes: ["Health", "Wellness", "Fit", "Vital", "Active", "Mind", "Body"],
    suffixes: ["Tracker", "Coach", "Monitor", "Diary", "Plus", "Journey", "Balance"],
    descriptions: [
      "A holistic health tracking app that combines physical activity, nutrition, sleep, and mental wellness monitoring with personalized recommendations.",
      "A meditation and mindfulness app featuring guided sessions that adapt to user stress levels detected through phone sensors and user feedback.",
      "A nutrition planning tool that generates meal plans and shopping lists based on dietary goals, preferences, and health conditions.",
      "A fitness coaching app that creates personalized workout routines based on available equipment, time constraints, and fitness level."
    ],
    features: [
      ["Health metrics dashboard", "Goal setting", "Progress visualization", "Habit tracking", "Health insights"],
      ["Guided meditation library", "Mood tracking", "Breathing exercises", "Sleep stories", "Mindfulness reminders"],
      ["Recipe database", "Meal scheduling", "Nutritional analysis", "Dietary restriction tools", "Shopping list generation"],
      ["Exercise demonstration videos", "Workout customization", "Progress tracking", "Recovery monitoring", "Training plans"]
    ],
    technicalConsiderations: [
      ["Health data integration", "Metrics correlation analysis", "Progress algorithm", "Secure health data storage"],
      ["Audio streaming optimization", "Background noise filtering", "Heart rate monitor integration", "Session recommendation algorithm"],
      ["Nutritional database", "Meal planning algorithm", "User preference learning", "Shopping integration APIs"],
      ["Video streaming", "Exercise classification system", "Fitness assessment algorithm", "Recommendation engine"]
    ],
    tags: ["health", "wellness", "fitness", "nutrition", "mindfulness", "tracking", "wellbeing"]
  },
  finance: {
    name: "Finance",
    prefixes: ["Money", "Finance", "Budget", "Wealth", "Cash", "Invest", "Fund"],
    suffixes: ["Tracker", "Manager", "Planner", "Wallet", "Saver", "Advisor", "Watch"],
    descriptions: [
      "A personal finance app that provides automated expense categorization, budget recommendations, and financial goal planning with predictive analysis.",
      "An investment education platform that simulates stock market investing with real-time data and guided learning modules for beginners.",
      "A collaborative expense management tool for groups that tracks shared expenses, facilitates repayments, and provides spending insights.",
      "A financial literacy app targeting young adults with gamified learning modules covering budgeting, investing, credit, and retirement planning."
    ],
    features: [
      ["Bank account integration", "Expense categorization", "Budget templates", "Financial goal tracking", "Spending insights"],
      ["Virtual portfolio", "Market data visualization", "Investment tutorials", "Risk assessment tools", "Performance comparison"],
      ["Expense splitting", "Payment tracking", "Group creation", "Receipt scanning", "Settlement reminders"],
      ["Learning modules", "Financial quizzes", "Achievement system", "Simulation tools", "Personalized advice"]
    ],
    technicalConsiderations: [
      ["Banking API integration", "Transaction categorization algorithm", "Encryption for financial data", "Predictive analytics"],
      ["Real-time data feeds", "Portfolio simulation engine", "Educational content management", "User progress tracking"],
      ["Payment calculation algorithms", "Multi-user database architecture", "OCR for receipts", "Push notification system"],
      ["Gamification framework", "Financial modeling", "Content progression system", "Personalization engine"]
    ],
    tags: ["finance", "money", "budget", "investing", "expenses", "savings", "financial"]
  },
  utility: {
    name: "Utility",
    prefixes: ["Quick", "Easy", "Smart", "Handy", "Ultimate", "Power", "Pro"],
    suffixes: ["Tool", "Utility", "Helper", "Assistant", "Solver", "Kit", "Box"],
    descriptions: [
      "A smart home management app that centralizes control of various IoT devices with automation routines based on user behavior and preferences.",
      "A document scanning and management tool with OCR, automatic categorization, and secure cloud storage with advanced search capabilities.",
      "A comprehensive travel assistant that consolidates bookings, itineraries, local recommendations, and real-time updates for transportation.",
      "A digital identity manager that securely stores and autofills personal information, IDs, and documents with selective sharing capabilities."
    ],
    features: [
      ["Device integration", "Automation rules", "Usage analytics", "Voice control", "Energy monitoring"],
      ["Document scanning", "Text recognition", "Categorization", "Search functionality", "Document sharing"],
      ["Itinerary management", "Booking storage", "Local recommendations", "Travel alerts", "Offline maps"],
      ["Secure storage", "Biometric authentication", "Selective sharing", "Auto-fill capability", "Expiration reminders"]
    ],
    technicalConsiderations: [
      ["IoT device APIs", "Automation rule engine", "User behavior analysis", "Voice command processing"],
      ["OCR technology", "Document classification algorithm", "Secure cloud storage", "Full-text search indexing"],
      ["Travel API integration", "Geolocation services", "Data synchronization", "Offline capability"],
      ["Encryption protocols", "Secure enclave usage", "Permissions management", "Form detection"]
    ],
    tags: ["utility", "tools", "productivity", "organization", "assistant", "smart", "management"]
  }
};

// Technology focus data
const techFocusData: Record<string, { features: string[], technical: string[], prefixSuffix: [string, string][] }> = {
  ai: {
    features: [
      "AI-powered recommendations",
      "Natural language processing",
      "Machine learning insights",
      "Predictive analytics",
      "Automated content generation",
      "Personalized user experiences",
      "Intelligent automation"
    ],
    technical: [
      "Machine learning model training and deployment",
      "Natural language processing pipeline",
      "Data collection and preprocessing",
      "Model optimization for mobile/web",
      "API integration with AI services",
      "Real-time prediction serving"
    ],
    prefixSuffix: [
      ["AI", "Assistant"],
      ["Smart", "AI"],
      ["Intelligent", "Bot"],
      ["Neural", "Mind"],
      ["Cognitive", "Helper"]
    ]
  },
  ar: {
    features: [
      "Augmented reality visualization",
      "3D object placement",
      "AR navigation",
      "Virtual try-on",
      "Interactive AR experiences",
      "Spatial mapping",
      "AR annotations"
    ],
    technical: [
      "ARKit/ARCore implementation",
      "3D rendering optimization",
      "Spatial tracking algorithms",
      "Real-world object recognition",
      "3D asset management",
      "Camera calibration"
    ],
    prefixSuffix: [
      ["AR", "Viewer"],
      ["Virtual", "Lens"],
      ["Augment", "Vision"],
      ["Reality", "Explorer"],
      ["Immersive", "Space"]
    ]
  },
  mobile: {
    features: [
      "Offline functionality",
      "Push notifications",
      "Location-based services",
      "Camera integration",
      "Touch gestures",
      "Mobile payments",
      "QR/barcode scanning"
    ],
    technical: [
      "Cross-platform development",
      "Native API integration",
      "Responsive UI design",
      "Battery optimization",
      "Offline data synchronization",
      "Device sensor utilization"
    ],
    prefixSuffix: [
      ["Mobile", "App"],
      ["Pocket", "Pro"],
      ["Go", "Mobile"],
      ["Handy", "Companion"],
      ["Portable", "Tool"]
    ]
  },
  web: {
    features: [
      "Cross-browser compatibility",
      "Responsive design",
      "Progressive enhancement",
      "Accessibility features",
      "Real-time collaboration",
      "Content management",
      "API integrations"
    ],
    technical: [
      "Frontend framework implementation",
      "RESTful API design",
      "Serverless architecture",
      "Database optimization",
      "Authentication systems",
      "Cloud hosting"
    ],
    prefixSuffix: [
      ["Web", "Portal"],
      ["Cloud", "Hub"],
      ["Online", "Platform"],
      ["Net", "Suite"],
      ["Browser", "App"]
    ]
  },
  iot: {
    features: [
      "Device synchronization",
      "Remote monitoring",
      "Automated triggers",
      "Energy usage analytics",
      "Central control interface",
      "Environmental sensing",
      "Smart notifications"
    ],
    technical: [
      "IoT protocol implementation (MQTT, CoAP)",
      "Device provisioning system",
      "Secure communication channels",
      "Low-power optimization",
      "Sensor data processing",
      "Edge computing capabilities"
    ],
    prefixSuffix: [
      ["Smart", "Connect"],
      ["IoT", "Manager"],
      ["Connected", "Hub"],
      ["Sense", "Control"],
      ["Auto", "Things"]
    ]
  }
};

// Audience focus data
const audienceFocusData: Record<string, { features: string[], tags: string[] }> = {
  general: {
    features: [
      "Intuitive user interface",
      "Quick onboarding process",
      "Multi-language support",
      "Accessibility features",
      "Basic and advanced user modes"
    ],
    tags: ["users", "everyone", "general", "accessible", "mainstream"]
  },
  business: {
    features: [
      "Team collaboration tools",
      "Business analytics dashboard",
      "Enterprise security features",
      "Role-based permissions",
      "Integration with business tools"
    ],
    tags: ["business", "enterprise", "productivity", "professional", "commerce"]
  },
  developers: {
    features: [
      "API access",
      "Custom scripting support",
      "Debugging tools",
      "Version control integration",
      "Technical documentation"
    ],
    tags: ["developers", "coding", "programming", "technical", "engineering"]
  },
  creative: {
    features: [
      "Design toolset",
      "Asset management",
      "Creative templates",
      "Portfolio showcase",
      "Collaboration for creatives"
    ],
    tags: ["creative", "design", "artistic", "portfolio", "visual"]
  },
  education: {
    features: [
      "Learning progress tracking",
      "Educational content creation",
      "Quiz and assessment tools",
      "Student management",
      "Classroom integration"
    ],
    tags: ["education", "learning", "students", "teaching", "academic"]
  },
  children: {
    features: [
      "Kid-friendly interface",
      "Parental controls",
      "Educational content",
      "Reward systems",
      "Safe environment"
    ],
    tags: ["children", "kids", "family", "parental", "educational"]
  }
};

// Random selection functions
const randomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const randomSubset = <T>(array: T[], min: number, max: number): T[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generate a random app idea
export const generateIdea = (params: GenerationParams): InsertAppIdea => {
  // Determine category
  const categoryKey = params.category === "all" 
    ? randomElement(Object.keys(categoriesData))
    : params.category;
  
  const categoryData = categoriesData[categoryKey];
  
  // Ensure we have at least one tech focus
  const techFocus = params.techFocus.length > 0 
    ? params.techFocus 
    : ["web"];
  
  // Pick random tech focus for additional features
  const primaryTech = randomElement(techFocus);
  const techData = techFocusData[primaryTech];
  
  // Get audience data
  const audienceData = audienceFocusData[params.audience];
  
  // Generate title
  let prefix, suffix;
  if (Math.random() > 0.5 && techData) {
    // Use tech-specific prefix/suffix
    [prefix, suffix] = randomElement(techData.prefixSuffix);
  } else {
    // Use category-specific prefix/suffix
    prefix = randomElement(categoryData.prefixes);
    suffix = randomElement(categoryData.suffixes);
  }
  
  const title = `${prefix} ${suffix}`;
  
  // Select or generate description
  const description = randomElement(categoryData.descriptions);
  
  // Generate features (combining category, tech, and audience features)
  const baseFeatures = randomElement(categoryData.features);
  const techFeatures = techData ? randomSubset(techData.features, 1, 3) : [];
  const audienceFeatures = randomSubset(audienceData.features, 1, 2);
  
  const features = [...baseFeatures, ...techFeatures, ...audienceFeatures];
  
  // Generate technical considerations
  const baseTechnical = randomElement(categoryData.technicalConsiderations);
  const techTechnical = techData ? randomSubset(techData.technical, 1, 2) : [];
  
  const technicalConsiderations = [...baseTechnical, ...techTechnical];
  
  // Generate tags
  const categoryTags = randomSubset(categoryData.tags, 2, 3);
  const audienceTags = randomSubset(audienceData.tags, 1, 2);
  const techTags = techFocus.slice(0, 2); // Use up to 2 tech focus tags
  
  const tags = [...categoryTags, ...techTags, ...audienceTags];
  const uniqueTags = Array.from(new Set(tags)); // Remove duplicates
  
  // Determine complexity based on params and features
  const adjustedComplexity = Math.min(
    Math.max(
      params.complexity + (features.length > 7 ? 1 : 0) - (features.length < 5 ? 1 : 0),
      1
    ),
    5
  );
  
  return {
    title,
    description,
    complexity: adjustedComplexity,
    category: categoryData.name,
    techStack: techFocus.map(tech => tech.toUpperCase()),
    audience: params.audience,
    features,
    technicalConsiderations,
    tags: uniqueTags,
    saved: false,
    createdAt: new Date().toISOString()
  };
};
