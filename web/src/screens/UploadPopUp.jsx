/*

UploadPopUp 

Этот компонент создается после выбора фото
из галереи устройства.
Он необходим для обработки фотографии перед ее загрузкой в приложение.


*/

import React, { useState, useEffect, useCallback, useRef } from "react"
import styled from "styled-components"
import { gql, useMutation, useLazyQuery } from "@apollo/client"
import CircularProgress from "@mui/material/CircularProgress"
import { CropperModal } from "./Cropper.jsx"
import { client } from "../apollo.js"

const GET_URL_UPLOAD_QUERY = gql`
  query {
    getUrlUploadPhoto
  }
`
const POST_PHOTO = gql`
  mutation uploadPhoto($file: String!) {
    uploadPhoto(file: $file) {
      ok
      error
    }
  }
`

function compressImage(src, CanvasRef, maxWidth, maxHeight) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
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
        0.9,
      )
    }
  })
}

export const UploadPopUp = ({ onClose, uploadInputRef, onError }) => {
  const CanvasRef = useRef(null) // Ссылка на canvas
  const { cache } = client
  const compressedBlob = useRef(null) // Для хранения сжатого фото
  const cropRef = useRef(null) // Ссылка на кроппер
  const [uploadingState, setUploadingState] = useState(false) // Состояние загрузки
  const [src, setSrc] = useState(
    URL.createObjectURL(uploadInputRef.current.files[0]),
  ) // Ссылка на фото

  const handleSave = async () => {
    // Если есть ссылка на библиотечный кроппер
    if (cropRef) {
      // Получаем ссылку на фото из библиотечного кроппера
      const dataUrl = cropRef.current?.cropper.getCroppedCanvas().toDataURL()
      // Сжимаем фото и сохраняем blob в временную переменную compressedBlob
      const blob = await compressImage(dataUrl, CanvasRef, 1080, 1080)
      compressedBlob.current = blob
    }
  }

  // Функция загрузки фотографии
  // принимает подписанный URL S3 и функцию сохранения методанных фото в базу данных приложения
  async function postImage(updatedUrl, uploadDB) {
    try {
      await handleSave().then(async () => {
        // Сжатое функцией handleSave фото отправляем на S3 как файл
        const file = new File([compressedBlob.current], "test.jpeg", {
          type: "image/jpeg",
        })
        await fetch(updatedUrl, {
          method: "PUT",
          headers: {
            "Content-type": "multipart/form-data",
          },
          body: file,
        }).then(() => {
          // Сохраняем методанные, загруженной на S3 фото в базу данных
          uploadDB({
            variables: {
              file: updatedUrl.split("?")[0],
            },
          })
          setUploadingState(false) // Завершаем процесс загрузки
          onClose() // Закрываем форму загрузки
        })
      })
    } catch (err) {
      onClose()
      console.log(err)
      setUploadingState(false)
      onError("Не удалось загрузить фото", err)
    }
  }

  // Получаем подписанный url S3 для загрузки
  const [getURL, { called, data }] = useLazyQuery(GET_URL_UPLOAD_QUERY, {
    fetchPolicy: "network-only",
  })

  // Сохранение методанных фото в базу данных
  const [uploadDB] = useMutation(POST_PHOTO, {
    onCompleted: () => {
      cache.reset()
    },
  })

  // При нажатии опубликовать
  const handleUploadPhoto = () => {
    getURL() // Получаем подписанный URL S3
      // ждем получения URL
      .then((data) => {
        // Если подписанный url был получен
        if (data.called && data.data) {
          setUploadingState(true) // Устанавливаем статус загрузки
          postImage(data.data?.getUrlUploadPhoto, uploadDB) // Загружаем фотографию
        }
      })
  }

  // При нажатии закрыть
  const handleGoBack = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <StyledOverlay>
      {" "}
      {/* Затемняет задний фон */}
      <StyledPopUpContainer>
        {" "}
        {/* Контейнер для формы загрузки */}
        <StyledPopUpHeader>
          {" "}
          {/* Заголовок контейнера */}
          {/* Если происходит загрузка фото, показываем иконку загрузки */}
          {uploadingState ? (
            <div style={{ margin: "0 auto" }}>
              <CircularProgress />
            </div>
          ) : (
            <>
              {/* Кнопки отменить и опубликовать */}
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
          {" "}
          {/* Тело контейнера */}
          <StyledPopUpLeft>
            {" "}
            {/* Левая часть, где показываем саму фотку */}
            <CropperModal src={src} cropRef={cropRef} />{" "}
            {/* Готовый компонент из библиотеки для обрезки фото (использует canvas)*/}
            <Canvas ref={CanvasRef}></Canvas>{" "}
            {/* Наш невидимый canvas для сжатия (изменения качества) фотографии */}
            {/* 
            Косяк в том, что мы юзаем два canvas, потому что изменить качество (то есть сжать) фото в готовом компоненте обрезки
            не получается (нет параметра у этого готового компонента просто)
            Сжать фотку нужно, потому что без этого они весят в среднем 0.5-2 МБ, а если сжимать то 40-200 КБ и качество не отличается
            */}
          </StyledPopUpLeft>
          <StyledPopUpRight>
            {" "}
            {/* Правая часть, где можно добавить описание */}
            <StyledPopUpTextArea placeholder="Добавить описание..." />
          </StyledPopUpRight>
        </StyledPopUpBody>
      </StyledPopUpContainer>
    </StyledOverlay>
  )
}

const Canvas = styled.canvas`
  opacity: 0;
  visibility: hidden;
  position: absolute;
`

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
