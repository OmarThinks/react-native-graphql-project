import { Text, View } from "react-native";
import { apolloClient } from "./_layout";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { FlatList } from "react-native";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
    }
  }
`;

export default function Index() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View
      style={{
        flex: 1,
        alignSelf: "stretch",
        padding: 16,
      }}
    >
      <FlatList
        data={data.products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </View>
  );
}

type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
};

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        //width: "80%",
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
        {product.name}
      </Text>
      <Text style={{ marginBottom: 8 }}>{product.description}</Text>
      <Text style={{ fontSize: 16, fontWeight: "600" }}>${product.price}</Text>
    </View>
  );
};
