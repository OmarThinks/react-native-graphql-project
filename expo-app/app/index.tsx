import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

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
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);

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
        onRefresh={refetch}
        refreshing={loading}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
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
        alignSelf: "stretch",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 16,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
          {product.name}
        </Text>
        <Text style={{ marginBottom: 8 }}>{product.description}</Text>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          ${product.price}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          //justifyContent: "center",
          //alignItems: "center",
          padding: 8,
          //marginLeft: 16,
          alignSelf: "flex-start",
          borderRadius: 4,
          borderColor: "#000000",
          borderWidth: 1,
        }}
      >
        <FontAwesome6 name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
};
