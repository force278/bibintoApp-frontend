import Search from "./Search"
import routes from "../routes"
import useMe from "../hooks/useMe"
import { isLoggedInVar } from "../apollo"
import logo from "../assets/img/bibinto.svg"

import chatIcon from "../assets/icons/chat.svg"
import chatIconFill from "../assets/icons/chatFill.svg"
import homeIcon from "../assets/icons/home.svg"
import homeIconFill from "../assets/icons/homeFill.svg"
import notificationIconFill from "../assets/icons/notificationFill.svg"
import notificationIconNew from "../assets/icons/notificationNew.svg"
import notificationIcon from "../assets/icons/notification.svg"
import profileIconFill from "../assets/icons/profileFill.svg"
import profileIcon from "../assets/icons/profile.svg"

import { useReactiveVar } from "@apollo/client"
import uploadIcon from "../assets/img/upload.svg"
import UploadPopUp from "../screens/UploadPopUp"
import { Link, useHistory } from "react-router-dom"
import { NavLink } from "react-router-dom/cjs/react-router-dom"
import { ModalSupportForm } from "./modalSupportForm/ModalSupportForm"
import React, { useState, useEffect, useCallback, useRef } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"
import { Alert } from "@mui/material"

export function Header({ notificationList }) {
  const curLocation = useLocation().pathname
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const { data } = useMe()
  const history = useHistory()
  const [showModal, setShowModal] = useState(false)
  const [showError, setShowError] = useState(false)
  const [profileActive, setProfileActive] = useState(false)
  const modalRef = useRef()
  const uploadInputRef = useRef(null)
  const handleShowModal = (event) => {
    event.stopPropagation()
    setShowModal(!showModal)
  }

  useEffect(() => {
    if (!["/", "/me", "/likes", "/recommendations"].includes(curLocation)) {
      setProfileActive(true)
    } else setProfileActive(false)
  }, [curLocation])

  const logOut = () => {
    localStorage.removeItem("TOKEN")
    history.push("/")
    window.location.reload()
  }

  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false)
      }
    }

    document.addEventListener("click", handleClickOutsideModal)

    return () => {
      document.removeEventListener("click", handleClickOutsideModal)
    }
  }, [])

  const [uploadModalActive, setUploadModalActive] = useState(false)

  const handleUploadImage = () => {
    setUploadModalActive(true)
  }

  const handleClosePopUp = useCallback(() => {
    if (uploadInputRef.current?.files?.length) {
      uploadInputRef.current.value = ""
    }
    setUploadModalActive(false)
  }, [])

  return (
    <>
      <div
        className="w-100 border-bottom bg-white d-flex align-items-center justify-content-center position-fixed z-1 headerWrap mobile"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 10px 0px",
        }}
      >
        <div
          className="w-100 d-flex justify-content-between align-items-center"
          style={{ maxWidth: "930px" }}
        >
          <div className="d-flex justify-content-between w-100">
            {isLoggedIn ? (
              <div className="d-flex align-items-center menu-items w-100 justifyContentCenterForMobile">
                <div className="hideElement">
                  <Link to={routes.home}>
                    <div>
                      <img src={logo} width="100" alt="Бибинто"></img>
                    </div>
                  </Link>
                </div>
                <div className="hideElement">
                  <Search />
                </div>
                <div className="d-flex" style={{ gap: "40px" }}>
                  <NavLink exact activeClassName="is-active" to={routes.home}>
                    <div className="light">
                      <img src={homeIcon} alt="" />
                    </div>
                    <div className="dark">
                      <img src={homeIconFill} alt="" />
                    </div>
                  </NavLink>
                  <NavLink
                    to="/me"
                    activeClassName="is-active"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <div className="light">
                      <img src={chatIcon} alt="" />
                    </div>
                    <div className="dark">
                      <img src={chatIconFill} alt="" />
                    </div>

                    {/* <img src={messageIcon} alt="message" /> */}
                  </NavLink>
                  <span className="main-span">
                    <input
                      style={{
                        opacity: 0,
                        visibility: "hidden",
                        position: "absolute",
                      }}
                      id="imageInput"
                      type="file"
                      ref={uploadInputRef}
                      onChange={handleUploadImage}
                      accept="image/jpeg, image/png"
                    />
                    <label className="uploadIcon" htmlFor="imageInput">
                      <img
                        src={uploadIcon}
                        alt="upload"
                        style={{ cursor: "pointer" }}
                      />
                    </label>
                  </span>
                  <NavLink to="/likes" activeClassName="is-active">
                    {notificationList.length === 0 && (
                      <div className="light">
                        <img src={notificationIcon} alt="" />
                      </div>
                    )}
                    {notificationList.length > 0 && (
                      <div className="light">
                        <img src={notificationIconNew} alt="" />
                      </div>
                    )}

                    <div className="dark">
                      <img src={notificationIconFill} alt="" />
                    </div>
                  </NavLink>
                  <NavLink
                    to={`/${data?.me?.username}`}
                    onClick={handleShowModal}
                    activeClassName="is-active"
                  >
                    <div className="light">
                      <img src={profileIcon} alt="" />
                    </div>
                    <div className="dark">
                      <img src={profileIconFill} alt="" />
                    </div>
                    {/* <div className="light">{userIcon}</div>
                    <div className="dark">{userIconDark}</div> */}
                  </NavLink>
                  {/* <NavLink
                    to={`/${data?.me?.username}`}
                    onClick={handleShowModal}
                    activeClassName="is-active"
                    className="onlyMob"
                  >
                    <div className="light">{userIcon}</div>
                    <div className="dark">{userIconDark}</div>
                  </NavLink> */}
                  {/* <button
                    onClick={handleShowModal}
                    className={
                      "onlyDesk border-0 bg-transparent p-0 " +
                      (profileActive ? "is-active" : "")
                    }
                  >
                    <div className="light">{userIcon}</div>
                    <div className="dark">{userIconDark}</div>

                    <div
                      className={`position-relative ${
                        showModal ? "d-block" : "d-none"
                      }`}
                    >
                      <div
                        className="position-absolute modalWindowForMobile "
                        style={{
                          gap: "16px",
                          top: "40px",
                          left: "-220px",
                          width: "250px",
                          borderRadius: "17px",
                          background: "#F2F2F7",
                          padding: "0 16px 16px 16px",
                          filter:
                            "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                        }}
                      >
                        {showModal && (
                          <div className="d-flex flex-column" ref={modalRef}>
                            <NavLink
                              to={`/${data?.me?.username}`}
                              onClick={handleShowModal}
                              style={{ width: "100%" }}
                            >
                              <button
                                className="z-2 border-0 bg-white p-3 mt-3 w-100"
                                style={{ borderRadius: "11px" }}
                              >
                                Мой профиль
                              </button>
                            </NavLink>
                            <button
                              className="z-2 border-0 bg-white p-3 mt-3 w-100"
                              style={{ borderRadius: "11px" }}
                              onClick={handleShowModal}
                              data-bs-toggle="modal"
                              data-bs-target="#myModal"
                            >
                              Написать в поддержку
                            </button>

                            <Link
                              to={`/${data?.me?.username}`}
                              style={{ width: "100%" }}
                            >
                              <button
                                className="z-2 border-0 bg-white p-3 mt-3 w-100"
                                style={{ borderRadius: "11px" }}
                                onClick={logOut}
                              >
                                Выйти из профиля
                              </button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </button> */}
                </div>
              </div>
            ) : (
              <Link href={routes.home}>
                <button
                  className="bg-danger text-white pt-2 pb-2 ps-3 pe-3 font-weight-bold"
                  style={{ borderRadius: "4px" }}
                >
                  Войти
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <ModalSupportForm
        id="myModal"
        title="Написать в поддержку"
        save="Отправить"
        close="Отменить"
      />
      {uploadModalActive && (
        <UploadPopUp
          onError={setShowError}
          onClose={handleClosePopUp}
          uploadInputRef={uploadInputRef}
        />
      )}
      {showError && (
        <Alert
          style={{
            position: "fixed",
            bottom: "4%",
            left: "2%",
            zIndex: "2",
            borderRadius: "4px",
            padding: "8px 17px",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          }}
          severity="error"
        >
          {showError}
        </Alert>
      )}
    </>
  )
}
