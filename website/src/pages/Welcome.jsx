// Welcome.jsx: The first page that shows when the user is not authenticated
// 
// Authors: Jude Javillo and Ronin Sharma
// Version: 9 May 2022

import React from "react"
import {
  Button
} from "@mui/material"
import {
  CENTER_CONTENT,
  CENTER_HORTIZONTAL,
  FILL_WHITE, ROUNDED_CONTAINER
} from "../constants"

export default function Welcome() {

  // HELPERS *******************************************************************

  /**
   * A callback function for when the user presses the "Sign Up" button
   */ 
  function signup() { 
    console.log("Sign up!") 
  }

  /**
   * A callback function for when the user presses the "Login" button
   */ 
  function login() { 
    console.log("Login!") 
  }

  // STYLES ********************************************************************

  // The style for the container div
  const containerStyle = { 
    ...FILL_WHITE,
    ...ROUNDED_CONTAINER,
    ...CENTER_HORTIZONTAL,
    marginTop: 50
  }

  // COMPONENT *****************************************************************

  return (
    <div style={containerStyle}>
      <h1>
        Welcome to Simplify After Lecture!
      </h1>
      <p>
        Simplify After Lecture, aka SAL, is an online course-assistance tool 
        built for collegiate institutions. Whether it's scheduling office hours, 
        facilitating discussion in an online environment amongst a course
        community, or managing course staff and students, SAL has you covered!
      </p>
      <p>
        In today's world of online-dominant course administration, there are too 
        many services that overlap in functionality, require students to learn
        new interfaces, and separate locations for students and faculty to 
        access course materials. SAL offers a solution to that by providing a
        single platform for all services that a course may need to operate 
        properly in the digital age. 
      </p>
      <p>
        As a new, up-and-coming platform created
        by two Masters students from Cornell University with experience as both
        course staff and students, SAL is constantly expanding and incorporating
        new features as requested by our users. We're dedicated to providing 
        every feature that a course may need to prevent confusion amongst 
        students and staff, so don't hesitate to contact us for feature 
        requests. Start using SAL today!
      </p>
      <div style={{ ...CENTER_CONTENT }}>
        <Button variant="contained" onClick={signup}>Sign Up</Button>
        <br />
        <br />
        <Button variant="contained" onClick={login}>Login</Button>
      </div>
    </div>
  )
  
}
