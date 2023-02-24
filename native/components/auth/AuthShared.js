import React from "react";
import styled from "styled-components/native";

export const TextInput = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.3);
  padding: 15px 7px;
  color: white;
  border-radius: 5px;
  width: 100%;
  margin-bottom: ${(props) => (props.lastOne ? "15" : "8")}px;
`;
