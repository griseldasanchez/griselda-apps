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
import Home from './components/Home.js';
import Articles from './components/Articles.js';
// eslint-disable-next-line
import NavigationBar from './components/NavigationBar.js';
import SignUpForm from './components/SignUpForm.js';
import LogOut from './components/LogOut.js';

// Styles
import './styles/App.scss';
import './styles/Resume.scss';
import Resume from './components/Resume.js';
import ContactForm from './components/ContactForm.js';
import Footer from './components/Footer.js';
import Portfolio from './components/Portfolio.js';
import Recipes from './components/Recipes.js';

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
        <Route path="/home" element={<Home />}></Route>
        <Route path="/contact" element={<ContactForm />}></Route>
        <Route path="/resume" element={<Resume />}></Route>
        <Route path="/portfolio" element={<Portfolio />}></Route>
        <Route path="/articles" element={<Articles />}></Route>
        <Route path="/recipes" element={<Recipes />}></Route>
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
      <Footer />
    </div>
  );
}

export const Root = () => {
  return (
    <>
    {/* Navigation Bar Routes */}
      <div id="navigation-bar"> 
        <Link to="/home">Home</Link>
        <Link to="/resume">Resume</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/portfolio">Portfolio</Link>
        {/* <Link to="/articles">Articles</Link> */}
        <Link to="/recipes">Recipes App</Link>

        {/* <Link to="/about">ABOUT</Link>
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
