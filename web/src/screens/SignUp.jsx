// import styled from "styled-components"
import "../sass/auth.scss"
import routes from "../routes"
import { useEffect } from "react"
import InfoFooter from "./InfoFooter"
import { useRef, useState } from "react"
import Input from "../components/auth/Input"
import IconEye from "../assets/img/IconEye"
import ReactCodeInput from "react-code-input"
import Button from "../components/auth/Button"
import PageTitle from "../components/PageTitle"
import FormBox from "../components/auth/FormBox"
import logoIcon from "../assets/img/bibinto.svg"
import AppBtns from "../components/auth/AppBtns"
import { Link, useHistory } from "react-router-dom"
import FormError from "../components/auth/FormError"
import AuthLayout from "../components/auth/AuthLayout"
import { gql, useLazyQuery, useMutation } from "@apollo/client"
import { CropperModal } from "../components/ProfileEdit/CropperModal"
import { useForm } from "react-hook-form"

const URL_UPLOAD_QUERY = gql`
  query {
    getUrlUploadPhoto
  }
`

const GET_EMAIL_CODE = gql`
  mutation getSignUpEmailCode($email: String!) {
    getSignUpEmailCode(email: $email) {
      ok
      error
    }
  }
`

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String!
    $username: String!
    $avatar: String!
    $bio: String
    $gender: Int!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      avatar: $avatar
      gender: $gender
      email: $email
      bio: $bio
      password: $password
    ) {
      ok
      error
    }
  }
`

const VERIFY_EMAIL = gql`
  mutation verifyEmail($email: String!, $code: Int!) {
    verifyEmail(email: $email, code: $code) {
      ok
      error
    }
  }
