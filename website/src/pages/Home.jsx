// Home.jsx: The main page that every user sees when logged in
// 
// Authors: Jude Javillo and Ronin Sharma
// Version: 13 May 2022

import React, { useState } from "react"
import Course from "../components/Course"
import { Button } from "@mui/material"

export default function Home({
  auth,
  courseId,
  setCourseId,
}) {

  // ATTRIBUTES ****************************************************************

  // The index of the of the selected course
  const [courseSelection, setCourseSelection] = useState(-1)
  // TODO: The different courses available, should not be hardcoded after MVP
  const courses = ["627e1b5e32670e5a13c78841", "627e1b7b32670e5a13c78842", "627e1b8832670e5a13c78843"] 

  const setCourse = (value) => {
    setCourseId(courses[value])
    setCourseSelection(value)
  }

  const coursePreviews = courses.map((elm, i) => 
    <Course
      key={"course " + i}
      courseSelection={courseSelection}
      courseIndex={i} 
      courseId={courses[i]}
      setCourseSelection={setCourse} >
    </Course>
  )

  // STYLES ********************************************************************

  const containerStyle = {
    width: "100%",
    height: "auto",
    maxHeight: "100%",
    overflowY: "scroll"
  }

  const contentStyle = {
    width: "60%",
    height: "auto",
    margin: "auto"
  }

  // HELPERS *******************************************************************
  
  function addCourse() {
    // TODO: Implement Me
  }

  function createCourse() { 
    // TODO: Implement Me
  }

  // COMPONENT *****************************************************************

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1>Courses</h1>

        {coursePreviews}

        {/* BUTTONS ******************************************************** */}
        <br/>
        <Button 
          variant="contained"
          onClick={addCourse}>
            Add Course
        </Button>
        <br/>
        <br/>
        <Button 
          variant="contained"
          onClick={createCourse}>
            Create Course
        </Button>
        <br/>
        <br/>
      </div>
    </div>
  )

}
