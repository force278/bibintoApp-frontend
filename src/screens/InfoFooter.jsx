import React from "react"
import { Link } from "react-router-dom"

// const openHtmlFile = () => {
//   // Открытие HTML-файла в новой вкладке
//   window.open("/about")
//
//   // Или перенаправление на HTML-файл в той же вкладке
//   // window.location.href = '/my-page.html';
// }

const InfoFooter = () => {
  // const currentDate = new Date()
  // const currentYear = currentDate.getFullYear()
  return (
    <div className="w-100" style={{ bottom: 0, left: 0 }}>
      <div className="d-flex justify-content-center row infoFooterWrap">
        <span className="">
          <Link to="/privacy-policy">Политика конфиденциальности</Link>
        </span>
        <span className="">
          <Link to="/termsOfUse">Условия использования</Link>
        </span>
        <span className="" style={{ cursor: "pointer", marginBottom: "30px" }}>
          <Link to="/about">О нас</Link>
        </span>
        {/* <span className="col-sm-12 col-lg-3 d-flex justify-content-center  me-2">
          Русский
        </span> */}
      </div>
      {/* <div className="d-flex justify-content-center mt-3">
        <span>BIBINTO © {currentYear} </span>
      </div> */}
    </div>
  )
}
export default InfoFooter
