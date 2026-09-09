import type { ComponentType } from "react";
import {
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiGo,
  SiRedis,
  SiMongodb,
  SiSocketdotio,
  SiWebrtc,
  SiFirebase,
  SiPython,
  SiDocker,
  SiExpress,
} from "react-icons/si";
import type { TechKey } from "@/lib/projects";

export type TechIcon = ComponentType<{ className?: string }>;

export const iconMap: Record<TechKey, TechIcon> = {
  ts: SiTypescript,
  react: SiReact,
  node: SiNodedotjs,
  go: SiGo,
  redis: SiRedis,
  mongodb: SiMongodb,
  socketio: SiSocketdotio,
  webrtc: SiWebrtc,
  firebase: SiFirebase,
  python: SiPython,
  docker: SiDocker,
  express: SiExpress,
};

export const techNames: Record<TechKey, string> = {
  ts: "TypeScript",
  react: "React",
  node: "Node.js",
  go: "Go",
  redis: "Redis",
  mongodb: "MongoDB",
  socketio: "Socket.io",
  webrtc: "WebRTC",
  firebase: "Firebase",
  python: "Python",
  docker: "Docker",
  express: "Express",
};

export const STATUS_META = {
  shipped: { dot: "bg-emerald-500", label: "All Systems Operational" },
  building: { dot: "bg-amber-500", label: "Building" },
  planned: { dot: "bg-neutral-400", label: "Not Started Yet" },
} as const;
