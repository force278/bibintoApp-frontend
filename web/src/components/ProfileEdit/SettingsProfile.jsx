import { useState } from "react"
import "../../sass/editProfile.scss"
import styled from "styled-components"
import { ChangeEmail } from "./ChangeEmail"
import { ConfirmAcc } from "./ConfirmAcc"
import IconPas from "../../assets/img/IconPas.svg"
import IconEmail from "../../assets/img/IconEmail.svg"
import IconExit from "../../assets/img/IconExit.svg"
import IconArrow from "../../assets/img/arrowBack.svg"
import { ChangePassword } from "./ChangePassword"
import PrivacyPolicy from "../privacyPolicy/PrivacyPolicy"
import IconConfirm from "../../assets/img/IconConfirm.svg"
import IconSupport from "../../assets/img/IconSupport.svg"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { isMob } from "../../utils/isMob"
import { useEffect } from "react"

const SettingsProfile = () => {
  const history = useHistory()
  const [isMobile] = useState(isMob)
  const [curSetting, setCurSetting] = useState("Настройки")

  useEffect(() => {
    !isMobile && history.push("/accountEditProfile")
  }, [isMobile])

  const handleBack = () => {
    if (curSetting === "Настройки") {
      history.goBack()
    } else {
      setCurSetting("Настройки")
    }
  }

  const logOut = () => {
    localStorage.removeItem("TOKEN")
    history.push("/")
    window.location.reload()
  }

  return (
    <div className="mobileWrap">
      <div className="header">
        <button
          type="button"
          className="formBtnBack"
          onClick={handleBack}
        ></button>
        <p>{curSetting}</p>
      </div>
      {curSetting === "Настройки" && (
        <SettingsList>
          <SettingItem onClick={() => setCurSetting("Пароль")}>
            <img src={IconPas} alt="" />
            <p>Сменить пароль</p>
            <img className="arrow" src={IconArrow} alt="" />
          </SettingItem>
          <SettingItem onClick={() => setCurSetting("Изменение почты")}>
            <img src={IconEmail} alt="" />
            <p>Изменение почты</p>
            <img className="arrow" src={IconArrow} alt="" />
          </SettingItem>
          <SettingItem onClick={() => setCurSetting("Подтвердить аккаунт")}>
            <img src={IconConfirm} alt="" />
            <p>Подтвердить аккаунт</p>
            <img className="arrow" src={IconArrow} alt="" />
          </SettingItem>
          <SettingItem
          // onClick={() => setCurSetting("Политика конфиденциальности")}
          >
            <img src={IconSupport} alt="" />
            <p>Написать в поддержку</p>
          </SettingItem>
          {/* <SettingItem
            onClick={() => setCurSetting("Политика конфиденциальности")}
          >
            <img src={IconSupport} alt="" />
            <p>Политика конфиденциальности</p>
          </SettingItem> */}
          <SettingItem onClick={logOut}>
            <img src={IconExit} alt="" />
            <p>Выйти</p>
          </SettingItem>
        </SettingsList>
      )}
      {curSetting === "Пароль" && <ChangePassword />}
      {curSetting === "Подтвердить аккаунт" && <ConfirmAcc />}
      {curSetting === "Изменение почты" && <ChangeEmail />}
      {/* {curSetting === "Политика конфиденциальности" && (
        <PrivacyPolicy className={"privacyPolicy"} />
      )} */}
    </div>
  )
}

const SettingsList = styled.div`
  display: flex;
  flex-direction: column;
`

const SettingItem = styled.button`
  gap: 10px;
  border: 0;
  display: flex;
  margin: 0 16px;
  padding: 16px 0;
  min-height: 50px;
  align-items: center;
  width: calc(100% - 32px);
  background-color: transparent;
  border-bottom: 1px solid #f2f2f7;
  img:not(.arrow) {
    width: 18px;
    height: 18px;
  }
  p {
    flex: 1;
    text-align: left;
  }
  .arrow {
    rotate: 180deg;
  }
`

export default SettingsProfile
