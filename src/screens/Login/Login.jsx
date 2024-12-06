import React, { useState } from "react"
import "../../sass/auth.scss"
import "../../sass/common.scss"
import "../../styles/styles.css"
import AuthLayout from "../../components/auth/AuthLayout"
import Button from "../../components/auth/Button"
import Input from "../../components/auth/Input"
import FormBox from "../../components/auth/FormBox"
import PageTitle from "../../components/PageTitle"
import FormError from "../../components/auth/FormError"
import { Link } from "react-router-dom"
import logoIcon from "../../assets/img/bibinto.svg"
import Notification from "./Notification/Notification"
import InfoFooter from "../InfoFooter"
import AppBtns from "../../components/auth/AppBtns"

function Login({
  register,
  handleSubmit,
  clearErrors,
  formState,
  onSubmitValid,
  loading,
  location,
  // toLowWithClear,
  // value,
}) {
  const [showedInput, setShowedInput] = useState("")

  const showInput = (key) => {
    showedInput === key ? setShowedInput() : setShowedInput(key)
  }

  return (
    <AuthLayout>
      <div className="d-flex align-items-center justify-content-center flex-column ">
        <PageTitle title="Вход в аккаунт" />

        <FormBox>
          <img
            className="formLogo"
            src={logoIcon}
            width="180"
            height="60"
            alt="Бибинто"
          ></img>
          {/* <h2 className="formTitle">Вход</h2> */}
          <Notification location={location} />
          <form
            onSubmit={handleSubmit(onSubmitValid)}
            className="position-relative"
          >
            <Input
              {...register("username", {
                required: "Логин обязателен для заполнения",
                minLength: {
                  value: 2,
                  message: "Логин должен быть длиннее 2 символов",
                },
              })}
              type="text"
              placeholder="Логин"
              // value={value}
              // onChange={toLowWithClear}
              onInput={() => {
                clearErrors("username")
                clearErrors("result")
              }}
              hasError={Boolean(formState.errors?.username?.message)}
            />
            <FormError message={formState.errors?.username?.message} />

            <div className="passInputWrap" style={{ marginTop: "16px" }}>
              <Input
                {...register("password", {
                  required: "Пароль обязателен для заполнения",
                })}
                placeholder="Пароль"
                onInput={() => {
                  clearErrors("password")
                  clearErrors("result")
                }}
                type={showedInput === "password" ? "text" : "password"}
                hasError={Boolean(formState.errors?.password?.message)}
              />
              <button
                type="button"
                className="btnShow"
                onClick={() => showInput("password")}
              >
                {showedInput === "password" ? "Скрыть" : "Показать"}
              </button>
            </div>
            <FormError message={formState.errors?.password?.message} />

            {/*<div className="formBtnForgotWrap">*/}
            {/*  <button type="button" className="bg-transparent border-0">*/}
            {/*    Забыли пароль?*/}
            {/*  </button>*/}
            {/*</div>*/}

            <div className="formSubmitWrap">
              <Button
                type="submit"
                value={loading ? "Загрузка..." : "Войти"}
                disabled={loading}
              />
            </div>
            <FormError message={formState.errors?.result?.message} center />
            <div className="textLine">
              <span>Нет аккаунта?</span>
            </div>

            <button className="bg-transparent border-0 formBtnReg">
              <Link to="/sign-up">Зарегистрироваться</Link>
            </button>
          </form>
        </FormBox>
        <AppBtns />
        {/* <p className="formTextSecondary">Установите приложение</p>
        <div className="d-flex w-100 blockButtons">
          <button className="border-1 border rounded pt-3 pb-3 ps-4 pe-4 d-flex align-items-center bg-transparent">
            <img
              className="me-1"
              src={appleIcon}
              alt="установить через AppStore"
            />
          </button>
          <button className="border-1 border rounded pt-3 pb-3 ps-4 pe-4 d-flex align-items-center bg-transparent">
            <img
              className="me-1"
              src={signGooglePlay}
              alt="установить через Play Market"
            />
          </button>
        </div>
        <p className="formTextSecondary" style={{ marginTop: "16px" }}>
          Применяются рекомендательные технологии
        </p> */}
      </div>

      <InfoFooter />
      {/*<BottomBox*/}
      {/*  cta="У вас ещё нет аккаунта?"*/}
      {/*  link={routes.signUp}*/}
      {/*  linkText="Зарегистрироваться"*/}
      {/*/>*/}
    </AuthLayout>
  )
}
export default Login
