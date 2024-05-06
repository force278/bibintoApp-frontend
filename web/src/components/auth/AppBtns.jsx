import React from "react"
import appleIcon from "../../assets/img/signAppStore.svg"
import signGooglePlay from "../../assets/img/signGooglePlay.svg"

function AppBtns() {
  return (
    <>
      <div className="customShadow"></div>
      <p className="formTextSecondary ">Установите приложение</p>
      <div className="d-flex w-100 blockButtons">
        <a href="https://vk.com/bibinto" target="_blank" rel="noreferrer">
          <button className="border-1 border rounded pt-3 pb-3 ps-4 pe-4 d-flex align-items-center bg-transparent">
            <img
              className="me-1"
              src={appleIcon}
              alt="установить через AppStore"
            />
          </button>
        </a>
        <a href="https://vk.com/bibinto" target="_blank" rel="noreferrer">
          <button className="border-1 border rounded pt-3 pb-3 ps-4 pe-4 d-flex align-items-center bg-transparent">
            <img
              className="me-1"
              src={signGooglePlay}
              alt="установить через Play Market"
            />
          </button>
        </a>
      </div>
      <p className="formTextSecondary" style={{ marginTop: "16px" }}>
        Применяются рекомендательные технологии
      </p>
    </>
  )
}

export default AppBtns
