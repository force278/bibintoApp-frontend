import { useRef, useState } from "react"
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

export const CropperModal = ({ src, modalOpen, setModalOpen, setPreview }) => {
  const [slideValue, setSlideValue] = useState(10)
  const cropRef = useRef(null)
  const handleSave = async () => {
    if (cropRef) {
      const dataUrl = cropRef.current.getImage().toDataURL()
      const result = await fetch(dataUrl)
      const blob = await result.blob()
      setPreview(URL.createObjectURL(blob))
      setModalOpen(false)
    }
  }

  return (
    <Modal sx={modalStyle} open={modalOpen}>
      <Box sx={boxStyle}>
        <AvatarEditor
          ref={cropRef}
          image={src}
          style={{ width: "100%", height: "100%" }}
          border={50}
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
