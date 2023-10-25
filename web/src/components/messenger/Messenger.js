import React, { useState } from "react"
import "../../sass/common.scss"
import searchGray from "../../assets/img/header/searchGray.svg"
import styles from "./messag.module.scss"
import alexeev from "../../assets/img/messenger/alexeev.png"
import bibinto from "../../assets/img/messenger/bibinto.png"
import emojies from "../../assets/img/messenger/Emoji.svg"
import sendMessege from "../../assets/img/messenger/Send.svg"
import backButton from "../../assets/img/messenger/Back.svg"

export const Messenger = ({ children }) => {
  const data = [
    { username: "alexeev", lastLogin: "Заходил 1 час назад", avatar: alexeev },
    { username: "bibinto", lastLogin: "Онлайн", avatar: bibinto },
  ]
  const [hide, setHide] = useState(true)
  const toggleStyle = () => {
    setHide((prevState) => !prevState)
  }
  return (
    <div className="container ">
      <div
        className="border-1 border bg-white w-100"
        style={{ height: "85vh", marginTop: "32px", borderRadius: "6px" }}
      >
        <div className={` row h-100`}>
          <div
            className={`${
              styles.mobileBorder
            }  col-lg-4 col-sm-12 border-1 border-end ${
              hide ? "" : "hideElement"
            }`}
            style={{ paddingRight: 0 }}
          >
            <div
              className="pt-2 pb-2 border-bottom hideElement"
              style={{ paddingLeft: 25 }}
            >
              <div className="inputSearch w-75">
                <input
                  type="text"
                  className="inputSearch__input"
                  placeholder="Найти пользователя"
                />
                <img
                  src={searchGray}
                  alt="search"
                  className="inputSearch__icon"
                />
              </div>
            </div>

            {data.map((item, index) => (
              <div
                className="container pt-3 pb-3 border-bottom"
                onClick={toggleStyle}
              >
                <div className={` row`}>
                  <div className="col-md-3 col-4">
                    <div className="user-avatar">
                      <img
                        src={item.avatar}
                        alt="User Avatar"
                        className="rounded-circle offset-md-3 offset-4"
                        style={{ width: 50, height: 50 }}
                      />
                    </div>
                  </div>
                  <div className="col-md-9 col-8 d-flex align-items-center">
                    <div>
                      <div>
                        <h4 style={{ fontFamily: "Roboto, sans-serif" }}>
                          {item.username}
                        </h4>
                      </div>
                      <div>
                        <span
                          style={{
                            fontFamily: "Roboto, sans-serif",
                            color: "#a7a7a7",
                          }}
                        >
                          {item.lastLogin}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`col-lg-8 col-sm-12 d-flex flex-column-reverse ${
              hide ? "hideElement" : ""
            }`}
            style={{ paddingLeft: 17 }}
          >
            <div
              className={`${styles.inputSearch} ${styles.mobileInputSearch}`}
            >
              <input
                type="text"
                className={`${styles.inputMessage} `}
                placeholder="Сообщение"
              />
              <div
                className="d-flex align-items-center justify-content-between"
                style={{ width: 60 }}
              >
                <img src={emojies} alt="search" />
                <img src={sendMessege} alt="search" />
              </div>
            </div>
            <img
              src={backButton}
              alt="search"
              onClick={toggleStyle}
              className={styles.mobileButtonBack}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
