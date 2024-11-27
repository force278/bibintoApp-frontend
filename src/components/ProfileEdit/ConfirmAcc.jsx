import "../../sass/common.scss"
import Input from "../auth/Input"
import { Alert } from "@mui/material"
import styled from "styled-components"
import FormError from "../auth/FormError"
import { useForm } from "react-hook-form"
import paperclip from "../../assets/img/paperclip.svg"
import React, { useEffect, useRef, useState } from "react"
import { gql, useLazyQuery, useMutation } from "@apollo/client"
import { isMob } from "../../utils/isMob"

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

const URL_UPLOAD_QUERY = gql`
  query {
    getUrlUploadPhoto
  }
`

export const ConfirmAcc = () => {
  const [isMobile] = useState(isMob())
  const inputRef = useRef()
  const [, setSrc] = useState()
  const compressedBlob = useRef(null)
  const [avatar, setAvatar] = useState()
  const [preview, setPreview] = useState()
  const [avatarLoading, setAvatarLoading] = useState()
  const [showNotification, setShowNotification] = useState(false)

  // photo

  const loadPhoto = async () => {
    setAvatar()
    setAvatarLoading(true)
    const imageUrl = uploadData.getUrlUploadPhoto
    const file = new File([compressedBlob.current], "test.jpeg", {
      type: "image/jpeg",
    })
    const formData = new FormData()
    formData.append("file", file)
    try {
      await fetch("https://neuro.bibinto.com/", {
        method: "POST",
        body: formData,
      }).then(async (res) => {
        await res.json().then(async (data) => {
          // if (data) {
          if (data.person) {
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
              console.error("Ошибка при загрузке фотографии")
            }
          } else {
            setPreview()
            inputRef.current.value = ""
            setError("avatar", { message: "На фото не человек" })
          }
          setAvatarLoading(false)
        })
      })
    } catch (error) {
      setAvatarLoading(false)
      setError("avatar", { message: "Не удалось загрузить аватар" })
      console.error("Произошла ошибка", error)
    }
  }

  // Mutation
  const [getUrl, { data: uploadData }] = useLazyQuery(URL_UPLOAD_QUERY, {
    onCompleted: loadPhoto,
  })

  async function handleChangeAvatar(e) {
    clearErrors("avatar")
    if (e?.target?.files[0]) {
      const dataUrl = URL.createObjectURL(e.target.files[0])
      setPreview(dataUrl)
      setSrc(dataUrl)
      const result = await fetch(dataUrl)
      const blob = await result.blob()
      compressedBlob.current = blob
    }
  }

  function compressImage(inputRef, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = URL.createObjectURL(inputRef.current.files[0])
      const canvas = document.createElement("CANVAS")
      const ctx = canvas.getContext("2d")
      img.onload = () => {
        let width = img.width
        let height = img.height
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height

        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            resolve(blob)
          },
          "image/jpeg",
          1,
        )
      }
    })
  }

  // Сразу сжимаем фото
  useEffect(() => {
    console.log(inputRef.current.value)
    if (!inputRef.current.value) return
    async function createPhoto(inputRef) {
      compressedBlob.current = await compressImage(inputRef, 1080, 1080)
      const compressedImage = new Image()
      compressedImage.src = URL.createObjectURL(compressedBlob.current)
      setSrc(compressedImage.src)
    }
    createPhoto(inputRef)
  }, [inputRef, setSrc, compressedBlob])

  useEffect(() => {
    if (preview) {
      getUrl()
    }
    // eslint-disable-next-line
  }, [preview])
  // photo end

  const [confirmProfile] = useMutation(EDIT_PROFILE_MUTATION)

  const confirmAcc = async (data) => {
    try {
      const result = await confirmProfile({
        variables: {
          password: data.newPas,
        },
      })
      if (result.data && result.data.confirmProfile.ok) {
        setShowNotification(true)
      } else {
        alert(
          `При изменении профиля произошла ошибка, ${result.data.confirmProfile.error}`,
        )
      }
    } catch (error) {
      alert(
        `Кажется, на сервере ошибка, попробуй поменять значения ${error.message}`,
      )
    }
  }

  const onSubmitValid = (data) => {
    if (!avatar) {
      return setError("avatar", { message: "Необходимо прикрепить фото" })
    } else {
      confirmAcc(data)
    }
  }

  const {
    register,
    handleSubmit,
    formState,
    setError,
    // getValues,
    // setValue,
    clearErrors,
  } = useForm({ mode: "onSubmit" })

  console.log(formState.errors)

  const delAvatar = () => {
    setPreview()
    setAvatar()
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <FormWrap>
      <p className="text">Для подтверждения аккаунта заполните поля</p>
      <form
        onSubmit={handleSubmit(onSubmitValid)}
        className="position-relative"
      >
        {/* 1 */}
        <p className="inputLabel" style={{ marginTop: "16px" }}>
          Никнейм
        </p>
        <Input
          {...register("nickname", {
            required: "Никнейм обязателен для заполнения",
          })}
          type="text"
          placeholder="Введите никнейм"
          hasError={Boolean(formState.errors?.nickname?.message)}
        />
        <FormError message={formState.errors?.nickname?.message} />

        {/* 2 */}
        <p className="inputLabel" style={{ marginTop: "16px" }}>
          Имя
        </p>
        <Input
          {...register("name", {
            required: "Имя обязательно для заполнения",
          })}
          type="text"
          placeholder="Введите ваше имя"
          hasError={Boolean(formState.errors?.name?.message)}
        />
        <FormError message={formState.errors?.name?.message} />

        {/* 3 */}
        <InputFileWrap>
          {isMobile ? (
            <>
              <p>
                {avatar
                  ? "Файл выбран"
                  : "Прикрепите фото удостоверения личности"}
              </p>
              <label
                htmlFor="avatar"
                className="btnFile"
                onClick={(e) => avatar && delAvatar(e)}
              >
                <span>{!avatar ? "Выбрать файл" : "Удалить файл"}</span>
                {!avatar && (
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    ref={inputRef}
                    accept="image/jpeg, image/png"
                    onChange={handleChangeAvatar}
                  />
                )}
              </label>
            </>
          ) : (
            <>
              <label htmlFor="avatar" className="btnFile">
                <img src={paperclip} alt="" />
                <span>
                  {!avatar
                    ? "Прикрепите фото удостоверения личности"
                    : "Файл выбран"}
                </span>
                {!avatar && (
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    ref={inputRef}
                    disabled={avatar}
                    accept="image/jpeg, image/png"
                    onChange={handleChangeAvatar}
                  />
                )}
              </label>

              {avatar && (
                <p
                  style={{ color: "#FF3B30", cursor: "pointer" }}
                  onClick={() => avatar && delAvatar()}
                >
                  Удалить файл
                </p>
              )}
            </>
            // <label
            //   htmlFor="avatar"
            //   className="btnFile"
            //   onClick={(e) => avatar && delAvatar(e)}
            // >
            //   <img src={paperclip} alt="" />
            //   <span>
            //     {!avatar
            //       ? "Прикрепите фото удостоверения личности"
            //       : "Файл выбран"}
            //   </span>
            //   {!avatar && (
            //     <input
            //       id="avatar"
            //       type="file"
            //       name="avatar"
            //       ref={inputRef}
            //       accept="image/jpeg, image/png"
            //       onChange={handleChangeAvatar}
            //     />
            //   )}
            // </label>
          )}
        </InputFileWrap>
        <div style={{ position: "relative" }}>
          {avatarLoading && <p className="textLoad">загрузка...</p>}
        </div>
        {!avatarLoading && (
          <FormError message={formState.errors?.avatar?.message} center />
        )}

        {/* submit */}
        <div className="formSubmitWrap">
          <button
            type="submit"
            className="btnSubmit"
            disabled={Object.keys(formState.errors).length}
          >
            Сохранить
          </button>
        </div>
        {/* <div className="formSubmitWrap">
          <Button
            type="submit"
            value={"Сохранить"}
            disabled={Object.keys(formState.errors).length}
          />
        </div> */}
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
          Аккаунт успешно подтверждён
        </Alert>
      )}
    </FormWrap>
  )
}

const FormWrap = styled.div`
  margin: 12px 16px;
  .textLoad {
    right: 0;
    color: #76768c;
    font-size: 13px;
    text-align: left;
    position: absolute;
  }
  .text {
    font-size: 15px;
    margin-bottom: 12px;
  }
  input {
    margin-top: 0;
  }
  @media (min-width: 767px) {
    max-width: 343px;
  }
`

const InputFileWrap = styled.div`
  gap: 40px;
  display: flex;
  font-size: 13px;
  margin-top: 16px;
  justify-content: space-between;
  p {
    color: #76768c;
  }
  .btnFile {
    cursor: pointer;
    input {
      width: 0;
      height: 0;
    }
    span {
      white-space: nowrap;
      font-size: 13px;
      color: #1877f2;
    }
  }

  @media (min-width: 767px) {
    .btnFile {
      gap: 5px;
      display: flex;
      align-items: center;
      span {
        color: #76768c;
      }
    }
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
