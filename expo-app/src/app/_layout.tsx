import { Stack } from "expo-router";
import { ApolloProvider } from "@apollo/client/react";
import { gqlClient } from "../graphql/main";

export default function RootLayout() {
  return (
    <ApolloProvider client={gqlClient}>
      <Stack />
    </ApolloProvider>
  );
}
