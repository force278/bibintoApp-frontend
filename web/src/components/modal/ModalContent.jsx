import { useRef } from "react"
import "./ModalContent.css"
import { gql, useMutation } from "@apollo/client"
import { useEffect } from "react"
import { client } from "../../apollo"
import useMe from "../../hooks/useMe"

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

const HIDE_PHOTO_FROM_REC = gql`
  mutation hidePhotoFromRec($id: Int!) {
    hidePhotoFromRec(photoId: $id) {
      ok
      error
    }
  }
`

const ModalContent = ({ id, isMine, closeModal, openReportPopup }) => {
  const modalRef = useRef()
  const { data: userData } = useMe()
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
    onCompleted: () => {
      cache.reset()
    },
  })

  const [hidePhotoFromRec] = useMutation(HIDE_PHOTO_FROM_REC, {
    onCompleted: () => {
      cache.reset()
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
        <div>
          {userData.me.admin ? (
            <>
              <div
                className="Report"
                onClick={() => {
                  hidePhotoFromRec({ variables: { id } })
                }}
              >
                {"Скрыть из рекомендаций"}
              </div>
              <div
                className="Delete"
                onClick={() => {
                  deletePhoto({ variables: { id } })
                }}
              >
                {"Удалить фото"}
              </div>
            </>
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
      )}
    </div>
  )
}

export default ModalContent
