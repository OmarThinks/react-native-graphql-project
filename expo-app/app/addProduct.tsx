import { View, Text } from "react-native";
import React from "react";

const addProduct = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        alignSelf: "stretch",
        padding: 16,
      }}
    >
      <Text style={{ fontSize: 32 }}>Add Product:</Text>
    </View>
  );
};

export default addProduct;
