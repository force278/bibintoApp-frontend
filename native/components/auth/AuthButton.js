import React from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { ActivityIndicator } from "react-native";

const Button = styled.TouchableOpacity`
  padding: 15px 10px;
  margin-top: 20px;
  background-color: ${colors.blue};
  border-radius: 5px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

export function AuthButton({ disabled, loading, text, onPress }) {
  return loading ? (
    <ActivityIndicator color="white" />
  ) : (
    <Button disabled={disabled} onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </Button>
  );
}
