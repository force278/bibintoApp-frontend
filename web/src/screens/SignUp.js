import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import routes from "../routes";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import { BoldLink } from "../components/shared";

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Subtitle = styled(BoldLink)`
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
`;




const Input = styled.input`
  width: 100%;
  padding: 8px 7px;
  background-color: #fafafa;
  border: 0.5px solid ${(props) => props.theme.borderColor};
  margin-top: 5px;
  box-sizing: border-box;
  border-radius: 5px;
  &::placeholder {
    font-size: 12px;
  }
`;


function SignUp() {
  return (
    <AuthLayout>
        <FormBox>
          <HeaderContainer>
            <img src="bibinto.svg" width="180" height="60" alt="Бибинто"></img>
            <Subtitle>
                Зарегистрируйтесь, чтобы получать оценки и оценивать людей.
            </Subtitle>
          </HeaderContainer>
          <form>
            <Input type="email" placeholder="Эл. адрес" />
            <Input type="text" placeholder="Имя и фамилия" />
            <Input type="text" placeholder="Имя пользователя" />
            <Input type="password" placeholder="Пароль" />
            <Button type="submit" value="Регистрация" />
          </form>
        </FormBox>
        <BottomBox cta="Есть аккаунт? " link={routes.home} linkText={"Вход"}/>
      </AuthLayout>
  );
}
export default SignUp;
