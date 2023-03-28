

import "./ModalContent.css"
import { gql, useMutation } from "@apollo/client";
import { LogoutUser } from "../../apollo";
const DELETE_PHOTO = gql`
mutation deletePhoto($id: Int!){
    deletePhoto(id: $id) {
      id
    }
  }
`;


const ModalContent = ({head, content, id}) => {
    const [deletePhoto] = useMutation(DELETE_PHOTO, {
        variables: { id }
      })
    return (
        <div>
            <div className="modalHeader">
                {head}
            </div>
            <hr></hr>
            <div className="Content" onClick={id ? deletePhoto : LogoutUser}>
                {content}
            </div>
        </div>

    )
}

export default ModalContent;