import styled from "styled-components"
import defaultAvatar from "../assets/img/editProfile/defaultAvatar.png"

const SAvatar = styled.div`
  width: ${(props) => (props.lg ? "52px" : "25px")};
  height: ${(props) => (props.lg ? "52px" : "25px")};
  overflow: hidden;
  border-radius: 50%;
  background-color: #2c2c2c;
`

const Img = styled.img`
  max-width: 100%;
`

function Avatar({ url = "", lg }) {
  return (
    <SAvatar lg={lg}>
      {url !== "" ? <Img src={url} /> : <Img src={defaultAvatar} />}
    </SAvatar>
  )
}

export default Avatar
