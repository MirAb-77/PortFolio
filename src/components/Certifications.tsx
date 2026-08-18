import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CertificationCard from "./CertificationCard";
import { certifications } from "./data/certifications";
import "./styles/Certifications.css";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>(".cert-item");
    if (!cards || !cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="certifications-section"
      id="certifications"
      ref={sectionRef}
    >
      <div className="section-container certifications-container">
        <div className="certifications-heading">
          <span className="section-eyebrow">CREDENTIALS</span>
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">
            Formal training across machine learning, generative AI, and
            applied data science — earned, not assumed.
          </p>
        </div>
        <div className="certifications-grid" ref={gridRef}>
          {certifications.map((cert) => (
            <CertificationCard key={cert.title} {...cert} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
