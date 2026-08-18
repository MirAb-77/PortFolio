import { useState } from "react";

export interface Certification {
  title: string;
  issuer: string;
  platform?: string;
  /** Path under /public, e.g. "/images/certifications/deep-learning.webp".
   *  Leave null/undefined until the real .webp is added — the card
   *  renders a polished placeholder automatically. */
  image?: string | null;
  url?: string;
}

const CertificationCard = ({
  title,
  issuer,
  platform,
  image,
  url,
}: Certification) => {
  const [loaded, setLoaded] = useState(false);

  const media = (
    <div className="cert-card">
      <div className="cert-card-media">
        {image ? (
          <img
            src={image}
            alt={`${title} certificate`}
            loading="lazy"
            className={`cert-card-image${loaded ? " is-loaded" : ""}`}
            onLoad={() => setLoaded(true)}
          />
        ) : (
          <div className="cert-card-placeholder">
            <svg
              viewBox="0 0 48 48"
              className="cert-card-placeholder-icon"
              aria-hidden="true"
            >
              <rect
                x="6"
                y="8"
                width="36"
                height="32"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M14 18h20M14 24h20M14 30h12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <span className="cert-card-placeholder-label">
              Certificate Preview
            </span>
            <span className="cert-card-placeholder-sub">
              Image coming soon
            </span>
          </div>
        )}
      </div>
      <div className="cert-card-body">
        <h3 className="cert-card-title">{title}</h3>
        <p className="cert-card-issuer">
          {issuer}
          {platform ? (
            <span className="cert-card-platform"> · {platform}</span>
          ) : null}
        </p>
        {url ? <span className="cert-card-link">View Certificate →</span> : null}
      </div>
    </div>
  );

  if (url) {
    return (
      <a
        className="cert-item"
        data-cursor="disable"
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        {media}
      </a>
    );
  }

  return (
    <div className="cert-item" data-cursor="disable">
      {media}
    </div>
  );
};

export default CertificationCard;
