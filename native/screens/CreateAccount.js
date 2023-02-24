import React, { useEffect, useRef } from "react";
import { TextInput } from "../components/auth/AuthShared";
import { AuthButton } from "../components/auth/AuthButton";
import { AuthLayout } from "../components/auth/AuthLayout";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

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

export default function CreateAccount({ navigation }) {
  const lastNameRef = useRef();
  const loginRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const { register, handleSubmit, setValue, getValues, watch } = useForm();

  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      const { username, password } = getValues();
      navigation.navigate("LogIn", { username, password });
    }
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  useEffect(() => {
    register("firstName", { required: true });
    register("lastName", { required: true });
    register("username", { required: true });
    register("email", { required: true });
    register("password", { required: true });
  }, [register]);

  const onNext = (nextRef) => {
    nextRef?.current?.focus();
  };

  const onSubmitValid = (data) => {
    if (!loading) {
      createAccount({ variables: { ...data } });
    }
  };

  return (
    <AuthLayout>
      <TextInput
        placeholder="Имя"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        returnKeyType="next"
        onSubmitEditing={() => {
          onNext(lastNameRef);
        }}
        onChangeText={(text) => {
          setValue("firstName", text);
        }}
      />
      <TextInput
        ref={lastNameRef}
        placeholder="Фамилия"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        returnKeyType="next"
        onSubmitEditing={() => {
          onNext(loginRef);
        }}
        onChangeText={(text) => {
          setValue("lastName", text);
        }}
      />
      <TextInput
        ref={loginRef}
        placeholder="Логин"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => {
          onNext(emailRef);
        }}
        onChangeText={(text) => {
          setValue("username", text);
        }}
      />
      <TextInput
        ref={emailRef}
        placeholder="Email"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        returnKeyType="next"
        keyboardType="email-address"
        autoCapitalize="none"
        onSubmitEditing={() => {
          onNext(passwordRef);
        }}
        onChangeText={(text) => {
          setValue("email", text);
        }}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Пароль"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        returnKeyType="done"
        secureTextEntry
        lastOne
        onChangeText={(text) => {
          setValue("password", text);
        }}
        onSubmitEditing={handleSubmit(onSubmitValid)}
      />
      <AuthButton
        text="Создать аккаунт"
        disabled={
          !watch("firstName") ||
          !watch("lastName") ||
          !watch("username") ||
          !watch("email") ||
          !watch("password")
        }
        loading={loading}
        onPress={handleSubmit(onSubmitValid)}
      />
    </AuthLayout>
  );
}
