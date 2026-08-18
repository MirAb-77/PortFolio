import type { Service } from "../ServiceCard";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const services: Service[] = [
  {
    title: "AI & Machine Learning",
    description:
      "Predictive models and classification systems, built for real deployment — not demos.",
    tags: ["PyTorch", "scikit-learn", "MLOps"],
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="5" r="2.2" />
        <circle cx="5" cy="14" r="2.2" />
        <circle cx="19" cy="14" r="2.2" />
        <circle cx="12" cy="19.5" r="1.6" />
        <path d="M12 7.2v3M6.7 15.4l3.6-1M17.3 15.4l-3.6-1M9.8 16.6l1.3 1.4M14.2 16.6l-1.3 1.4" />
      </svg>
    ),
  },
  {
    title: "Generative AI & LLM Solutions",
    description:
      "LLM-powered apps, RAG pipelines, and conversational systems that reason over your data.",
    tags: ["RAG", "Agents", "Groq / OpenAI"],
    icon: (
      <svg {...iconProps}>
        <path d="M4 5.5h16v10H9.5L5 19v-3.5H4v-10z" />
        <path d="M8 9.5h8M8 12.5h5" />
      </svg>
    ),
  },
  {
    title: "Computer Vision",
    description:
      "Real-time detection, tracking, and video analytics using YOLO and OpenCV.",
    tags: ["YOLO", "OpenCV", "MediaPipe"],
    icon: (
      <svg {...iconProps}>
        <path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "AI Agents & Automation",
    description:
      "Autonomous agents and tool-calling workflows that connect LLMs to real APIs and actions.",
    tags: ["ReAct", "n8n", "Tool calling"],
    icon: (
      <svg {...iconProps}>
        <circle cx="6" cy="6" r="2.2" />
        <circle cx="18" cy="6" r="2.2" />
        <circle cx="12" cy="18" r="2.2" />
        <path d="M7.8 7.3 10.5 16M16.2 7.3 13.5 16M8.2 6h7.6" />
      </svg>
    ),
  },
  {
    title: "Data Science & Analytics",
    description:
      "Turning raw data into decisions — statistical modeling, feature engineering, visualization.",
    tags: ["Pandas", "SQL", "Visualization"],
    icon: (
      <svg {...iconProps}>
        <path d="M4 20V10M10 20V4M16 20v-7M20 20v-3" />
        <path d="M3 20h18" />
      </svg>
    ),
  },
  {
    title: "Data Engineering & Big Data",
    description:
      "Scalable pipelines and data infrastructure for AI systems that need to run reliably.",
    tags: ["Spark", "Kafka", "Docker"],
    icon: (
      <svg {...iconProps}>
        <ellipse cx="12" cy="6" rx="7" ry="2.5" />
        <path d="M5 6v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6" />
        <path d="M5 12v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
      </svg>
    ),
  },
  {
    title: "Full-Stack AI Applications",
    description:
      "End-to-end AI products — FastAPI/Django backends wired to usable, production frontends.",
    tags: ["FastAPI", "Django", "React"],
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="12" rx="1.5" />
        <path d="M8 20h8M12 16v4" />
      </svg>
    ),
  },
];
