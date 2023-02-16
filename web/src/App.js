import { useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import {darkModeVar, isLoggedInVar } from "./apollo";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import SignUp from "./screens/SignUp";
import routes from "./routes";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <div>
      <GlobalStyles/>
      <Router>
        <div>
          <Routes>
            <Route path={routes.home} element={isLoggedIn ? <Home />:<Login />} />
            <Route path={routes.signUp} element={isLoggedIn ? <Navigate to={routes.home} replace />:<SignUp/>} />
            <Route path="*" element={<Navigate to={routes.home} replace />} />
          </Routes>
        </div>
      </Router>
    </div>
    </ThemeProvider>
  );
}

export default App;
