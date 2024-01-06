import "./ModalContent.css"
import { gql, useMutation } from "@apollo/client"
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

const ModalContent = ({ id, isMine }) => {
  const [deletePhoto] = useMutation(DELETE_PHOTO, {
    variables: { id },
  })
  const [reportPhoto] = useMutation(REPORT_PHOTO, {
    variables: { photoId: id },
  })
  return (
    <div>
      {isMine ? (
        <div className="Delete" onClick={deletePhoto}>
          {"Удалить фото"}
        </div>
      ) : (
        <div className="Report" onClick={reportPhoto}>
          {"Пожаловаться"}
        </div>
      )}
    </div>
  )
}

export default ModalContent
