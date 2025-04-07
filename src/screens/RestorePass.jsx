// import styled from "styled-components"
import "../sass/auth.scss"
import routes from "../routes"
import { useEffect } from "react"
import InfoFooter from "./InfoFooter"
import { useRef, useState } from "react"
import Input from "../components/auth/Input"
import ReactCodeInput from "react-code-input"
import Button from "../components/auth/Button"
import PageTitle from "../components/PageTitle"
import FormBox from "../components/auth/FormBox"
import logoIcon from "../assets/img/Logo.svg"
import AppBtns from "../components/auth/AppBtns"
import { Link, useHistory } from "react-router-dom"
import FormError from "../components/auth/FormError"
import AuthLayout from "../components/auth/AuthLayout"
import { gql, useLazyQuery, useMutation } from "@apollo/client"
import { CropperModal } from "../components/ProfileEdit/CropperModal"
import { useForm } from "react-hook-form"

const GET_RESTORE_PASSWORD_EMAIL_CODE = gql`
  mutation getCodeRestorePasswd($email: String!) {
    getCodeRestorePasswd(email: $email) {
      ok
      error
    }
  }
`

const VERIFY_RESTORE_PASSWORD_EMAIL = gql`
  mutation($email: String!, $password: String!, $code: Int!) {
    verifyRestorePasswd(email: $email, password: $password, code: $code) {
      ok
      error
    }
  }
`

