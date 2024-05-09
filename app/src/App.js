import React from 'react';
import { createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  Link, 
  Outlet, 
  RouterProvider 
} from 'react-router-dom';
import { useState } from 'react';

// Components
import Home from './Home';
import About from './About';
import NavigationBar from './NavigationBar.js';
import SignUpForm from './SignUpForm';
import Welcome from './Welcome.js';
// import LoginForm from './LoginForm'; // Add LoginForm component

import { useEffect } from 'react';
// Styles
import './styles/App.scss';

function App() {

  const [messageFromChild, setMessageFromChild] = useState('');
  const [usernameExists, setUsernameExists] = useState(false); // For user existence check

  const handleChildEvent = (data) => {
    setMessageFromChild(data);
    console.log('handlechildevent', data)
  };

  useEffect(() => {
    // Retrieve username data (replace with your actual logic)
    const retrievedUsername = localStorage.getItem('username'); // Example: check local storage
    setUsernameExists(retrievedUsername !== null);

    // Optional: If the message is related to username existence
    if (retrievedUsername) {
      handleChildEvent('Username exists!'); // Pass relevant message to child
    }
  }, []); // Empty dependency array to run only once on mount

  const router = createBrowserRouter(
    createRoutesFromElements(
      // Set signup as the initial route (/)
      <Route path="/" element={<Root />} >
        <Route index element={<Root />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/home" element={<Home />}></Route>
        {/* Login route to handle redirection after successful login */}
        <Route path="/login" element={<SignUpForm onChildEvent={handleChildEvent} />}></Route>
        <Route path="/welcome" element={<Welcome />}></Route>
      </Route>
    )
  );

  return (
    
      <div id="App">
        
        <div id="app-body">
        </div>

      <p>Message from Child: {messageFromChild}</p>

      {messageFromChild && <p>Username exists!</p>}

      {messageFromChild ? (
        // Pass user data if needed
        
        <div><About />
        <RouterProvider router={router} />        
        </div>
      ) : (
          <div>
            <SignUpForm onChildEvent={handleChildEvent} />
          </div>
      )}


        <footer id="app-footer">
        </footer>
      </div>

  );
}

export const Root = () => {
  return (
    <>
    {/* Navigation Bar Routes */}
      <div id="navigation-bar"> 
        {/* <Link to="/login">Login</Link> */}
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        {/* <Link to="/welcome">Welcome</Link> */}
      </div>
    {/* Other Routes */}
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App;
