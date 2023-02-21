import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import routes from "../routes";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import Input from "../components/auth/Input";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";



function Login() {
const { register, handleSubmit, formState, setError } = useForm({ mode: "onChange" });
  const onSubmitValid = (data) => {
    //console.log(data);
  };

return (
    <AuthLayout>
       <Helmet>
        <title>Вход в аккаунт Бибинто</title>
      </Helmet>
        <FormBox>
          <div>
            <img src="bibinto.svg" width="180" height="60" alt="Бибинто"></img>
          </div>
          <form onSubmit={handleSubmit(onSubmitValid)}>
            <Input {...register('username', {required: "Имя пользователя обязательно для заполнения"})} type="text" placeholder="Имя пользователя" hasError={Boolean(formState.errors?.username?.message)} />
            <FormError message={formState.errors?.username?.message} />
            <Input {...register('password', {required: "Пароль обязателен для заполнения"})} type="password" placeholder="Пароль" hasError={Boolean(formState.errors?.password?.message)}/>
            <FormError message={formState.errors?.password?.message} />
            <Button type="submit" value="Войти" disabled={!formState.isValid} />
          </form>
        </FormBox>
        <BottomBox cta="У вас ещё нет аккаунта? " link={routes.signUp} linkText={"Зарегистрироваться"}/>
      </AuthLayout>
  );
}
export default Login;
