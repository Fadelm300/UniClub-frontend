
import { Link } from "react-router-dom";
import  './LandingReal.css';

const LandingReal = () => {
  return (

<div className="LandingRealContainer">


      <div className="landingimg">
        {/* add vid */}
          <img className="imginthelanding" src="/UOB1.jpg" alt="UoB pic" />
          
       </div>
       


             <div className="uobabout">
                   <div className="liftbox">
                           <img className="imgintherightbox" src="/UOB1.jpg" alt="UoB pic" />
                   </div>
                   
                   <div className="rightbox">
                          <h1>About University of B</h1>
                             <p>
                               Learn more about the history, mission, and values of the University of B.
                             </p>
                       <div className="unbutton">
                            <Link to="/uob">
                             <button className="channelButtonun1">Learn More</button>
                          </Link>
                       </div>
                    </div>
             </div>
             
             <div className="uobabout">
                   <div className="liftbox">
                           <img className="imgintherightbox" src="/UOB1.jpg" alt="UoB pic" />
                   </div>
                   
                   <div className="rightbox">
                          <h1>About University of B</h1>
                             <p>
                               Learn more about the history, mission, and values of the University of B.
                             </p>
                       <div className="unbutton">
                            <Link to="/uob">
                             <button className="channelButtonun1">Learn More</button>
                          </Link>
                       </div>
                    </div>
             </div>






             <div className="eventscontanir">
  <h1 className="Eventsh1">Upcoming Events  </h1>
  
  <div className="evintcards">
    <div className="card1ev">
      <div className="topcardev">Event Title 1</div>
      <div className="buttomcardev">This is the description of the first event. It contains information about the event details.</div>
    </div>
    
    <div className="card1ev">
      <div className="topcardev">Event Title 2</div>
      <div className="buttomcardev">This is the description of the second event. It contains information about the event details.</div>
    </div>
    
    <div className="card1ev">
      <div className="topcardev">Event Title 3</div>
      <div className="buttomcardev">This is the description of the third event. It contains information about the event details.</div>
    </div>
    
    
  </div>
  
</div>

      
  </div>
      
  );
};

export default LandingReal;







