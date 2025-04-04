import { Link } from 'react-router-dom';
import { navLinks } from '../links/links';
import './rightNav.css';

export default function RightNav() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Delay the refresh slightly to ensure smooth scrolling finishes
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="rightNav">
      {navLinks.map((section, index) => (
        <div key={index} className="rightNav-section">
          <h4>{section.title}</h4>
          <ul>
            {section.links.map((link, idx) => (
              link.icon ? (
                <li key={idx}>
                  <a href={link.path} target="_blank" rel="noopener noreferrer">
                    <i className={link.icon}></i> {link.name}
                  </a>
                </li>
              ) : (
                <li key={idx}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              )
            ))}
          </ul>
        </div>
      ))}

      {/* Back to Top Button */}
      <button className="backToTop" onClick={scrollToTop}>
        ⬆️ Top
      </button>
    </div>
  );
}
