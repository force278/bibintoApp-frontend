import "../../sass/common.scss"
import { Alert } from "@mui/material"
import styled from "styled-components"
import React, { useState } from "react"
import FormError from "../auth/FormError"
import { useForm } from "react-hook-form"
import { gql, useMutation } from "@apollo/client"
import { useEffect } from "react"

const CREATE_REQUEST = gql`
  mutation createRequest($payload: String!) {
    createRequest(payload: $payload) {
      error
      id
      ok
    }
  }
`

export const TechSupport = () => {
  const [showNotification, setShowNotification] = useState({
    name: "",
    severity: "",
  })

  useEffect(() => {
    if (showNotification.name) {
      setTimeout(() => {
        setShowNotification({ name: "", severity: "" })
        //window.location.reload()
      }, 2000)
    }
  }, [showNotification])

  const [createRequest] = useMutation(CREATE_REQUEST, {
    onCompleted: (data) => {
      if (data?.createRequest?.ok) {
        setShowNotification({
          name: "Обращение успешно отправлено!",
          severity: "success",
        })
        setValue("payload", "")
      } else {
        if (data?.createRequest?.error) {
          setShowNotification({
            name: data.createRequest.error,
            severity: "error",
          })
        } else {
          setShowNotification({
            name: "Не удалось отправить обращение",
            severity: "error",
          })
        }
      }
    },
  })

  const onSubmitValid = (data) => {
    createRequest({ variables: data })
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
      <p className="text">Написать в поддержку</p>
      <form
        onSubmit={handleSubmit(onSubmitValid)}
        className="position-relative"
      >
        {/* 1 */}
        <textarea
          {...register("payload", {
            required: "Поле обязательно для заполнения",
          })}
          rows={10}
          name="payload"
          placeholder=""
        ></textarea>
        <FormError message={formState.errors?.payload?.message} />

        {/* submit */}
        <div className="formSubmitWrap">
          <button
            type="submit"
            className="btnSubmit"
            disabled={Object.keys(formState.errors).length}
          >
            Отправить
          </button>
        </div>
        {/*<div className="formSubmitWrap">
        
           <Button
            type="submit"
            value={"Сохранить"}
            disabled={Object.keys(formState.errors).length}
          /> 
        </div>*/}

        <FormError message={formState.errors?.result?.message} center />
      </form>
      {showNotification.name && (
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
          severity={showNotification.severity}
        >
          {showNotification.name}
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
  textarea {
    border: none;
    width: 100%;
    height: 72px;
    resize: none;
    margin-top: 16px;
    border-radius: 6px;
    background: #f2f2f7;
    padding: 13px 18px;
    &:focus {
      outline: none;
    }
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
