export type TechKey =
  | "ts"
  | "react"
  | "node"
  | "go"
  | "redis"
  | "mongodb"
  | "socketio"
  | "webrtc"
  | "firebase"
  | "python"
  | "docker"
  | "express";

export type TechItem = TechKey | { label: string; tooltip?: string };

export type ProjectStatus = "shipped" | "building" | "planned";

export interface Project {
  slug: string;
  title: string;
  /** One-liner used on the card. */
  tagline: string;
  /** Longer pitch used on the detail page. */
  summary: string;
  /** What it actually does, bullet by bullet. */
  highlights: string[];
  /** Notable engineering decisions worth calling out. */
  notes?: string[];
  year: string;
  language: string;
  src: string;
  lightModeSrc?: string;
  backgroundImage?: string;
  lightModeBackgroundImage?: string;
  video?: string;
  tech: TechItem[];
  github: string;
  live?: string;
  liveLabel?: string;
  starsText?: string;
  status?: ProjectStatus;
}

export const projects: Project[] = [
  {
    slug: "fluxfile",
    title: "FluxFile",
    tagline:
      "Task automation in Go with a custom DSL — dependency graphs resolved by topological sort, file-hash caching that cuts rebuilds by 60%, parallel goroutine execution and Docker/SSH remote runs.",
    summary:
      "A config-file alternative to Makefile. FluxFile takes a declarative task file, works out what actually needs to run, and runs only that — in parallel, locally or on a remote host.",
    highlights: [
      "Custom DSL for declaring tasks and their dependencies, so build graphs read like configuration rather than shell glue.",
      "Dependency resolution via topological sorting — cycles are caught up front instead of hanging halfway through a build.",
      "File-hash based caching that skips unchanged work, cutting rebuild times by roughly 60%.",
      "Parallel task execution using goroutines, bounded so a wide graph doesn't thrash the machine.",
      "Remote execution over Docker and SSH, so the same task file runs on a laptop or a build box.",
    ],
    notes: [
      "Hashing inputs rather than comparing timestamps means the cache stays correct across checkouts and clock skew.",
    ],
    year: "Jan 2025",
    language: "Go",
    src: "/covers/fluxfile.svg",
    lightModeSrc: "/covers/fluxfile-light.svg",
    backgroundImage: "/covers/fluxfile-bg.svg",
    lightModeBackgroundImage: "/covers/fluxfile-bg-light.svg",
    tech: [
      "go",
      "docker",
      { label: "DAG", tooltip: "Topological sort dependency resolution" },
      { label: "Cache", tooltip: "File-hash based build caching" },
    ],
    github: "https://github.com/ashavijit/fluxfile",
    starsText: "1 GitHub Star",
  },
  {
    slug: "queuex",
    title: "QueueX",
    tagline:
      "A TypeScript job queue library: exponential/linear/fixed retry backoff, job chaining, priority queues, DAG dependencies, rate limiting and real-time metrics over Redis pub/sub.",
    summary:
      "A lightweight job queue SDK for Node. Redis-backed, typed end to end, and opinionated about the things queues usually get wrong — retries, ordering and visibility.",
    highlights: [
      "Three retry strategies out of the box — exponential, linear and fixed backoff — configurable per job rather than per queue.",
      "Job chaining and DAG-based dependencies, so a job can wait on the completion of several upstream jobs.",
      "Priority queues with fair scheduling, so high-priority work doesn't starve everything behind it.",
      "Rate limiting per queue to protect downstream services from a backlog draining all at once.",
      "Real-time metrics and event logging pushed over Redis pub/sub.",
    ],
    notes: [
      "Fully typed job payloads — the queue name determines the payload type, so a mistyped enqueue fails at compile time.",
    ],
    year: "Dec 2024",
    language: "TypeScript",
    src: "/covers/queuex.svg",
    lightModeSrc: "/covers/queuex-light.svg",
    backgroundImage: "/covers/queuex-bg.svg",
    lightModeBackgroundImage: "/covers/queuex-bg-light.svg",
    tech: ["ts", "node", "redis", { label: "DAG", tooltip: "DAG-based job dependencies" }],
    github: "https://github.com/ashavijit/queuex",
    starsText: "4 GitHub Stars",
  },
  {
    slug: "meetify",
    title: "Meetify",
    tagline:
      "Real-time video conferencing on WebRTC peer-to-peer with Socket.io signalling and MongoDB chat persistence — room management and screen sharing included.",
    summary:
      "A MERN-stack video conferencing app. Media flows peer-to-peer over WebRTC; the server only handles signalling, room state and chat history.",
    highlights: [
      "Peer-to-peer audio and video over WebRTC — media never round-trips through the server.",
      "Socket.io signalling for offer/answer exchange, ICE candidate trickling and presence.",
      "Room management with join codes, participant lists and host controls.",
      "Screen sharing via display-media track replacement on the live peer connection.",
      "Chat persisted to MongoDB so messages survive a refresh mid-call.",
    ],
    year: "Oct 2021",
    language: "JavaScript",
    src: "/covers/meetify.svg",
    lightModeSrc: "/covers/meetify-light.svg",
    backgroundImage: "/covers/meetify-bg.svg",
    lightModeBackgroundImage: "/covers/meetify-bg-light.svg",
    tech: ["react", "webrtc", "socketio", "mongodb", "express", "firebase"],
    github: "https://github.com/ashavijit/Meetify",
    live: "https://meetify-web-app.netlify.app/",
    liveLabel: "Live demo",
    starsText: "13 GitHub Stars",
  },
  {
    slug: "hookrunner",
    title: "HookRunner",
    tagline:
      "A cross-platform pre-commit hook system in Go — declarative hook config that runs the same way on every machine and in CI.",
    summary:
      "Git hooks that behave identically on macOS, Linux and Windows. A single binary reads declarative config and runs your checks — no Python environment, no per-developer setup drift.",
    highlights: [
      "Declarative hook configuration checked into the repo, so every contributor runs the same checks.",
      "Single static Go binary — no runtime or package manager to install first.",
      "Cross-platform by design: the same config works on macOS, Linux and Windows shells.",
      "Runs the same locally and in CI, which removes the 'passes on my machine' class of hook failures.",
    ],
    year: "2025",
    language: "Go",
    src: "/covers/hookrunner.svg",
    lightModeSrc: "/covers/hookrunner-light.svg",
    backgroundImage: "/covers/hookrunner-bg.svg",
    lightModeBackgroundImage: "/covers/hookrunner-bg-light.svg",
    tech: ["go", { label: "git hooks" }, { label: "CI/CD" }],
    github: "https://github.com/ashavijit/HookRunner",
    starsText: "4 GitHub Stars",
  },
  {
    slug: "swiftbench",
    title: "SwiftBench",
    tagline:
      "A fast, zero-config API benchmarking tool built for real traffic simulation — percentile latency reporting instead of misleading averages.",
    summary:
      "An API benchmarking tool that simulates realistic traffic rather than hammering one endpoint in a loop. Reports the percentiles that actually matter when you're on call.",
    highlights: [
      "Zero-config start — point it at an endpoint and it runs a sensible default load profile.",
      "Traffic simulation with configurable virtual users and ramp-up, closer to real load than a flat loop.",
      "Percentile reporting (p50/p95/p99) rather than averages, which hide the tail entirely.",
      "Failure and timeout accounting kept separate from latency, so a fast error isn't counted as a fast response.",
    ],
    year: "2025",
    language: "TypeScript",
    src: "/covers/swiftbench.svg",
    lightModeSrc: "/covers/swiftbench-light.svg",
    backgroundImage: "/covers/swiftbench-bg.svg",
    lightModeBackgroundImage: "/covers/swiftbench-bg-light.svg",
    tech: ["ts", "node", { label: "Load test" }],
    github: "https://github.com/ashavijit/swiftbench",
    live: "https://ashavijit.github.io/swiftbench/",
    liveLabel: "Docs",
  },
  {
    slug: "pyxios",
    title: "Pyxios",
    tagline:
      "A developer-experience-first HTTP client for Python inspired by Axios — interceptors, retries and a real network orchestration layer. Published on PyPI as axios_python.",
    summary:
      "Python has excellent HTTP transports — requests, httpx, aiohttp — but they stop at sending a request and returning a response. Pyxios adds the orchestration layer modern apps actually need.",
    highlights: [
      "Request and response interceptors, so auth, tracing and logging live in one place instead of every call site.",
      "Built-in retry handling with configurable policies rather than hand-rolled loops.",
      "Axios-style ergonomics — instances with a base URL and shared defaults.",
      "Published to PyPI as axios_python, with versioned docs.",
    ],
    year: "2025",
    language: "Python",
    src: "/covers/pyxios.svg",
    lightModeSrc: "/covers/pyxios-light.svg",
    backgroundImage: "/covers/pyxios-bg.svg",
    lightModeBackgroundImage: "/covers/pyxios-bg-light.svg",
    tech: ["python", { label: "HTTP" }, { label: "PyPI" }],
    github: "https://github.com/ashavijit/pyxios",
    live: "https://pypi.org/project/axios_python/",
    liveLabel: "PyPI",
    starsText: "2 GitHub Stars",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export default projects;
