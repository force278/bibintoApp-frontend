import styled from "styled-components";
import { BaseBox } from "../shared";

const SFormBox = styled(BaseBox)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 35px 20px 35px 20px;
  margin-bottom: 20px;
   @media (min-width: 767px) {
    max-width: 374px;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    width: 100%;
  }
`;

function FormBox({ children }) {
  return <SFormBox>{children}</SFormBox>;
}

export default FormBox;
