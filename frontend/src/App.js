import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Questions from "./pages/Questions";
import CompanyPage from "./pages/CompanyPage";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { auth } from "./firebase";
import Submit from "./pages/Submit";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/company/:company" element={<CompanyPage user={user} />} />
        <Route path="/submit" element={ <Submit user={user} /> } />
        <Route path="/questions" element={ <Questions user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
