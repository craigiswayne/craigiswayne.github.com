const abstracted_data = {
  name: "Craig Wayne",
  username: "craigiswayne",
  email: "craigiswayne@gmail.com",
};

export const portfolioData = {
  personal: {
    name: abstracted_data.name,
    title: "Full Stack Javascript Engineer",
    availabilityStatus: "Available for new opportunities",
    description:
      "Crafting exceptional digital experiences with modern web technologies. Specializing in TypeScript stacks, and creating scalable architectures that drive business growth.",
    yearsOfExperience: 8,
    email: abstracted_data.email,
    cvPath: "/CV-CraigWayne.pdf",
    cvFileName: "CV-CraigWayne.pdf",
    profileImage: "/profile.png",
    socialLinks: {
      github: "https://github.com/craigiswayne",
      linkedin: "https://www.linkedin.com/in/craigiswayne",
    },
  },
  about: {
    subtitle: "Building the Future of Web",
    description:
      "With over 10 years of experience in javascript development, I've helped startups and enterprise companies create digital products that users love. My passion lies in crafting intuitive interfaces and scalable architectures.",
    journey: [
      "I started my career as a curious developer fascinated by the intersection of design and technology. Over the years, I've evolved from writing my first HTML page to architecting complex applications used by millions.",
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
          "Leading frontend teams and mentoring junior developers to achieve collective success.",
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
        skill: "JavaScript/TypeScript",
        level: "Expert",
      },
      {
        skill: "CSS/SCSS",
        level: "Expert",
      },
      {
        skill: "Cloud Architecture",
        level: "Expert",
      },
      {
        skill: "API Design",
        level: "Expert",
      },
      {
        skill: "React/Vue/Next.js",
        level: "Advanced",
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
        title: "Development Tools",
        skills: [
          "Git",
          "Webpack",
          "Vite",
          "npm/yarn",
          "ESLint",
          "Prettier",
          "Jest",
          "Cypress",
          "Storybook",
          "Figma",
          "Adobe XD",
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
        title: "Backend & Cloud",
        skills: [
          "Node.js",
          "REST APIs",
          "Firebase",
          "PHP",
          ".NET",
          "AWS",
          "Netlify",
          "Docker",
          "Azure DevOps",
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
    subtitle: "Professional Journey",
    description:
      "Over 10 years of experience building exceptional web applications, leading teams, and driving technical innovation.",
    positions: [
      {
        company: "UROC Studios",
        company_url: "https://uroc.com/",
        companyLogo: "/logo_uroc_studios.jpeg",
        position: "Full Stack Javascript Engineer",
        date_start: "2024-11",
        location: "Douglas, Isle of Man",
        description:
          "Design and Develop Slot, Scratch and Crash Games",
        achievements: [
          "Maintain and Deploy our various games",
          "Work closely with the design and qa team to ensure that the games are according to spec",
          "Develop and maintain unit tests",
          "Automation wrt deployments, builds, testing",
          "Build bespoke tools to facilitate with development of our games",
          "Maintenance and development of the corporate website",
        ],
        technologies: [
          "PixiJS",
          "Unity",
          "WebGL",
          "2D/3D",
          "Angular",
          "Three.JS",
          "Typescript",
          "Game Development",
        ],
      },
      {
        company: "Microgaming",
        company_url: "https://www.microgaming.co.uk/",
        companyLogo: "/logo_microgaming.png",
        position: "Senior Frontend Developer",
        date_start: "2022-10",
        date_end: "2024-10",
        location: "Cape Town, South Africa",
        description:
          "Creating and maintaining in-house solutions to improve business processes",
        achievements: [
          "2IC to the Tech Lead. Providing insights into architecting several micro-services to improve performance, delivery and disaster recovery",
          "Mentoring of juniors in tech and business acumen.",
          "Service Desk Support",
          "Desktop Support",
          "Software Installation for Games Global Employees",
          "Maintaining Power Automate Workflows",
          "Maintenance of Customer Facing Applications",
          "Studio Website Development and Maintenance",
          "Project Management",
        ],
        technologies: [
          ".NET",
          "PHP",
          "TypeScript",
          "Angular",
          "React",
          "Typescript",
          "Docker",
          "Azure DevOps",
          "Shell Scripting",
          "Back Office",
        ],
      },
      {
        company: "Rank Interactive",
        company_url: "https://www.rank.com/",
        companyLogo: "/rank_interactive_logo.jpeg",
        position: "Senior Frontend Engineer",
        date_start: "2020-09",
        date_end: "2022-08",
        location: "Cape Town, South Africa",
        description:
          "Development and maintenance of the in-house cashier services on several Casinos and Bingo operators in the UK.",
        achievements: [
          "Responsible for capturing Player Card Details and integrating with payment systems such as VISA, PayPal and Barclays.",
          "Our cashier systems also handle promoting bonuses and promotions to the player which they could redeem through the app.",
          "Our cashier app is built to withstand large amounts of traffic whilst implementing UI and UX best practices. On any given day, it handles approximately 80,000 transactions.",
          "Maintaining unit tests coupled with continuous integration pipelines",
        ],
        technologies: [
          "Angular",
          "Typescript",
          "Elastic Stack (ELK)",
          "Docker",
          "Node.js",
          "CI/CD",
          "Docker",
        ],
      },
      {
        company: "Digioutsource",
        company_url:
          "https://supergroup.com/companies/digi-outsource/",
        companyLogo: "/logo_digioutsource.webp",
        position: "Intermediate Web Developer",
        date_start: "2019-02",
        date_end: "2020-08",
        location: "Cape Town, South Africa",
        description:
          "Primarily responsible for updating and maintaining an in house CMS that serves a multinational casino base",
        achievements: [
          "Mentoring colleagues and trainees on the business landscape as well as current best practices within our industry.",
          "Rotational After hours support and Tech assistance.",
          "2IC to the Team Lead and responsible for mentoring the junior / intermediate colleagues.",
          "The CI/CD process leverages GitLabs Pipelines integrating tightly with Kubernetes",
        ],
        technologies: [
          ".NET",
          "MongoDB",
          "Elastic Stack (ELK)",
          "Angular",
          "Typescript",
          "Typescript",
        ],
      },
      {
        company: "Media24",
        company_url: "https://www.media24.com/",
        companyLogo: "/logo_media24.png",
        position: "Senior WordPress Developer",
        date_start: "2015-03",
        date_end: "2018-12",
        location: "Cape Town, South Africa",
        description:
          "Design and Develop WordPress Sites to promote the various media brands under the Media24 umbrella",
        achievements: [
          "Design and Develop WordPress Websites",
          "Develop bespoke Themes and Plugins",
          "Collaborate with Designers to bring their ideas to fruition",
          "Mentoring Juniors and upskilling team members",
          "Evaluate and provide solutions to security concerns",
          "Manage the infrastructure and deployment of over 20 brands",
        ],
        technologies: [
          "PHP",
          "WordPress",
          "React",
          "SCSS",
          "Typescript",
          "Javascript",
          "CI/CD",
          "Docker",
        ],
      },
    ],
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
        action: abstracted_data.email,
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
    copyright: `© 2025 ${abstracted_data.name}. Built with React, TypeScript, and Tailwind CSS.`,
    tagline:
      "Open to new opportunities • Available for freelance projects",
  },
};
