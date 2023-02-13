import { useReactiveVar } from "@apollo/client";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { isLoggedInVar } from "./apollo";
import Home from "./screens/Home";
import Login from "./screens/Login";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Home />:<Login />} />
            <Route path="/login" element={<h1>Вход</h1>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
