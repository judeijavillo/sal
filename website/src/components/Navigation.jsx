// Navigation.jsx: The navigation bar at the top of authenticated pages
// 
// Authors: Jude Javillo and Ronin Sharma
// Version: 13 May 2022

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import { getUser } from "../utils/users"
import { getCourse } from "../utils/courses"
import {
  FILL_GRADIENT,
  NAVBAR_HEIGHT,
  SCHOOL
} from "../constants"

export default function Navigation({
  auth,
  setAuth,
  role,
  setRole,
  courseId,
  setCourseId
}) {
  // ATTRIBUTES ****************************************************************

  // The navigator to route between pages
  const navigate = useNavigate()
  // The username of the logged-in user
  const [username, setUsername] = useState("")
  // The coursename of the current course
  const [coursename, setCourseName] = useState("")

  // STYLES ********************************************************************

  const backgroundStyle = {
    ...FILL_GRADIENT,
    position: "absolute",
    height: NAVBAR_HEIGHT,
    width: "100%",
    marginTop: 0,
    overflow: "auto",
    display: "flex",
    flexDirection: "row"
  }

  const buttonStyle = {
    color: "white"
  }

  // HELPERS *******************************************************************

  /**
   * A callback to navigate to the home page
   */ 
  function goHome() {
    setCourseId("")
    setRole("")
    navigate("/")
  }

  /**
   * A callback to navigate to the posts page
   */ 
  function goPosts() {
    navigate("/posts")
  }

  /**
   * A callback to navigate to the queues page
   */ 
  function goQueues() {
    navigate("/queues")
  }

  /**
   * A callback to logout
   */ 
  function goLogout() {
    setCourseId("")
    setRole("")
    setAuth("")
  }

  /**
   * Gets the user and sets the appropriate fields
   */ 
  async function loadUser() {
    if (auth != "") {
      const user = await getUser(SCHOOL, auth)
      setUsername(user.first + " " + user.last)
    }
  }

  /**
   * Gets the course and sets the appropriate fields
   */ 
  async function loadCourse() {
    if (courseId != "") {
      const course = await getCourse(SCHOOL, courseId)
      setCourseName(course.name)
    }
  }

  loadUser()
  loadCourse()

  // COMPONENT *****************************************************************

  // If the course has been selected
  if (courseId === "") {
    return (
      <div style={backgroundStyle}>
        <Button 
          style={buttonStyle}
          variant="text"
          onClick={goHome}>
            HOME
        </Button>
        <Button 
          style={{...buttonStyle, marginLeft:"auto"}}
          variant="text"
          onClick={goLogout}>
            {username}
        </Button>
      </div>
    )
  }

  // If the page is the home screen
  else {
    return (
      <div style={backgroundStyle}>
        <Button 
          style={buttonStyle}
          variant="text"
          onClick={goHome}>
            {coursename}
        </Button>
        <Button 
          style={buttonStyle}
          variant="text"
          onClick={goPosts}>
            POSTS
        </Button>
        <Button 
          style={buttonStyle}
          variant="text"
          onClick={goQueues}>
            QUEUES
        </Button>
        <Button 
          style={{...buttonStyle, marginLeft:"auto"}}
          variant="text"
          onClick={goLogout}>
            {username}
        </Button>
      </div>
    )

  }
  
  

}
