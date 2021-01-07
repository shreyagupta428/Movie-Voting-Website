import React from 'react';
import {Link} from 'react-router-dom'
import '../App.css';

const SignUp=()=>{
    return(
        <div className="mycard">
        <div class="card auth-card  input-field">
            <h2>Sign Up</h2>
            <input type="text" placeholder="email" onChange={()=>console.log("h")}/>
            <input type="text" placeholder="email" onChange={()=>console.log("h")}/>
            <input type="password" placeholder="password" onChange={()=>console.log("h")}/>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1">Sign Up</button>
            <h5><Link to="/signin">Already have an account?</Link></h5>
        </div>
        </div>
    )
}

export default SignUp