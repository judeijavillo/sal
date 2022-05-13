// Test.jsx: A placeholder page that also checks that the base endpoints work
// 
// Authors: Jude Javillo and Ronin Sharma
// Version: 5 May 2022

import React from "react"
import { makeRequest } from "../utils/api"

export default function Test() {

  // HELPERS *******************************************************************

  /**
   * Logs whether the `endpoint` with the given `requests` were all successful
   */
  function checkEndpoint(endpoint, requests) {
    Promise.all(requests)
    .then(responses => {
      var successful = 0;
      for (var i = 0; i < methods.length; i++) {
        successful += (responses[i].status === 200) ? 1 : 0
      }

      console.log(endpoint + " endpoints " + (
        (successful === methods.length) 
          ? "successful"
          : "unsuccessful"
      ))
    })
  }

  // Check every combination of method and endpoint
  const methods = ["GET", "POST", "PATCH", "DELETE"]
  const endpoints = ["courses", "entries", "posts", "queues", "schools", "users"]
  endpoints.forEach(endpoint => {
    const requests = methods.map(method => makeRequest(method, endpoint + "/test"))
    checkEndpoint(endpoint, requests)
  })

  // COMPONENT *****************************************************************

  return (
    <h1>TEST</h1>
  )
}
