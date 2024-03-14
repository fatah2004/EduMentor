import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
 
const Navbar = ({user,onLogout}) => {
  const [showLinks, setShowLinks] = useState(false);
  const handleLogout = () => {
    
    onLogout(); // Call the onLogout function passed from the App component
  };
 
  const handleToggleLinks = () => {
    setShowLinks(!showLinks);
  };
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            <div>
            {user.role === "admin" && (<>
                    <li className="nav-item">
                      <Link className="nav-link" to="/manage-users">
                        Manage Users
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/manage-formations">
                        Manage Formations
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/manage-feedback">
                        Manage Feedback
                      </Link>
                    </li>
                  </>)}
            {user.role === "institution"&&(<>
                    <li className="nav-item">
                       <Link className="nav-link" to="/institution-formations">
                         Institution Formations
                       </Link>
                     </li>
                     <li className="nav-item">
                       <Link className="nav-link" to="/trainers">
                         Trainers
                       </Link>
                     </li>
                   </>)}
                   {user.role === "trainer"&&(<>
                     <li className="nav-item">
                       <Link className="nav-link" to="/formations">
                         Formations
                       </Link>
                     </li>
                     <li className="nav-item">
                       <Link className="nav-link" to="/feedbacks">
                         Feedbacks
                       </Link>
                     </li>
                   </>)}
            </div>
            <div>
                <Link to="/ogin">
                <button onClick={handleLogout}>Logout</button>
                </Link>
            
            </div>
        </div>
    </nav>
  )
  
};
 
export default Navbar;

