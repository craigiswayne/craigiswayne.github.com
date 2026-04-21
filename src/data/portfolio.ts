import jsonData from '@/public/data.json'

export const portfolioData = {
  personal: {
    name: jsonData.first_names,
    title: jsonData.latest_role,
    summary: jsonData.summary,
    yearsOfExperience: 8,
    email: jsonData.contact.email,
    cvPath: "/Resume-CraigWayneGovender.pdf",
    cvFileName: "Resume-CraigWayneGovender.pdf",
    profileImage: "/profile.png",
    socialLinks: {
      github: `https://github.com/${jsonData.social.github}`,
      linkedin: `https://www.linkedin.com/in/${jsonData.social.linkedin}`,
    },
  },
  about: {
    subtitle: "Building the Future of Web",
    description:
      "With over 10 years of experience in development, I've helped startups and enterprise companies create digital products that users love. My passion lies in crafting secure, scalable architecture and intuitive interfaces.",
    journey: [
      "I started my career as a curious developer fascinated by the intersection of design and technology",
      "Today, I focus on building scalable full stack systems, mentoring teams, and staying at the forefront of web technology. I believe great software is not just about code—it's about solving real problems for real people.",
    ],
    highlights: [
      {
        icon: "Code",
        title: "Clean Code Advocate",
        description:
          "Writing maintainable, scalable code that follows industry best practices and modern standards.",
      },
      {
        icon: "Users",
        title: "Team Leadership",
        description:
          "Leading development teams and mentoring junior developers to achieve collective success.",
      },
      {
        icon: "Zap",
        title: "Performance Focused",
        description:
          "Optimizing applications for speed, accessibility, and exceptional user experiences.",
      },
      {
        icon: "Target",
        title: "Business Impact",
        description:
          "Translating business requirements into technical solutions that drive measurable results.",
      },
    ],
    expertise: [
      {
        skill: ".Net / C#",
        level: "Expert",
      },
      {
        skill: "JavaScript / TypeScript",
        level: "Expert",
      },
      {
        skill: "SQL / NoSQL",
        level: "Expert",
      },
      {
        skill: "CSS/SCSS",
        level: "Expert",
      },
      {
        skill: "DevOps",
        level: "Expert",
      },
      {
        skill: "API Design",
        level: "Expert",
      },
      {
        skill: "Team Leadership",
        level: "Advanced",
      },
    ],
  },
  skills: {
    subtitle: "Technologies I Work With",
    description:
      "A comprehensive toolkit built over years of experience, constantly evolving with the latest industry trends and best practices.",
    categories: [
      {
        title: "Backend & Cloud",
        skills: [
          ".NET",
          "C#",
          "Entity Framework",
          "SQL Server",
          "Node.js",
          "REST APIs",
          "Firebase",
          "AWS",
          "Netlify",
          "Docker",
          "Azure DevOps",
          "PHP",
        ],
      },
      {
        title: "Frontend Technologies",
        skills: [
          "TypeScript",
          "Angular",
          "React",
          "Vue",
          "CSS3",
          "SCSS",
          "Next.js",
          "JavaScript (ES6+)",
          "HTML5",
          "Tailwind CSS",
          "Styled Components",
          "WebGL",
          "WordPress",
        ],
      },
      {
        title: "Architecture & Best Practices",
        skills: [
          "Component Architecture",
          "Design Patterns",
          "Performance Optimization",
          "Accessibility (WCAG)",
          "SEO",
          "Code Review",
          "CI/CD",
          "Agile/Scrum",
        ],
      },
      {
        title: "Development Tools",
        skills: [
          "Webpack",
          "Vite",
          "npm/yarn",
          "Storybook",
          "Figma",
          "Adobe XD",
        ],
      },
    ],
  },
  projects: {
    subtitle: "Recent Work",
    description:
      "A selection of projects that showcase my expertise in building scalable web applications and solving complex technical challenges.",
    featured: [
      {
        title: "Teefz Crash Game",
        description:
          "Casino Web Crash Game developed using Three.JS",
        image: "/teefz.png",
        technologies: [
          "Three.JS",
          "Angular",
          "TypeScript",
          "WebGL",
        ],
        liveUrl: "",
        githubUrl:
          "https://github.com/craigiswayne/angular-casino",
      },
      {
        title: "SAASQuash",
        description: "Locally hosted image compression tool",
        image: "/saasquash.png",
        technologies: [
          "Angular",
          "Typescript",
          "Node.js",
          "Node.js",
          "Agentic",
        ],
        liveUrl: "",
        githubUrl: "https://github.com/craigiswayne/saasquash",
      },
      {
        title: "UROC Demo Launcher",
        description:
          "Album Cover style demo launcher for games built within UROC",
        image: "/uroc_demo_launcher.png",
        technologies: ["TypeScript", "GSAP", "SCSS"],
        liveUrl: "https://gamedemos.uroc.com",
        githubUrl:
          "https://github.com/craigiswayne/uroc-demo-launcher-coverflow",
      },
    ],
  },
  experience: {
    subtitle: "Work Experience",
    description:
      "Over 10 years of experience building exceptional web applications, leading teams, and driving technical innovation.",
    positions: jsonData.work_experience
  },
  contact: {
    subtitle: "Let's Work Together",
    description:
      "I'm always interested in new opportunities and exciting projects. Whether you're looking for a team lead, consultant, or collaborator, let's discuss how we can create something amazing together.",
    methods: [
      {
        type: "email",
        icon: "Mail",
        title: "Email Me",
        description:
          "For project inquiries and collaboration opportunities",
        action: jsonData.contact.email,
        actionType: "email",
      },
    ],
    lookingFor: [
      {
        title: "Senior/Lead Roles",
        description:
          "Technical leadership positions where I can mentor teams and drive architectural decisions.",
      },
      {
        title: "Innovative Projects",
        description:
          "Cutting-edge applications using the latest web technologies and modern development practices.",
      },
      {
        title: "Remote-First Culture",
        description:
          "Companies with strong remote collaboration practices and flexible work arrangements.",
      },
    ],
  },
  navigation: [
    { label: "About", target: "about" },
    { label: "Skills", target: "skills" },
    { label: "Projects", target: "projects" },
    { label: "Experience", target: "experience" },
    { label: "Contact", target: "contact" },
  ],
  footer: {
    copyright: `© 2011 - ${new Date().getFullYear()}`,
    tagline:
      "Open to new opportunities • Available for freelance projects",
  },
};
