import { ReactNode, useRef, MouseEvent } from "react";

export interface Service {
  title: string;
  description: string;
  tags?: string[];
  icon: ReactNode;
}

interface ServiceCardProps extends Service {
  index: number;
  total: number;
}

const ServiceCard = ({
  title,
  description,
  tags,
  icon,
  index,
  total,
}: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mx", `${x}%`);
    card.style.setProperty("--my", `${y}%`);
  };

  return (
    <div className="service-item">
      <div className="service-card" ref={cardRef} onMouseMove={handleMove}>
        <span className="service-card-corner service-card-corner-tl" aria-hidden="true" />
        <span className="service-card-corner service-card-corner-br" aria-hidden="true" />

        <div className="service-card-head">
          <span className="service-card-index">
            <span className="service-card-dot" aria-hidden="true" />
            {String(index).padStart(2, "0")}
            <span className="service-card-index-total">
              /{String(total).padStart(2, "0")}
            </span>
          </span>
          <div className="service-card-icon">{icon}</div>
        </div>

        <h3 className="service-card-title">{title}</h3>
        <p className="service-card-desc">{description}</p>

        {tags && tags.length ? (
          <div className="service-card-tags">
            {tags.map((tag) => (
              <span className="service-card-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <span className="service-card-line" aria-hidden="true" />
      </div>
    </div>
  );
};

export default ServiceCard;