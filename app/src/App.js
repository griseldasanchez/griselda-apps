import React from 'react';
import { createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  Link, 
  Outlet, 
  RouterProvider 
} from 'react-router-dom';
import { useState, useEffect } from 'react';

// Components
import Home from './Home';
import About from './About';
// eslint-disable-next-line
import NavigationBar from './NavigationBar.js';
import SignUpForm from './SignUpForm';
import LogOut from './LogOut.js';

// Styles
import './styles/App.scss';
import './styles/Resume.scss';
import Resume from './Resume.js';

function App() {

  const [username, setUsername] = useState('');

  const handleChildEvent = (data) => {
    setUsername(data);
    console.log('handlechildevent', data)
  };

  useEffect(() => {
    // Retrieve username data (replace with your actual logic)
    const retrievedUsername = localStorage.getItem('username'); // Example: check local storage
    if (retrievedUsername) {
      handleChildEvent('Username exists!'); // Pass relevant message to child
    }
  }, [username]); // Empty dependency array to run only once on mount

  const router = createBrowserRouter(
    createRoutesFromElements(
      // Set signup as the initial route (/)
      <Route path="/" element={<Root />} >
        {/* <Route index element={<Root />}></Route> */}
        {/* Login route to handle redirection after successful login */}
        <Route path="/login" element={<SignUpForm onChildEvent={handleChildEvent} />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/resume" element={<Resume />}></Route>
        <Route path="logout" element={<LogOut onChildEvent={handleChildEvent} />}></Route>
      </Route>
    )
  );

  return (
    <div id="App">
      {/* REMOVED LOGIN FORM, add back for login form */}
      {/* {username ? (
        <div>
          <RouterProvider router={router} /> 
        </div>
      ) : (
        <div>
          <SignUpForm onChildEvent={handleChildEvent} />
        </div>
      )} */}
      
      {/* Display navigation bar */}
      <div>
          <RouterProvider router={router} /> 
      </div>
    </div>
  );
}

export const Root = () => {
  return (
    <>
    {/* Navigation Bar Routes */}
      <div id="navigation-bar"> 
        <Link to="/home">HOME</Link>
        <Link to="/resume">RESUME</Link>

        {/* <Link to="/about">ABOUT</Link>
        <Link to="/contact">CONTACT</Link>
        <Link to="/blog">BLOG</Link>
        <Link to="/learning">CONTINUOUS LEARNING</Link> */}
        
        {/* REMOVED LOGIN FORM, add back for login form */}
        {/* <Link to="/logout">Log Out</Link> */}
      </div>
    {/* Other Routes */}
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App;
