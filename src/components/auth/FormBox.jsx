import styled from "styled-components"
import { BaseBox } from "../shared"

const SFormBox = styled(BaseBox)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 35px 20px 35px 20px;
  margin-bottom: 20px;
  // background: transparent;
  border-radius: 0;
  background: #fff;
  width: 100%;
  // max-width: 1000px;

  a {
    color: #1877f2;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    width: 100%;
  }
  @media (max-width: 767px) {
    max-width: 374px;
  }

  @media (min-width: 767px) {
    width: 1000px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 10px 0px;
    max-width: calc(100vw - 60px);
    margin: 100px 30px 50px 30px;
    padding: 70px;
    .formErrMesWrap,
    .inputLabel,
    .textLine,
    .formSubmitWrap,
    .formBtnForgotWrap,
    .passInputWrap,
    input {
      max-width: 412px;
    }
  }
  @media (max-height: 900px) {
    margin-top: 50px;
  }
`

function FormBox({ children }) {
  return <SFormBox>{children}</SFormBox>
}

export default FormBox
