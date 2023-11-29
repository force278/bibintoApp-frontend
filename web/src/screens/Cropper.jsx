import { useState } from "react"
import { Box, Slider } from "@mui/material"
import AvatarEditor from "react-avatar-editor"

const boxStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
}

export const CropperModal = ({ src, handleSave, cropRef, setPreview }) => {
  const [slideValue, setSlideValue] = useState(10)

  return (
    <Box sx={boxStyle}>
      <AvatarEditor
        ref={cropRef}
        image={src}
        border={50}
        color={[0, 0, 0, 0.72]}
        scale={slideValue / 10}
        rotate={0}
        width={500}
        height={500}
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
      ></Box>
    </Box>
  )
}
