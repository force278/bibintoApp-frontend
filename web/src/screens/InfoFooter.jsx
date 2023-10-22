import React from "react"
import { Link } from "react-router-dom"
const InfoFooter = () => {
  return (
    <div className="w-100" style={{ bottom: 0, left: 0 }}>
      <div className="d-flex justify-content-center row">
        <span className="col-sm-12 col-lg-3 d-flex justify-content-center  me-2">
          <Link to="/privacy-policy">Политика конфиденциальности</Link>
        </span>
        <span className="col-sm-12 col-lg-3 d-flex justify-content-center  me-2">
          <Link to="/termsOfUse">Условия использования</Link>
        </span>
        <span className="col-sm-12 col-lg-3 d-flex justify-content-center  me-2">
          English
        </span>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <span>BIBINTO © 2023 </span>
      </div>
    </div>
  )
}
export default InfoFooter
