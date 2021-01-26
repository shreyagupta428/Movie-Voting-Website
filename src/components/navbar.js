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

<<<<<<< HEAD
const NavBar = ()=>{
    
    return(
        <nav>
        <div className="nav-wrapper black">
          <Link to="#" className="brand-logo">Movie Voting Website</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/">SignUp</Link></li>
            <li><Link to="/signin">SignIn</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
=======
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
>>>>>>> 88b9461f138a4bef0fbd1e2df81aab8ca1851737
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
