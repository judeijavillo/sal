// constants.js: A collection of constants used across the SAL website
// 
// Authors: Jude Javillo and Ronin Sharma
// Version: 5 May 2022

// SERVER **********************************************************************

// Whether or not the website is running in developer mode
const DEVELOPER_MODE = true

// The address of the host of the server
export const HOST = DEVELOPER_MODE ? "127.0.0.1" : "3.138.173.189"

// The port of the host of the server
export const PORT = "8000"

// The test school to use for demo purposes
export const SCHOOL = "Cornell_University"

// COLORS **********************************************************************

// The signature SAL blue
export const PURPLE = "#733BFF"

// The signature SAL purple
export const BLUE = "#4DACFF"

// The signature SAL white
export const WHITE = "#FFFFFF"

// The signature SAL gray
export const GRAY = "#BBBBBB"

// STYLES **********************************************************************

// The height of the navigation bar
export const NAVBAR_HEIGHT = 75

// The standard width of a sidebar
export const SIDEBAR_WIDTH = 400

// The width of the selection border
export const SELECTION_BORDER_WIDTH = 2

// A style to fill the background to be purple
export const FILL_PURPLE = {
  background: PURPLE
}

// A style to fill the background to be blue
export const FILL_BLUE = {
  background: BLUE
}

// A style to fill the background to be white
export const FILL_WHITE = {
  background: WHITE
}

// A style to fill the background to be the signature SAL gradient
export const FILL_GRADIENT = {
  backgroundImage: `linear-gradient(to right, ${PURPLE}, ${BLUE})`
}

// A style to make a component take up all of the space of its parent
export const FILL_PARENT = {
  position: "absolute",
  width: "100%",
  height: "100%"
}

// A style to center the content of the this component
export const CENTER_CONTENT = {
  textAlign: "center"
}

// A style to center this component within its parent vertically
export const CENTER_VERTICAL = {
  marginTop: "auto",
  marginBottom: "auto"
}

// A style to center this component within its parent horizontally
export const CENTER_HORTIZONTAL = {
  marginLeft: "auto",
  marginRight: "auto"
}

// A style to make this component be a rounded container (corners and border)
export const ROUNDED_CONTAINER = {
  border: `2px solid ${GRAY}`,
  borderRadius: "25px",
  padding: "25px",
  width: "40%"
}
