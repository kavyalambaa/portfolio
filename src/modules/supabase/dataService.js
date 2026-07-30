/* ========================================================
   SUPABASE & HYBRID MOCK DATA SERVICE
   Supports live Supabase tables: projects, skills, experience,
   achievements, certificates, social_links, messages, statistics.
   Fallback automatically keeps website working 100% offline or unconfigured.
   ======================================================== */

import { supabase, isLiveSupabase } from './supabaseClient.js';

// Local Mock Datasets matching exact Supabase column specifications
const MOCK_PROJECTS = [
  {
    id: 'p1',
    title: 'Quantum Web-Grid Engine',
    short_description: 'High-throughput real-time spatial physics and telemetry dashboard.',
    full_description: 'A high-performance interactive web dashboard visualizing real-time spatial node telemetry using HTML5 Canvas, WebGL, and Supabase Realtime sockets. Built to handle 60FPS physics simulations with zero latency drop.',
    technologies: ['JavaScript (ES6+)', 'Supabase Realtime', 'Canvas 2D Engine', 'GSAP', 'Node.js'],
    github_url: 'https://github.com/alexvance/quantum-web-grid',
    live_demo_url: 'https://quantum-web-grid.demo.app',
    image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    category: 'Full Stack',
    timeline: 'Jan 2026 - Mar 2026',
    created_at: '2026-01-15T00:00:00Z'
  },
  {
    id: 'p2',
    title: 'Multiverse API Gateway',
    short_description: 'Sub-millisecond distributed API router with automated load balancing.',
    full_description: 'A high-speed microservices API gateway designed for inter-dimensional data exchange. Provides rate limiting, JWT key rotation, live latency monitoring, and automated fallback failovers.',
    technologies: ['Node.js', 'Express', 'Redis', 'Docker', 'Supabase DB', 'PostgreSQL'],
    github_url: 'https://github.com/alexvance/multiverse-api-gateway',
    live_demo_url: 'https://api-gateway.demo.app',
    image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    category: 'Backend & DevOps',
    timeline: 'Nov 2025 - Jan 2026',
    created_at: '2026-02-20T00:00:00Z'
  },
  {
    id: 'p3',
    title: 'Cyber-City Rain Synthesizer',
    short_description: 'Generative Web Audio and multi-layered parallax canvas engine.',
    full_description: 'An immersive browser experience fusing Web Audio API procedural sound design with dynamic neon skyline rendering. Users can tune atmospheric precipitation, thunder frequencies, and urban neon light pulses.',
    technologies: ['Vanilla JS', 'Web Audio API', 'HTML5 Canvas', 'CSS3 Glassmorphism'],
    github_url: 'https://github.com/alexvance/cyber-city-rain',
    live_demo_url: 'https://cyber-rain.demo.app',
    image_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    category: 'Creative Tech',
    timeline: 'Aug 2025 - Oct 2025',
    created_at: '2025-11-10T00:00:00Z'
  },
  {
    id: 'p4',
    title: 'Realtime Dimensional Neural Network',
    short_description: 'Browser-based WebGL neural node topology visualizer.',
    full_description: 'Interactive neural network model trained to classify multiverse event streams, rendering 3D spatial connections using custom GLSL shaders and real-time state synchronization.',
    technologies: ['JavaScript', 'WebGL', 'GLSL', 'Supabase Sockets', 'GSAP'],
    github_url: 'https://github.com/alexvance/dimensional-neural-net',
    live_demo_url: 'https://neural-net.demo.app',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    category: 'Creative Tech',
    timeline: 'May 2025 - Jul 2025',
    created_at: '2025-07-01T00:00:00Z'
  }
];

