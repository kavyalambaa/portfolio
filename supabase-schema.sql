-- =========================================================
-- SPIDER-VERSE PORTFOLIO SUPABASE DATABASE SCHEMA
-- Copy and paste this script into your Supabase SQL Editor
-- =========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  github_url TEXT,
  live_demo_url TEXT,
  image_url TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  skill_name TEXT NOT NULL,
  category TEXT NOT NULL,
  percentage INT CHECK (percentage BETWEEN 0 AND 100),
  icon TEXT DEFAULT 'code',
  display_order INT DEFAULT 0
);

-- 3. EXPERIENCE TABLE
CREATE TABLE IF NOT EXISTS public.experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  duration TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}'
);

-- 4. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL
);

-- 5. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  certificate_name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  credential_url TEXT
);

-- 6. SOCIAL LINKS TABLE
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT DEFAULT 'link'
);

-- 7. MESSAGES TABLE (Contact Submissions)
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. STATISTICS TABLE
CREATE TABLE IF NOT EXISTS public.statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  total_projects INT DEFAULT 28,
  github_repositories INT DEFAULT 34,
  technologies INT DEFAULT 18,
  certificates INT DEFAULT 8,
  experience_years INT DEFAULT 5
);

-- =========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.statistics ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public Read Experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Public Read Achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Public Read Certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public Read Social Links" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Public Read Statistics" ON public.statistics FOR SELECT USING (true);

-- Public Write Policy for Contact Messages
CREATE POLICY "Public Insert Messages" ON public.messages FOR INSERT WITH CHECK (true);

-- =========================================================
-- INITIAL SEED DATA
-- =========================================================

INSERT INTO public.projects (title, short_description, full_description, technologies, github_url, live_demo_url, image_url, featured, category)
VALUES
(
  'Quantum Web-Grid Engine',
  'High-throughput real-time spatial physics and telemetry dashboard.',
  'A high-performance interactive web dashboard visualizing real-time spatial node telemetry using HTML5 Canvas, WebGL, and Supabase Realtime sockets. Built to handle 60FPS physics simulations with zero latency drop.',
  ARRAY['JavaScript (ES6+)', 'Supabase Realtime', 'Canvas 2D Engine', 'GSAP', 'Node.js'],
  'https://github.com/example/quantum-web-grid',
  'https://quantum-web-grid.demo.app',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
  true,
  'Full Stack'
),
(
  'Multiverse API Gateway',
  'Sub-millisecond distributed API router with automated load balancing.',
  'A high-speed microservices API gateway designed for inter-dimensional data exchange. Provides rate limiting, JWT key rotation, live latency monitoring, and automated fallback failovers.',
  ARRAY['Node.js', 'Express', 'Redis', 'Docker', 'Supabase DB', 'PostgreSQL'],
  'https://github.com/example/multiverse-api-gateway',
  'https://api-gateway.demo.app',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  true,
  'Backend & DevOps'
),
(
  'Cyber-City Rain Synthesizer',
  'Generative Web Audio and multi-layered parallax canvas engine.',
  'An immersive browser experience fusing Web Audio API procedural sound design with dynamic neon skyline rendering. Users can tune atmospheric precipitation, thunder frequencies, and urban neon light pulses.',
  ARRAY['Vanilla JS', 'Web Audio API', 'HTML5 Canvas', 'CSS3 Glassmorphism'],
  'https://github.com/example/cyber-city-rain',
  'https://cyber-rain.demo.app',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
  true,
  'Creative Tech'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.skills (skill_name, category, percentage, icon, display_order)
VALUES
('JavaScript / TypeScript', 'frontend', 98, 'code', 1),
('Supabase & PostgreSQL', 'database', 92, 'database', 2),
('CSS3 / Neon Styling', 'frontend', 95, 'palette', 3),
('GSAP & Web Canvas', 'frontend', 94, 'zap', 4),
('Node.js & REST APIs', 'backend', 90, 'server', 5),
('Git & DevOps Pipeline', 'devops', 88, 'git-branch', 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.experience (company, role, duration, description, technologies)
VALUES
(
  'Multiverse Web Labs',
  'Lead Interactive Web Engineer',
  '2024 - Present',
  'Architecting high-performance web applications, 60FPS physics engines, and cloud microservices.',
  ARRAY['JavaScript', 'Canvas 2D', 'Supabase', 'GSAP', 'Vercel']
),
(
  'Stark Tech Division',
  'Full Stack Systems Engineer',
  '2022 - 2024',
  'Engineered real-time cloud data pipelines, RESTful API gateways, and developer dashboard UI portals.',
  ARRAY['Node.js', 'PostgreSQL', 'Express', 'Docker', 'Redis']
)
ON CONFLICT DO NOTHING;

INSERT INTO public.achievements (title, description, date)
VALUES
('Awwwards Site of the Day Candidate', 'Recognized for pioneering interactive canvas physics and Spider-Verse web design.', '2026'),
('Best Microservices Architecture', 'Awarded first place in Global Cloud Infrastructure Hackathon.', '2025')
ON CONFLICT DO NOTHING;

INSERT INTO public.certificates (certificate_name, issuer, issue_date, credential_url)
VALUES
('Certified Cloud Developer & Systems Architect', 'Cloud Native Computing Foundation', '2025', 'https://credential.example.com/cloud-arch'),
('Advanced Full Stack Engineering Mastery', 'Meta Developer Network', '2024', 'https://credential.example.com/fullstack')
ON CONFLICT DO NOTHING;

INSERT INTO public.social_links (platform, url, icon)
VALUES
('GitHub', 'https://github.com/', 'github'),
('LinkedIn', 'https://linkedin.com/', 'linkedin'),
('Twitter / X', 'https://twitter.com/', 'twitter'),
('Discord', 'https://discord.com/', 'message-square')
ON CONFLICT DO NOTHING;

INSERT INTO public.statistics (total_projects, github_repositories, technologies, certificates, experience_years)
VALUES (28, 34, 18, 8, 5)
ON CONFLICT DO NOTHING;
