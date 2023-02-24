import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";
import useMe from "../../hooks/useMe";

const DialogContainer = styled.TouchableOpacity`
  padding: 15px 10px;
  background-color: black;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const UnreadText = styled.Text`
  color: white;
  margin-top: 10px;
  font-weight: 500;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 20px;
`;

const Username = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: white;
`;

const Data = styled.View``;

const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

const UnreadDot = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: ${colors.blue};
`;

export default function DialogItem({ id, users, unreadTotal }) {
  const { data: meData } = useMe();

  const navigation = useNavigation();

  const talkingTo = users.find(
    (user) => user.username !== meData?.me?.username
  );

  return (
    <DialogContainer
      onPress={() => navigation.navigate("Dialog", { id, talkingTo })}
    >
      <Column>
        <Avatar source={{ uri: talkingTo.avatar }} />
        <Data>
          <Username>{talkingTo.username}</Username>
          {unreadTotal > 0 && (
            <UnreadText>
              {unreadTotal === 1
                ? "1 непрочитанное сообщение"
                : `${unreadTotal} непрочитанных сообщений`}
            </UnreadText>
          )}
        </Data>
      </Column>
      <Column>{unreadTotal > 0 && <UnreadDot />}</Column>
    </DialogContainer>
  );
}
