import PageTitle from "../components/PageTitle";
import styled from "styled-components";
import { BaseBox } from "../components/shared";


const SFormBox = styled(BaseBox)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 35px 40px 25px 40px;
  margin-bottom: 15px;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    width: 100%;
  }
`;

const Button = styled.button`
  margin-top: 10px;
`;

function uploadImage() {
}


function LoadPhoto() {
  
    return (
      <>
        <PageTitle title="Загрузка фото" />
        <SFormBox>
          <input type="file" accept="image/jpeg"/>
          <Button  onClick="uploadImage">Загрузить фото</Button >
        </SFormBox>
      </>
    );
  }
export default LoadPhoto;