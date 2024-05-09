import { useState } from "react";
// Functions are being imported from firebase library in auth directory
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, } from "firebase/auth";
// Import firebase connection
import { auth } from "./firebase.js";
// iImport style sheets
import "./styles/App.scss";
import "./styles/SignUpForm.scss";

function SignUpForm() {
  // Form login/singup variables
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});
  
  // User that is currently logged in so it remains on refresh
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth, 
        registerEmail, 
        registerPassword 
      );
      console.log('User that was registered was: ', user);
    } catch (error) {
      console.log('Error registering user: ', error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log('User that just logged in: ', user);
    } catch (error) {
      console.log('Error when user tried to log in: ', error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="SignUpLoginForm">
      <h3> Register User </h3>
      <div className="SignUpForm">
        <input placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input className="password" type="password" placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        <button onClick={register}> Create User</button>
      </div>

      <h3> Login </h3>
      <div className="LoginForm">
        <input placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input className="password" type="password" placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button onClick={login}> Login</button>
      </div>
        
      <div className="LoggedInUser">  
        <h4> User Logged In: </h4> {user?.email}

        <button onClick={logout}> Sign Out </button>
      </div>
    </div>
  );
}

export default SignUpForm;