import { useRef } from "react"
import "./ModalContent.css"
import { gql, useMutation } from "@apollo/client"
import { useEffect } from "react"
import { client } from "../../apollo"
const DELETE_PHOTO = gql`
  mutation deletePhoto($id: Int!) {
    deletePhoto(id: $id) {
      id
    }
  }
`

const REPORT_PHOTO = gql`
  mutation reportPhoto($photoId: Int!) {
    reportPhoto(photoId: $photoId) {
      id
      ok
      error
    }
  }
`

const ModalContent = ({ id, isMine, closeModal, openReportPopup }) => {
  const modalRef = useRef()
  const { cache } = client

  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal()
      }
    }
    document.addEventListener("click", handleClickOutsideModal)
    return () => {
      document.removeEventListener("click", handleClickOutsideModal)
    }
    // eslint-disable-next-line
  }, [])

  const [deletePhoto] = useMutation(DELETE_PHOTO, {
    variables: { id },
    onCompleted: () => {
      cache.reset()
      console.log("deleted")
    },
  })
  // const [reportPhoto] = useMutation(REPORT_PHOTO, {
  //   variables: { photoId: id },
  // })

  return (
    <div className="modalContentWrap" ref={modalRef}>
      {isMine ? (
        <div className="Delete" onClick={deletePhoto}>
          {"Удалить фото"}
        </div>
      ) : (
        <div
          className="Report"
          onClick={() => {
            openReportPopup()
            closeModal()
          }}
        >
          {"Пожаловаться"}
        </div>
      )}
    </div>
  )
}

export default ModalContent
