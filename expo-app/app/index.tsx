import { Text, View } from "react-native";
import { apolloClient } from "./_layout";
import { gql } from "@apollo/client";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        onPress={() => {
          apolloClient
            .query({
              query: gql`
                query GetProducts {
                  products {
                    id
                    name
                    description
                    price
                  }
                }
              `,
            })
            .then((result) => console.log(JSON.stringify(result)));
        }}
      >
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}
