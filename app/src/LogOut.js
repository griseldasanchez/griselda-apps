import React from "react";
import { signOut, } from "firebase/auth";
import { auth } from "./firebase.js";

function LogOut () {

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