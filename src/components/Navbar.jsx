import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";

function Navbar() {
  return (
    <div className="navbar">
      <span className="logo">App Name</span>
      <div className="user">
        <img
          src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="avatar"
        />
        <span>Dmitry</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
