import React from 'react';
import { createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  Link, 
  Outlet, 
  RouterProvider 
} from 'react-router-dom';

// Components
import Home from './Home';
import About from './About';
import NavigationBar from './NavigationBar.js';
import SignUpForm from './SignUpForm';
import Welcome from './Welcome.js';

// Styles
import './styles/App.scss';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root /> }>
        <Route index element={<SignUpForm />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/welcome" element={<Welcome />}></Route>
      </Route>
    )
  );

  return (
    
      <div id="App">
        
        <div id="app-body">
          <div>
            <RouterProvider router={router} />        
          </div>
        </div>

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
        <Link to="/">Login</Link>
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
