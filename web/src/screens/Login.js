import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import routes from "../routes";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";





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


function Login() {
  return (
    <AuthLayout>
        <FormBox>
          <div>
            <img src="bibinto.svg" width="180" height="60" alt="Бибинто"></img>
          </div>
          <form>
            <Input type="text" placeholder="Имя пользователя" />
            <Input type="password" placeholder="Пароль" />
            <Button type="submit" value="Войти" />
          </form>
        </FormBox>
        <BottomBox cta="У вас ещё нет аккаунта? " link={routes.signUp} linkText={"Зарегистрироваться"}/>
      </AuthLayout>
  );
}
export default Login;
