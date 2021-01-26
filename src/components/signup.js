import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../App.css";
import M from "materialize-css";

const SignUp = () => {
  const history = useHistory();
  if (localStorage.getItem("jwt")) history.push("/home");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "Invalid email", classes: "#c62828 red darken-3" });
      return;
    }
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
      M.toast({
        html:
          "Password must contain atleast 6 characters,including UPPER/lowercase and numbers",
        classes: "#c62828 red darken-3",
      });
      return;
    }
    if (password !== confirmpassword) {
      M.toast({
        html: "Please enter the same password as above",
        classes: "#c62828 red darken-3",
      });
      return;
    }
    const user = {
      name: name,
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:5000/signup", user)
      .then((res) => {
        if (res.data.error)
          M.toast({ html: res.data.error, classes: "#c62828 red darken-3" });
        else {
          M.toast({
            html: res.data.message,
            classes: "#43a047 green darken-1",
          });
          history.push("/signin");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className='mycard'>
      <div className='card auth-card  input-field'>
        <h2>Sign Up</h2>
        <form>
          <input
            type='text'
            placeholder='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='text'
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmpassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
          <button
            type='submit'
            className='btn waves-effect waves-light #64b5f6 blue darken-1'
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </form>
        <h5>
          <Link to='/signin'>Already have an account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default SignUp;
