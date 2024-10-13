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
// import { NotMatch } from "./pages/NotMatch"
import { EditProfile } from "./screens/EditProfile"
// import ChangeEditProfile from "./components/ProfileEdit/ChangeEditProfileOld"
// import { ChangePassword } from "./components/ProfileEdit/ChangePasswordOld"
import PrivacyPolicy from "./components/privacyPolicy/PrivacyPolicy"
import { TermsOfUse } from "./components/termsOfUse/TermsOfUse"
import ViewReport from "./screens/ViewReport"
import Notifications from "./screens/Notifications"
import SettingsProfile from "./components/ProfileEdit/SettingsProfile"
import Messenger from "./components/messenger/Messenger"
import ChangeEditProfileMob from "./components/ProfileEdit/ChangeEditProfile"
import { ConfirmAcc } from "./components/ProfileEdit/ConfirmAcc"
import { ChangePassword } from "./components/ProfileEdit/ChangePassword"
import { ChangeEmail } from "./components/ProfileEdit/ChangeEmail"
import Followers from "./screens/Followers"
import Following from "./screens/Following"
import { TechSupport } from "./components/ProfileEdit/TechSupport"
import { SearcherUsersMobile } from "./screens/SearcherUsersMobile"

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
                <Switch>
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
                      <Notifications />
                    </Layout>
                  </Route>
                  <Route path={routes.users} exact>
                    <Layout>
                      <SearcherUsersMobile />
                    </Layout>
                  </Route>
                  <Route path={routes.messenger} exact>
                    <Layout>
                      <Messenger />
                    </Layout>
                  </Route>

                  <Route path={routes.accountSettingsProfile} exact>
                    <Layout>
                      <SettingsProfile />
                    </Layout>
                  </Route>
                  <Route path={routes.accountEditProfile} exact>
                    <Layout>
                      <EditProfile children={<ChangeEditProfileMob />} />
                    </Layout>
                  </Route>
                  <Route path={routes.accountConfirm} exact>
                    <Layout>
                      <EditProfile children={<ConfirmAcc />} />
                    </Layout>
                  </Route>
                  <Route path={routes.accountChangeEmail} exact>
                    <Layout>
                      <EditProfile children={<ChangeEmail />} />
                    </Layout>
                  </Route>
                  <Route path={routes.accountChangePassword} exact>
                    <Layout>
                      <EditProfile children={<ChangePassword />} />
                    </Layout>
                  </Route>

                  <Route path={routes.accountTechSupport} exact>
                    <Layout>
                      <EditProfile children={<TechSupport />} />
                    </Layout>
                  </Route>

                  <Route path={routes.report} exact>
                    <Layout>
                      <ViewReport />
                    </Layout>
                  </Route>

                  <Route path={routes.username} exact>
                    <Layout>
                      <Profile />
                    </Layout>
                  </Route>

                  <Route path={routes.followers} exact>
                    <Layout>
                      <Followers />
                    </Layout>
                  </Route>

                  <Route path={routes.following} exact>
                    <Layout>
                      <Following />
                    </Layout>
                  </Route>
                </Switch>
              )}
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  )
}

export default App