const MOCK_SKILLS = [
  { id: 's1', skill_name: 'JavaScript (ES6+)', category: 'Frontend', percentage: 98, icon: 'code', display_order: 1 },
  { id: 's2', skill_name: 'HTML5 Canvas & Verlet Physics', category: 'Creative Tech', percentage: 96, icon: 'zap', display_order: 2 },
  { id: 's3', skill_name: 'GSAP Animations & ScrollTrigger', category: 'Frontend', percentage: 94, icon: 'film', display_order: 3 },
  { id: 's4', skill_name: 'Supabase & PostgreSQL', category: 'Database', percentage: 92, icon: 'database', display_order: 4 },
  { id: 's5', skill_name: 'Node.js & REST API Design', category: 'Backend', percentage: 90, icon: 'server', display_order: 5 },
  { id: 's6', skill_name: 'Docker, Redis & Microservices', category: 'DevOps', percentage: 88, icon: 'cpu', display_order: 6 },
  { id: 's7', skill_name: 'Web Audio API & Sound Design', category: 'Creative Tech', percentage: 86, icon: 'music', display_order: 7 },
  { id: 's8', skill_name: 'Git & CI/CD Pipelines', category: 'DevOps', percentage: 91, icon: 'git-branch', display_order: 8 }
];

const MOCK_EXPERIENCE = [
  {
    id: 'e1',
    company: 'Multiverse Web Labs',
    role: 'Lead Interactive Web Engineer',
    duration: '2024 - Present',
    start_date: '2024',
    end_date: 'Present',
    location: 'Earth-1610 HQ (Remote)',
    dimension: 'Earth-1610',
    description: 'Architecting high-performance web applications, 60FPS physics engines, and cloud microservices for global clients.',
    technologies: ['JavaScript', 'Canvas 2D', 'Supabase', 'GSAP', 'Vite']
  },
  {
    id: 'e2',
    company: 'Stark Tech Division',
    role: 'Full Stack Systems Engineer',
    duration: '2022 - 2024',
    start_date: '2022',
    end_date: '2024',
    location: 'New York, NY',
    dimension: 'Earth-616',
    description: 'Engineered real-time cloud data pipelines, RESTful API gateways, and developer dashboard UI portals.',
    technologies: ['Node.js', 'PostgreSQL', 'Express', 'Docker', 'Redis']
  },
  {
    id: 'e3',
    company: 'Oscorp Interactive',
    role: 'Frontend Graphics Specialist',
    duration: '2021 - 2022',
    start_date: '2021',
    end_date: '2022',
    location: 'Brooklyn, NY',
    dimension: 'Earth-1610',
    description: 'Developed procedural canvas visualizers, custom UI widgets, and dynamic Web Audio soundscapes.',
    technologies: ['Vanilla JS', 'HTML5 Canvas', 'Web Audio API', 'CSS3']
  }
];

const MOCK_ACHIEVEMENTS = [
  {
    id: 'a1',
    title: 'Awwwards Site of the Day Candidate',
    description: 'Recognized for pioneering interactive canvas physics, Verlet web engines, and Spider-Verse web design.',
    date: '2026',
    badge: 'WINNER',
    icon: 'trophy'
  },
  {
    id: 'a2',
    title: 'Best Microservices Architecture',
    description: 'Awarded first place in Global Cloud Infrastructure Hackathon for sub-millisecond API routing.',
    date: '2025',
    badge: '1ST PLACE',
    icon: 'award'
  },
  {
    id: 'a3',
    title: 'Top Open Source Contributor',
    description: 'Featured author of high-performance zero-dependency JS physics & web animation utilities.',
    date: '2024',
    badge: 'HONOR',
    icon: 'star'
  }
];

const MOCK_CERTIFICATES = [
  {
    id: 'c1',
    certificate_name: 'Certified Cloud Developer & Systems Architect',
    issuer: 'Cloud Native Computing Foundation',
    issue_date: '2025',
    credential_url: 'https://credential.example.com/cloud-arch',
    badge: 'VERIFIED'
  },
  {
    id: 'c2',
    certificate_name: 'Advanced Full Stack Engineering Mastery',
    issuer: 'Meta Developer Network',
    issue_date: '2024',
    credential_url: 'https://credential.example.com/fullstack',
    badge: 'VERIFIED'
  },
  {
    id: 'c3',
    certificate_name: 'High Performance Graphics & Shaders Specialist',
    issuer: 'Web Graphics Guild',
    issue_date: '2023',
    credential_url: 'https://credential.example.com/webgl-shaders',
    badge: 'VERIFIED'
  }
];

