import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { getChefByID, getUnitByID } from "../../../../backend/api";
import Card from "../../../../components/card";
import { Button } from "react-native";
import MainLink from "../../../../components/link";
import MainCard from "../../../../components/maincard";

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
    // <View style={{ flex: 1 }}>
    //   <Card title={`Enhetschef: ${chef.name}`}>
    //     <Text>E-post: {chef.email}</Text>
    //     <Text>Telefon {chef.phone}</Text>
    //     <MainLink title={"Alla enheter"} url={"/units"} />
    //     <Link href={"/units"}>Alla enheter</Link>
    //     <Link href={"/keys"}>Nyckel hantering</Link>

    //     {/* <Button
    //       title="Tillbaka"
    //       onPress={() => router.navigate("/units")}></Button> */}
    //   </Card>
    // </View>
    <MainCard
      title={"Enhetschef"}
      url={"/units"}
      name={chef.name}
      email={chef.email}
      phone={chef.phone}
    />
  );
}

const styles = StyleSheet.create({
  // cardContainer: {
  //   marginTop: 10,
  //   backgroundColor: "#ded",
  //   borderRadius: 10,
  //   marginVertical: 3,
  //   width: "90%",
  //   maxWidth: 350,
  //   minHeight: "auto",
  //   alignSelf: "center",
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 5 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 8,
  //   elevation: 5,
  //   padding: 20,
  //   marginBottom: 20,
  // },
  // text: {
  //   marginBottom: 2,
  //   fontSize: 15,
  //   color: "blue",
  //   padding: 5,
  //   border: 1,
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#000",
  //   paddingBottom: 5,
  //   cursor: "pointer",
  //   marginBottom: 30,
  // },
});

export default ChefScreen;
