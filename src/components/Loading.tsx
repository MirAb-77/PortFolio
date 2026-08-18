import { useEffect, useState, useRef } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

// Decorative progress ring geometry (kept as constants so we don't
// recompute the circle math on every render).
const RING_RADIUS = 46;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

// Short, rotating status lines shown beneath the main greeting while
// the experience initializes. Kept short & calm to match the site's
// sophisticated, developer-portfolio tone.
const MICRO_MESSAGES = [
  "Initializing experience…",
  "Preparing the experience…",
  "Loading creativity…",
  "Building the scene…",
  "Almost there…",
];

const GREETING_TEXT = "Hey, welcome.";

// The 6 side facets of the rotating gem/core. Each gets its own
// rotation + a slightly different gradient so the shape reads as
// faceted glass rather than a flat circle.
const GEM_FACETS = [
  { angle: 0, gradient: "linear-gradient(160deg, rgba(224,214,255,0.92), rgba(106,79,214,0.55))" },
  { angle: 60, gradient: "linear-gradient(160deg, rgba(196,176,255,0.88), rgba(90,64,190,0.5))" },
  { angle: 120, gradient: "linear-gradient(160deg, rgba(176,132,255,0.92), rgba(74,52,168,0.55))" },
  { angle: 180, gradient: "linear-gradient(160deg, rgba(156,116,240,0.86), rgba(60,42,150,0.55))" },
  { angle: 240, gradient: "linear-gradient(160deg, rgba(206,188,255,0.88), rgba(96,70,200,0.5))" },
  { angle: 300, gradient: "linear-gradient(160deg, rgba(182,144,255,0.9), rgba(80,58,180,0.5))" },
];

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const bgRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const tiltRafPending = useRef(false);

  if (percent >= 100) {
    setTimeout(() => {
      setLoaded(true);
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }, 600);
  }

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 900);
      }
    });
  }, [isLoaded]);

  // Respect prefers-reduced-motion for the character, orbs and particles.
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, []);

  // Background neural nodes / particle system
  useEffect(() => {
    const canvas = bgRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const NODE_COUNT = prefersReduced
      ? 0
      : Math.max(12, Math.floor((w * h) / 140000));

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 1 + Math.random() * 2,
      });
    }

    let raf = 0;

    function paintBackdrop() {
      if (!ctx) return;
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "rgba(4,6,12,0.9)");
      grad.addColorStop(1, "rgba(12,8,18,0.95)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      paintBackdrop();

      // draw particles and connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;

        // particle
        ctx.beginPath();
        ctx.fillStyle = "rgba(180,160,255,0.9)";
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();

        // connections
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = 0.12 * (1 - dist / 160);
            ctx.strokeStyle = `rgba(140,120,255,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    }

    function resize() {
      w = canvas!.width = window.innerWidth;
      h = canvas!.height = window.innerHeight;
      if (prefersReduced) paintBackdrop();
    }

    window.addEventListener("resize", resize);

    if (prefersReduced) {
      // Static, calm backdrop only — no particle animation loop.
      paintBackdrop();
    } else {
      draw();
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  // Mouse-reactive 3D tilt for the gem/core — throttled to one
  // update per animation frame, and skipped entirely under
  // prefers-reduced-motion.
  function handleStageMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion) return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    if (!tiltRafPending.current) {
      tiltRafPending.current = true;
      requestAnimationFrame(() => {
        setTilt({ rx: px * 26, ry: -py * 22 });
        tiltRafPending.current = false;
      });
    }
  }

  function handleStageMouseLeave() {
    setTilt({ rx: 0, ry: 0 });
  }

  const clampedPercent = Math.min(100, Math.max(0, percent));
  const microIndex = Math.min(
    MICRO_MESSAGES.length - 1,
    Math.floor(clampedPercent / (100 / MICRO_MESSAGES.length))
  );
  const ringOffset = RING_CIRCUMFERENCE * (1 - clampedPercent / 100);
  // Subtle "grows as it loads" feel for the character — barely
  // perceptible, never distracting.
  const characterScale = 0.94 + clampedPercent / 900;
  // The marquee slowly reveals itself as loading progresses.
  const marqueeOpacity = 0.16 + (clampedPercent / 100) * 0.55;

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          &lt;Abdullah /&gt;
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div
        className={`loading-screen ${
          reducedMotion ? "loading-reduced-motion" : ""
        }`}
      >
        <canvas ref={bgRef} className="loading-bg-canvas" />

        {/* Ambient glow layers for depth — purely decorative */}
        <div className="loading-glow-orb orb-a" aria-hidden="true" />
        <div className="loading-glow-orb orb-b" aria-hidden="true" />
        <div className="loading-glow-orb orb-c" aria-hidden="true" />

        <div
          className="loading-marquee"
          style={{ opacity: marqueeOpacity }}
        >
          <Marquee>
            <span className="marquee-text"> ML Engineer</span>{" "}
            <span className="marquee-text">AI Engineer</span>
            <span className="marquee-text"> ML Engineer</span>{" "}
            <span className="marquee-text">AI Engineer</span>
          </Marquee>
        </div>

        <div className={`loading-center ${clicked ? "loading-center-exit" : ""}`}>
          {/* Rotating 3D faceted core — mouse-reactive tilt */}
          <div
            className={`loading-character-scale ${
              loaded ? "loading-character-celebrate" : ""
            }`}
            style={{ transform: `scale(${characterScale})` }}
          >
            <div
              className="character-3d-stage"
              ref={stageRef}
              onMouseMove={handleStageMouseMove}
              onMouseLeave={handleStageMouseLeave}
            >
              <div
                className="character-3d-tilt"
                style={{
                  transform: `rotateX(${tilt.ry}deg) rotateY(${tilt.rx}deg)`,
                }}
              >
                <div className="character-3d-spin">
                  <div className="gem-ring ring-outer" aria-hidden="true" />
                  <div className="gem-ring ring-inner" aria-hidden="true" />
                  {GEM_FACETS.map((facet, i) => (
                    <div
                      key={i}
                      className="gem-facet"
                      style={{
                        background: facet.gradient,
                        transform: `rotateY(${facet.angle}deg) translateZ(46px)`,
                      }}
                    />
                  ))}
                  <div className="gem-cap-top" aria-hidden="true" />
                  <div className="gem-highlight" aria-hidden="true" />
                  <div className="gem-core" aria-hidden="true" />
                </div>
              </div>
            </div>
            <div className="gem-shadow" aria-hidden="true" />
          </div>

          {/* Greeting + rotating status line */}
          <div
            className={`loading-greeting-wrap ${
              loaded ? "greeting-fade" : ""
            }`}
          >
            <h1 className="loading-greeting" aria-label={GREETING_TEXT}>
              {GREETING_TEXT.split("").map((ch, i) => (
                <span
                  key={i}
                  className="loading-greeting-char"
                  style={{ animationDelay: `${i * 35}ms` }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </h1>
            <p className="loading-subgreeting">Welcome to my world.</p>
            <p className="loading-micro" key={microIndex} aria-live="polite">
              {MICRO_MESSAGES[microIndex]}
            </p>
          </div>

          {/* Progress ring + existing pill/button mechanism (unchanged transition trick) */}
          <div className="loading-progress-wrap">
            <svg
              className={`progress-ring ${loaded ? "progress-ring-fade" : ""}`}
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <circle
                className="progress-ring-bg"
                cx="50"
                cy="50"
                r={RING_RADIUS}
              />
              <circle
                className="progress-ring-fg"
                cx="50"
                cy="50"
                r={RING_RADIUS}
                style={{
                  strokeDasharray: RING_CIRCUMFERENCE,
                  strokeDashoffset: ringOffset,
                }}
              />
            </svg>

            <div
              className={`loading-wrap ${clicked && "loading-clicked"}`}
              onMouseMove={(e) => handleMouseMove(e)}
            >
              <div className="loading-hover"></div>
              <div className={`loading-button ${loaded && "loading-complete"}`}>
                <div className="loading-container">
                  <div className="loading-content">
                    <div className="loading-content-in">
                      Loading <span>{percent}%</span>
                    </div>
                  </div>
                  <div className="loading-box"></div>
                </div>
                <div className="loading-content2">
                  <span>Welcome</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
