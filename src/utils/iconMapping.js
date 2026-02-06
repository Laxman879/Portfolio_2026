// Auto icon mapping for common technologies
export const iconMapping = {
  // Frontend Frameworks
  "react": "FaReact",
  "nextjs": "SiNextdotjs",
  "next.js": "SiNextdotjs",
  "vue": "FaVuejs",
  "vuejs": "FaVuejs",
  "angular": "FaAngular",
  "svelte": "SiSvelte",
  
  // Backend
  "nodejs": "FaNodeJs",
  "node.js": "FaNodeJs",
  "node": "FaNodeJs",
  "express": "SiExpress",
  "nestjs": "SiNestjs",
  "django": "SiDjango",
  "flask": "SiFlask",
  "laravel": "FaLaravel",
  "php": "FaPhp",
  
  // Languages
  "javascript": "SiJavascript",
  "typescript": "SiTypescript",
  "python": "FaPython",
  "java": "FaJava",
  "csharp": "SiCsharp",
  "c#": "SiCsharp",
  "go": "FaGolang",
  "rust": "SiRust",
  "ruby": "SiRuby",
  
  // Databases
  "mongodb": "SiMongodb",
  "mysql": "SiMysql",
  "postgresql": "SiPostgresql",
  "redis": "SiRedis",
  "firebase": "SiFirebase",
  
  // Cloud & DevOps
  "aws": "FaAws",
  "azure": "SiMicrosoftazure",
  "gcp": "SiGooglecloud",
  "docker": "FaDocker",
  "kubernetes": "SiKubernetes",
  "jenkins": "SiJenkins",
  
  // Automation & Integration
  "n8n": "SiN8n",
  "zapier": "SiZapier",
  "make": "SiMake",
  "integromat": "SiMake",
  
  // CSS & Styling
  "css": "FaCss3Alt",
  "sass": "FaSassAlt",
  "tailwind": "SiTailwindcss",
  "tailwindcss": "SiTailwindcss",
  "bootstrap": "FaBootstrap",
  
  // Tools
  "git": "FaGitAlt",
  "github": "FaGithub",
  "gitlab": "FaGitlab",
  "figma": "FaFigma",
  "vscode": "SiVisualstudiocode",
  "npm": "FaNpm",
  "yarn": "FaYarn",
  "webpack": "SiWebpack",
  "vite": "SiVite",
};

export function getAutoIcon(techName) {
  if (!techName) return null;
  const normalized = techName.toLowerCase().trim().replace(/\s+/g, "");
  return iconMapping[normalized] || null;
}
