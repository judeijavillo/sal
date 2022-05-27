// posts.js: functions to simplify accessing posts from the server
// 
// Authors: Jude Javillo and Ronin Sharma
// Version: 4 May 2022

import {
  makeRequest
} from "./api"

/**
 * Returns a Promise of a list of posts for a course iff the courseId is valid
 */ 
 export async function getPosts(school, courseId) {
  return makeRequest("GET", `posts/?school=${school}&course=${courseId}`)
  .then(res => res.json())
  .then(res => (res["successful"]) ? res["result"] : undefined )
}

/**
 * Returns a Promise of a list of comments for a course iff the courseId is valid
 */ 
 export async function getComments(school, courseId, parent) {
  return makeRequest("GET", `posts/comments?school=${school}&course=${courseId}&parent=${parent}`)
  .then(res => res.json())
  .then(res => (res["successful"]) ? res["result"] : undefined )
}

/**
 * Returns a Promise of the ID of a Post iff creation is successful
 */ 
 export async function makePost(school, author, course, title, content) {
  return makeRequest("POST", `posts/?school=${school}`, {
    "author": author,
    "course": course,
    "title": title,
    "content": content,
    "parent": ""
  })
  .then(res => res.json())
  .then(res => String(res["_id"]) )
}

/**
 * Returns a Promise of the ID of a Post comment iff creation is successful
 */ 
 export async function makeComment(school, author, course, title, content, parent) {
  return makeRequest("POST", `posts/?school=${school}`, {
    "author": author,
    "course": course,
    "title": title,
    "content": content,
    "parent": parent
  })
  .then(res => res.json())
  .then(res => String(res["_id"]) )
}

