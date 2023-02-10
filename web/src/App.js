import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";

function main(isLoggedIn) {
  if (isLoggedIn){
    return <Home/>
  } else {
    return <Login/>
  }
}

function App() {
  const isLoggedIn = true;
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={main(isLoggedIn)} />
            <Route path="/login" element={<h1>Вход</h1>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
