import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const isLogin = localStorage.getItem("jwt");
  return (
    <nav>
      <div>
        <Link to='/home' className='brand-logo'>
          Movie Voting Website
        </Link>

        {!isLogin ? (
          <ul id='nav-mobile'>
            <li>
              <Link to='/'>SignUp</Link>
            </li>
            <li>
              <Link to='/signin'>SignIn</Link>
            </li>
            <li>
              <Link to='/home'>Home</Link>
            </li>
            <li>
              <Link to='/leaderboard'>Leaderboard</Link>
            </li>
          </ul>
        ) : (
          <ul id='nav-mobile'>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <Link to='/home'>Home</Link>
            </li>
            <li>
              <Link to='/leaderboard'>Leaderboard</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
