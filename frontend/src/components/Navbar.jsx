import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, []);

  const handleLogin = () => signInWithPopup(auth, provider);
  const handleLogout = () => signOut(auth);

  return (
    <div className="navbar bg-neutral text-primary-content px-6">
      <div className="flex-1 text-lg font-bold">
        <Link to="/" className="btn btn-info btn-sm text-white">
          Home
        </Link>
        <Link to="/questions" className="ml-8 btn btn-info btn-sm text-white">
          Questions
        </Link>
      </div>
      <div className="flex-none">
        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/submit" className="btn btn-info btn-sm text-white">
              Submit Question
            </Link>
            <span className="ml-6 text-white">{user.displayName}</span>
            <button onClick={handleLogout} className="ml-6 btn btn-sm btn-accent text-white">
              Logout
            </button>
          </div>
        ) : (
          <button onClick={handleLogin} className="ml-6 btn btn-sm btn-accent text-white">
            Login
          </button>
        )}
      </div>
    </div>
  );
}
