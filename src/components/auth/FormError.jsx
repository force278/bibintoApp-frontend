import styled from "styled-components"

const SFormError = styled.span`
  color: red;
  font-weight: 400;
  position: absolute;
  font-size: 12px;
  margin: 0;
  text-align: center;
`

function FormError({ message, center = false }) {
  return (
    <div className={"formErrMesWrap " + (center ? "center" : "")}>
      {" "}
      {message === "" || !message ? null : (
        <SFormError>{message}</SFormError>
      )}{" "}
    </div>
  )
}

export default FormError
