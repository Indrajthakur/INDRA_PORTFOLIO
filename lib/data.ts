import type { BrandKey } from "./brand";

// ==================== PROFILE ====================

export const profile = {
  name: "Indraraj Singh Thakur",
  role: "Full-Stack Web Developer & CSE Student",
  location: "Rehli, Sagar, MP",
  resume: "/resume.pdf",
  year: 2026,
  socials: [
    {
      label: "X",
      href: "https://x.com/RThakur79501",
      brand: "x" as BrandKey,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/indraraj-thakurr-2a590a3b1",
      brand: "linkedin" as BrandKey,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/mr.indrajj",
      brand: "instagram" as BrandKey,
    },
    {
      label: "GitHub",
      href: "https://github.com/Indrajthakur",
      brand: "github" as BrandKey,
    },
    {
      label: "Email",
      href: "mailto:indrajthakur08@gmail.com",
      brand: null,
    },
  ],
};

// ==================== NAVIGATION ====================
export const nav = [
  { label: "Projects", href: "/#projects" },
  { label: "Shenanigans", href: "/shenanigans" },
  { label: "Blogs", href: "/blogs" },
  { label: "GuestBook", href: "/#guestbook" },
  { label: "Resume", href: "/resume.pdf" },
];

export const indexItems = [
  { id: "hero", label: "Hero" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "open-source", label: "Open Source" },
  { id: "highlights", label: "Highlights" },
  { id: "guestbook", label: "Guestbook" },
];

// ==================== HERO ====================

export const heroChips: {
  label: string;
  brand: BrandKey;
}[] = [
    { label: "TypeScript", brand: "typescript" },
    { label: "React", brand: "react" },
    { label: "Next.js", brand: "nextjs" },
    { label: "Node.js", brand: "nodejs" },
    { label: "MongoDB", brand: "mongodb" },
  ];

// ==================== MUSIC & FOCUS ====================

export const nowPlaying = {
  title: "Apocalypse",
  artist: "Cigarettes After Sex",
  album: "Cigarettes After Sex",
};

export const currentFocus = {
  emoji: "🚀",
  text: "Building modern full-stack web applications and exploring new technologies.",
};

// ==================== TECH STACK ====================

export const skillsRow1: {
  name: string;
  brand: BrandKey;
}[] = [
    { name: "C++", brand: "cplusplus" },
    { name: "JavaScript", brand: "javascript" },
    { name: "TypeScript", brand: "typescript" },
    { name: "HTML5", brand: "html5" },
    { name: "CSS", brand: "css" },
    { name: "React", brand: "react" },
    { name: "Next.js", brand: "nextjs" },
    { name: "Node.js", brand: "nodejs" },
    { name: "MongoDB", brand: "mongodb" },
    { name: "Tailwind CSS", brand: "tailwind" },
  ];

export const skillsRow2: {
  name: string;
  brand: BrandKey;
}[] = [
    { name: "Git", brand: "git" },
    { name: "GitHub", brand: "github" },
    { name: "Supabase", brand: "supabase" },
    { name: "Vercel", brand: "vercel" },
    { name: "Vite", brand: "vite" },
  ];

// ==================== EXPERIENCE ====================

export const experience = [
  {
    role: "B.Tech, Computer Science",
    company: "Gyan Sagar College of Engineering (RGPV)",
    subtitle: "Bachelor of Technology · CSE",
    dates: "2024 – 2028",
    tag: "Student",
    hue: 24,
    bullets: [
      "Pursuing a Bachelor of Technology in Computer Science.",
      "Focus on full-stack web development and algorithmic problem solving.",
    ],
  },
  {
    role: "Interactive RPG/HUD Portfolio",
    company: "Personal project",
    subtitle: "React · Tailwind CSS",
    dates: "2025 – Present",
    tag: "Project",
    hue: 280,
    bullets: [
      "Built a fully interactive, gamified portfolio using React and Tailwind CSS.",
      "Implemented game-like HUD components with real-time state management.",
      "Optimized frontend performance for smooth transitions and animations.",
    ],
  },
  {
    role: "StudyFlow",
    company: "Collaborative platform",
    subtitle: "Next.js · Node.js · MongoDB",
    dates: "2024 – 2025",
    tag: "Project",
    hue: 210,
    bullets: [
      "Developed a full-stack platform for academic collaboration.",
      "Designed resource sharing and task management features.",
      "Explored user authentication and secure team workflows.",
    ],
  },
  {
    role: "OOP & C++ Systems",
    company: "Personal project",
    subtitle: "C++ · Object-Oriented Programming",
    dates: "2024",
    tag: "Project",
    hue: 150,
    bullets: [
      "Designed modular systems using object-oriented programming.",
      "Developed algorithm-based C++ applications.",
      "Built extensible code following software design principles.",
    ],
  },
];

// ==================== PROJECTS ====================

