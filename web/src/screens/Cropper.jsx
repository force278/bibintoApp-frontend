import { useState } from "react"
import { Box, Slider } from "@mui/material"
import AvatarEditor from "react-avatar-editor"

const BoxStyle = {
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
}

export const CropperModal = ({ src, cropRef }) => {
  const [slideValue, setSlideValue] = useState(10)

  return (
    <div style={BoxStyle}>
      <AvatarEditor
        ref={cropRef}
        image={src}
        border={50}
        color={[0, 0, 0, 0.72]}
        scale={slideValue / 10}
        rotate={0}
        width={600}
        height={600}
        style={{ width: "100%", height: "100%" }}
      />
      <Slider
        min={10}
        max={15}
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
    </div>
  )
}
