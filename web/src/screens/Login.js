import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import routes from "../routes";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import Input from "../components/auth/Input";


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
