// Signup.jsx: A page to allow Users to sign up for SAL
// 
// Authors: Jude Javillo and Ronin Sharma
// Version: 10 May 2022

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, TextField } from "@mui/material"
import { checkEmail, signupUser } from "../utils/users"
import { signInWithGoogle } from "../utils/api"
import {
  CENTER_CONTENT,
  CENTER_VERTICAL,
  CENTER_HORTIZONTAL,
  ROUNDED_CONTAINER,
  FILL_WHITE,
  CORNELL
} from "../constants"

// CONSTANTS *******************************************************************

// The feedback text for when the fields are bad
const FIELDS_BAD = "Please fill out all of the above fields"
// The feedback text for when the email is bad
const EMAIL_BAD = "An account with this email already exists"
// The feedback text for when the password is bad
const PASSWORD_BAD = "Password must be at least 8 characters long"
// The feedback text for when the confirm is bad
const CONFIRM_BAD = "Password and Confirm Password fields do not match"

export default function Signup({
  setAuth
}) {

  // ATTRIBUTES ****************************************************************

  // The navigator to route between pages
  const navigate = useNavigate()
  // The value of the feedback message
  const [feedback, setFeedback] = useState(FIELDS_BAD)
  // The value of the email
  const [email, setEmail] = useState("")
  // The value of the first name
  const [first, setFirst] = useState("")
  // The value of the last name
  const [last, setLast] = useState("")
  // The value of the password
  const [password, setPassword] = useState("")
  // The value of the confirm
  const [confirm, setConfirm] = useState("")

  // HELPERS *******************************************************************

  /**
   * Returns true iff all of the input fields are nonempty
   */ 
  function validateFields() {
    return email !== "" 
      && first !== "" 
      && last !== "" 
      && password !== "" 
      && confirm !== ""
  }

  /**
   * Returns a Promise of true iff the email is not taken
   */
  async function validateEmail() {
    return checkEmail(CORNELL, email)
  }

  /**
   * Returns true iff the password is good
   */
  function validatePassword() {
    return password.length >= 8
  }

  /**
   * Returns true iff the confirm is good
   */
  function validateConfirm() {
    return password === confirm
  }

  /**
   * Returns the user to the welcome page
   */
  function goWelcome() {
    navigate("/")
  }

  /**
   * Brings the user to the login page
   */ 
  function goLogin() {
    navigate("/login")
  }

  /**
   * Signs a user up for SAL using the populated fields if validation passes.
   */
  async function goSignup() {
    // Validate all of the fields
    const fieldsGood = validateFields()
    const emailGood = await validateEmail()
    const passwordGood = validatePassword()
    const confirmGood = validateConfirm()

    // If any of the fields are empty
    if (!fieldsGood) {
      setFeedback(FIELDS_BAD)
    }

    // If the email is taken
    else if (!emailGood) {
      setFeedback(EMAIL_BAD)
    }

    // If the password is not good enough
    else if (!passwordGood) {
      setFeedback(PASSWORD_BAD)
    }

    // If the password and the confirm do not match
    else if (!confirmGood) {
      setFeedback(CONFIRM_BAD)
    }

    // Else, everything checks out and the user is signed up
    else {
      const id = await signupUser(CORNELL, email, first, last, password)
      setAuth(id)
      navigate("/")
    }
  }

  /**
   * Signs a user up for SAL using Google authentication
   */
  async function goGoogle() {
    const result = await signInWithGoogle()
    const email = result.user.email
    const name = result.user.displayName
    const first = name.substring(0, name.indexOf(" "))
    const last = name.substring(name.indexOf(" ") + 1)
    const id = await signupUser(CORNELL, first, last, email, "")
    setAuth(id)
    navigate("/")
  }

  // STYLES ********************************************************************

  // The style for the container
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
      <h1>Sign Up</h1>

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
        id="outlined-first-input"
        variant="outlined"
        value={first} 
        onChange={e => setFirst(e.target.value)} 
        label="First Name"/>
      <br/>
      <br/>
      <TextField 
        id="outlined-last-input"
        variant="outlined"
        value={last} 
        onChange={e => setLast(e.target.value)} 
        label="Last Name"/>
      <br/>
      <br/>
      <TextField 
        id="outlined-password-input"
        variant="outlined"
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        type ="password"
        label="Password"/>
      <br/>
      <br/>
      <TextField 
        id="outlined-confirm-input"
        variant="outlined"
        value={confirm} 
        onChange={e => setConfirm(e.target.value)} 
        type ="password"
        label="Confirm Password"/>
      <br/>
      
      {/* FEEDBACK ********************************************************* */}
      <p
        id="feedback-text"
        style={feedbackStyle}>
          {feedback}
      </p>

      {/* BUTTONS ********************************************************** */}
      <Button 
        id="contained-signup-button"
        variant="contained" 
        onClick={goSignup}>
          Sign up
      </Button>
      <br/>
      <br/>
      <Button 
        id="contained-google-button"
        variant="contained"
        onClick={goGoogle}>
          Sign up with Google
      </Button>
      <br/>
      <br/>
      <Button 
        id="text-login-button"
        variant="text" 
        onClick={goLogin}>
          I already have an account
      </Button>
      <br/>
      <Button 
        id="text-welcome-button"
        variant="text" 
        onClick={goWelcome}>
          BACK
      </Button>
    </div>
  )

}
