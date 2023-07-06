import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  background-color: rgba(196, 196, 196, 0.1) !important;
  color: #5A686C;
  // border: 0.5px solid
  //   ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-bottom: 13px;
  margin-top: 13px;
  box-sizing: border-box;
  border-radius: 5px;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

export default Input;
