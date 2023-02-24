import React, { useEffect } from "react";
import { FlatList, KeyboardAvoidingView, View } from "react-native";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { DIALOG_FRAGMENT } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import useMe from "../hooks/useMe";
import { Ionicons } from "@expo/vector-icons";

const SEE_DIALOG_QUERY = gql`
  query seeDialog($id: Int!) {
    seeDialog(id: $id) {
      ...DialogParts
      messages {
        id
        payload
        user {
          id
          username
          avatar
        }
        read
      }
    }
  }
  ${DIALOG_FRAGMENT}
`;

const DIALOG_UPDATES_SUBSCRIPTION = gql`
  subscription dialogUpdates($id: Int!) {
    dialogUpdates(id: $id) {
      id
      payload
      user {
        id
        username
        avatar
      }
      read
    }
  }
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $dialogId: Int, $userId: Int) {
    sendMessage(payload: $payload, dialogId: $dialogId, userId: $userId) {
      ok
      error
      id
    }
  }
`;

const MessageContainer = styled.View`
  flex-direction: ${(props) => (props.outgoing ? "row-reverse" : "row")};
  align-items: center;
  padding: 0 10px;
`;
const Author = styled.View``;
const Avatar = styled.Image`
  width: 20px;
  height: 20px;
  border-radius: 10px;
`;
const Message = styled.Text`
  color: white;
  margin: 0 10px;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 5px 10px;
  border-radius: 10px;
  overflow: hidden;
  font-size: 16px;
`;
const TextInput = styled.TextInput`
  padding: 10px 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  width: 90%;
  border-radius: 999px;
  color: white;
  margin-right: 10px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 95%;
  margin-bottom: 50px;
  margin-top: 25px;
`;

const SendMessageBtn = styled.TouchableOpacity``;

export default function Dialog({ route, navigation }) {
  const { data: meData } = useMe();

  const { data, loading, subscribeToMore } = useQuery(SEE_DIALOG_QUERY, {
    variables: { id: route?.params?.id },
  });

  const client = useApolloClient();

  const updateQuery = (prevQuery, result) => {
    const {
      subscriptionData: {
        data: { dialogUpdates: message },
      },
    } = result;

    if (message.id) {
      const newMessage = client.cache.writeFragment({
        id: `Message:${message.id}`,
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              id
              avatar
              username
            }
            read
          }
        `,
        data: message,
      });
      client.cache.modify({
        id: `Dialog:${route?.params?.id}`,
        fields: {
          messages(prev) {
            const existingMessage = prev.find(
              (aMessage) => aMessage.__ref === newMessage.__ref
            );
            if (existingMessage) {
              return prev;
            } else {
              return [...prev, newMessage];
            }
          },
        },
      });
    }
  };

  useEffect(() => {
    if (data?.seeDialog) {
      subscribeToMore({
        document: DIALOG_UPDATES_SUBSCRIPTION,
        variables: { id: route?.params?.id },
        updateQuery,
      });
    }
  }, [data]);

  const onUpdate = (cache, result) => {
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result;
    if (meData && ok) {
      const { message } = getValues();
      setValue("message", "");
      const messageObj = {
        id,
        payload: message,
        user: {
          id: meData?.me?.id,
          username: meData?.me?.username,
          avatar: meData?.me?.avatar,
        },
        read: true,
        __typename: "Message",
      };
      const messageFragment = cache.writeFragment({
        id: `Message:${id}`,
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              id
              avatar
              username
            }
            read
          }
        `,
        data: messageObj,
      });
      cache.modify({
        id: `Dialog:${route?.params?.id}`,
        fields: {
          messages(prev) {
            return [...prev, messageFragment];
          },
        },
      });
    }
  };

  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
    SEND_MESSAGE_MUTATION,
    {
      update: onUpdate,
    }
  );

  const { handleSubmit, register, getValues, setValue, watch } = useForm();

  useEffect(() => {
    navigation.setOptions({
      title: route?.params?.talkingTo?.username,
    });
  });

  useEffect(() => {
    register("message", { required: true });
  }, [register]);

  const onSubmitValid = ({ message }) => {
    if (!sendingMessage) {
      sendMessageMutation({
        variables: {
          payload: message,
          dialogId: route?.params?.id,
        },
      });
    }
  };

  const renderItem = ({ item: message }) => (
    <MessageContainer
      outgoing={message.user.username !== route?.params?.talkingTo?.username}
    >
      <Author>
        <Avatar source={{ uri: message?.user?.avatar }} />
      </Author>
      <Message>{message.payload}</Message>
    </MessageContainer>
  );

  const messages = [...(data?.seeDialog?.messages ?? [])];
  messages.reverse();

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: "black", flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          data={messages}
          keyExtractor={(message) => "" + message.id}
          renderItem={renderItem}
          style={{ width: "100%", marginVertical: 30 }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          showsVerticalScrollIndicator={false}
          inverted={true}
        />
        <InputContainer>
          <TextInput
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            placeholder="Введите текст сообщения"
            returnKeyType="send"
            returnKeyLabel="Отправить"
            onChangeText={(message) => setValue("message", message)}
            onSubmitEditing={handleSubmit(onSubmitValid)}
            value={watch("message")}
          />
          <SendMessageBtn
            onPress={handleSubmit(onSubmitValid)}
            disabled={!Boolean(watch("message"))}
          >
            <Ionicons
              name="send"
              size={22}
              color={
                !Boolean(watch("message")) ? "rgba(255,255,255,0.5)" : "white"
              }
            />
          </SendMessageBtn>
        </InputContainer>
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}
