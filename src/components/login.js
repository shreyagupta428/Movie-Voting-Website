import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom'

const SignIn=()=>{
    return(
        <div className="mycard">
        <div class="card auth-card  input-field">
            <h2>Login</h2>
            <input type="text" placeholder="email" onChange={()=>console.log("h")}/>
            <input type="password" placeholder="password" onChange={()=>console.log("h")}/>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1">Login </button>
            <h5><Link to="/signup">Don't have an account?</Link></h5>
        </div>
        </div>
    )
}

export default SignIn