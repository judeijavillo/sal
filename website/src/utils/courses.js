// courses.js: functions to simplify accessing courses from the server
// 
// Authors: Jude Javillo and Ronin Sharma
// Version: 4 May 2022

import {
  makeRequest
} from "./api"

/**
 * Returns a Promise of a Course iff the id is valid
 */ 
 export async function getCourse(school, id) {
  return makeRequest("GET", `courses/?school=${school}&id=${id}`)
  .then(res => res.json())
  .then(res => (res["successful"]) ? res["course"] : undefined )
}
