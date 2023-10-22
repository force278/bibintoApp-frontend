import React from "react"
import s from "./DarkModeBtn.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../../apollo"
import { useReactiveVar } from "@apollo/client"
import { faLightbulb, faMoon } from "@fortawesome/free-regular-svg-icons"
const DarkModeBtn = () => {
  const darkMode = useReactiveVar(darkModeVar)
  return (
    <span
      className={s.darkModeBtn}
      onClick={darkMode ? disableDarkMode : enableDarkMode}
    >
      <FontAwesomeIcon icon={darkMode ? faLightbulb : faMoon} size={"2x"} />
    </span>
  )
}

export default DarkModeBtn
