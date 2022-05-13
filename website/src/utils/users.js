// users.js: functions to simplify accessing users from the server
// 
// Authors: Jude Javillo and Ronin Sharma
// Version: 4 May 2022

import {
  makeRequest
} from "./api"

/**
 * Returns a Promise of true iff the email is not taken in the school
 */ 
export async function checkEmail(school, email) {
  return makeRequest("GET", `users/email?school=${school}&email=${email}`)
  .then(res => res.json())
  .then(res => res["result"] === true)
}

/**
 * Returns a Promise of the ID of a User iff signup is successful
 */ 
export async function signupUser(school, email, first, last, password) {
  return makeRequest("POST", `users/signup?school=${school}`, {
    "email": email,
    "first": first,
    "last": last,
    "password": password
  })
  .then(res => res.json())
  .then(res => String(res["_id"]) )
}
