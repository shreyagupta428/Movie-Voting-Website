import React from 'react'
import {Link} from 'react-router-dom'


const NavBar = ()=>{
    
    return(
        <nav>
        <div className="nav-wrapper black">
          <Link to="#" className="brand-logo">Movie Voting Website</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/signup">SignUp</Link></li>
            <li><Link to="/signin">SignIn</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>
      </nav>
    )
}


export default NavBar