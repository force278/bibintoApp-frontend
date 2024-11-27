import { useEffect } from "react"
import useMe from "../../hooks/useMe"
import styled from "styled-components"
import { useForm } from "react-hook-form"

import IconArrowLeft from "../../assets/img/IconArrowLeft.svg"

import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import { useRef } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import FormError from "../auth/FormError"

const REPORT_PHOTO = gql`
  mutation reportPhoto($photoId: Int!, $reportText: String) {
    reportPhoto(photoId: $photoId, reportText: $reportText) {
      error
      id
      ok
    }
  }
`

const StyledForm = styled.div`
  padding-top: 8px;
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
  @media (max-width: 768px) {
    padding: 16px;
  }
`

const StyledList = styled.div`
  display: flex;
  overflow: auto;
  flex-direction: column;
  .title {
    font-size: 13px;
    font-weight: 500;
    color: #76768c;
  }
  button {
    width: 100%;
    border: none;
    display: flex;
    padding: 15px 0;
    font-size: 15px;
    align-items: center;
    background: transparent;
    justify-content: space-between;
    border-bottom: 1px solid #f2f2f7;
  }
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`

const ReportWrap = styled.div`
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  z-index: 999;
  display: flex;
  height: 100dvh;
  position: fixed;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background-color: #00000080;
  @media (max-width: 768px) {
  }
`

const ReportWindow = styled.div`
  width: 552px;
  display: flex;
  max-height: 80vh;
  padding: 38px;
  overflow: hidden;
  border-radius: 20px;
  flex-direction: column;
  background-color: #fff;
  .header {
    gap: 24px;
    padding: 0;
    height: auto;
    display: flex;
    text-align: center;
    padding-bottom: 16px;
    flex-direction: column;
  }
  .title {
    font-size: 22px;
  }
  .text {
    font-size: 15px;
    font-weight: 400;
  }
  .formBtnBack {
    display: none;
  }
  @media (max-width: 768px) {
    padding: 0;
    height: 100dvh;
    max-height: none;
    border-radius: 0;
    .formBtnBack {
      display: flex;
    }
    .text {
      display: none;
    }
    .header {
      height: 60px;
      padding: 16px;
    }
    .onlyMob {
      padding: 16px 0;
      font-size: 15px;
      font-weight: 400;
      border-bottom: 1px solid #f2f2f7;
    }
  }
`

const ReportPopup = ({ close, photoId, setResMes }) => {
  const windowRef = useRef()
  const history = useHistory()
  const [step, setStep] = useState(1)
  const { register, handleSubmit, formState } = useForm()

  useEffect(() => {
    const body = document.querySelector("body")
    if (!body) return
    body.style.height = "100dvh"
    body.style.overflow = "hidden"
    return () => {
      body.style.height = "auto"
      body.style.overflow = "auto"
    }
  }, [])

  console.log(photoId)

  const [reportPhoto] = useMutation(REPORT_PHOTO, {
    onCompleted: () => {
      setResMes(true)
      close()
      console.log("жалоба успешно отправлена")
    },
  })

  const handleClick = (e, id) => {
    e.stopPropagation()
    const variables = { photoId }
    switch (id) {
      case 1:
        variables.reportText = "Спам"
        break
      case 2:
        variables.reportText = "Мошенничество"
        break
      case 3:
        variables.reportText = "Откровенные изображение"
        break
      case 4:
        variables.reportText = "Нарушение авторских прав"
        break
      default:
        break
    }
    if (variables.reportText) {
      reportPhoto({ variables })
    } else {
      setStep(2)
    }
  }

  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (windowRef.current && !windowRef.current.contains(event.target)) {
        console.log(windowRef.current)
        close()
      }
    }
    document.addEventListener("click", handleClickOutsideModal)
    return () => {
      document.removeEventListener("click", handleClickOutsideModal)
    }
    // eslint-disable-next-line
  }, [])

  const onSubmitValid = (data) => {
    reportPhoto({
      variables: {
        ...data,
        photoId,
      },
    })
  }

  return (
    <ReportWrap id={"report"}>
      <ReportWindow ref={windowRef}>
        <div className="header">
          <button
            type="button"
            className="formBtnBack"
            onClick={close}
          ></button>
          <p className="title">Пожаловаться</p>
          {step === 1 && (
            <p className="text">
              Пожалуйста сообщите нам почему вы хотите пожаловаться на эту
              публикацию
            </p>
          )}
        </div>
        {step === 1 && (
          <StyledList>
            <p className="onlyMob">
              Пожалуйста сообщите нам почему вы хотите пожаловаться на эту
              публикацию
            </p>

            <button onClick={(e) => handleClick(e, 1)}>
              <p>Спам</p> <img src={IconArrowLeft} alt="" />
            </button>

            <button onClick={(e) => handleClick(e, 2)}>
              <p>Мошенничество</p> <img src={IconArrowLeft} alt="" />
            </button>

            <button onClick={(e) => handleClick(e, 3)}>
              <p>Откровенные изображение</p> <img src={IconArrowLeft} alt="" />
            </button>

            <button onClick={(e) => handleClick(e, 4)}>
              <p>Нарушение авторских прав</p> <img src={IconArrowLeft} alt="" />
            </button>

            <button onClick={(e) => handleClick(e, 5)}>
              <p>Другое</p> <img src={IconArrowLeft} alt="" />
            </button>
          </StyledList>
        )}
        {step === 2 && (
          <StyledForm>
            <p>Вы можете оставить комментарий и пожаловаться на публикацию</p>
            <textarea
              {...register("reportText", { required: "Заполните поле" })}
              placeholder="Введите ваш комментарий"
              type="text"
            ></textarea>
            <FormError message={formState.errors?.reportText?.message} />
            <div className="formSubmitWrap">
              <button
                type="submit"
                className="btnSubmit"
                onClick={handleSubmit(onSubmitValid)}
                disabled={Object.keys(formState.errors).length}
              >
                Пожаловаться
              </button>
            </div>
          </StyledForm>
        )}
      </ReportWindow>
    </ReportWrap>
  )
}

export default ReportPopup
