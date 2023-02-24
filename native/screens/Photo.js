import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import { gql, useQuery } from "@apollo/client";
import { POST_FRAGMENT } from "../fragments";
import Photo from "../components/Photo";

const SEE_PHOTO_QUERY = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PostFragment
      caption
      user {
        id
        username
        avatar
      }
      isMine
      isLiked
    }
  }
  ${POST_FRAGMENT}
`;

export default function PhotoScreen({ route }) {
  const [refreshing, setRefreshing] = useState(false);

  const { data, loading, refetch } = useQuery(SEE_PHOTO_QUERY, {
    variables: { id: route?.params?.photoId },
  });

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        style={{ backgroundColor: "black" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        contentContainerStyle={{
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Photo {...data?.seePhoto} />
      </ScrollView>
    </ScreenLayout>
  );
}
