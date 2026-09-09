export const site = {
  name: "Avijit Sen",
  shortName: "Avijit",
  initials: "AS",
  handle: "ashavijit",
  role: "Software Engineer",
  company: "Hoichoi",
  location: "India",
  url: "https://ashavijit.dev",
  email: "avijitsen24.me@gmail.com",
  phone: "+91 8250 325 238",
  description:
    "Software Engineer — I build low-latency backends and fast web clients in Go, TypeScript and Python.",
  bio: [
    "Software Engineer at Hoichoi — I build low-latency backends and fast web clients.",
    "Go, TypeScript and Python. Streaming, payments and analytics at scale.",
    "I care about p95s, not averages.",
  ],
  avatar: "/avijit-avatar.jpg",
  // Contribution graphs + PR feeds are pulled for both accounts.
  githubAccounts: [
    { label: "Personal", username: "ashavijit" },
    { label: "Work", username: "avijit213" },
  ],
  socials: {
    github: "https://github.com/ashavijit",
    githubWork: "https://github.com/avijit213",
    linkedin: "https://linkedin.com/in/avijit-sen-69a00b1b9",
    leetcode: "https://leetcode.com/shellpy03",
    x: "https://x.com/Avijitsen123",
    email: "mailto:avijitsen24.me@gmail.com",
  },
  education: {
    school: "Jalpaiguri Government Engineering College",
    degree: "B.Tech in Information Technology",
    grade: "GPA 9.1 / 10.0",
    dates: "Oct 2020 — Jul 2024",
    location: "Jalpaiguri, West Bengal",
  },
} as const;

export default site;