export const projects = [
  {
    title: "Cravora",
    subtitle: "Discover Food. Explore Flavours.",
    description:
      "A modern food discovery platform featuring interactive restaurant menus, search filters, favourites, shopping cart, checkout and order tracking.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/Indrajthakur/Cravora",
    liveUrl: "https://cravora-inky.vercel.app/",
    live: true,
    image: "/projects/cravora.png",
    ribbon: "FOOD TECH",
    hue: 24,
  },
  {
    title: "StudyFlow",
    subtitle: "Student productivity platform",
    description:
      "A full-stack academic productivity platform designed to organize coursework, resources and collaborative learning.",
    tech: ["Next.js", "Node.js", "MongoDB"],
    github: "",
    liveUrl: "https://studyflow-indraraj.vercel.app/",
    live: true,
    image: "",
    ribbon: "FULL-STACK",
    hue: 210,
  },
  {
    title: "Task Manager",
    subtitle: "TaskStatus student workspace",
    description:
      "A responsive productivity dashboard for organizing coursework, managing tasks and tracking completion progress with local storage.",
    tech: ["JavaScript", "TypeScript", "Vite"],
    github: "https://github.com/Indrajthakur/TaskStatus.java",
    liveUrl: "https://task-status-java-git-feature-modern-dashboard-amra8.vercel.app/",
    live: true,
    image: "/projects/task-manager.png",
    ribbon: "PRODUCTIVITY",
    hue: 150,
  },
  {
    title: "RPG HUD Portfolio",
    subtitle: "Gamified developer portfolio",
    description:
      "An interactive personal portfolio featuring a retro gaming-inspired interface, animated components and a creative presentation of my developer journey.",
    tech: ["React", "Tailwind CSS"],
    github: "https://github.com/Indrajthakur/portfoliodemo-2",
    liveUrl: "https://indraraj-portfolio.vercel.app/",
    live: true,
    image: "/projects/portfolio.png",
    ribbon: "GAMIFIED",
    hue: 280,
  },
  {
    title: "C++ & OOP Systems Suite",
    subtitle: "Algorithms and object-oriented programming",
    description:
      "A collection of C++ programming exercises and modular systems exploring object-oriented programming, algorithms and problem-solving techniques.",
    tech: ["C++", "OOP", "Algorithms"],
    github: "",
    liveUrl: "",
    live: false,
    image: "",
    ribbon: "SYSTEMS",
    hue: 65,
  },
  {
    title: "System HUD Portfolio",
    subtitle: "Cyberpunk developer experience",
    description:
      "An advanced RPG-inspired portfolio with an interactive player profile, XP progression, music player, contribution snake and Supabase-powered admin dashboard.",
    tech: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    github: "https://github.com/Indrajthakur/INDRA_PORTFOLIO",
    liveUrl: "https://indra-portfolio-j15o.vercel.app/",
    live: true,
    image: "/projects/system-hud.png",
    ribbon: "CYBERPUNK",
    hue: 165,
  },
  {
    title: "Task Manager — Supabase",
    subtitle: "Cloud-powered task management",
    description:
      "A full-stack productivity application with user authentication, task priorities, due dates, search filters and cloud-based task storage.",
    tech: ["HTML5", "CSS3", "JavaScript", "Supabase"],
    github: "https://github.com/Indrajthakur/Task-manager-app",
    liveUrl:
      "https://task-manager-ax4n0fhoe-amra8.vercel.app/auth.html",
    live: true,
    image: "/projects/task-manager-supabase.png",
    ribbon: "FULL-STACK",
    hue: 270,
  },
];

// ==================== ABOUT ====================

export const aboutSkills: BrandKey[] = [
  "typescript",
  "react",
  "nextjs",
  "nodejs",
  "mongodb",
  "tailwind",
];

// ==================== GITHUB ====================

type PullRequest = {
  title: string;
  repo: string;
  date: string;
  href: string;
};

export const github = {
  total: "GitHub contributions",
  profile: "https://github.com/Indrajthakur",

  orgs: [] as string[],

  prs: {
    merged: [] as PullRequest[],

    open: [
      {
        title: "Merge pull request #1 from Indrajthakur/feature/modern-dashboard",
        repo: "Indrajthakur/TaskStatus.java",
        date: "Nov 13",
        href: "https://github.com/Indrajthakur/TaskStatus.java/pull/2",
      },
    ],

    closed: [
      {
        title: "Feature/modern dashboard",
        repo: "Indrajthakur/TaskStatus.java",
        date: "Nov 13",
        href: "https://github.com/Indrajthakur/TaskStatus.java/pull/1",
      },
    ],
  },

  counts: {
    merged: 0,
    open: 1,
  },
};

// ==================== HEATMAP FALLBACK ====================

export const heatmap: number[][] = Array.from(
  { length: 53 },
  () => Array(7).fill(0)
);

// ==================== ACHIEVEMENTS ====================

export const achievement = {
  label: "Developer Journey",
  title: "Learning & Building",
  subtitle: "PERSONAL PROJECTS & EDUCATION",
  rank: "",
  of: "",
  percentile: "",
  quote:
    "Continuously improving my engineering skills by building real-world projects and solving programming challenges.",
  verify: "View GitHub Profile",
  ref: "",
};

// ==================== HIGHLIGHTS ====================

export const featured = {
  channel: "Indraraj Singh Thakur",
  title: "Project highlights — coming soon",
};

// ==================== GUESTBOOK ====================

export const guestbook: {
  name: string;
  date: string;
  message: string;
}[] = [];

// ==================== VIDEO BANNER ====================

export const banner: {
  video?: string;
  poster?: string;
} = {
  video: "/banner.mp4",
  poster: "/banner-poster.jpg",
};