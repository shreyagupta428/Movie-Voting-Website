import "./App.css";
import LandingPage from "./components/LandingPage";
import SignIn from "./components/login";
import NavBar from "./components/navbar";
import SignUp from "./components/signup";
import Profile from "./components/Profile";
import Leaderboard from "./components/Leaderboard";
import React, { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { reducer, initialState } from "./reducers/userReducer";
export const UserContext = createContext();

const Routing = () => {
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    }
  }, []);
  return (
    <Switch>
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/' component={SignUp} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/home' component={LandingPage} />
      <Route exact path='/leaderboard' component={Leaderboard} />
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}
// const Routing = ()=>{
//   const {state,dispatch} = useContext(UserContext)
//   return(
//      <div>
   
//        <BrowserRouter>
//        <NavBar />    
//          <Route exact path="/signin" component={SignIn}/>
//        <Route exact path="/" component={SignUp}/>
//        <Route exact path="/profile" component={Profile}/>
//        <Route exact path="/home" component={LandingPage}/>
//        <Route exact path="/leaderboard" component={Leaderboard}/>
//       </BrowserRouter>
//     </div>
//   )
// }
// function App() {
//   const [state,dispatch] = useReducer(reducer,initialState)
//   return (
//     <UserContext.Provider value={{state,dispatch}}>
//     <BrowserRouter>
      
//       <Routing />
      
//     </BrowserRouter>
//     </UserContext.Provider>
//   );
// }
export default App;
