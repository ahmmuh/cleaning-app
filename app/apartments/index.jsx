import React, { useCallback } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import useFetchApartment from "../../hooks/useFetchApartment";
import { SafeAreaView } from "react-native-safe-area-context";
import ApartmentItem from "./apartmentItem";
import { useFocusEffect } from "expo-router";

function ApartmentList() {
  const { apartments, loading, error } = useFetchApartment();
  console.log("Apartments", apartments);

  //Loading
  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color="blue" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
        }}>
        <Text style={{ color: "white", fontSize: 19 }}>{error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <FlatList
          data={apartments}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => <ApartmentItem item={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

export default ApartmentList;
