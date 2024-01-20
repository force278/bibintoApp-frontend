import { useReactiveVar } from "@apollo/client"
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { darkModeVar, isLoggedInVar } from "./apollo"
import Home from "./screens/Home"
import LoginContainer from "./screens/Login/LoginContainer"
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
import ViewReport from "./screens/ViewReport"

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
                <>
                  <Route path={routes.signUp} exact>
                    <SignUp />
                  </Route>
                  <Route path={routes.home} exact>
                    <LoginContainer />
                  </Route>
                  <Route path={routes.privacy}>
                    <PrivacyPolicy />
                  </Route>
                  <Route path={routes.termOfUse}>
                    <TermsOfUse />
                  </Route>
                  <Redirect to={routes.home} />
                </>
              ) : (
                <>
                  <Route path={routes.home} exact>
                    <Layout>
                      <Home />
                    </Layout>
                  </Route>
                  <Route path={routes.recommendations} exact>
                    <Layout>
                      <Home />
                    </Layout>
                  </Route>
                  <Route path={routes.likes} exact>
                    <Layout>
                      <NotMatch />
                    </Layout>
                  </Route>
                  <Route path={routes.message} exact>
                    <Layout>
                      <Messenger />
                    </Layout>
                  </Route>
                  <Route path={routes.accountEditProfile} exact>
                    <Layout>
                      <EditProfile children={<ChangeEditProfile />} />
                    </Layout>
                  </Route>
                  <Route path={routes.accountChangePassword} exact>
                    <Layout>
                      <EditProfile children={<ChangePassword />} />
                    </Layout>
                  </Route>
                  <Route path={routes.report} exact>
                    <Layout>
                      <ViewReport />
                    </Layout>
                  </Route>
                  <Switch>
                    <Route path={routes.username}>
                      <Layout>
                        <Profile />
                      </Layout>
                    </Route>
                  </Switch>
                </>
              )}
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  )
}

export default App
