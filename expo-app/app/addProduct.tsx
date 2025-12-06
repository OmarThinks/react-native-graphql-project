import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { GET_PRODUCTS_QUERY } from "./index";
import { useMutation, useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { router } from "expo-router";
import { Toast } from "toastify-react-native";

const ADD_PRODUCT_MUTATION = gql`
  mutation AddProduct($name: String!, $description: String!, $price: Float!) {
    createProduct(
      createProductInput: {
        name: $name
        description: $description
        price: $price
      }
    ) {
      id
      name
      description
      price
    }
  }
`;

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const { refetch } = useQuery(GET_PRODUCTS_QUERY);
  const [addProductMutation] = useMutation(ADD_PRODUCT_MUTATION);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        //alignItems: "flex-start",
        alignSelf: "stretch",
        padding: 16,
      }}
    >
      <Text style={{ fontSize: 32 }}>Add Product:</Text>

      <Text>Name:</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          alignSelf: "stretch",
          marginBottom: 12,
        }}
        onChangeText={setName}
      />

      <Text>Description:</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          alignSelf: "stretch",
          marginBottom: 12,
        }}
        onChangeText={setDescription}
      />

      <Text>Price:</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          alignSelf: "stretch",
          marginBottom: 12,
        }}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      <View style={{ flex: 1 }} />
      <Button
        title="Save Product"
        onPress={() => {
          addProductMutation({
            variables: {
              name,
              description,
              price: parseFloat(price),
            },
          })
            .then(() => {
              Toast.success("Product added successfully!");
              refetch();
              router.back();
            })
            .catch((error) => {
              Toast.success(`Error adding product: ${error.message}`);
            });
        }}
      />
    </View>
  );
};

export default AddProduct;
