import type { Certification } from "../CertificationCard";

// Certificate images are stored in /public/images/certifications/
export const certifications: Certification[] = [
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    platform: "Coursera",
    image: "/images/certifications/3.webp",
  },
  {
    title: "Generative AI Engineering with LLMs Specialization",
    issuer: "IBM",
    platform: "Coursera",
    image: "/images/certifications/4.webp",
  },
  {
    title: "IBM Data Science Professional Certificate",
    issuer: "IBM",
    platform: "Coursera",
    image: "/images/certifications/1.webp",
  },
  {
    title: "Google Data Analytics Specialization",
    issuer: "Google",
    platform: "Coursera",
    image: "/images/certifications/2.webp",
  },
  {
    title: "AI Engineer for Data Scientists Associate Certificate",
    issuer: "DataCamp",
    image: "/images/certifications/5.webp",
  },
  {
    title: "Data Scientist Certification",
    issuer: "DataCamp",
    image: "/images/certifications/6.webp",
  },
];