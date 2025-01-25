import { Link } from 'react-router-dom';
import '../footer/footer.css';
import { navLinks } from '../links/links'; // Import the data
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="containerfooter">
        <div className="row">
          {navLinks.map((section, index) => (
            <div className="footer-col" key={index}>
              <h4>{section.title}</h4>
              <ul>
                {section.links.map((link, idx) => (
                  link.icon ? (
                    <span key={idx} className="icon-container">
                      <a href={link.path} target="_blank" rel="noopener noreferrer">
                        <i className={link.icon}></i>
                      </a>
                      {idx !== section.links.length - 1 && <span className="separator">||</span>}
                    </span>
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
        <p className="Copyright">Copyright 2024. UniClub. All Rights Reserved</p>
      </div>
    </footer>
  );
}
