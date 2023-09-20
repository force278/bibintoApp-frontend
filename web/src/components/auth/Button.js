import styled from "styled-components";

const Button = styled.input`
  width: 100%;
  // background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 3px 0;
  font-size: 18px;
  font-family: Roboto, sans-serif;
  border: none;
  font-weight: 500;
  background: linear-gradient(90deg, #6CF2FE, #2936FF, #FE2DB7);
  border-radius: 5px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  &:internal-autofill-selected{
    background-color: red !important;
  }
`;

export default Button;

export const DefaultButton = styled.button`
    width: 100%;
    border: 3px solid #EFEFEF;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px
`
