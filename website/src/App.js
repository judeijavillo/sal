// App.js: The main entrypoint for the SAL website
// 
// Authors: Jude Javillo and Ronin Sharma
// Version: 4 May 2022

import React, {
  useState
} from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { FILL_PARENT, FILL_WHITE, FILL_GRADIENT } from "./constants"
import Test from "./pages/Test"
import Welcome from "./pages/Welcome"

// COMPONENT *******************************************************************

function App() {

  // ATTRIBUTES ****************************************************************

  // Whether or not the user is authenticated
  const [authenticated, setAuthenticated] = useState(false);

  // STYLES ********************************************************************

  // The background style for this application if the user is authenticated
  const authenticatedStyle = {
    ...FILL_PARENT,
    ...FILL_WHITE
  }

  // The background style for this application if the user is not authenticated
  const unauthenticatedStyle = {
    ...FILL_PARENT,
    ...FILL_GRADIENT
  }

  // The background style for the application
  const backgroundStyle = authenticated 
    ? authenticatedStyle 
    : unauthenticatedStyle

  // COMPONENT *****************************************************************

  // The user is authenticated, return main pages
  if (authenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Test/>}/>
        </Routes>
      </Router>
    )
  }
  
  // The user is not authenticated, return authentication pages
  else {
    return (
      <div style={backgroundStyle}>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome/>}/>
          </Routes>
        </Router>
      </div>   
    )
  }
  
}

export default App;
