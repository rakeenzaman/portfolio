export interface TimelineEntry {
  kind: 'work' | 'education'
  title: string
  subtitle: string
  org: string
  dates: string
  bullets?: string[]
  current?: boolean
}

export interface SkillCategory {
  name: string
  skills: string[]
}

export interface Project {
  name: string
  languages: string
  description: string
  liveDemoUrl?: string
}

export const aboutMe =
  'I am a full-stack web developer with a passion for crafting seamless, responsive, and visually engaging user experiences. With over three years of professional experience in web development, I have a Master’s degree in Computer Science and a Bachelor’s degree in Software Engineering from Mississippi State University. Thank you for checking out my portfolio!'

export const timeline: TimelineEntry[] = [
  {
    kind: 'work',
    title: 'Full-Stack Software Developer',
    subtitle: 'Web Development Team - C Spire Business',
    org: 'C Spire - Ridgeland, MS',
    dates: 'May 2023 - Present',
    current: true,
    bullets: [
      'Developed and maintained enterprise web applications using Angular (Typescript, HTML, CSS) and Spring Boot (Java).',
      'Designed and implemented RESTful APIs and microservices using Spring Boot.',
      'Translated business requirements and Figma design mockups into functional, responsive applications.',
      'Conducted regression testing to prevent software defects from being released to customers.',
      'Monitored and troubleshot production issues by analyzing application logs using Splunk, identifying root causes, and deploying fixes.',
      'Collaborated with project managers, designers, QA, and other cross-functional teams to deliver high-quality features that meet the needs of the business and the customers.',
    ],
  },
  {
    kind: 'education',
    title: "Master's",
    subtitle: 'Computer Science',
    org: 'Mississippi State University',
    dates: '2024',
  },
  {
    kind: 'work',
    title: 'Graduate Teaching Assistant',
    subtitle: 'Intermediate Computer Programming (C++)',
    org: 'Mississippi State University',
    dates: 'August 2022 - May 2023',
    bullets: [
      'Led weekly lab sessions and provided one-on-one support to help students master C++ programming concepts for the Intermediate Computer Programming class.',
      'Graded weekly programming assignments for hundreds of students, delivering constructive feedback to improve code quality.',
      'Assisted students with debugging code and exam preparation during office hours.',
    ],
  },
  {
    kind: 'work',
    title: 'Software Development Internship',
    subtitle: 'Web Development Team - DevOps',
    org: 'C Spire - Ridgeland, MS',
    dates: 'June 2022 - July 2022',
    bullets: [
      'Created and optimized scripts for Jenkins pipelines to automate the management and deployment of applications across multiple development environments.',
      'Wrote Splunk queries to monitor and identify issues in application logs.',
    ],
  },
  {
    kind: 'education',
    title: "Bachelor's",
    subtitle: 'Software Engineering',
    org: 'Mississippi State University',
    dates: '2022',
  },
]

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: ['Angular', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
  },
  { name: 'Backend & CMS', skills: ['Java', 'Spring Boot', 'Python', 'Sanity CMS'] },
  { name: 'Tools & Cloud', skills: ['Git', 'GitHub', 'GitLab', 'Vercel', 'Jenkins'] },
]

export const projects: Project[] = [
  {
    name: 'Masters Project',
    languages: 'C++, Clang, JavaScript, CSS, HTML, Node.js',
    description:
      "Visualizes control flow of C++ code by ingesting C++ code via a web interface, generating an Abstract Syntax Tree using Clang, traversing the AST to extract control flow information, and rendering control flow graphs in the browser using D3.js and Graphviz. Created for my Master's research project at Mississippi State University.",
  },
  {
    name: 'Video Compressor',
    liveDemoUrl: 'will add later',
    languages: 'Angular, TypeScript, SCSS, HTML, FFmpeg.wasm',
    description:
      'Compresses video files directly in the browser using FFmpeg.wasm, allowing users to drag and drop a video into the browser window, select compression settings, and download the compressed video without any server-side processing. Built with Angular.',
  },
  {
    name: 'Spin The Wheel',
    liveDemoUrl: 'will add later',
    languages: 'Angular, TypeScript, SCSS, HTML',
    description:
      'A fun Angular app that allows users to create customizable spinning wheels for decision-making or games.',
  },
  {
    name: 'Statify',
    languages: 'Angular, TypeScript, SCSS, HTML, Spotify API',
    description:
      'Analyzes a user’s Spotify listening habits by connecting to the Spotify API to fetch data on their top tracks and artists. Built with Angular.',
  },
  {
    name: 'Portfolio',
    languages: 'Angular, TypeScript, SCSS, HTML',
    description:
      "You're looking at it! My personal portfolio website built with Angular to showcase my skills, experience, and projects.",
  },
]

export const githubUrl = 'https://github.com/rakeenzaman'
export const contactEmail = 'email@email.com'
