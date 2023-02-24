import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import useMe from "../hooks/useMe";
import { gql, useQuery } from "@apollo/client";
import { DIALOG_FRAGMENT } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";

import DialogItem from "../components/dialogs/DialogItem";

const SEE_DIALOGS_QUERY = gql`
  query seeDialogs {
    seeDialogs {
      ...DialogParts
    }
  }
  ${DIALOG_FRAGMENT}
`;

export default function Dialogs({ navigation }) {
  const { data: meData } = useMe();

  const { data, loading } = useQuery(SEE_DIALOGS_QUERY);

  useEffect(() => {
    navigation.setOptions({ title: meData?.me?.username });
  }, [meData?.me?.username]);

  const renderItem = ({ item: dialog }) => <DialogItem {...dialog} />;

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        data={data?.seeDialogs}
        keyExtractor={(dialog) => "" + dialog.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}
