import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { getChefByID, getUnitByID } from "../../../../../backend/api";
import Card from "../../../../../components/card";
import { Button } from "react-native";
import MainLink from "../../../../../components/link";
import MainCard from "../../../../../components/maincard";
import BackButton from "../../../../../components/backButton";

function ChefScreen() {
  const [chef, setChef] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { chefId, unitId } = useLocalSearchParams();
  console.log("chefID", chefId);
  console.log("Current URL:", router.asPath); // Loggar nuvarande URL för att kolla att query-parametern finns

  const fetchChef = async () => {
    try {
      const chefData = await getChefByID(unitId, chefId);
      if (!chefData) {
        throw new Error("Chef data not found");
      }
      console.log("Chef data in chef component", chefData);

      setChef(chefData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chefId) {
      fetchChef();
    }
  }, [chefId]);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color="#4dd" />
      </View>
    );

  if (error)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error.message}</Text>
      </View>
    );
  return (
    <MainCard
      title={"Chef"}
      name={chef.name}
      email={chef.email}
      phone={chef.phone}>
      <BackButton onPress={() => router.navigate("/units")} />
    </MainCard>
  );
}

export default ChefScreen;
