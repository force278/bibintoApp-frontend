import { gql, useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"
import { LoginUser } from "../../apollo"
import { useLocation } from "react-router-dom"
import Login from "./Login"
import { useEffect, useState } from "react"

const LOGIN_MUTATTION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`

function LoginContainer() {
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
    setValue,
    clearErrors,
  } = useForm({
    resetOptions: {
      keepErrors: false,
    },
    mode: "onSubmit",
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

  // const [inputValue, setInputValue] = useState("")
  // const clearLoginErrors = () => {
  //   clearErrors("result")
  // }
  // const toLower = (event) => {
  //   clearErrors("result")
  //   const lowercaseValue = event.target.value.toLowerCase()
  //   setInputValue(lowercaseValue)
  // }

  return (
    <Login
      register={register}
      handleSubmit={handleSubmit}
      clearErrors={clearErrors}
      formState={formState}
      onSubmitValid={onSubmitValid}
      loading={loading}
      location={location}
      // toLowWithClear={toLower}
      // value={inputValue}
    />
  )
}
export default LoginContainer
