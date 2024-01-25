import styled from "styled-components"
import routes from "../routes"
import AuthLayout from "../components/auth/AuthLayout"
import Button from "../components/auth/Button"
import Input from "../components/auth/Input"
import FormBox from "../components/auth/FormBox"
import PageTitle from "../components/PageTitle"
import { useForm } from "react-hook-form"
import { gql, useMutation } from "@apollo/client"
import FormError from "../components/auth/FormError"
import { Link, useHistory } from "react-router-dom"
import logoIcon from "../assets/img/bibinto.svg"
import InfoFooter from "./InfoFooter"
import { useState } from "react"
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const GET_EMAIL_CODE = gql`
  mutation getEmailCode($email: String!, $username: String!) {
    getEmailCode(email: $email, username: $username) {
      ok
      error
      error_type
    }
  }
`

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
    $code: Int!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
      code: $code
    ) {
      ok
      error
    }
  }
`

function SignUp() {
  const history = useHistory()
  const [inputValue, setInputValue] = useState("")
  const [emailCode, setEmailCode] = useState(false)

  const handleInputChange = (event) => {
    const lowercaseValue = event.target.value.toLowerCase()
    setInputValue(lowercaseValue)
  }
  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data
    if (!ok) return setError("result", { message: error })
    const { username, password } = getValues()
    history.push(routes.home, {
      message: "Пользователь зарегистрирован. Пожалуйста, войдите в аккаунт.",
      username,
      password,
    })
  }

  const { register, handleSubmit, formState, setError, getValues } = useForm({
    mode: "onBlur",
  })
  const [getCode, { data }] = useMutation(GET_EMAIL_CODE, {
    onCompleted: () => {
      if (!data.ok) {
        setError(
          data.getEmailCode.error_type,
          { type: "custom", message: data.getEmailCode.error },
          { shouldFocus: true },
        )
      }
      setEmailCode(true)
    },
  })

  const [signUp, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted
  })

  const onSubmitValid = (data) => {
    if (loading) {
      console.log("aaa")
      return
    }
    if (emailCode) {
      signUp({
        variables: {
          ...data,
          code: Number(data.code),
        },
      })
    } else {
      getCode({
        variables: {
          email: data.email,
          username: data.username,
        },
      })
    }
    
  }

  return (
    <AuthLayout>
      <PageTitle title="Регистрация" />
      <FormBox>
        <HeaderContainer>
          <div>
            <img src={logoIcon} width="180" height="60" alt="логотип"></img>
          </div>
        </HeaderContainer>
        <form
          onSubmit={handleSubmit(onSubmitValid)}
          className="position-relative"
        >
          <Input
            {...register("email", {
              required: "Email обязателен для заполнения",
            })}
            type="email"
            placeholder="Email"
            maxLength={30}
            hasError={Boolean(formState.errors?.email?.message)}
          />
          <FormError message={formState.errors?.email?.message} />
          <Input
            {...register("firstName", {
              required: "Имя обязательно для заполнения",
            })}
            type="text"
            placeholder="Имя"
            hasError={Boolean(formState.errors?.firstName?.message)}
          />
          <FormError message={formState.errors?.firstName?.message} />
          <Input
            {...register("lastName")}
            type="text"
            placeholder="Фамилия"
            hasError={Boolean(formState.errors?.lastName?.message)}
          />
          <FormError message={formState.errors?.lastName?.message} />
          <Input
            {...register("username", {
              required: "Логин обязателен для заполнения",
            })}
            type="text"
            value={inputValue}
            placeholder="Логин"
            hasError={Boolean(formState.errors?.username?.message)}
            onChange={handleInputChange}
          />
          <FormError message={formState.errors?.username?.message} />
          <Input
            {...register("password", {
              required: "Пароль обязателен для заполнения",
            })}
            type="password"
            placeholder="Пароль"
            hasError={Boolean(formState.errors?.password?.message)}
          />
          <FormError message={formState.errors?.password?.message} />
          {emailCode ? (
            <>
              <p>Код отправлен email, если письма нет, проверьте спам</p>
              <Input
                {...register("code", {
                  required: "Код обязателен для заполнения",
                })}
                placeholder="XXXXXX"
                maxLength={6}
                hasError={Boolean(formState.errors?.code?.message)}
              />
              <FormError message={formState.errors?.code?.message} />
            </>
          ) : null}
          <Button
            type="submit"
            value={emailCode ? "Отправить" : "Зарегистрироваться"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={formState.errors?.result?.message} />
          <div className="textLineSignUP mt-4">или</div>
          <button className="mt-4 text-primary bg-transparent border-0 fw-bold">
            <Link to="/">Войти</Link>
          </button>
        </form>
      </FormBox>
      <InfoFooter />
    </AuthLayout>
  )
}
export default SignUp
