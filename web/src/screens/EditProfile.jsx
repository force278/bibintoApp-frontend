import React, { useState } from "react"
import "../sass/common.scss"
import "../sass/editProfile.scss"
import { NavLink } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
// import ChangeEditProfile from "../components/ProfileEdit/ChangeEditProfile"
import ChangeEditProfile from "../components/ProfileEdit/ChangeEditProfile"
import { isMob } from "../utils/isMob"

export const EditProfile = ({ children }) => {
  const history = useHistory()
  const [isMobile] = useState(isMob())

  const logOut = () => {
    localStorage.removeItem("TOKEN")
    history.push("/")
    window.location.reload()
  }

  return (
    <>
      {!isMobile && (
        <div className="container editProfileWrap editProfileDesktop">
          <div className="editAside">
            <NavLink to="/accountEditProfile" activeClassName="active_profile">
              <button className="btnSwithWindow">Редактировать профиль</button>
            </NavLink>
            <NavLink
              to="/account/accountChangePassword"
              activeClassName="active_profile"
            >
              <button className="btnSwithWindow">Поменять пароль</button>
            </NavLink>
            <NavLink
              to="/account/accountChangeEmail"
              activeClassName="active_profile"
            >
              <button className="btnSwithWindow">Изменить почту</button>
            </NavLink>
            {/*
            <NavLink
              to="/account/accountConfirm"
              activeClassName="active_profile"
            >
              <button className="btnSwithWindow">Подтвердить аккаунт</button>
            </NavLink>
            */}

            <NavLink
              to="/account/accountTechSupport"
              activeClassName="active_profile"
            >
              <button className="btnSwithWindow">Написать в поддержку</button>
            </NavLink>
            {/* <NavLink
              to="/account/accountChangePassword"
              activeClassName="active_profile"
            > */}
            <button
              onClick={logOut}
              className="btnSwithWindow"
              style={{ color: "#FF3B30" }}
            >
              Выйти
            </button>
            {/* </NavLink> */}
          </div>
          <div className="main">{children}</div>
        </div>
      )}

      {isMobile && (
        <div className="editProfileWrapMob">
          <div className="header">
            <button
              type="button"
              className="formBtnBack"
              onClick={() => history.goBack()}
            ></button>
            <p>Редактировать профиль</p>
          </div>
          <ChangeEditProfile />
        </div>
      )}
    </>
  )
}
