import { Link } from 'react-router-dom';
import { navLinks } from '../links/links'; // Import the same data
import './rightNav.css';

export default function RightNav() {
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
    </div>
  );
}
