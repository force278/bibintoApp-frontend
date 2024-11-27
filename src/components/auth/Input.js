import styled from "styled-components"

const Input = styled.input`
  width: 100%;
  padding: 12.5px 16px;
  background-color: #f2f2f7 !important;
  border: none;
  // border: 0.5px solid
  //   ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 14px;
  box-sizing: border-box;
  border-radius: 5px;
  &:first-child {
    margin-top: 0;
  }
  &::placeholder {
    color: #aeaeb2;
    font-size: 13px;
  }
  &:focus {
    outline: none;
    border-color: rgb(38, 38, 38);
  }
  @media (max-width: 767px) {
  }
`

export default Input
