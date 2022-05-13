// App.js: The main entrypoint for the SAL website
// 
// Authors: Jude Javillo and Ronin Sharma
// Version: 4 May 2022

import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { FILL_PARENT, FILL_WHITE, FILL_GRADIENT } from "./constants"
import Test from "./pages/Test"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Welcome from "./pages/Welcome"

function App() {

  // ATTRIBUTES ****************************************************************

  // The logged in User of the application
  const [auth, setAuth] = useState("")

  // STYLES ********************************************************************

  // The background style for this application if the user is authenticated
  const authenticatedStyle = {
    ...FILL_PARENT,
    ...FILL_WHITE
  }

  // The background style for this application if the user is not authenticated
  const unauthenticatedStyle = {
    ...FILL_PARENT,
    ...FILL_GRADIENT
  }
  // The background style for the application
  const backgroundStyle = auth === "" 
    ? unauthenticatedStyle
    : authenticatedStyle 

  // COMPONENT *****************************************************************

  // The user is not authenticated, return authentication pages
  if (auth === "") {
    return (
      <div style={backgroundStyle}>
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup setAuth={setAuth} />}/>
            <Route path="/login" element={<Login setAuth={setAuth} />}/>
            <Route path="/" element={<Welcome/>}/>
          </Routes>
        </Router>
      </div>   
    )
  }
  
  // The user is authenticated, return main pages
  else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Test/>}/>
        </Routes>
      </Router>
    ) 
  }
  
}

export default App;
