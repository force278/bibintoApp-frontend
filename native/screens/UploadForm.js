import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import DismissKeyboard from "../components/DismissKeyboard";
import { gql, useMutation } from "@apollo/client";
import { FEED_PHOTO } from "../fragments";
import { ReactNativeFile } from "apollo-upload-client";

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`;

const Photo = styled.Image`
  height: 350px;
`;

const CaptionsContainer = styled.View`
  margin-top: 30px;
`;

const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;

const HeaderRightText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.blue};
  margin-right: 7px;
`;

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ...FeedPhoto
    }
  }
  ${FEED_PHOTO}
`;

export default function UploadForm({ navigation, route }) {
  const { register, handleSubmit, setValue } = useForm();

  const updateUploadPhoto = (cache, result) => {
    const {
      data: { uploadPhoto },
    } = result;

    if (uploadPhoto.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeFeed(prev) {
            return [...prev, uploadPhoto];
          },
        },
      });
      navigation.navigate("Tabs");
    }
  };

  const [uploadPhotoMutation, { loading, error }] = useMutation(
    UPLOAD_PHOTO_MUTATION,
    {
      update: updateUploadPhoto,
    }
  );

  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onSubmitValid)}>
      <HeaderRightText>Далее</HeaderRightText>
    </TouchableOpacity>
  );

  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  );

  useEffect(() => {
    register("caption");
  }, [register]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);

  const onSubmitValid = ({ caption }) => {
    const file = new ReactNativeFile({
      uri: route.params.file,
      type: "image/jpeg",
      name: "1.jpg",
    });
    uploadPhotoMutation({
      variables: {
        file,
        caption,
      },
    });
  };

  return (
    <DismissKeyboard>
      <Container>
        <Photo source={{ uri: route.params.file }} />
        <CaptionsContainer>
          <Caption
            returnKeyType="done"
            placeholder="Введите подпись к фото..."
            placeholderTextColor="rgba(0,0,0,0.5)"
            onChangeText={(text) => {
              setValue("caption", text);
            }}
            onSubmitEditing={handleSubmit(onSubmitValid)}
          />
        </CaptionsContainer>
      </Container>
    </DismissKeyboard>
  );
}
