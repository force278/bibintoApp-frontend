import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
`;
const Column = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 5px 15px;
`;
const FollowBtn = styled.TouchableOpacity`
  background-color: ${colors.blue};
  padding: 5px 10px;
  border-radius: 4px;
`;
const FollowBtnText = styled.Text`
  color: white;
  font-weight: 600;
`;
const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;
const Username = styled.Text`
  color: white;
  font-weight: 600;
`;

export default function UserRow({ id, username, avatar, isMe, isFollowing }) {
  const navigation = useNavigation();
  return (
    <Container>
      <Column
        onPress={() => {
          navigation.navigate("Profile", { username, id });
        }}
      >
        <Avatar source={{ uri: avatar }} />
        <Username>{username}</Username>
      </Column>
      {!isMe ? (
        <FollowBtn>
          <FollowBtnText>
            {isFollowing ? "Отписаться" : "Подписаться"}
          </FollowBtnText>
        </FollowBtn>
      ) : null}
    </Container>
  );
}
