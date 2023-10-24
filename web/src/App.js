import { useReactiveVar } from "@apollo/client"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { darkModeVar, isLoggedInVar } from "./apollo"
import Home from "./screens/Home"
import Login from "./screens/Login"
import NotFound from "./screens/NotFound"
import SignUp from "./screens/SignUp"
import { darkTheme, GlobalStyles, lightTheme } from "./styles"
import routes from "./routes"
import { HelmetProvider } from "react-helmet-async"
import { ApolloProvider } from "@apollo/client"
import { client } from "./apollo"
import Layout from "./components/Layout"
import Profile from "./screens/Profile"
import { NotMatch } from "./pages/NotMatch"
import { EditProfile } from "./screens/EditProfile"
import ChangeEditProfile from "./components/ProfileEdit/ChangeEditProfile"
import { ChangePassword } from "./components/ProfileEdit/ChangePassword"
import PrivacyPolicy from "./components/privacyPolicy/PrivacyPolicy"
import { TermsOfUse } from "./components/termsOfUse/TermsOfUse"
import { Messenger } from "./components/messenger/Messenger"
import LoginContainer from "./screens/Login/LoginContainer"

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const darkMode = useReactiveVar(darkModeVar)

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              {!isLoggedIn ? (
                <Route path={routes.signUp}>
                  <SignUp />
                </Route>
              ) : null}
              <Route path={routes.home} exact>
                {isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
                ) : (
                  <LoginContainer />
                )}
              </Route>
              <Route path="/recommendations">
                <Layout>
                  <Home />
                </Layout>
              </Route>

              <Route path="/messenger">
                <Layout>
                  <Messenger />
                </Layout>
              </Route>
              <Route path="/privacy-policy">
                <PrivacyPolicy />
              </Route>
              <Route path="/termsOfUse">
                <TermsOfUse />
              </Route>
              <Route path="/accountEditProfile" exact>
                <Layout>
                  <EditProfile children={<ChangeEditProfile />} />
                </Layout>
              </Route>
              <Route path="/account/accountChangePassword" exact>
                <Layout>
                  <EditProfile children={<ChangePassword />} />
                </Layout>
              </Route>
              <Route path={`/:username`}>
                <Layout>
                  <Profile />
                </Layout>
              </Route>
              <Route path={`*`}>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  )
}

export default App
