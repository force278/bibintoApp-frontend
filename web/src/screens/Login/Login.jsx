import React from "react"
import AuthLayout from "../../components/auth/AuthLayout"
import Button from "../../components/auth/Button"
import Input from "../../components/auth/Input"
import FormBox from "../../components/auth/FormBox"
import PageTitle from "../../components/PageTitle"
import FormError from "../../components/auth/FormError"
import { Link } from "react-router-dom"
import logoIcon from "../../assets/img/bibinto.svg"
import "../../sass/common.scss"
import signGooglePlay from "../../assets/img/sign-GooglePlay.svg"
import appleIcon from "../../assets/img/appleLogo.svg"
import "../../styles/styles.css"
import Notification from "./Notification/Notification"
import InfoFooter from "../InfoFooter"

function Login({
  register,
  handleSubmit,
  clearLoginErrors,
  formState,
  onSubmitValid,
  loading,
  location,
  toLowWithClear,
  value,
}) {
  return (
    <AuthLayout>
      <div className="d-flex align-items-center justify-content-center flex-column ">
        <PageTitle title="Вход в аккаунт 22" />
        <FormBox>
          <div>
            <img src={logoIcon} width="180" height="60" alt="Бибинто"></img>
          </div>
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
              value={value}
              onChange={toLowWithClear}
              hasError={Boolean(formState.errors?.username?.message)}
            />
            <FormError message={formState.errors?.username?.message} />
            <Input
              {...register("password", {
                required: "Пароль обязателен для заполнения",
              })}
              type="password"
              placeholder="Пароль"
              onChange={clearLoginErrors}
              hasError={Boolean(formState.errors?.password?.message)}
            />
            <FormError message={formState.errors?.password?.message} />
            <Button
              type="submit"
              value={loading ? "Загрузка..." : "Войти"}
              disabled={loading}
            />
            <FormError message={formState.errors?.result?.message} />
            <div className="textLine mt-4">или</div>
            <div className="mt-3">
              <button className="bg-transparent border-0">
                Забыли пароль?
              </button>
            </div>
            <span className="line mt-4"></span>
            <button className="mt-2 text-primary bg-transparent border-0 fw-bold">
              <Link to="/sign-up">Зарегистрироваться</Link>
            </button>
          </form>
        </FormBox>
        <p className="text-secondary">Установите приложение</p>
        <div className="d-flex justify-content-around w-100 mt-3 blockButtons">
          <button className="border-1 m-2 rounded pt-3 pb-3 ps-4 pe-4 d-flex align-items-center bg-transparent nexa-bold">
            <img
              className="me-1"
              src={appleIcon}
              alt="установить через AppStore"
            />
            App Store
          </button>
          <button className="border-1 m-2 border rounded pt-3 pb-3 ps-4 pe-4 d-flex align-items-center bg-transparent">
            <img
              className="me-1"
              src={signGooglePlay}
              alt="установить через Play Market"
            />
          </button>
        </div>
        <p className="text-secondary" style={{ marginTop: "10px" }}>
          Применяются рекомендательные технологии
        </p>
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
