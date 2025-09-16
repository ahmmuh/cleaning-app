import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import MainCard from "../../../../../components/maincard";
import { getUnitByID } from "../../../../../backend/api";
import { useEffect, useState } from "react";

function SpecialistScreen() {
  const router = useRouter();
  const { unitId } = useLocalSearchParams();

  const [specialister, setSpecialister] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSpecialister = async () => {
    if (!unitId) return;

    try {
      const data = await getUnitByID(unitId);
      if (!data?.users) {
        console.warn("users saknas i enhetens data", data);
        setSpecialister([]);
        setLoading(false);
        return;
      }

      const filteredSpecialister = data?.users?.filter((user) =>
        user.role?.includes("Specialare")
      );

      setSpecialister(filteredSpecialister);
      setLoading(false);
    } catch (err) {
      console.error("Fel vid hämtning av specialister:", err.message);
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialister();
  }, [unitId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Laddar specialister...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error.message}</Text>
      </View>
    );
  }

  if (!specialister || specialister.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 18, color: "gray" }}>Inga specialare</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {specialister.map((specialist) => (
        <MainCard
          key={specialist._id}
          url="/units"
          name={specialist.name}
          email={specialist.email}
          phone={specialist.phone}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SpecialistScreen;

// import { Link, useLocalSearchParams, useRouter } from "expo-router";
// import { Text, View, StyleSheet } from "react-native";
// import MainCard from "../../../../../components/maincard";
// import { getUnitByID } from "../../../../../backend/api";
// import { useEffect, useState } from "react";
// import BackButton from "../../../../../components/backButton";

// function SpecialistScreen() {
//   const router = useRouter();
//   const { unitId } = useLocalSearchParams();

//   const [specialister, setSpecialister] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchSpecialister = async () => {
//     try {
//       const specialistData = await getUnitByID(unitId);
//       if (!specialistData.specialister) {
//         console.log("Specialister hittades inte", specialistData.specialister);
//       }
//       console.log(
//         "Specialister hittades i Specialist screen ",
//         specialistData.specialister
//       );
//       setSpecialister(specialistData.specialister);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error", error.message);
//       setError(error);
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={{ flex: 1 }}>
//         <Text>Loading ....</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text style={{ color: "red" }}>{error.message}</Text>
//       </View>
//     );
//   }

//   useEffect(() => {
//     fetchSpecialister();
//   }, [unitId]);
//   return (
//     <>
//       {specialister && specialister.length > 0 ? (
//         specialister.map((specialist) => (
//           <MainCard
//             key={specialist._id}
//             url={"/units"}
//             title={specialist.name}
//             name={specialist.name}
//             email={specialist.email}
//             phone={specialist.phone}>
//             {/* <BackButton onPress={() => router.navigate("/units")} /> */}
//           </MainCard>
//         ))
//       ) : (
//         <View
//           style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//           }}>
//           <Text style={{ fontSize: 20, color: "green" }}>
//             Inga specialister
//           </Text>
//           {/* <BackButton onPress={() => router.navigate("/units")} /> */}
//         </View>
//       )}
//     </>
//   );
// }

// export default SpecialistScreen;
