import './App.css';
import React, { useEffect, useState, useRef } from 'react'
import {BrowserRouter,Route,Switch} from "react-router-dom"
import LandingPage from './components/LandingPage'



function App() {

  return (
    <div>
      <BrowserRouter>
       <Route exact link="/" component={LandingPage}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
