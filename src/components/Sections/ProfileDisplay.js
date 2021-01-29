import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
const ProfileDisplay = ({ movie }) => {
// console.log(movie);
 const [userProfile,setProfile] = useState(null)
    
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    // const unfollowUser = ()=>{
    //     fetch('/remove',{
    //         method:"put",
    //         headers:{
    //             "Content-Type":"application/json",
    //             "Authorization":"Bearer "+localStorage.getItem('jwt')
    //         },
    //         body:JSON.stringify({
    //             unfollowId:userid
    //         })
    //     }).then(res=>res.json())
    //     .then(data=>{
            
    //         dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
    //          localStorage.setItem("user",JSON.stringify(data))
            
    //          setProfile((prevState)=>{
    //             const newFollower = prevState.user.followers.filter(item=>item != data._id )
    //              return {
    //                  ...prevState,
    //                  user:{
    //                      ...prevState.user,
    //                      followers:newFollower
    //                     }
    //              }
    //          })
    //          setShowFollow(true)
             
    //     })
    // }
   return (

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
