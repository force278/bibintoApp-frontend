import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { colors } from "../colors";
import { AuthButton } from "../components/auth/AuthButton";
import { AuthLayout } from "../components/auth/AuthLayout";

const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 20px;
`;

export default function Welcome({ navigation }) {
  const goToCreateAccount = () => {
    navigation.navigate("CreateAccount");
  };

  const goToLogin = () => {
    navigation.navigate("LogIn");
  };

  return (
    <AuthLayout>
      <AuthButton
        text="Создать аккаунт"
        disabled={false}
        onPress={goToCreateAccount}
      />

      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>Войти в аккаунт</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
}
