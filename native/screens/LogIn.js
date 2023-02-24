import { useMutation, gql } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar, logUserIn } from "../apollo";
import { AuthButton } from "../components/auth/AuthButton";
import { AuthLayout } from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const LOGIN_MUTATTION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

export default function LogIn({ route: { params } }) {
  const passwordRef = useRef();

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      username: params?.username,
      password: params?.password,
    },
  });

  useEffect(() => {
    register("username", { required: true });
    register("password", { required: true });
  }, [register]);

  const onCompleted = async (data) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await logUserIn(token);
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATTION, { onCompleted });

  const onNext = (nextRef) => {
    nextRef?.current?.focus();
  };

  const onSubmitValid = (data) => {
    if (!loading) {
      login({
        variables: {
          ...data,
        },
      });
    }
  };

  return (
    <AuthLayout>
      <TextInput
        value={watch("username")}
        placeholder="Логин"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => {
          onNext(passwordRef);
        }}
        onChangeText={(text) => {
          setValue("username", text);
        }}
      />
      <TextInput
        ref={passwordRef}
        value={watch("password")}
        placeholder="Пароль"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        secureTextEntry
        lastOne
        returnKeyType="done"
        onChangeText={(text) => {
          setValue("password", text);
        }}
        onSubmitEditing={handleSubmit(onSubmitValid)}
      />

      <AuthButton
        text="Войти в аккаунт"
        loading={loading}
        disabled={!watch("username") || !watch("password")}
        onPress={handleSubmit(onSubmitValid)}
      />
    </AuthLayout>
  );
}
