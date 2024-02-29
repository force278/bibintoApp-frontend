import "../../sass/common.scss"
import Input from "../auth/Input"
import { Alert } from "@mui/material"
import styled from "styled-components"
import React, { useState } from "react"
import FormError from "../auth/FormError"
import { useForm } from "react-hook-form"
import IconEye from "../../assets/img/IconEye"
import { gql, useMutation } from "@apollo/client"

const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfile(
    $firstName: String
    $username: String
    $lastName: String
    $bio: String
    $password: String
  ) {
    editProfile(
      firstName: $firstName
      username: $username
      lastName: $lastName
      bio: $bio
      password: $password
    ) {
      ok
      id
      error
    }
  }
`

export const ChangePassword = () => {
  const [showedInput, setShowedInput] = useState("")
  const [showNotification, setShowNotification] = useState(false)

  const [editProfile] = useMutation(EDIT_PROFILE_MUTATION)

  const updatePas = async (data) => {
    try {
      const result = await editProfile({
        variables: {
          password: data.newPas,
        },
      })
      if (result.data && result.data.editProfile.ok) {
        setShowNotification(true)
      } else {
        alert(
          `При изменении профиля произошла ошибка, ${result.data.editProfile.error}`,
        )
      }
    } catch (error) {
      alert(
        `Кажется, на сервере ошибка, попробуй поменять значения ${error.message}`,
      )
    }
  }

  const onSubmitValid = (data) => {
    if (data.newPas !== data.reNewPas) {
      return setError("reNewPas", { message: "Пароли не совпадают" })
    } else {
      updatePas(data)
    }
  }

  const {
    register,
    handleSubmit,
    formState,
    setError,
    // getValues,
    // setValue,
    // clearErrors,
  } = useForm({ mode: "onSubmit" })

  const showInput = (key) => {
    showedInput === key ? setShowedInput() : setShowedInput(key)
  }

  console.log(formState.errors)

  return (
    <FormWrap>
      <p className="text">Для обновления пароля введите свой текущий пароль</p>
      <form
        onSubmit={handleSubmit(onSubmitValid)}
        className="position-relative"
      >
        {/* 1 */}
        <div className="passInputWrap" style={{ marginTop: "16px" }}>
          <Input
            {...register("curPas", {
              required: "Пароль обязателен для заполнения",
            })}
            placeholder="Текущий пароль"
            type={showedInput === "curPas" ? "text" : "password"}
            hasError={Boolean(formState.errors?.curPas?.message)}
          />
          <button
            type="button"
            className="btnShow"
            onClick={() => showInput("curPas")}
          >
            {showedInput === "curPas" ? IconEye : IconEye}
          </button>
        </div>
        <FormError message={formState.errors?.curPas?.message} />

        {/* 2 */}
        <div className="passInputWrap" style={{ marginTop: "16px" }}>
          <Input
            {...register("newPas", {
              required: "Пароль обязателен для заполнения",
            })}
            placeholder="Новый пароль"
            type={showedInput === "newPas" ? "text" : "password"}
            hasError={Boolean(formState.errors?.newPas?.message)}
          />
          <button
            type="button"
            className="btnShow"
            onClick={() => showInput("newPas")}
          >
            {showedInput === "newPas" ? IconEye : IconEye}
          </button>
        </div>
        <FormError message={formState.errors?.newPas?.message} />

        {/* 3 */}
        <div className="passInputWrap" style={{ marginTop: "16px" }}>
          <Input
            {...register("reNewPas", {
              required: "Пароль обязателен для заполнения",
            })}
            placeholder="Повторите пароль"
            type={showedInput === "reNewPas" ? "text" : "password"}
            hasError={Boolean(formState.errors?.reNewPas?.message)}
          />
          <button
            type="button"
            className="btnShow"
            onClick={() => showInput("reNewPas")}
          >
            {showedInput === "reNewPas" ? IconEye : IconEye}
          </button>
        </div>
        <FormError message={formState.errors?.reNewPas?.message} />

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
        {/*<div className="formSubmitWrap">
        
           <Button
            type="submit"
            value={"Сохранить"}
            disabled={Object.keys(formState.errors).length}
          /> 
        </div>*/}

        <FormError message={formState.errors?.result?.message} center />
      </form>
      {showNotification && (
        <Alert
          style={{
            position: "fixed",
            bottom: "4%",
            left: "2%",
            zIndex: "2",
            borderRadius: "4px",
            padding: "8px 17px",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          }}
          severity="success"
        >
          Ваши данные успешно изменены
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
