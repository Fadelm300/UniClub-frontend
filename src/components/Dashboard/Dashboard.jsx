import { Link } from "react-router-dom";
import './Dashboard.css'; // Updated CSS file import

const Dashboard = ({ user }) => {
  return (
    <div className="channelsContainer22">
      <h1>Welcome, {user.username}</h1>

      <div className="landingimg22">
        <img className="imginthelanding22" src="/UOB1.jpg" alt="UoB pic" />
      </div>

      <div className="unbutton22">
        <Link to="/uob">
          <button className="channelButtonun22">Universitya of Bahrain</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
