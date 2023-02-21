import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
  border-radius: 10px;
`;

export const BoldLink = styled.span`
  color: rgb(142, 142, 142);
  font-weight: 600
`;