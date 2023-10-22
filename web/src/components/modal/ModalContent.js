import "./ModalContent.css"
import { gql, useMutation } from "@apollo/client"
const DELETE_PHOTO = gql`
  mutation deletePhoto($id: Int!) {
    deletePhoto(id: $id) {
      id
    }
  }
`

const ModalContent = ({ id, isMine }) => {
  const [deletePhoto] = useMutation(DELETE_PHOTO, {
    variables: { id },
  })
  return (
    <div>
      {isMine ? (
        <div className="Delete" onClick={deletePhoto}>
          {"Удалить фото"}
        </div>
      ) : (
        <div className="Report">{"Пожаловаться"}</div>
      )}
    </div>
  )
}

export default ModalContent