`

function SignUp() {
  const inputRef = useRef()
  const codeInput = useRef()
  const history = useHistory()
  const [src, setSrc] = useState()
  const compressedBlob = useRef(null)
  const [avatar, setAvatar] = useState()
  const [preview, setPreview] = useState(null)
  const [countdown, setCountdown] = useState(0)
  const [counting, setCounting] = useState(false)
  const [emailCode, setEmailCode] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [showedInput, setShowedInput] = useState("")
  const [commonInfo, setCommonInfo] = useState(false)
  const [avatarLoading, setAvatarLoading] = useState(false)

  //
  const loadAvatar = async () => {
    setAvatar()
    setAvatarLoading(true)
    const imageUrl = uploadData.getUrlUploadPhoto
    const file = new File([compressedBlob.current], "test.jpeg", {
      type: "image/jpeg",
    })
    const formData = new FormData()
    formData.append("file", file)
    try {
      // await fetch("https://neuro.bibinto.com/", {
      //   method: "POST",
      //   body: formData,
      // }).then(async (res) => {
      //   await res.json().then(async (data) => {

      // if (data) {
      const response = await fetch(imageUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
      })
      if (response.ok) {
        console.log("фото успешно загружено")
        const img = uploadData.getUrlUploadPhoto.split("?")[0]
        setAvatar(img)
        clearErrors("avatar")
      } else {
        throw new Error("Ошибка при загрузке фотографии")
      }
      setAvatarLoading(false)
      //   })
      // })
    } catch (error) {
      setPreview(null)
      setAvatarLoading(false)
      setError("avatar", "Не удалось загрузить аватар")
      console.error("Произошла ошибка", error)
    }
  }
  //

  const onCompleted = (data) => {
    if (data.verifyEmail) {
      const {
        verifyEmail: { ok, error },
      } = data
      if (!ok) return setError("code", { message: error })
      setCommonInfo(true)
    } else if (data.createAccount) {
      const {
        createAccount: { ok, error },
      } = data
      if (!ok) return setError("username", { message: error })
      const { username, password } = getValues()
      history.push(routes.home, {
        message: "Пользователь зарегистрирован. Пожалуйста, войдите в аккаунт.",
        username,
        password,
      })
    }
  }

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

  // Mutation
  const [getUrl, { data: uploadData }] = useLazyQuery(URL_UPLOAD_QUERY, {
    onCompleted: loadAvatar,
  })

  const [getCode, { data }] = useMutation(GET_EMAIL_CODE, {
    onCompleted: () => {
      if (!data.getSignUpEmailCode.ok) {
        setError(
          "email",
          { type: "custom", message: data.getSignUpEmailCode.error },
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

  const [verifyEmail] = useMutation(VERIFY_EMAIL, {
    onCompleted,
  })

  const [signUp, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  })

  // Mutation end

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
    // регистрация
    if (commonInfo) {
      if (data.password !== data.repassword) {
        setError("repassword", { message: "Пароли не совпадают" })
        return
      }
      delete data.repassword
      if (avatarLoading) {
        return setError("avatar", { message: "Аватар загружается..." })
      }
      if (!avatar) {
        return setError("avatar", { message: "Загрузите аватар" })
      }
      signUp({
        variables: {
          ...data,
          gender: 0,
          avatar: avatar,
          // code: Number(data.code),
        },
      })
    }
    // проверка кода
    else if (emailCode) {
      verifyEmail({
        variables: {
          ...data,
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

  function handleChangeAvatar(e) {
    clearErrors("avatar")
    if (e?.target?.files[0]) {
      setSrc(URL.createObjectURL(e.target.files[0]))
      setModalOpen(true)
    }
  }

  useEffect(() => {
    if (preview) {
      getUrl()
    }
    // eslint-disable-next-line
  }, [preview])

  return (
    <AuthLayout className={"authLayout"}>
      {/*  */}
      {modalOpen ? (
        <CropperModal
          src={src}
          setSrc={setSrc}
          inputRef={inputRef}
          modalOpen={modalOpen}
          setPreview={setPreview}
          setModalOpen={setModalOpen}
          className="updateAvatarCrop"
          compressedBlob={compressedBlob}
        />
      ) : null}
      {/*  */}
      <div className="d-flex align-items-center justify-content-center flex-column ">
        <PageTitle title="Регистрация" />
        <FormBox>
          <img
            className="formLogo"
            src={logoIcon}
            width="180"
            height="60"
            alt="логотип"
          ></img>
          <div></div>
          {/* <h2 className="formTitle">Регистрация</h2> */}
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
                value={"Зарегистрироваться"}
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
                    На почту {getValues().email} отправлено смс-сообщение с
                    кодом подтверждения. Введите код и нажмите подтвердить
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
                              email: getValues().email,
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
            {/* ----- step 3 ----- */}
            {commonInfo && (
              <div className="formConfirmCodeWrap">
                <div className="formConfirmCode">
                  <div className="w-100">
                    <button
                      onClick={() => setCommonInfo(false)}
                      className="formBtnBack"
                      type="button"
                    ></button>
                  </div>
                  <h2 className="formTitle">Основная информация</h2>
                  <label
                    htmlFor="avatar"
                    className={`inputAvatarWrap ${avatarLoading ? "load" : ""}`}
                  >
                    <div className={`circle`}></div>
                    <input
                      type="file"
                      name="avatar"
                      ref={inputRef}
                      accept="image/jpeg, image/png"
                      onChange={handleChangeAvatar}
                    />
                    {preview && !avatarLoading && (
                      <img src={preview} alt="avatar" />
                    )}
                  </label>
                  <p className="inputLabel center">Добавьте вашу фотографию</p>
                  <FormError
                    center
                    message={formState.errors?.avatar?.message}
                  />
                  <div style={{ marginTop: "28px" }}></div>
                  <p className="inputLabel mt-0">Имя</p>
                  <Input
                    {...register("firstName", {
                      required: "Имя обязательно для заполнения",
                    })}
                    type="text"
                    className="m-0"
                    placeholder="Введите имя"
                    hasError={Boolean(formState.errors?.firstName?.message)}
                  />
                  <FormError message={formState.errors?.firstName?.message} />

                  <p className="inputLabel ">Фамилия</p>
                  <Input
                    {...register("lastName", {
                      required: "Фамилия обязательнa для заполнения",
                    })}
                    type="text"
                    className="m-0"
                    placeholder="Введите фамилию"
                    hasError={Boolean(formState.errors?.lastName?.message)}
                  />
                  <FormError message={formState.errors?.lastName?.message} />

                  <p className="inputLabel">Логин</p>
                  <Input
                    {...register("username", {
                      required: "Логин обязателен для заполнения",
                    })}
                    type="text"
                    className="m-0"
                    placeholder="Введите логин"
                    hasError={Boolean(formState.errors?.username?.message)}
                  />
                  <FormError message={formState.errors?.username?.message} />

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
                      {showedInput === "password" ? IconEye : IconEye}
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
                      {showedInput === "repassword" ? IconEye : IconEye}
                    </button>
                  </div>
                  <FormError message={formState.errors?.repassword?.message} />

                  <p className="inputLabel">О себе</p>
                  <Input
                    {...register("bio")}
                    type="text"
                    className="m-0"
                    placeholder="Описание о себе"
                    hasError={Boolean(formState.errors?.bio?.message)}
                  />
                  <FormError message={formState.errors?.bio?.message} />

                  <div className="formSubmitWrap">
                    <Button
                      type="submit"
                      value={"Зарегистрироваться"}
                      disabled={Object.keys(formState.errors).length || loading}
                    />
                  </div>
                  <FormError
                    message={formState.errors?.result?.message}
                    center
                  />
                  <div className="textLine">
                    <span>Уже есть аккаунт?</span>
                  </div>
                  <button className="mt-4 text-primary bg-transparent border-0 fw-bold">
                    <Link to="/">Войти</Link>
                  </button>
                </div>
              </div>
            )}
            {/* ---------- */}
            <FormError message={formState.errors?.result?.message} center />
            <div className="textLine">
              <span>Уже есть аккаунт?</span>
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
export default SignUp
