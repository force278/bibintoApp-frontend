const routes = {
  home: "/",
  signUp: "/sign-up",
  report: "/report",
  privacy: "/privacy-policy",
  termOfUse: "/termsOfUse",
  recommendations: "/recommendations",
  likes: "/likes",
  messenger: "/me",
  accountEditProfile: "/accountEditProfile",
  accountChangePassword: "/account/accountChangePassword",
  accountChangeEmail: "/account/accountChangeEmail",
  accountConfirm: "/account/accountConfirm",
  accountSettingsProfile: "/accountSettingsProfile",
  username: `/:username`,
  followers: `/:username/followers`,
  following: `/:username/following`,
}

export default routes
