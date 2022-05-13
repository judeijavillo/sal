// Login.jsx: A page that allows Users to log in to SAL
// 
// Authors: Jude Javillo and Ronin Sharma
// Version: 12 May 2022

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button,TextField } from "@mui/material"
import { loginUser } from "../utils/users"
import { signInWithGoogle } from "../utils/api"
import { 
  CENTER_CONTENT, 
  CENTER_VERTICAL, 
  CENTER_HORTIZONTAL, 
  ROUNDED_CONTAINER,
  FILL_WHITE,
  CORNELL
} from "../constants";

// CONSTANTS *******************************************************************

// The feedback text for when the fields are bad
const FIELDS_BAD = "Please fill out all of the above fields"
// The feedback text for when the email/password combo is bad
const COMBO_BAD = "Invalid Email/Password Combination"
// The feedback text for when there is no account associated with Google auth
const GOOGLE_BAD = "No account found associated with Google profile"

export default function Login({
  setAuth
}) {
  
  // ATTRIBUTES ****************************************************************

  // The navigator to route between pages
  const navigate = useNavigate()
  // The value of the feedback message
  const [feedback, setFeedback] = useState(FIELDS_BAD)
  // The value of the email
  const [email, setEmail] = useState("")
  // The value of the password
  const [password, setPassword] = useState("")

  // HELPERS *******************************************************************

  /**
   * Returns the user to the welcome page
   */
   function goWelcome() {
    navigate("/")
  }

  /**
   * Brings the user to the login page
   */ 
  async function goLogin() {
    if (email === "" || password === "") {
      setFeedback(FIELDS_BAD)
    } else {
      const id = await loginUser(CORNELL, email, password)
      if (id === "") {
        setFeedback(COMBO_BAD)
      } else {
        setAuth(id)
        navigate("/")
      }
    }
  }

  /**
   * Signs a user up for SAL using the populated fields if validation passes.
   */
  function goSignup() {
    navigate("/signup")
  }

  /**
   * Logs a User into SAL using Google authentication
   */
  async function goGoogle() {
    const result = await signInWithGoogle()
    const email = result.user.email
    const id = await loginUser(CORNELL, email, "")
    console.log(result)
    console.log(id)
    if (id === "") {
      setFeedback(GOOGLE_BAD)
    } else {
      setAuth(id)
      navigate("/")
    }
  }

  // STYLES ********************************************************************

  const containerStyle = {
    ...CENTER_CONTENT,
    ...CENTER_VERTICAL,
    ...CENTER_HORTIZONTAL,
    ...ROUNDED_CONTAINER,
    ...FILL_WHITE,
    marginTop: 50
  }

  // The style for the feedback message
  const feedbackStyle = {
    color: "red"
  }

  // COMPONENT *****************************************************************

  return (
    <div style={containerStyle}>
      <h1>Login</h1>
      
      {/* TEXT INPUTS ****************************************************** */}
      <TextField 
        id="outlined-email-input"
        variant="outlined"
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        label="Email"/>
      <br/>
      <br/>
      <TextField 
        id="outlined-password-input"
        variant="outlined"
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        type ="password"
        label="Password"  />
      <br/>
      
      {/* FEEDBACK ********************************************************* */}
      <p
        id="feedback-text"
        style={feedbackStyle}>
          {feedback}
      </p>

      {/* BUTTONS ********************************************************** */}
      <Button 
        variant="contained"
        onClick={goLogin}>
          Login
      </Button>
      <br/>
      <br/>
      <Button 
        variant="contained"
        onClick={goGoogle}>
          Login with Google
      </Button>
      <br/>
      <br/>
      <Button 
        variant="text"
        onClick={goSignup}>
          I don't have an account yet
      </Button>
      <br/>
      <Button 
        variant="text"
        onClick={goWelcome}>
          BACK
      </Button>
    </div>
  )

}
