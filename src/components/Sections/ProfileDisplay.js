import React from "react";
//import M from "materialize-css";
const ProfileDisplay = ({ movie }) => {
 console.log(movie);
//   const style = {
//     backgroundImage: `url(${item.image}`,
//   };
   return (
//     // <div>
//     <div className='movieContainer'>
//       <div className='movieImage' style={style}></div>
//       <div className='movieContent'>{item.title}</div>
//     </div>
//     // </div>
<main className="auth-card ">

<div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src={movie.image} />
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4" >{movie.title}<i class="material-icons right">more_vert</i></span>
      <a class="waves-effect waves-light btn">Remove</a>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">{movie.title}<i class="material-icons right">close</i></span>
      <p>{movie.overview}</p>
    </div>
  </div>
</main>


            


   );
};

export default ProfileDisplay;
