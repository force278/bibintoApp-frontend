import { useReactiveVar } from "@apollo/client";
import { faMoon, faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../apollo";

const Container = styled.div`
   overflow: hidden; 
`;

const Wrapper = styled.div`
   display: flex;
   flex-wrap: wrap;
   margin-right: -0.75rem;
   min-width: 100%;
   justify-content: center;
   height: 100vh;
   align-items: center;
   margin-left: -0.75rem;
`;

const Footer = styled.header`
  display: none;
  margin-top: 20px;
`;

const DarkModeBtn = styled.span`
  cursor: pointer;
`;

function AuthLayout({children}) {
    const darkMode = useReactiveVar(darkModeVar);
    return (
        <Container>
            <Wrapper>{children}</Wrapper>
            <Footer>
                <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
                    <FontAwesomeIcon icon={darkMode ? faLightbulb : faMoon} size={"2x"}/>
                </DarkModeBtn>
            </Footer>
        </Container>
    );
}

export default AuthLayout;
