import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {
    if (!state) {
      return [
        <li key={1}>
          <Link className="linked" to='/'>SignUp</Link>
        </li>,
        <li key={2}>
          <Link className="linked" to='/signin'>SignIn</Link>
        </li>,
        <li key={3}>
          <Link className="linked" to='/home'>Home</Link>
        </li>,
        <li key={4}>
          <Link className="linked" to='/leaderboard'>Leaderboard</Link>
        </li>,
      ];
    } else {
      return [
        <li key={5}>
          <Link className="linked" to='/profile'>Profile</Link>
        </li>,
        <li key={6}>
          <Link className="linked" to='/home'>Home</Link>
        </li>,
        <li key={7}>
          <Link className="linked" to='/leaderboard'>Leaderboard</Link>
        </li>,
        <li key={8}>
          <button
            className='btn #c62828 red darken-3'
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/signin");
            }}
          >
            Logout
          </button>
        </li>,
      ];
    }
  };

  return (
    <nav>
      <div>
        <Link  className="linked" to='/home' className='brand-logo left'>
          Movie Voting Website
        </Link>
        <ul id='nav-mobile' className='right'>
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
