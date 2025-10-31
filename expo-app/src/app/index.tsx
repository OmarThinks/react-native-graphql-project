import { Text, View, Image, ScrollView } from "react-native";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

export default function Index() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;
  return (
    <ScrollView>
      {data.locations.map(({ id, name, description, photo }) => (
        <View key={id}>
          <Text>{name}</Text>
          <Image
            //width="400"
            //height="250"
            alt="location-reference"
            src={`${photo}`}
            width={400}
            height={250}
          />
          <Text>About this location:</Text>
          <Text>{description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
