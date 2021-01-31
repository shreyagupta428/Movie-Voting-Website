import React from "react";
import "../../Leaderboard.css";
const LeaderboardMovie = ({ item }) => {
  // console.log(item);
  const style = {
    backgroundImage: `url(${item.image}`,
  };
  return (
    // <div>
    <div className='movieContainer'>
      <div className='movieImage' style={style}>
        <div className='movie'>
          <div className='movieContent'>{item.title}</div>
          <div className='movieContent2'>{item.nominatedby.length} votes</div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default LeaderboardMovie;
