import React from "react"
import s from "./Footer.module.css"
import DarkModeBtn from "../DarkModeBtn/DarkModeBtn"

const Footer = () => {
  return (
    <header className={s.header}>
      <DarkModeBtn />
    </header>
  )
}

export default Footer
