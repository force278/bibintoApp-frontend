import styled from "styled-components"
import { Link } from "react-router-dom"
import AuthLayout from "../components/auth/AuthLayout"
import Button from "../components/auth/Button"
import Input from "../components/auth/Input"
import FormBox from "../components/auth/FormBox"
import PageTitle from "../components/PageTitle"
import { useForm } from "react-hook-form"
import FormError from "../components/auth/FormError"
import { gql, useMutation } from "@apollo/client"
import { LoginUser } from "../apollo"
import { useLocation } from "react-router-dom"
import logoIcon from "../assets/img/bibinto.svg"
import "../sass/common.scss"
import signGooglePlay from "../assets/img/sign-GooglePlay.svg"
import appleIcon from "../assets/img/appleLogo.svg"
import "../styles/styles.css"

const Notification = styled.div`
  color: #27ae60;
  text-align: center;
`

const LOGIN_MUTATTION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`

function Login() {
  const location = useLocation()
  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data
    if (!ok) {
      return setError("result", { message: error })
    }
    if (token) {
      LoginUser(token)
    }
  }

  const [login, { loading }] = useMutation(LOGIN_MUTATTION, { onCompleted })
  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  })
  const onSubmitValid = () => {
    if (loading) return
    const { username, password } = getValues()
    login({
      variables: {
        username,
        password,
      },
    })
  }

  const clearLoginErrors = () => {
    clearErrors("result")
  }

  return (
    <AuthLayout>
      <div className="d-flex align-items-center justify-content-center flex-column ">
        <PageTitle title="Вход в аккаунт 11" />
        <FormBox>
          <div>
            <img src={logoIcon} width="180" height="60" alt="Бибинто"></img>
          </div>
          <Notification>{location?.state?.message}</Notification>
          <form
            onSubmit={handleSubmit(onSubmitValid)}
            className="position-relative"
          >
            <Input
              {...register("username", {
                required: "Имя пользователя обязательно для заполнения",
                minLength: {
                  value: 2,
                  message: "Имя пользователя должно быть длиннее 2 символов",
                },
              })}
              type="text"
              placeholder="Имя пользователя"
              onChange={clearLoginErrors}
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
          <button className="border-1 m-2 rounded pt-3 pb-3 ps-5 pe-5 d-flex align-items-center bg-transparent nexa-bold">
            <img
              className="me-1"
              src={appleIcon}
              alt="установить через AppStore"
            />
            App Store
          </button>
          <button className="border-1 m-2 border rounded pt-3 pb-3 ps-5 pe-5 d-flex align-items-center bg-transparent">
            <img
              className="me-1"
              src={signGooglePlay}
              alt="установить через Play Market"
            />
          </button>
        </div>
      </div>
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
      {/*<BottomBox*/}
      {/*  cta="У вас ещё нет аккаунта?"*/}
      {/*  link={routes.signUp}*/}
      {/*  linkText="Зарегистрироваться"*/}
      {/*/>*/}
    </AuthLayout>
  )
}
export default Login
