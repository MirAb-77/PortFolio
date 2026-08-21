import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface Project {
  name: string;
  category: string;
  tools: string;
  image?: string | string[];
}

const projects: Project[] = [
  {
    name: "HealMatrix AI",
    category: "Multimodal Mental Health Assistant",
    tools: "Python, PyTorch, LLaMA 3.3 70B, FAISS, LangGraph, Twilio, RAG, AI Agents, Django"
    image: ["/images/projects/h2.webp"]
  },
  {
    name: "AgentFlow AI",
    category: "Multi-Provider Agentic AI Platform",
    tools: "LangGraph, LangChain, FastAPI, SQLite, Groq, Gemini, SSE, Open Router, Docker",
    image: ["/images/projects/af1.webp", "/images/projects/af2.webp"]
  },
  {
    name: "ResearchForge AI",
    category: "Autonomous Research Pipeline",
    tools: "Django, SearXNG, RAG, ChromaDB, Celery, Redis, DRF , TriFilatura, XHTML2PDF, Sentence Transformers",
    image: ["/images/projects/rs2.webp", "/images/projects/rs1.webp"]
  },
  {
    name: "Cheatify",
    category: "AI Exam Proctoring System",
    tools: "Python, OpenCV, MediaPipe, YOLOv12, Pytorch, CUDA, Dlib",
    image: ["/images/projects/ch.webp", "/images/projects/ch1.webp"]
  },
  {
    name: "VITA",
    category: "Multimodal Clinical Decision Support",
    tools: "Groq API, Multimodal Fusion, OpenAI Whisper, ElevenLabs, Flask, OpenCV, PyAudio",
    image: ["/images/projects/v1.webp", "/images/projects/v2.webp"]
  },
  {
    name: "WhatsAgent AI",
    category: "Autonomous WhatsApp Support Agent",
    tools: "n8n, WhatsApp API, Twilio API, Groq, Airtable, Automation",
    image: ["/images/projects/ws1.webp", "/images/projects/ws2.webp"]
  },
];

const Work = () => {
  useGSAP(() => {
    // Recomputed live on every ScrollTrigger.refresh() instead of once on
    // mount, so it stays correct after fonts/images finish loading or the
    // lazy-loaded TechStack section changes the document height below it.
    function getTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (!box.length) return 0;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      return rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    // The horizontal pinned-scroll effect only makes sense in the desktop
    // layout (see the matching `max-width: 1025px` breakpoint in Work.css,
    // where .work-flex switches to a normal stacked/vertical layout). Gate
    // it with matchMedia so mobile/tablet never gets an incorrect pin.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1026px)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: () => `+=${getTranslateX()}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          id: "work",
        },
      });

      timeline.to(".work-flex", {
        x: () => -getTranslateX(),
        ease: "none",
      });

      return () => {
        timeline.kill();
      };
    });

    // Fonts, images (WorkImage placeholders) and the lazy-loaded TechStack
    // section below can all change layout after this effect first runs.
    // Re-measure once everything has settled so the pin distance/end value
    // (and the ScrollSmoother wrapper it lives in) stay in sync.
    const refresh = () => ScrollTrigger.refresh();
    const images = Array.from(
      document.querySelectorAll(".work-image img")
    ) as HTMLImageElement[];
    images.forEach((img) => {
      if (!img.complete) img.addEventListener("load", refresh, { once: true });
    });
    document.fonts?.ready?.then(refresh);
    window.addEventListener("load", refresh);
    const rafId = requestAnimationFrame(refresh);

    return () => {
      mm.revert();
      ScrollTrigger.getById("work")?.kill();
      window.removeEventListener("load", refresh);
      images.forEach((img) => img.removeEventListener("load", refresh));
      cancelAnimationFrame(rafId);
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={project.name}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image || "/images/placeholder.webp"} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
