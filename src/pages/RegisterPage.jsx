import React from "react";
import addAvatar from "../img/addAvatar.png";
import noAvatar from "../img/noAvatar.png";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    let file = e.target[3].files[0];
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            if (typeof file === "undefined") {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL:
                  "https://firebasestorage.googleapis.com/v0/b/chat-app-efec9.appspot.com/o/noAvatar.png?alt=media&token=a9a9c083-183a-4f3f-b85b-b02fb18a2861",
              });
            } else {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
            }

            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            setTimeout(() => {
              setLoading(false);
              navigate("/react-chat-app");
            }, 6000);
          } catch (err) {
            setError(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 6000);
    }
  }

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">Chat App</span>
        <span className="title">Register</span>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input className="file-load" type="file" id="file" />
          <label htmlFor="file">
            <img src={addAvatar} alt="add avatar img" />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading || error}>Sign Up</button>
          {error && (
            <div className="auth-error-container">
              <h3>Oops,something went wrong...</h3>
              <div className="auth-error-line-container">
                <div className="auth-error-line"></div>
              </div>
            </div>
          )}
          {loading && (
            <div className="loading-container">
              <h3>Loading, please wait...</h3>
              <div className="loading-line-container">
                <div className="loading-line"></div>
              </div>
            </div>
          )}
        </form>
        <p>
          You do have an account? <Link to="/react-chat-app/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
