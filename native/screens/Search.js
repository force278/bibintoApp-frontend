import { useLazyQuery, gql } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import DismissKeyboard from "../components/DismissKeyboard";
import styled from "styled-components/native";

const SEARCH_PHOTOS_QUERY = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

const MessageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const MessageText = styled.Text`
  color: white;
  margin-top: 15px;
  font-weight: 600;
`;

const Input = styled.TextInput`
  background-color: white;
  width: ${(props) => props.width / 1.5}px;
  color: black;
  padding: 5px 10px;
  border-radius: 7px;
`;

export default function Search({ navigation }) {
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const { register, setValue, handleSubmit } = useForm();
  const [searchFn, { data, loading, called }] =
    useLazyQuery(SEARCH_PHOTOS_QUERY);
  const onSubmitValid = ({ keyword }) => {
    searchFn({ variables: { keyword } });
  };
  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor="rgba(0,0,0,0.8)"
      placeholder="Поиск по фото"
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="search"
      returnKeyLabel="Поиск"
      onChangeText={(text) => {
        setValue("keyword", text);
      }}
      onSubmitEditing={handleSubmit(onSubmitValid)}
    />
  );

  useEffect(() => {
    register("keyword", { required: true, minLength: 3 });
    navigation.setOptions({ headerTitle: SearchBox });
  }, [register]);

  const renderPhotos = ({ item: photo }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Photo", { photoId: photo.id });
      }}
    >
      <Image
        source={{ uri: photo.file }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  );

  return (
    <DismissKeyboard>
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
        }}
      >
        {loading && (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Загрузка...</MessageText>
          </MessageContainer>
        )}
        {!called && (
          <MessageContainer>
            <MessageText>Поиск по хештегам</MessageText>
          </MessageContainer>
        )}
        {typeof data?.searchPhotos !== "undefined" &&
        data?.searchPhotos?.length === 0 ? (
          <MessageContainer>
            <MessageText>Фотографий не найдено</MessageText>
          </MessageContainer>
        ) : (
          <FlatList
            numColumns={numColumns}
            data={data?.searchPhotos}
            renderItem={renderPhotos}
            keyExtractor={(photo) => "" + photo.id}
            style={{ width: "100%" }}
          />
        )}
      </View>
    </DismissKeyboard>
  );
}
