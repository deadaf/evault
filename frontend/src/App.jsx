import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-800 p-4 text-center text-white">
      <p>
        &copy; Copyright 2023 eVault, licensed{" "}
        <Link to="https://github.com/deadaf/evault/blob/main/LICENSE">
          Apace License 2.0
        </Link>
        .
      </p>
    </footer>
  );
};

function App() {
  const [user, setUserProp] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUserProp={setUserProp} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
