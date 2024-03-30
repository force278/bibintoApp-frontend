import React, { useState, useEffect, useCallback, useRef } from "react"
import styled from "styled-components"
import { gql, useQuery, useMutation } from "@apollo/client"
import CircularProgress from "@mui/material/CircularProgress"
import { CropperModal } from "./Cropper.jsx"
import { client } from "../apollo.js"

const URL_UPLOAD_QUERY = gql`
  query {
    getUrlUploadPhoto
  }
`
const POST_PHOTO = gql`
  mutation uploadPhoto($file: String!) {
    uploadPhoto(file: $file) {
      id
    }
  }
`

const Canvas = styled.canvas`
  opacity: 0;
  visibility: hidden;
  position: absolute;
`

function compressImage(uploadInputRef, CanvasRef, maxWidth, maxHeight) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = URL.createObjectURL(uploadInputRef.current.files[0])
    const canvas = CanvasRef.current
    const ctx = CanvasRef.current.getContext("2d")
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

export const UploadPopUp = ({ onClose, uploadInputRef }) => {
  const CanvasRef = useRef(null)
  const { cache } = client
  const compressedBlob = useRef(null)
  const cropRef = useRef(null)
  const [uploadingState, setUploadingState] = useState(false)
  const [src, setSrc] = useState(null)

  const handleSave = async () => {
    if (cropRef) {
      // const dataUrl = cropRef.current.getImage().toDataURL()
      const dataUrl = cropRef.current?.cropper.getCroppedCanvas().toDataURL()
      const result = await fetch(dataUrl)
      const blob = await result.blob()
      compressedBlob.current = blob
    }
  }

  async function postImage(updatedUrl, uploadDB) {
    await handleSave().then(async () => {
      const file = new File([compressedBlob.current], "test.jpeg", {
        type: "image/jpeg",
      })
      const formData = new FormData()
      formData.append("file", file)
      await fetch(updatedUrl, {
        method: "PUT",
        headers: {
          "Content-type": "multipart/form-data",
        },
        body: file,
      }).then(() => {
        uploadDB({
          variables: { file: updatedUrl.split("?")[0] },
        })
        onClose()
        setUploadingState(false)
      })
    })
  }

  // Получаем url для загрузки
  const { called, data } = useQuery(URL_UPLOAD_QUERY, {
    fetchPolicy: "network-only",
  })

  // Мутация в бд о новой фотке
  const [uploadDB] = useMutation(POST_PHOTO, {
    onCompleted: () => {
      cache.reset()
    },
  })

  // При нажатии опубликовать
  const handleUploadPhoto = () => {
    if (called && data) {
      setUploadingState(true)
      postImage(data?.getUrlUploadPhoto, uploadDB)
    }
  }

  // При нажатии закрыть
  const handleGoBack = useCallback(() => {
    onClose()
  }, [onClose])

  // Сразу сжимаем фото
  useEffect(() => {
    async function createPhoto(uploadInputRef, CanvasRef) {
      compressedBlob.current = await compressImage(
        uploadInputRef,
        CanvasRef,
        1080,
        1080,
      )
      const compressedImage = new Image()
      compressedImage.src = URL.createObjectURL(compressedBlob.current)
      setSrc(compressedImage.src)
    }
    createPhoto(uploadInputRef, CanvasRef)
  }, [uploadInputRef])

  return (
    <StyledOverlay>
      <StyledPopUpContainer>
        <StyledPopUpHeader>
          {uploadingState ? (
            <div style={{ margin: "0 auto" }}>
              <CircularProgress />
            </div>
          ) : (
            <>
              <StyledBackButtonContainer onClick={handleGoBack}>
                Отменить
              </StyledBackButtonContainer>
              <StyledPopUpActionButton
                type="button"
                onClick={() => {
                  handleUploadPhoto()
                  handleSave()
                }}
              >
                Опубликовать
              </StyledPopUpActionButton>
            </>
          )}
        </StyledPopUpHeader>
        <StyledPopUpBody>
          <StyledPopUpLeft>
            <CropperModal src={src} cropRef={cropRef} />
            <Canvas ref={CanvasRef}></Canvas>
          </StyledPopUpLeft>
          <StyledPopUpRight>
            <StyledPopUpTextArea placeholder="Добавить описание..." />
          </StyledPopUpRight>
        </StyledPopUpBody>
      </StyledPopUpContainer>
    </StyledOverlay>
  )
}

const StyledOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.6);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  @media (max-width: 767px) {
    height: 100dvh;
  }
`

const StyledPopUpContainer = styled.div`
  width: 600px;
  max-width: 100%;
  max-height: 90%;
  background: #ffffff;
  border-radius: 20px;
  @media (max-width: 767px) {
    display: flex;
    height: 100dvh;
    max-height: none;
    border-radius: 0;
    background: #000;
    flex-direction: column-reverse;
  }
`

const StyledPopUpHeader = styled.div`
  display: flex;
  padding: 16px 18px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  @media (max-width: 767px) {
    padding: 65px 16px;
  }
`

const StyledBackButtonContainer = styled.button`
  background: transparent;
  font-size: 17px;
  color: #76768c;
  border: none;
`

const StyledBackButton = styled.button`
  cursor: pointer;
  background-color: #fff;
  border: 2px solid #9797bd;
  border-radius: 50%;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #262628;

  transition: all 0.3s ease;

  &:hover {
    background-color: #9797bd;
    color: #fff;

    & .arrow-left {
      transition: all 0.3s ease;
      border-top: 2px solid #fff;
      border-right: 2px solid #fff;
    }

    transition: all 0.3s ease;
  }
`

const StyledArrow = styled.div`
  width: 9px;
  height: 9px;
  border-top: 2px solid #262628;
  border-right: 2px solid #262628;
  margin-left: 4px;

  &.arrow-left {
    transform: rotate(225deg);
  }
`

const StyledPopUpActionButton = styled.button`
  background: linear-gradient(
    269.53deg,
    #fe2db7 5.8%,
    #2936ff 47.41%,
    #6cf2fe 96.11%
  );
  border: none;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 120%;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #ffffff;
  padding: 9px 35px;
  border-radius: 6px;
  @media (max-width: 767px) {
    background: #fff;
    color: #000;
  }
`

const StyledPopUpBody = styled.div`
  display: grid;
  grid-template-columns: git1fr;

  height: calc(100% - 61px);
  max-height: calc(100% - 61px);
`

const StyledPopUpLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  border-radius: 0 0 0 32px;

  & > img {
    object-fit: contain;
    height: 100%;
  }
`

const StyledPopUpRight = styled.div`
  display: none;
  border-radius: 0 0 32px 0;
  height: 100%;
`

const StyledPopUpTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border-radius: 0 0 32px 0;
  resize: none;
  border: none;
  padding: 20px;
`

export default UploadPopUp
