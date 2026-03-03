import "../projects/Projects.css";
import "./index.css";
import { Link } from "react-router-dom";
import mediaCards  from "../../data/mediaGridData";

const MediaGrid = () => {

  return (
    <section className="projects-section container py-48 latest-grid-scope">
      <div className="latest-row">
        {mediaCards.map((item) => (
          <article key={item.id} className="project-card card">
            <div className="project-image-container relative">
              <img src={item.image} alt={item.title} className="project-image" />
            </div>
            <div className="project-content p-20">
              <h3 className="h3 mb-12">{item.title}</h3>
              <Link to={item.link} className="btn btn--outline">
                {item.cta} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MediaGrid;
