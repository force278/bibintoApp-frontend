import { Header } from "./Header"
import styled from "styled-components"

const Content = styled.div`
  margin: 0 auto;
  padding-top: 71px;
  @media (max-width: 768px) {
    padding-top: 0;
  }
  max-width: 930px;
  width: 100%;
`

function Layout({ children }) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  )
}

export default Layout