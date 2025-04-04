import { Link, useRouter } from "expo-router";
import React from "react";
import { Button, Text } from "react-native";
import { View } from "react-native";

function Index() {
  const router = useRouter();
  const productId = 2000;

  const navigateToProduct = () => {
    router.push(`/products/${productId}`);
  };
  return (
    <View style={{ flex: 1 }}>
      <Text>Product List</Text>
      <Link href={"products/jacket"}>Jacket</Link>
      <Link href={"products/jeans"}>Jeans</Link>
      <Button title="Product Detail" onPress={navigateToProduct} />
    </View>
  );
}

export default Index;
