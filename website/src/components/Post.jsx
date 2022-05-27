// Post.jsx: A single post preview
// 
// Authors: Jude Javillo and Ronin Sharma
// Version: 26 May 2022

import { 
  FILL_GRADIENT,
  SELECTION_BORDER_WIDTH, 
  SIDEBAR_WIDTH 
} from "../constants"

// CONSTANTS *******************************************************************

// The height of the post preview
const POST_PREVIEW_HEIGHT = 100

export default function Post({
  index,
  setIndex,
  selectedIndex,
  title = "Post failed to load",
  author = "Author Name"

}) {
  const selected = selectedIndex === index;
  const onClick = () => setIndex(index)

  // STYLES ********************************************************************

  const containerStyle = {
    borderRadius: 10,
    height: POST_PREVIEW_HEIGHT,
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
    background: selected ? "#EEEEEE" : "white",
    width: "100%",
    height: POST_PREVIEW_HEIGHT,
    cursor: "pointer"
  }    
    
  // COMPONENT *****************************************************************

  return (
    <div style={selected ? selectedStyle : unselectedStyle}>
      <div style={contentStyle} onClick={onClick}>
        <h3 style={{padding: 10, margin:0}}>{title}</h3>
        <h4 style={{padding: 10, margin:0}}>{author}</h4>
      </div>
    </div>
  )
}