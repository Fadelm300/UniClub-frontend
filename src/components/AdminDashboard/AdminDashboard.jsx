import { Link } from "react-router-dom";
import './Dashboard.css'; // Updated CSS file import
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
import UserList from "../UserList/UserList";

const AdminDashboard = ({}) => {


  return (

    <div className="LandingRealContainer">
    
    
                <div className="landingimg">
                 <div className="landing-text">
                  <p className="titleUniClub">UniClub</p>
                   <p>
                     UniClub is a platform designed to provide university students with essential academic resources and tools. Founded in 2024, we aim to simplify student life and support academic success.
                   </p>
                 </div>
                 <img className="imginthelanding" src="/Untitled-design.png" alt="Untitled-design" />
                </div>
    
           
    
    
                 <div className="uobabout">
                       <div className="liftbox">
                               <img className="imgintherightbox" src="/UOB1.jpg" alt="UoB pic" />
                       </div>
                       
                       <div className="rightbox">
                              <h1>About University of BAHRAINB</h1>
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
                               <img className="imgintherightbox" src="/OxfordImg.jpg" alt="OxfordImg" />
                       </div>
                       
                       <div className="rightbox">
                              <h1>About University of Oxford</h1>
                                 <p>
                                   Learn more about the history, mission, and values of the University of Oxford.
                                 </p>
                                 
                           <div className="unbutton">
                                <Link to="/oxf">
                                 <button className="channelButtonun1">Learn More</button>
                              </Link>
                           </div>
                        </div>
                        
                 </div>
                 


{/* Oxford */}
                 <div className="uobabout">
                       <div className="liftbox">
                               <img className="imgintherightbox" src="/ScienceUniversity.jpg" alt="ScienceUniversity" />
                       </div>
                       
                          <div className="rightbox">
                                    <h1>About University of Science University</h1>
                                      <p>
                                        Learn more about the history, mission, and values of the University of Science University.
                                      </p>
                                      
                                <div className="unbutton">
                                      <Link to="/oxf">
                                      <button className="channelButtonun1">Learn More</button>
                                    </Link>
                                </div>
                            </div>
                        </div>

{/* Polytechnic */}


                        <div className="uobabout">
                              <div className="liftbox">
                                      <img className="imgintherightbox" src="/PT15.jpg" alt="PT15" />
                              </div>
                              
                              <div className="rightbox">
                                          <h1>About University of Bahrain Polytechnic</h1>
                                            <p>
                                              Learn more about the history, mission, and values of the University of Bahrain Polytechnic.
                                            </p>
                                            
                                      <div className="unbutton">
                                            <Link to="/poly">
                                            <button className="channelButtonun1">Learn More</button>
                                          </Link>
                                      </div>
                                </div>
                        </div>
                 <UserList/>
    
                 <UpcomingEvents />
                 
    
    
    
          
      </div>
          
      );
};

export default AdminDashboard;
