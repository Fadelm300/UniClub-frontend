import { Link } from "react-router-dom";
import  './Dashboard.css';
const Dashboard = ({ user }) => {
  return (


    <div className="channelsContainer">
      <h1>Welcome, {user.username}</h1>
      <h1>choose the university</h1>
      <div className="unbutton">
        <Link to="/uob">
          <button className="channelButtonun">University of Bahrain</button>

        </Link>
    </div>
  </div>
);
};

export default Dashboard;



