import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function LoginPage() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 6000);
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
        <span className="title">Login</span>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button disabled={loading || error}>Sign In</button>
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
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
