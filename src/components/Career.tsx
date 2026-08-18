import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI/ML Fellow</h4>
                <h5>ACM UET × DevSinc</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Developed supervised ML models for healthcare predictive
              analytics, reaching 90% accuracy on a clinical body-fat
              prediction dataset, and learned to deploy ML models in 
              production using Flask and Streamlit
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>ML Core Team Member</h4>
                <h5>UMT GoDoc</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Contributed to ML initiatives spanning data preprocessing,
              predictive modeling, and experimentation — translating data and
              modeling requirements into practical technical solutions.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI/ML Intern</h4>
                <h5>Safe X Solutions</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Built and evaluated classification, regression, and predictive
              analytics models, applying feature engineering,
              hyperparameter optimization, and error analysis to close
              performance gaps.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Freelance AI/ML Engineer</h4>
                <h5>Self-Employed</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Delivering end-to-end AI/ML solutions for independent clients —
              LLM applications, RAG pipelines, AI agents, backend APIs, and
              intelligent automation — with an emphasis on reliability and
              real-world usability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
