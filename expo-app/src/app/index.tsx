import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { createContext, useContext } from "react";
import {
  Alert,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

const GET_PRODUCTS_QUERY = gql`
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

function Index() {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS_QUERY);
  const [deleteProductGQL] = useMutation(deleteProductMutation);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const deleteProduct = (id: number) => {
    deleteProductGQL({ variables: { id } }).then((result) => {
      if (result.data.removeProduct.success) {
        refetch();
        Toast.success("Product deleted successfully");
      } else {
        Alert.alert(
          "Error deleting product",
          result.data.removeProduct.message
        );
      }
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignSelf: "stretch",
        //padding: 16,
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
          contentContainerStyle={{ padding: 16 }}
        />
      </ProductListContext.Provider>
      <View
        style={{ alignSelf: "stretch", paddingHorizontal: 16, paddingTop: 8 }}
      >
        <Button
          title="Add Product"
          onPress={() => router.push("/addProduct")}
        />
      </View>
    </SafeAreaView>
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

export default Index;
export { GET_PRODUCTS_QUERY };
