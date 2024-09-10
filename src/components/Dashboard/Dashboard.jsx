import { Link } from "react-router-dom";

const Dashboard = ({ user }) => {
  return (


    <div className="channelsContainer">
      <h1>Welcome, {user.username}</h1>
        <Link to="/uob">
          <button className="channelButton"></button>
        </Link>
    </div>
  
);
};

export default Dashboard;



