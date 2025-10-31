import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";

const gqlClient = new ApolloClient({
  link: new HttpLink({ uri: "https://flyby-router-demo.herokuapp.com/" }),
  cache: new InMemoryCache(),
});

gqlClient
  .query({
    query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
  })
  .then((result) => console.log(result));

export { gqlClient };
