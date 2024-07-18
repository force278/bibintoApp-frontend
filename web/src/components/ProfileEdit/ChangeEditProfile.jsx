import "../../sass/common.scss"
import "../../sass/editProfile.scss"
import { CropperModal } from "./CropperModal"
import { Alert, AlertTitle, Box, Button } from "@mui/material"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client"
import defaultAvatar from "../../assets/img/editProfile/defaultAvatar.png"

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
    $bio: String
  ) {
    editProfile(
      firstName: $firstName
      username: $username
      lastName: $lastName
      bio: $bio
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
    const file = new File([compressedBlob.current], "test.jpeg", {
      type: "image/jpeg",
    })
    const formData = new FormData()
    formData.append("file", file)
    try {
      const response = await fetch(uploadData.getUrlUploadPhoto, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
      })
      if (response.ok) {
        try {
          const uploadResponse = await uploadAvatar({
            variables: { file: uploadData.getUrlUploadPhoto.split("?")[0] },
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
    } catch (error) {
      console.error("Произошла ошибка", error)
    }
  }
  const compressedBlob = useRef(null)
  const [src, setSrc] = useState(null)
  const [preview, setPreview] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const inputRef = useRef(null)

  const { data: meData, loading } = useQuery(ME_QUERY)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userName, setUserName] = useState("")
  const [infoAboutMe, setInfoAboutMe] = useState("")
  const [showNotification, setShowNotification] = useState(false)
  const [editProfile] = useMutation(EDIT_PROFILE_MUTATION)

  useEffect(() => {
    if (!loading) {
      const { firstName, username, lastName, bio } = meData?.me || {}
      setFirstName(firstName || "")
      setUserName(username || "")
      setLastName(lastName || "")
      setInfoAboutMe(bio || "")
    }
    if (preview) {
      setShowAlert(true)
    }
  }, [loading, meData, preview])

  useEffect(() => {
    if (showNotification) {
      setTimeout(() => {
        setShowNotification(false)
        //window.location.reload()
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

  const [getUrl, { data: uploadData }] = useLazyQuery(URL_UPLOAD_QUERY, {
    onCompleted: loadAvatar,
  })

  const [uploadAvatar] = useMutation(UPLOAD_AVATAR)

  const handleInputClick = (e) => {
    e.preventDefault()
    inputRef.current.click()
  }

  const handleImgChange = (e) => {
    if (!e.target.files[0]) return
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

  return (
    <>
      <div className="col-sm-12 col-lg-8 editProfile">
        <div className="">
          <div className="d-flex mb-3 align-items-center-mobile flex-direction-column-mobile photoWrap">
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
                  <>
                    <CropperModal
                      inputRef={inputRef}
                      setSrc={setSrc}
                      modalOpen={modalOpen}
                      src={src}
                      setPreview={setPreview}
                      setModalOpen={setModalOpen}
                      compressedBlob={compressedBlob}
                    />
                  </>
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
                {/* Загрузите новое фото */}
                Изменить фото профиля
              </button>
            </div>
            <div></div>
          </div>

          <div className="alertWrapper">
            {showAlert && (
              <Alert
                severity="info"
                className="alert"
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
          <div className="itemWrap">
            <div className="itemTitle">
              <span className="">Имя</span>
            </div>
            <div className="">
              <input
                type="text"
                value={firstName}
                className="itemInput"
                onChange={handleChangeName}
              />
              <div className="ItemText">
                Чтобы помочь людям найти вашу учетную запись, используйте имя,
                под которым вас знают. Вы можете изменить свое имя только два
                раза в течение 7 дней.
              </div>
            </div>
          </div>
          <div className="itemWrap">
            <div className="itemTitle">
              <span className="">Фамилия</span>
            </div>
            <div className="">
              <input
                type="text"
                value={lastName}
                onChange={handleChangeLastName}
                className="itemInput"
              />
            </div>
          </div>
          <div className="itemWrap">
            <div className="itemTitle">
              <span>Никнейм</span>
            </div>
            <div>
              <input
                type="text"
                value={userName}
                className="itemInput"
                onChange={handleChangeUserName}
              />
              <div className="ItemText">
                Вы можете снова вернуть свой никнейм в течение <br /> 7 дней.
              </div>
            </div>
          </div>
          <div className="itemWrap">
            <div className="itemTitle">
              <span>Описание</span>
            </div>
            <div>
              <textarea
                value={infoAboutMe}
                className="itemTextarea"
                placeholder="Описание о себе"
                onChange={handleChangeInfoAboutMe}
              />
            </div>
          </div>
          <div className="itemWrap btn">
            <div className="itemTitle"></div>
            <div className="formSubmitWrap">
              <button className="btnSubmit" onClick={saveAllChangesInProfile}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
