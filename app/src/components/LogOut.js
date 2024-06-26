import React from "react";
import { signOut, } from "firebase/auth";
import { auth } from "../firebase.js";

function LogOut ( { onChildEvent }) {

  // const [user, setUser] = useState("");

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  //   console.log('currentUser:' + currentUser);
    
  //   onChildEvent(user?.email);
  // });

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      
      <button onClick={logout}> Sign Out </button>
    </div>
  )
}

export default LogOut;