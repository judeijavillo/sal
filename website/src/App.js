// App.js: The main entrypoint for the SAL website
// 
// Authors: Jude Javillo and Ronin Sharma
// Version: 4 May 2022

import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation"
import { FILL_PARENT, FILL_WHITE, FILL_GRADIENT, NAVBAR_HEIGHT } from "./constants"
import Home from "./pages/Home"
import Posts from "./pages/Posts"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Welcome from "./pages/Welcome"

function App() {

  // ATTRIBUTES ****************************************************************

  // The logged in User of the application
  const [auth, setAuth] = useState("")
  // The current role of the user in the course
  const [role, setRole] = useState("")
  // The current course of the application
  const [courseId, setCourseId] = useState("")

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

  // The container style for authenticated pages
  const containerStyle = {
    position: "absolute",
    display: "flex",
    width: "100%",  
    paddingTop: NAVBAR_HEIGHT, 
    height: window.innerHeight - NAVBAR_HEIGHT
  }

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
      <div>
        <Router>
          <div style={containerStyle}>
            <Routes>
              <Route path="/" element={
                <Home 
                  auth={auth} 
                  courseId={courseId} 
                  setCourseId={setCourseId} />
              }/>
              <Route path="/posts" element={
                <Posts
                  auth={auth}
                  courseId={courseId} />
              }/>
            </Routes>
          </div>
          <Navigation 
            auth={auth} 
            setAuth={setAuth} 
            role={role}
            setRole={setRole}
            courseId={courseId} 
            setCourseId={setCourseId}/>
        </Router>
      </div>
    ) 
  }
  
}

export default App;
