// Posts.jsx: The page that shows all of a class's posts
// 
// Authors: Jude Javillo and Ronin Sharma
// Version: 5 May 2022

import React, { useState, useEffect } from "react"
import { 
  Card,
  CardContent,
  TextField,
  Button
} from "@mui/material"
import { 
  SIDEBAR_WIDTH,
  SCHOOL
} from "../constants"
import Post from "../components/Post" 
import { getPosts, getComments, makePost, makeComment } from "../utils/posts"
import { getUser } from "../utils/users"


export default function Posts({
  auth,
  courseId
}) {

  // ATTRIBUTES ****************************************************************

  // The selected post index
  const [index, setPostIndex] = useState(-1)
  // The posts of this class
  const [posts, setPosts] = useState([])
  // The previews of the posts
  const [previews, setPreviews] = useState([])
  // The previews of the questions
  const [questions, setQuestions] = useState([])
  // The previews of the comments
  const [comments, setComments] = useState([])
  // The text of the title editor
  const [title, setTitle] = useState("")
  // The text of the details editor
  const [details, setDetails] = useState("")
  // The text of the comment editor
  const [text, setText] = useState("")

  // A wrapper for the post index setter
  const setIndex = (value) => {
    setPostIndex(value)
    setTitle("")
    setDetails("")
    setText("")
  }

  // STYLES ********************************************************************

  const sidebarStyle = {
    width: SIDEBAR_WIDTH,
    maxHeight: "100%",
    overflowY: "scroll"
  }

  const contentStyle = {
    width: "100%",
    height: "auto",
    maxHeight: "100%",
    overflowY: "scroll"
  }

  const listStyle = {
      width:"98%", 
      margin:"1%"
  }

  // HELPERS *******************************************************************

  /**
   * Updates the comments on this page
   */
  async function refreshComments() {
    const res = await getComments(SCHOOL, courseId, posts[index]["_id"])
    const promises = res.map(element => getUser(SCHOOL, element.author))
    const users = await Promise.all(promises)
    const result = res.map((elm, i) => {
      elm.author = users[i]
      return elm
    })

    setComments(result.map((elm, i) => 
      <Card variant="outlined" style={listStyle}>
        <React.Fragment>
          <CardContent>
            <h3>{elm.author.first + " " + elm.author.last}</h3>
            <p>{elm.content}</p>
          </CardContent>
        </React.Fragment>
      </Card>
    ))
  }

  /**
   * Updates the previews on this page
   */
  function refreshPreviews() {
    setPreviews(posts.map((elm, i) => 
      <Post 
        index={i} 
        setIndex={setIndex} 
        selectedIndex={index} 
        author={elm.author.first + " " + elm.author.last} 
        title={elm.title}/>))
  }

  /**
   * Updates the posts on this page
   */
  async function refreshPosts() {
    const res = await getPosts(SCHOOL, courseId)
    const promises = res.map(element => getUser(SCHOOL, element.author))
    const users = await Promise.all(promises)
    const result = res.map((elm, i) => {
      elm.author = users[i]
      return elm
    })
    setPosts(result)
    refreshPreviews()
    
    setQuestions(result.map((elm, i) => 
      <React.Fragment>
        <CardContent>
          <h1>{elm.title}</h1>
          <h3>{elm.author.first + " " + elm.author.last}</h3>
          <p>{elm.content}</p>
        </CardContent>
      </React.Fragment>
    ))

    if (index !== -1) refreshComments()
  }

  /**
   * Switches to the screen for making a post
   */
  function newPost() {
    setIndex(-1)
  }
  
  /**
   * Creates a post and updates the posts on this page
   */
  async function addPost() {
    const id = await makePost(SCHOOL, auth, courseId, title, details)
    setIndex(-1)
    refreshPosts()
  }

  /**
   * Adds a comment and updates the comments on this page
   */
  async function addComment() {
    const id = await makeComment(SCHOOL, auth, courseId, "", text, posts[index]["_id"])
    setText("")
    refreshPosts()
  }

  /**
   * Always update the previews
   */
  useEffect(() => { 
    refreshPreviews()
  })

  /**
   * Whenever the component mounts or updates, update the posts and comments
   */
  useEffect(() => { 
    refreshPosts()
    refreshPreviews()
    if (index !== -1) refreshComments()
  }, [])

  /**
   * Update the comments when the selected post changes
   */
  useEffect(() => { 
    if (index !== -1) refreshComments()
    refreshPreviews()
  }, [index])


  // COMPONENT *****************************************************************

  return (
    <div style={{display: "flex", width: "100%"}}>

      {/* SIDEBAR ********************************************************** */}

      <div id="sidebar" style={sidebarStyle}>
        <Button 
          variant="contained" 
          style={listStyle} 
          onClick={newPost}>
            New Post
        </Button>
        <TextField 
          id="outlined-search" 
          label="Search field" 
          type="search" 
          style={listStyle}/>
        { previews }
      </div>

      {/* MAIN CONTENT ***************************************************** */}

      <div id="content" style={contentStyle}>
        {(index === -1) ? (
          
          // NEW POSTS *********************************************************

          <div>
            <h1 style={listStyle}>New Post</h1>
            <TextField 
              style={listStyle} 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              id="outlined"
              label="Give your post a title"
              multiline
              rows={1}
              defaultValue=""
            />
            <TextField 
              style={listStyle} 
              value={details} 
              onChange={(e) => setDetails(e.target.value)}
              id="outlined-multiline-static"
              label="Enter post content here"
              multiline
              rows={10}
              defaultValue=""
            />
            <div style={{ textAlign: "right" }}>
              <Button 
                variant="contained" 
                style={{marginLeft:10, marginRight:10}} 
                onClick={addPost}>
                  Make Post
              </Button>
            </div>
          </div>
        ) :

        // VIEW POSTS **********************************************************

        (
          <div>
            <Card 
              variant="outlined" 
              style={listStyle}>
                {questions[index]}
            </Card>
            <br/>
            <h1 style={listStyle}>Comments</h1>
            {comments}
            <TextField 
              style={listStyle} 
              value={text} 
              onChange={(e) => setText(e.target.value)}
              id="outlined-multiline-static"
              label="Leave a comment"
              multiline
              rows={4}
              defaultValue=""
            />
            <div style={{ textAlign: "right" }}>
              <Button 
                variant="contained" 
                style={{marginLeft:10, marginRight:10}} 
                onClick={addComment}>
                  Post Comment
              </Button>
            </div>
            <div style={{ height: 100 }} /> 
          </div>
        )}
      </div>
    </div>
  )
}