function RestorePass() {
  const codeInput = useRef()
  const history = useHistory()
  const [countdown, setCountdown] = useState(0)
  const [counting, setCounting] = useState(false)
  const [emailCode, setEmailCode] = useState(false)
  const [showedInput, setShowedInput] = useState("")
  const [commonInfo, setCommonInfo] = useState(false)
  const [email, setEmail] = useState("")

  const {
    register,
    handleSubmit,
    formState,
    setError,
    getValues,
    setValue,
    clearErrors,
  } = useForm({
    mode: "onBlur",
  })

  const onCompleted = (data) => {
    if (data.verifyRestorePasswd) {
      if (!data.verifyRestorePasswd.ok) return setError("code", { message: data.verifyRestorePasswd.error })
      setCommonInfo(true)
    } 
    if (data.verifyRestorePasswd.ok) {
      const { email, password } = getValues()
      history.push(routes.home, {
        message: `Вы успешно поменяли пароль на аккаунте.`,
        email,
        password,
      })
    }
  }

  const [getCode, { data }] = useMutation(GET_RESTORE_PASSWORD_EMAIL_CODE, {
    onCompleted: () => {
      if (!data.getCodeRestorePasswd.ok) {
        setError(
          "email",
          { type: "custom", message: data.getCodeRestorePasswd.error },
          { shouldFocus: true },
        )
      } else {
        setValue("code", "")
        // reset end
        startCountdown(60)
        setEmailCode(true)
      }
    },
  })

  const [verifyRestorePasswdEmail, {loading}] = useMutation(VERIFY_RESTORE_PASSWORD_EMAIL, {
    onCompleted,
  })

  useEffect(() => {
    return () => {
      setCountdown(0)
      setCounting(false)
    }
  }, [])

  const startCountdown = (val) => {
    if (counting) return
    setCounting(true)
    if (val > 0) {
      setCountdown(val)
      setTimeout(() => {
        startCountdown(val - 1)
      }, 1000)
    } else {
      setCountdown(0)
      setCounting(false)
    }
  }

  const onSubmitValid = (data) => {
    if (loading) {
      return
    }
    // проверка кода
    else if (emailCode) {
      verifyRestorePasswdEmail({
        variables: {
          email: email,
          password: data.password,
          code: Number(data.code),
        },
      })
    }
    // отправка кода
    else {
      const EMAIL_REGEXP =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
      if (!EMAIL_REGEXP.test(data.email))
        return setError("email", { message: "Email указан некорректно" })
      setEmail(data.email)
      getCode({
        variables: {
          email: data.email,
          // username: data.username,
        },
      })
    }
  }

  const changeClassCodeForm = () => {
    if (codeInput.current?.textInput) {
      for (let input of codeInput.current.textInput) {
        if (input.value) {
          input.classList.add("filled")
        } else {
          input.classList.remove("filled")
        }
      }
    }
  }

  const showInput = (key) => {
    showedInput === key ? setShowedInput() : setShowedInput(key)
  }

  return (
    <AuthLayout className={"authLayout"}>
      <div className="d-flex align-items-center justify-content-center flex-column ">
        <PageTitle title="Восстановление пароля" />
        <FormBox>
          <img
            src={logoIcon}
            width="270"
            height="90"
            alt="логотип"
          ></img>
          <form
            onSubmit={handleSubmit(onSubmitValid)}
            className="position-relative "
          >
            {/* ----- step 1 ----- */}
            <Input
              {...register("email", {
                required: "Email обязателен для заполнения",
              })}
              type="text"
              maxLength={30}
              placeholder="Email"
              hasError={Boolean(formState.errors?.email?.message)}
            />
            <FormError message={formState.errors?.email?.message} />
            <div className="formSubmitWrap">
              <Button
                type="submit"
                value={"Отправить код для восстановления"}
                disabled={formState.errors?.email?.message || loading}
              />
            </div>
            {/* ----- step 2 ----- */}
            {emailCode && !commonInfo && (
              <div className="formConfirmCodeWrap">
                <div className="formConfirmCode">
                  <div className="w-100">
                    <button
                      type="button"
                      className="formBtnBack"
                      onClick={() => setEmailCode(false)}
                    ></button>
                  </div>
                  <h2 className="formTitle">Подтверждение кода</h2>
                  <p className="formText">
                    На почту {email} отправлено сообщение с кодом
                    подтверждения. Введите код и нажмите подтвердить.
                  </p>
                  <Input
                    maxLength={6}
                    {...register("code", {})}
                    style={{ width: 0, height: 0, visibility: "hidden" }}
                    hasError={Boolean(formState.errors?.code?.message)}
                  />
                  <ReactCodeInput
                    ref={codeInput}
                    value={getValues().code}
                    onChange={(code) => {
                      clearErrors("code")
                      changeClassCodeForm()
                      setValue("code", code)
                    }}
                    fields={6}
                    type="number"
                    className="formCodeInput"
                  />
                   <h2 className="formTitle">Придумайте новый пароль</h2>
                  <p className="inputLabel">Пароль</p>
                  <div className="passInputWrap">
                    <Input
                      {...register("password", {
                        required: "Пароль обязателен для заполнения",
                      })}
                      className="m-0"
                      placeholder="Введите пароль"
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

                  <p className="inputLabel">Подтверждение пароля</p>
                  <div className="passInputWrap">
                    <Input
                      {...register("repassword", {
                        required:
                          "Подтверждение пароля обязательно для заполнения",
                      })}
                      className="m-0"
                      placeholder="Введите пароль"
                      hasError={formState.errors?.repassword?.message}
                      type={showedInput === "repassword" ? "text" : "password"}
                    />
                    <button
                      type="button"
                      className="btnShow"
                      onClick={() => showInput("repassword")}
                    >
                      {showedInput === "repassword" ? "Скрыть" : "Показать"}
                    </button>
                  </div>
                  <FormError message={formState.errors?.repassword?.message} />
                  <FormError message={formState.errors?.code?.message} center />
                  <p className="formText formTextResend">
                    {countdown ? (
                      `Отправить повторно через ${countdown} сек.`
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          getCode({
                            variables: {
                              email: email,
                            },
                          })
                          startCountdown(60)
                        }}
                      >
                        Отправить повторно
                      </button>
                    )}
                  </p>
                  <div className="formSubmitWrap">
                    <Button
                      type="submit"
                      value={"Подтвердить"}
                      disabled={
                        String(getValues().code).length < 6 ||
                        formState.errors?.code?.message ||
                        loading
                      }
                    />
                  </div>
                </div>
              </div>
            )}
            <FormError message={formState.errors?.result?.message} center />
            <div className="textLine">
              <span>Вспомнили пароль?</span>
            </div>
            <button className="mt-4 text-primary bg-transparent border-0 fw-bold">
              <Link to="/">Войти</Link>
            </button>
          </form>
        </FormBox>
        <AppBtns />
      </div>
      <InfoFooter />
    </AuthLayout>
  )
}
export default RestorePass
