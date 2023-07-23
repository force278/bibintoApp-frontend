import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  width: 100%;
  border-radius: 15px;
  fill: #FFF;
  filter: drop-shadow(0px 21.00374412536621px 31.505615234375px rgba(147, 153, 176, 0.15));
`;

export const BoldLink = styled.span`
  color: rgb(142, 142, 142);
  font-weight: 600;
`;

export const BoldText = styled.span`
  font-weight: 600;
`;
