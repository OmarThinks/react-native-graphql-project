import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { createContext, use, Provider, useContext } from "react";

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

const deleteProductMutation = gql`
  mutation DeleteProduct($id: Int!) {
    removeProduct(id: $id) {
      success
      message
    }
  }
`;

const ProductListContext = createContext<{
  deleteProduct: (id: number) => void;
} | null>(null);

export default function Index() {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);
  const [deleteProductGQL] = useMutation(deleteProductMutation);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const deleteProduct = (id: number) => {
    deleteProductGQL({ variables: { id } }).then((result) => {
      if (result.data.removeProduct.success) {
        refetch();
      } else {
        Alert.alert(
          "Error deleting product",
          result.data.removeProduct.message
        );
      }
    });
  };

  return (
    <View
      style={{
        flex: 1,
        alignSelf: "stretch",
        padding: 16,
      }}
    >
      <ProductListContext.Provider value={{ deleteProduct }}>
        <FlatList
          data={data.products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard product={item} />}
          onRefresh={refetch}
          refreshing={loading}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />
      </ProductListContext.Provider>
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
  const { deleteProduct } = useContext(ProductListContext)!;

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
        onPress={() =>
          Alert.alert(
            "Delete Product",
            "Are you sure that you want to delete this product?",
            [
              { text: "Cancel" },
              { text: "Delete", onPress: () => deleteProduct(product.id) },
            ]
          )
        }
      >
        <FontAwesome6 name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
};
