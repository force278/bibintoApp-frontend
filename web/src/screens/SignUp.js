import styled from "styled-components";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import { BoldLink } from "../components/shared";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import FormError from "../components/auth/FormError";
import { Link, useHistory } from "react-router-dom";
import logoIcon from "../assets/img/bibinto.svg"

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Subtitle = styled(BoldLink)`
  margin-top: 20px;
  font-size: 16px;
  text-align: center;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SignUp() {
  const history = useHistory();

  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) return setError("result", { message: error });
    const { username, password } = getValues();
    history.push(routes.home, {
      message: "Пользователь зарегистрирован. Пожалуйста, войдите в аккаунт.",
      username,
      password,
    });
  };

  const { register, handleSubmit, formState, setError, getValues } = useForm({
    mode: "onBlur",
  });
  const [signUp, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data) => {
    if (loading) return;
    signUp({
      variables: {
        ...data,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Регистрация" />
      <FormBox>
        <HeaderContainer>
          <div>
            <img src={logoIcon} width="180" height="60" alt="логотип"></img>
          </div>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)} className="position-relative">
          <Input
            {...register("email", {
              required: "Email обязателен для заполнения",
            })}
            type="email"
            placeholder="Эл. адрес"
            hasError={Boolean(formState.errors?.email?.message)}
          />
          <FormError message={formState.errors?.email?.message} />
          <Input
            {...register("firstName", {
              required: "Имя обязательно для заполнения",
            })}
            type="text"
            placeholder="Имя"
            hasError={Boolean(formState.errors?.firstName?.message)}
          />
          <FormError message={formState.errors?.firstName?.message} />
          <Input
            {...register("lastName")}
            type="text"
            placeholder="Фамилия"
            hasError={Boolean(formState.errors?.lastName?.message)}
          />
          <FormError message={formState.errors?.lastName?.message} />
          <Input
            {...register("username", {
              required: "Имя пользователя обязательно для заполнения",
            })}
            type="text"
            placeholder="Имя пользователя"
            hasError={Boolean(formState.errors?.username?.message)}
          />
          <FormError message={formState.errors?.username?.message} />
          <Input
            {...register("password", {
              required: "Пароль обязателен для заполнения",
            })}
            type="password"
            placeholder="Пароль"
            hasError={Boolean(formState.errors?.password?.message)}
          />
          <FormError message={formState.errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Загрузка..." : "Зарегистрироваться"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={formState.errors?.result?.message} />
          <div className="textLineSignUP mt-4">или</div>
          <button className="mt-4 text-primary bg-transparent border-0 fw-bold">
            <Link to="/">Войти</Link>
          </button>
        </form>
      </FormBox>
      <div className="col-sm-12 mt-2">
        <div className="d-flex justify-content-center row">
          <span className="col-sm-12 col-lg-3 d-flex justify-content-center  me-2">Политика конфиденциальности</span>
          <span className="col-sm-12 col-lg-3 d-flex justify-content-center  me-2">Условия использования</span>
          <span className="col-sm-12 col-lg-3 d-flex justify-content-center  me-2">English</span>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <span>BIBINTO © 2023 </span>
        </div>
      </div>
    </AuthLayout>
  );
}
export default SignUp;
