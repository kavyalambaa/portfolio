/* ========================================================
   GITHUB REST API INTEGRATION SERVICE
   ======================================================== */

const GITHUB_USERNAME = 'octocat'; // Can be customized by user

const MOCK_GITHUB_REPOS = [
  {
    name: 'spiderverse-multiverse-portfolio',
    description: 'Award-winning interactive Spider-Verse OS portfolio website with canvas web physics and GSAP.',
    stargazers_count: 84,
    forks_count: 19,
    language: 'JavaScript',
    html_url: 'https://github.com/'
  },
  {
    name: 'quantum-canvas-physics',
    description: 'Verlet integration rope and web physics simulation engine for modern web apps.',
    stargazers_count: 142,
    forks_count: 31,
    language: 'TypeScript',
    html_url: 'https://github.com/'
  },
  {
    name: 'supabase-realtime-telemetry',
    description: 'High-throughput real-time websocket data stream dashboard.',
    stargazers_count: 96,
    forks_count: 14,
    language: 'JavaScript',
    html_url: 'https://github.com/'
  },
  {
    name: 'cyberpunk-soundscape-engine',
    description: 'Procedural Web Audio API sound synthesizer with zero external audio assets.',
    stargazers_count: 210,
    forks_count: 45,
    language: 'HTML',
    html_url: 'https://github.com/'
  }
];

export async function fetchGitHubUserStats(username = GITHUB_USERNAME) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const repos = await res.json();
    return repos;
  } catch (err) {
    console.warn('GitHub API fetch failed, returning mock fallback data.', err);
    return MOCK_GITHUB_REPOS;
  }
}