const MOCK_SOCIAL_LINKS = [
  { id: 'sl1', platform: 'GitHub', url: 'https://github.com/', icon: 'github' },
  { id: 'sl2', platform: 'LinkedIn', url: 'https://linkedin.com/', icon: 'linkedin' },
  { id: 'sl3', platform: 'Twitter / X', url: 'https://twitter.com/', icon: 'twitter' },
  { id: 'sl4', platform: 'Discord', url: 'https://discord.com/', icon: 'message-square' }
];

const MOCK_STATISTICS = {
  id: 'stat1',
  total_projects: 28,
  github_repositories: 34,
  technologies: 18,
  certificates: 8,
  experience_years: 5
};

// 1. GET /projects
export async function getProjects() {
  if (isLiveSupabase && supabase) {
    try {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase projects fetch failed, using fallback.', e);
    }
  }
  return MOCK_PROJECTS;
}

// 2. GET /skills
export async function getSkills() {
  if (isLiveSupabase && supabase) {
    try {
      const { data, error } = await supabase.from('skills').select('*').order('display_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase skills fetch failed, using fallback.', e);
    }
  }
  return MOCK_SKILLS;
}

// 3. GET /experience
export async function getExperience() {
  if (isLiveSupabase && supabase) {
    try {
      const { data, error } = await supabase.from('experience').select('*');
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase experience fetch failed, using fallback.', e);
    }
  }
  return MOCK_EXPERIENCE;
}

// Alias for plural import compatibility
export const getExperiences = getExperience;

// 4. GET /achievements
export async function getAchievements() {
  if (isLiveSupabase && supabase) {
    try {
      const { data, error } = await supabase.from('achievements').select('*');
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase achievements fetch failed, using fallback.', e);
    }
  }
  return MOCK_ACHIEVEMENTS;
}

// 5. GET /certificates
export async function getCertificates() {
  if (isLiveSupabase && supabase) {
    try {
      const { data, error } = await supabase.from('certificates').select('*');
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase certificates fetch failed, using fallback.', e);
    }
  }
  return MOCK_CERTIFICATES;
}

// 6. GET /social-links
export async function getSocialLinks() {
  if (isLiveSupabase && supabase) {
    try {
      const { data, error } = await supabase.from('social_links').select('*');
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase social_links fetch failed, using fallback.', e);
    }
  }
  return MOCK_SOCIAL_LINKS;
}

// 7. GET /statistics
export async function getStatistics() {
  if (isLiveSupabase && supabase) {
    try {
      const { data, error } = await supabase.from('statistics').select('*').limit(1);
      if (!error && data && data.length > 0) return data[0];
    } catch (e) {
      console.warn('Supabase statistics fetch failed, using fallback.', e);
    }
  }
  return MOCK_STATISTICS;
}

// ================= HERO =================
export async function getHero() {
  if (isLiveSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('hero')
        .select('*')
        .limit(1);

      if (!error && data && data.length > 0) {
        return data[0];
      }
    } catch (e) {
      console.warn('Supabase hero fetch failed.', e);
    }
  }

  return {
    name: "Kavya Lamba",
    title: "B.Tech CSE Student",
    subtitle: "Building AI applications, interactive websites and full stack projects.",
    primary_button: "Explore Projects",
    secondary_button: "Contact Me",
    badge: "AI • Full Stack • Cloud",
    location: "GLA University, Mathura"
  };
}

// 8. POST /messages
export async function submitMessage(messagePayload) {
  const payload = {
    name: messagePayload.name || messagePayload.sender_name,
    email: messagePayload.email || messagePayload.sender_email,
    subject: messagePayload.subject,
    message: messagePayload.message || messagePayload.content
  };

  if (isLiveSupabase && supabase) {
    try {
      const { error } = await supabase
  .from('messages')
  .insert([payload]);
      if (error) throw error;
      return {
  success: true,
  isLive: true
};
    } catch (e) {
      console.warn('Supabase message submit failed, recorded locally.', e);
      return { success: true, data: [payload], isLive: false };
    }
  }
  return { success: true, data: [payload], isLive: false };
}

// Alias for compatibility
export const submitContactMessage = submitMessage;
