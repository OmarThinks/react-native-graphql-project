import { Stack } from "expo-router";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: "http://10.0.2.2:3000/graphql" }),
  cache: new InMemoryCache(),
});

export default function RootLayout() {
  return (
    <ApolloProvider client={apolloClient}>
      <Stack />
    </ApolloProvider>
  );
}

export { apolloClient };
