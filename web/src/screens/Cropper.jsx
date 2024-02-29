import Cropper from "react-cropper"
import "cropperjs/dist/cropper.css"
import { isMob } from "../utils/isMob"
import { useEffect, useState } from "react"

const BoxStyle = {
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
}

export const CropperModal = ({ src, cropRef, className = "" }) => {
  const [isMobile] = useState(isMob())

  return (
    isMobile !== "init" && (
      <div className={"cropper-wrap " + className} style={BoxStyle}>
        {isMobile ? (
          <Cropper
            src={src}
            zoomTo={0.5}
            viewMode={1}
            ref={cropRef}
            guides={true}
            aspectRatio={1}
            center={false}
            zoomable={false}
            scalable={false}
            movable={false}
            autoCropArea={1}
            responsive={true}
            background={false}
            zoomOnWheel={false}
            className="cropper"
            minCropBoxWidth={10}
            minCropBoxHeight={10}
            checkOrientation={false}
            initialAspectRatio={1}
            style={{ height: "100%", width: "100%" }}
          />
        ) : (
          <Cropper
            src={src}
            zoomTo={0.5}
            viewMode={1}
            ref={cropRef}
            center={false}
            aspectRatio={1}
            movable={false}
            autoCropArea={1}
            responsive={true}
            background={false}
            zoomOnWheel={false}
            className="cropper"
            guides={false}
            minCropBoxWidth={50}
            minCropBoxHeight={50}
            checkOrientation={false}
            initialAspectRatio={1}
            style={{ height: "100%", width: "100%" }}
          />
        )}
      </div>
    )
  )
}
