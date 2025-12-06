import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { Stack } from "expo-router";
import ToastManager from "toastify-react-native";

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: "http://10.0.2.2:3000/graphql" }),
  cache: new InMemoryCache(),
});

export default function RootLayout() {
  return (
    <ApolloProvider client={apolloClient}>
      <Stack />
      <ToastManager />
    </ApolloProvider>
  );
}

export { apolloClient };
