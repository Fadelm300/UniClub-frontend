import '../footer/footer.css'
import { Link } from 'react-router-dom';

export default function footer() {
  return (
    <div>
      <footer>
        <div className="footer-content">
          <h3></h3>
          <ul className="footerHelp">
            <li>
              <Link to='/contact'>Contact Us</Link>
              <i className="fas fa-solid fa-phone"></i>
            </li>
            <li>
              <Link to= '/about'>About Us</Link>
              <i className="fas fa-regular fa-address-card"></i>
            </li>
            <li>
              <Link to= '/help'>Help</Link>
              <i className="fas fa-question"></i>
            </li>
          </ul>
          <div className="footer-bottom">
            <p>Copyright 2024. UniClub . All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
