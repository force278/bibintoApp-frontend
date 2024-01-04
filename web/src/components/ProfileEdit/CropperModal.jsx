import { useRef, useEffect, useState } from "react"
import { Box, Button, Modal, Slider } from "@mui/material"
import AvatarEditor from "react-avatar-editor"
import accept from "../../assets/img/editProfile/accept.svg"
import cancel from "../../assets/img/editProfile/cancel.svg"

const boxStyle = {
  width: "300px",
  height: "300px",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
}
const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

export const CropperModal = ({
  inputRef,
  setSrc,
  src,
  modalOpen,
  setModalOpen,
  setPreview,
  compressedBlob,
}) => {
  const [slideValue, setSlideValue] = useState(10)
  const cropRef = useRef(null)
  const handleSave = async () => {
    if (cropRef) {
      const dataUrl = cropRef.current.getImage().toDataURL()
      const result = await fetch(dataUrl)
      const blob = await result.blob()
      setPreview(URL.createObjectURL(blob))
      compressedBlob.current = blob
      setModalOpen(false)
    }
  }
  const CanvasRef = useRef(null)

  function compressImage(inputRef, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      console.log(CanvasRef)
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
    async function createPhoto(inputRef) {
      compressedBlob.current = await compressImage(inputRef, 1080, 1080)
      const compressedImage = new Image()
      compressedImage.src = URL.createObjectURL(compressedBlob.current)
      setSrc(compressedImage.src)
    }
    createPhoto(inputRef)
  }, [inputRef, setSrc, compressedBlob])

  return (
    <Modal sx={modalStyle} open={modalOpen}>
      <Box sx={boxStyle}>
        <AvatarEditor
          ref={cropRef}
          image={src}
          style={{ width: "100%", height: "100%" }}
          border={50}
          borderRadius={100}
          color={[0, 0, 0, 0.72]}
          scale={slideValue / 10}
          rotate={0}
        />
        <Slider
          min={10}
          max={50}
          sx={{
            margin: "0 auto",
            width: "80%",
            color: "cyan",
          }}
          size="medium"
          defaultValue={slideValue}
          value={slideValue}
          onChange={(e) => setSlideValue(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            padding: "10px",
          }}
        >
          <Button size="small" onClick={(e) => setModalOpen(false)}>
            <img src={cancel} alt="cancel" />
          </Button>
          <Button size="small" onClick={handleSave}>
            <img src={accept} alt="save" />
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
