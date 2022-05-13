// api.js: A collection of helpers for accessing the API
// 
// Authors: Jude Javillo and Ronin Sharma
// Version: 5 May 2022

import 'firebase/compat/auth'
import firebase from 'firebase/compat/app'
import { HOST, PORT } from "../constants"

// CONSTANTS *******************************************************************

const config = {
  apiKey: "AIzaSyDMnbOnzFADuB_guQU2pC2KtGtS-iQAgiU",
  authDomain: "letmeout-51bc0.firebaseapp.com",
  projectId: "letmeout-51bc0",
  storageBucket: "letmeout-51bc0.appspot.com",
  messagingSenderId: "1059319004976",
  appId: "1:1059319004976:web:5ec991d1baa1a0391952f5",
  measurementId: "G-HX69S0DZG2"
};
 
// SETUP ***********************************************************************

firebase.initializeApp(config)
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

// FUNCTIONS *******************************************************************

/**
 * Signs in a User using Google Authentication
 */ 
export async function signInWithGoogle() {
  return await auth.signInWithPopup(provider)
}

/**
 * Returns a Promise of an HTTP Response object
 */ 
export async function makeRequest(method, endpoint, body = undefined) {
  const options = {
    method: method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }
  if (body) options.body = JSON.stringify(body)
  return fetch(`http://${HOST}:${PORT}/${endpoint}`, options)
}
