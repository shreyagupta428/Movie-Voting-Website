import './App.css';
import React from 'react'
import {BrowserRouter,Route} from "react-router-dom"
import LandingPage from './components/LandingPage'
import SignIn from './components/login'
import NavBar from './components/navbar'
import SignUp from './components/signup'
import Profile from './components/Profile'
import Leaderboard from './components/Leaderboard'
import {reducer,initialState} from './reducers/userReducer'
//export const UserContext = createContext()
function App() {
  // const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <div>
   
      <BrowserRouter>
      <NavBar />
      <Route exact path="/signin" component={SignIn}/>
      <Route exact path="/" component={SignUp}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/home" component={LandingPage}/>
      <Route exact path="/leaderboard" component={Leaderboard}/>
      </BrowserRouter>
    </div>
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
