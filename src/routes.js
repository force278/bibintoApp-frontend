const routes = {
  home: "/",
  signUp: "/sign-up",
  report: "/report",
  privacy: "/privacy-policy",
  termOfUse: "/termsOfUse",
  recommendations: "/recommendations",
  about: "/about",
  likes: "/likes",
  users: "/users",
  messenger: "/me",
  accountEditProfile: "/accountEditProfile",
  accountChangePassword: "/account/accountChangePassword",
  accountTechSupport: "/account/accountTechSupport",
  accountChangeEmail: "/account/accountChangeEmail",
  accountConfirm: "/account/accountConfirm",
  accountSettingsProfile: "/accountSettingsProfile",
  username: `/:username`,
  followers: `/:username/followers`,
  following: `/:username/following`,
}

export default routes
