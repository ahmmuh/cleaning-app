import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import MainCard from "../../../../../components/maincard";
import { getUnitByID } from "../../../../../backend/api";
import { useEffect, useState } from "react";
import BackButton from "../../../../../components/backButton";

function SpecialistScreen() {
  const router = useRouter();
  const { unitId } = useLocalSearchParams();

  const [specialister, setSpecialister] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSpecialister = async () => {
    try {
      const specialistData = await getUnitByID(unitId);
      if (!specialistData.specialister) {
        console.log("Specialister hittades inte", specialistData.specialister);
      }
      console.log(
        "Specialister hittades i Specialist screen ",
        specialistData.specialister
      );
      setSpecialister(specialistData.specialister);
      setLoading(false);
    } catch (error) {
      console.error("Error", error.message);
      setError(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Loading ....</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>{error.message}</Text>
      </View>
    );
  }

  useEffect(() => {
    fetchSpecialister();
  }, [unitId]);
  return (
    <>
      {specialister && specialister.length > 0 ? (
        specialister.map((specialist) => (
          <MainCard
            key={specialist._id}
            url={"/units"}
            title={specialist.name}
            name={specialist.name}
            email={specialist.email}
            phone={specialist.phone}>
            {/* <BackButton onPress={() => router.navigate("/units")} /> */}
          </MainCard>
        ))
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text style={{ fontSize: 20, color: "green" }}>
            Inga specialister
          </Text>
          {/* <BackButton onPress={() => router.navigate("/units")} /> */}
        </View>
      )}
    </>
  );
}



export default SpecialistScreen;
