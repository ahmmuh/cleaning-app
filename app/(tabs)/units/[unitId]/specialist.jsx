import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import MainCard from "../../../../components/maincard";

function SpecialistScreen() {
  const { unitId } = useLocalSearchParams();
  return (
    <MainCard
      url={"/units"}
      title={"Specialist"}
      name={"Ahmed Mukhtar"}
      email={"mukhtar1100@hotmail.com"}
      phone={"333444"}
    />
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   card: {
//     backgroundColor: "#ded",
//     padding: 30,
//     height: "50%",
//     margin: 20,
//     borderRadius: 10,
//     shadowColor: "#ded",
//     shadowOffset: { width: 0, height: 5 },
//     shadowRadius: 7,
//   },
//   link: {
//     marginBottom: 2,
//     fontSize: 15,
//     color: "blue",
//     padding: 5,
//     border: 1,
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     paddingBottom: 20,
//     cursor: "pointer",
//   },
// });

export default SpecialistScreen;
