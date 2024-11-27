import React, { useState } from "react"
import "../../sass/common.scss"
import "../../sass/editProfile.scss"
import Input from "../auth/Input"
import FormError from "../auth/FormError"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { gql, useMutation } from "@apollo/client"
import { Alert } from "@mui/material"
import Loader from "../Loader"

const GET_EMAIL_CODE = gql`
  mutation getEditEmailCode($email: String!) {
    getEditEmailCode(email: $email) {
      ok
      error
    }
  }
`

const EDIT_EMAIL = gql`
  mutation editEmail($email: String!, $code: Int!) {
    editEmail(email: $email, code: $code) {
      error
      id
      ok
    }
  }
`

export const ChangeEmail = () => {
  const [showNotification, setShowNotification] = useState(false)
  const [emailCode, setEmailCode] = useState(false)
  const [loading, setLoading] = useState(false)

  const [getCode, { data }] = useMutation(GET_EMAIL_CODE, {
    onCompleted: () => {
      setLoading(false)
      if (!data.getEditEmailCode.ok) {
        setError(
          "email",
          { type: "custom", message: data.getEditEmailCode.error },
          { shouldFocus: true },
        )
      } else {
        setEmailCode(true)
        setValue("code", "")
        // reset end
      }
    },
  })

  const onCompleted = (data) => {
    setLoading(false)
    if (data?.editEmail?.ok) {
      setShowNotification(true)
      setValue("code", "")
    } else {
      setError(
        "email",
        { type: "custom", message: data.code.error },
        { shouldFocus: true },
      )
    }
  }

  const [editEmail] = useMutation(EDIT_EMAIL, {
    onCompleted,
  })

  const onSubmitValid = (data) => {
    if (!data) {
    } else if (emailCode) {
      editEmail({
        variables: {
          email: data.email,
          code: +data.code,
        },
      })
    } else {
      const EMAIL_REGEXP =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
      if (!EMAIL_REGEXP.test(data.email))
        return setError("email", { message: "Email указан некорректно" })
      setLoading(true)
      getCode({
        variables: {
          email: data.email,
        },
      })
    }
  }

  const {
    register,
    handleSubmit,
    formState,
    setError,
    // getValues,
    setValue,
    // clearErrors,
  } = useForm({ mode: "onSubmit" })

  return (
    <FormWrap>
      {loading && <Loader />}
      {!loading && !emailCode && (
        <>
          <p className="text">
            Введите адрес эл. почты, на неё придёт код подтверждения
          </p>
          <form
            onSubmit={handleSubmit(onSubmitValid)}
            className="position-relative"
          >
            {/* 1 */}
            <p className="inputLabel" style={{ marginTop: "16px" }}>
              Почта
            </p>
            <Input
              {...register("email", {
                required: "Почта обязательна для заполнения",
              })}
              type="text"
              placeholder="Введите почту"
              hasError={Boolean(formState.errors?.email?.message)}
            />
            <FormError message={formState.errors?.email?.message} />

            {/* submit */}
            <div className="formSubmitWrap">
              <button
                className="btnSubmit"
                type="submit"
                disabled={Object.keys(formState.errors).length}
              >
                Сохранить
              </button>
            </div>
            {/* <div className="btnSubmitWrap">
              <Button
                type="submit"
                value={"Сохранить"}
                disabled={Object.keys(formState.errors).length}
              />
            </div> */}
            <FormError message={formState.errors?.result?.message} center />
          </form>
        </>
      )}
      {!loading && emailCode && (
        <>
          <p className="text">Введите код подтверждения</p>
          <form
            onSubmit={handleSubmit(onSubmitValid)}
            className="position-relative"
          >
            {/* 1 */}
            <p className="inputLabel" style={{ marginTop: "16px" }}>
              Код подтверждения
            </p>
            <Input
              {...register("code", {
                required: "Код обязателен для заполнения",
              })}
              type="number"
              placeholder="Введите код"
              hasError={Boolean(formState.errors?.code?.message)}
            />
            <FormError message={formState.errors?.code?.message} />
            {/* submit */}
            {/*  formSubmitWrap */}
            <div className="formSubmitWrap">
              <button
                className="btnSubmit"
                type="submit"
                disabled={Object.keys(formState.errors).length}
              >
                Сохранить
              </button>
            </div>
            <FormError message={formState.errors?.result?.message} center />
          </form>
        </>
      )}
      {showNotification && (
        <Alert
          style={{
            left: "2%",
            zIndex: "2",
            bottom: "4%",
            position: "fixed",
            borderRadius: "4px",
            padding: "8px 17px",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          }}
          severity="success"
        >
          Почта успешно изменена
        </Alert>
      )}
    </FormWrap>
  )
}

const FormWrap = styled.div`
  margin: 12px 16px;
  .text {
    font-size: 15px;
    margin-bottom: 12px;
  }

  @media (min-width: 767px) {
    max-width: 343px;
  }
`

const Button = styled.input`
  width: 100%;
  color: white;
  border: none;
  height: 40px;
  display: flex;
  padding: 3px 0;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  border-radius: 5px;
  background: #1f1f2c;
  align-items: center;
  justify-content: center;
  font-family: Roboto, sans-serif;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  &:internal-autofill-selected {
    background-color: red !important;
  }
  @media (min-width: 767px) {
    width: auto;
    padding: 13px 80px;
  }
`
