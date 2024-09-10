
import { Link } from "react-router-dom";
import  './LandingReal.css';

const LandingReal = () => {
  return (

<div className="LandingRealContainer">
      <h1>Welcome</h1>

      <div className="landingimg">
                     <img className="imginthelanding" src="/UOB1.jpg" alt="UoB pic" />
                   </div>






      <div className="unbutton">
        <Link to="/uob">
          <button className="channelButtonun1">University of Bahrain</button>

        </Link>
    </div>
  </div>
      
  );
};

export default LandingReal;







