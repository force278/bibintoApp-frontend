import { useReactiveVar } from "@apollo/client";
import { faFileImage} from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import useMe from "../hooks/useMe";
import routes from "../routes";
import Avatar from "./Avatar";
import Modal from "./modal/Modal";
import { useState } from "react";
import ModalContent from "./modal/ModalContent";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
`;

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  color: white;
  padding: 5px 15px;
  border-radius: 4px;
  font-weight: 600;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useMe();
  const [modalActive, setModalActive] = useState(false);
  return (
    <SHeader>
      <Wrapper>
        <Column>
        <Link to={routes.home}>
          <div>
            <img src="../../bibinto.svg" width="100" alt="Бибинто"></img>
          </div>
          </Link>
        </Column>
      
        <Column>
          {isLoggedIn ? (
            <IconContainer>
              <Icon>
                <Link to={routes.home}>
                <img src="home.svg" alt="home"/>
                </Link>
              </Icon>
              <Icon>
                <Link to={routes.home}>
                <img src="Message.svg" alt="message"/>
                </Link>
              </Icon>
              <Icon>
                <Link to={routes.upload}>
                <img src="upload.svg" alt="upload"/>
                </Link>
              </Icon>
              <Icon>
                <Link to={routes.home}>
                <img src="like.svg" alt="like"/>
                </Link>
              </Icon>
              <Icon>
                <Link to={`/users/${data?.me?.username}`}>
                <img src="user.svg" alt="user"/>
                </Link>
              </Icon>
            </IconContainer>
          ) : (
            <Link href={routes.home}>
              <Button>Войти</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
}
export default Header;