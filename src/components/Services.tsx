import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceCard from "./ServiceCard";
import { services } from "./data/services";
import "./styles/Services.css";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>(".service-item");
    if (!cards || !cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, rotateX: -6 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services-section" id="services" ref={sectionRef}>
      <div className="services-glow services-glow-1" aria-hidden="true" />
      <div className="services-glow services-glow-2" aria-hidden="true" />
      <div className="services-dotgrid" aria-hidden="true" />
      <div className="services-container">
        <div className="services-heading">
          <span className="services-eyebrow">
            <span className="services-eyebrow-line" />
            WHAT I OFFER
          </span>
          <h2 className="services-title">Services</h2>
          <p className="services-subtitle">
            End-to-end AI and data engineering — from a trained model to a
            shipped product.
          </p>
        </div>
        <div className="services-grid" ref={gridRef}>
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              index={i + 1}
              total={services.length}
              {...service}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;