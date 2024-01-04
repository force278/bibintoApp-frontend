import React, { useCallback, useEffect, useRef, useState } from "react"
import { CropperModal } from "./CropperModal"
import defaultAvatar from "../../assets/img/editProfile/defaultAvatar.png"
import "../../sass/common.scss"
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { Alert, AlertTitle, Box, Button } from "@mui/material"

const URL_UPLOAD_QUERY = gql`
  query {
    getUrlUploadPhoto
  }
`

const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($file: String!) {
    uploadAvatar(file: $file) {
      id
    }
  }
`

const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfile(
    $firstName: String
    $username: String
    $lastName: String
    $email: String
    $bio: String
    $password: String
  ) {
    editProfile(
      firstName: $firstName
      username: $username
      lastName: $lastName
      email: $email
      bio: $bio
      password: $password
    ) {
      ok
      id
      error
    }
  }
`

const ME_QUERY = gql`
  query Me {
    me {
      firstName
      lastName
      username
      bio
      avatar
      totalFollowers
      totalFollowing
      isMe
      isFollowing
    }
  }
`

export default function ChangeEditProfile() {
  const loadAvatar = async () => {
    const imageUrl = uploadData.getUrlUploadPhoto
    console.log(compressedBlob)
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
          if (data.person) {
            const response = await fetch(imageUrl, {
              method: "PUT",
              headers: {
                "Content-Type": "multipart/form-data",
              },
              body: file,
            })
            if (response.ok) {
              console.log("фото успешно загружена")
              const img = uploadData.getUrlUploadPhoto.split("?")[0]
              try {
                const uploadResponse = await uploadAvatar({
                  variables: { file: img },
                })
                if (uploadResponse.data.uploadAvatar) {
                  console.log("Фото успешно отправлено на сервер.")
                } else {
                  console.error("Ошибка при отправке фотографии на сервер.")
                }
              } catch (error) {
                console.log("Произошла ошибка", error)
              }
            } else {
              console.error("Ошибка при загрузке фотографии")
            }
          } else {
            alert("На фото не человек")
          }
        })
      })
    } catch (error) {
      console.error("Произошла ошибка", error)
    }
  }

  const [src, setSrc] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [preview, setPreview] = useState(null)
  const inputRef = useRef(null)
  const { data: meData, loading } = useQuery(ME_QUERY)
  const [showAlert, setShowAlert] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userName, setUserName] = useState("")
  const [infoAboutMe, setInfoAboutMe] = useState("")
  const [email, setEmail] = useState("")
  const [showNotification, setShowNotification] = useState(false)
  const [editProfile] = useMutation(EDIT_PROFILE_MUTATION)
  const compressedBlob = useRef(null)

  useEffect(() => {
    if (!loading) {
      const { firstName, username, lastName, bio, email } = meData?.me || {}
      setFirstName(firstName || "")
      setUserName(username || "")
      setLastName(lastName || "")
      setInfoAboutMe(bio || "")
      setEmail(email || "")
    }
    if (preview) {
      setShowAlert(true)
    }
  }, [loading, meData, preview])

  useEffect(() => {
    if (showNotification) {
      setTimeout(() => {
        setShowNotification(false)
        window.location.reload()
      }, 2000)
    }
  }, [showNotification])

  const handleChangeName = useCallback(
    (e) => {
      setFirstName(e.target.value)
    },
    [setFirstName],
  )
  const handleChangeUserName = useCallback(
    (e) => {
      setUserName(e.target.value)
    },
    [setUserName],
  )
  const handleChangeLastName = useCallback(
    (e) => {
      setLastName(e.target.value)
    },
    [setLastName],
  )
  const handleChangeInfoAboutMe = useCallback(
    (e) => {
      setInfoAboutMe(e.target.value)
    },
    [setInfoAboutMe],
  )
  const handleChangeEmail = useCallback(
    (e) => {
      setEmail(e.target.value)
    },
    [setEmail],
  )

  const [getUrl, { data: uploadData }] = useLazyQuery(URL_UPLOAD_QUERY, {
    onCompleted: loadAvatar,
  })

  const [uploadAvatar] = useMutation(UPLOAD_AVATAR)

  const handleInputClick = (e) => {
    e.preventDefault()
    inputRef.current.click()
  }

  const handleImgChange = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]))
    setModalOpen(true)
  }

  const saveAvatar = () => {
    setShowAlert(false)
    getUrl()
  }
  const canselSaveAvatar = () => {
    setShowAlert(false)
    setPreview(null)
  }

  const saveAllChangesInProfile = async () => {
    try {
      const result = await editProfile({
        variables: {
          firstName: firstName,
          username: userName,
          lastName: lastName,
          bio: infoAboutMe,
          email: email,
        },
      })
      if (result.data && result.data.editProfile) {
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

  return (
    <>
      <div className="col-sm-12 col-lg-8">
        <div className="row">
          <div
            className="d-flex mb-3 align-items-center-mobile flex-direction-column-mobile"
            style={{ marginTop: "33px" }}
          >
            <div className="col-2 d-flex justify-content-end justifyContentCenterForMobile">
              <div className="img-container">
                <img
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                  onClick={handleInputClick}
                  src={preview || meData?.me?.avatar || defaultAvatar}
                  alt=""
                  width="70px"
                  height="70px"
                />
                {modalOpen ? (
                  <CropperModal
                    inputRef={inputRef}
                    setSrc={setSrc}
                    modalOpen={modalOpen}
                    src={src}
                    setPreview={setPreview}
                    setModalOpen={setModalOpen}
                    compressedBlob={compressedBlob}
                  />
                ) : null}

                <input
                  style={{ display: "none" }}
                  type="file"
                  accept="image/jpeg, image/png"
                  id="avatar"
                  ref={inputRef}
                  onChange={handleImgChange}
                />
              </div>
            </div>
            <div className="d-flex flex-column col-10 ps-sm-0 ps-lg-4 justifyContentCenterForMobile align-items-center-mobile">
              <span className="fs-5 mt-2">
                {loading ? "Загрузка..." : `${meData?.me?.username}`}
              </span>
              <button
                onClick={handleInputClick}
                className="text-primary bg-transparent border-0 d-flex justify-content-start ps-0 mt-2"
              >
                Загрузите новое фото
              </button>
            </div>
            {showAlert && (
              <Alert
                severity="info"
                className="d-flex justify-content-start slideInLeft"
                style={{
                  position: "fixed",
                  top: "17%",
                  left: "60%",
                  zIndex: "2",
                  borderRadius: "4px",
                  padding: "8px 17px",
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                }}
                action={
                  <Box>
                    <Button color="inherit" size="small" onClick={saveAvatar}>
                      Да
                    </Button>
                    <Button
                      color="inherit"
                      size="small"
                      onClick={canselSaveAvatar}
                    >
                      Нет
                    </Button>
                  </Box>
                }
              >
                <AlertTitle>Вы хотите изменить аватар?</AlertTitle>
              </Alert>
            )}
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
          </div>
          <div className="d-flex hideElement mb-2">
            <div className="col-2 d-flex justify-content-end">
              <span
                className="fs-6 pt-2"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Имя
              </span>
            </div>
            <div className="col-10 ps-4">
              <input
                type="text"
                value={firstName}
                onChange={handleChangeName}
                className="border border-1 pt-1 pb-1 ps-2 w-50"
              />
              <div className="p-0 m-0 text-secondary">
                <div className="mt-2">
                  Чтобы помочь людям найти вашу учетную запись, используйте имя,
                  под которым вас знают.
                  <br />
                </div>
                <div className="mt-3">
                  Вы можете изменить свое имя только два раза в течение 7 дней.
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex hideElement mb-2">
            <div className="col-2 d-flex justify-content-end">
              <span
                className="fs-6 pt-2"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Фамилия
              </span>
            </div>
            <div className="col-10 ps-4">
              <input
                type="text"
                value={lastName}
                onChange={handleChangeLastName}
                className="border border-1 pt-1 pb-1 ps-2 w-50"
              />
            </div>
          </div>
          <div className="d-flex hideElement mb-2">
            <div className="col-2 d-flex justify-content-end">
              <span
                className="fs-6 pt-2"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Никнейм
              </span>
            </div>
            <div className="col-10 ps-4">
              <input
                type="text"
                value={userName}
                onChange={handleChangeUserName}
                className="border border-1 pt-1 pb-1 ps-2 w-50"
              />
              <div className="mt-2">
                <p className="text-secondary">
                  Вы можете снова вернуть свой никнейм в течение <br /> 7 дней.
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex hideElement mb-4">
            <div className="col-2 d-flex justify-content-end">
              <span
                className="fs-6 pt-2"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Описание
              </span>
            </div>
            <div className="col-10 ps-4">
              <textarea
                style={{ resize: "none", height: "64px" }}
                placeholder="Описание о себе"
                value={infoAboutMe}
                onChange={handleChangeInfoAboutMe}
                className="border border-1 pt-1 pb-1 ps-2 w-50 resize-none"
              />
              <div style={{ marginTop: "32px" }}>
                <h5 className="fw-bold" style={{ color: "#8E8E8E" }}>
                  Персональная Информация
                </h5>
                <div className="mt-3" style={{ color: "#8E8E8E" }}>
                  Эта информация не будет видна в вашем общедоступном <br />{" "}
                  профиле.
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex hideElement mb-3">
            <div className="col-2 d-flex justify-content-end">
              <span
                className="fs-6 pt-2"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Почта
              </span>
            </div>
            <div className="col-10 ps-4">
              <input
                type="text"
                value={email}
                onChange={handleChangeEmail}
                className="border border-1 pt-1 pb-1 ps-2 w-50"
              />
            </div>
          </div>
          <div className="d-flex justify-content-center mt-sm-0 mt-lg-4 mb-5">
            <button
              className="text-white border-0 change_btn"
              onClick={saveAllChangesInProfile}
              style={{
                borderRadius: "4px",
                background: "#2283F5",
                padding: "8px 17px",
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              }}
            >
              Изменить
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
