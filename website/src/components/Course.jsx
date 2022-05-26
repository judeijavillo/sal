// Course.jsx: A component to show a course
// 
// Authors: Jude Javillo and Ronin Sharma
// Version: 13 May 2022

import React, { useState } from "react"
import { getCourse } from "../utils/courses"
import {
  FILL_GRADIENT,
  SELECTION_BORDER_WIDTH,
  SCHOOL
} from "../constants"

// CONSTANTS *******************************************************************

const COURSE_PREVIEW_HEIGHT = 100

export default function Course({
  courseSelection,
  courseIndex,
  courseId,
  setCourseSelection
}) {

  // ATTRIBUTES ****************************************************************

  // Whether or not this course preview was selected
  const selected = courseSelection === courseIndex
  // The coursename of the current course
  const [courseName, setCourseName] = useState("")

  // STYLES ********************************************************************
  
  const containerStyle = {
    borderRadius: 10,
    height: COURSE_PREVIEW_HEIGHT * 1.3,
    padding: SELECTION_BORDER_WIDTH,
    margin: 5
  }

  const selectedStyle = {
    ...containerStyle,
    ...FILL_GRADIENT
  }

  const unselectedStyle = {
    ...containerStyle,
    background: "#BBBBBB"
  }

  const contentStyle = {
    borderRadius: 9,
    background: "white",
    width: "100%",
    height: COURSE_PREVIEW_HEIGHT * 1.3
  }    

  // HELPERS *******************************************************************

  /**
   * Gets the course and sets the appropriate fields
   */ 
  async function loadCourse() {
    if (courseId != "") {
      const course = await getCourse(SCHOOL, courseId)
      setCourseName(course.name)
    }
  }
  
  loadCourse();

  // COMPONENT *****************************************************************

  return (
    <div style={selected ? selectedStyle : unselectedStyle}>
      <div style={contentStyle} onClick={() => setCourseSelection(courseIndex)}>
        <h3 style={{ padding: "10px", margin: "auto" }}>{courseName}</h3>
      </div>
    </div>
  )
}
