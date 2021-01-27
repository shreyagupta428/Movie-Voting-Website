import React,{useContext} from 'react'
import { Link,useHistory } from "react-router-dom";
import {UserContext} from '../App'
const NavBar = () => {
  const isLogin = localStorage.getItem("jwt");
  return (
    <nav>
      <div>
        <Link to='/home' className='brand-logo'>
          Movie Voting Website
        </Link>
        {!isLogin ? (
          <ul id='nav-mobile' className="right">
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
          <ul id='nav-mobile' className="right">
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <Link to='/home'>Home</Link>
            </li>
            <button className="btn #c62828 red darken-3"
            onClick={()=>{
              localStorage.clear()
              //dispatch({type:"CLEAR"})
             // history.push('/signin')
            }}
            >
                Logout
            </button>
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
