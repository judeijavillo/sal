// api.js: A collection of helpers for accessing the API
// 
// Authors: Jude Javillo and Ronin Sharma
// Version: 5 May 2022

import { HOST, PORT } from "../constants"

/**
 * Returns a Promise of an HTTP Response object
 */ 
export async function makeRequest(method, endpoint, body = undefined) {
  const options = {
    method: method,
    headers: {
      Accept: 'application/json',
    }
  }
  if (body) options.body = body
  return fetch(`http://${HOST}:${PORT}/${endpoint}`, options)
}
