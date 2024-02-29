import { useEffect } from "react"
import useMe from "../../hooks/useMe"
import styled from "styled-components"
import { useForm } from "react-hook-form"

import IconArrowLeft from "../../assets/img/IconArrowLeft.svg"

import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import { useRef } from "react"

const REPORT_PHOTO = gql`
  mutation reportPhoto($photoId: Int!, $reportText: String) {
    reportPhoto(photoId: $photoId, reportText: $reportText) {
      error
      id
      ok
    }
  }
`

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
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

const ReportPopup = ({ close, photoId }) => {
  const modalRef = useRef()
  const windowRef = useRef()
  // const history = useHistory()
  const { data: userData } = useMe()
  const [showModal, setShowModal] = useState()
  const [step, setStep] = useState(1)
  const { register, handleSubmit, setValue, getValues } = useForm()

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

  //   const createCommentUpdate = (cache, result) => {
  //     const { payload } = getValues()
  //     setValue("payload", "")
  //     const {
  //       data: {
  //         createComment: { ok, id },
  //       },
  //     } = result
  //     if (ok && userData?.me) {
  //       const newComment = {
  //         __typename: "Comment",
  //         id,
  //         createdAt: Date.now() + "",
  //         isMine: true,
  //         payload,
  //         user: {
  //           ...userData.me,
  //         },
  //       }
  //       const newCachedComment = cache.writeFragment({
  //         fragment: gql`
  //           fragment newComment on Comment {
  //             id
  //             createdAt
  //             isMine
  //             payload
  //             user {
  //               username
  //             }
  //           }
  //         `,
  //         data: newComment,
  //       })
  //       cache.modify({
  //         id: `Photo:${photoId}`,
  //         fields: {
  //           comments(prev) {
  //             return [...prev, newCachedComment]
  //           },
  //           commentsNumber(prev) {
  //             return prev + 1
  //           },
  //         },
  //       })
  //     }
  //   }

  const [reportPhoto] = useMutation(REPORT_PHOTO, {
    onCompleted: () => {
      alert("жалоба успешно отправлена")
    },
  })

  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal()
      }
    }
    document.addEventListener("click", handleClickOutsideModal)
    return () => {
      document.removeEventListener("click", handleClickOutsideModal)
    }
    // eslint-disable-next-line
  }, [])

  const handleClick = (e, id) => {
    e.stopPropagation()
    setStep(2)
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

            <button>
              <p>Другое</p> <img src={IconArrowLeft} alt="" />
            </button>
          </StyledList>
        )}
        {step === 2 && (
          <StyledForm>
            <p>Вы можете оставить комментарий и пожаловаться на публикацию</p>
            <textarea
              {...register("payload", { required: true })}
              placeholder="Введите ваш комментарий"
              type="text"
            ></textarea>
            <div className="formSubmitWrap">
              <button
                type="submit"
                className="btnSubmit"
                onClick={handleSubmit}
                // disabled={Object.keys(formState.errors).length}
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
