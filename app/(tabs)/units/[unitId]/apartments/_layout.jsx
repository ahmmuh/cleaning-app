// // const { Stack } = require("expo-router");

// // const ApartmentLayout = () => {
// //   return (
// //     <Stack
// //       screenOptions={{
// //         headerShown: false,

// //         headerStyle: {
// //           backgroundColor: "#bff38c",
// //         },

// //         headerTitleStyle: "bold",
// //       }}>
// //       <Stack.Screen
// //         name="index"
// //         options={{
// //           headerTitle: "Flyttstäd",
// //           headerShown: true,
// //         }}
// //       />
// //     </Stack>
// //   );
// // };

// // export default ApartmentLayout;

// // import { Stack } from "expo-router";
// // import { StatusBar } from "expo-status-bar";
// // import React from "react";
// // import { Text, View } from "react-native";

// // const ApartmentLayout = () => {
// //   return (
// //     <>
// //       <StatusBar backgroundColor="#3e68abff" style="light" />

// //       <Stack
// //         screenOptions={{
// //           headerShown: false,
// //           headerStyle: {
// //             backgroundColor: "#3e68abff",
// //             height: 55,
// //           },
// //           headerTitleAlign: "left",
// //           headerTitle: () => (
// //             <View style={{ marginLeft: 16, justifyContent: "center", flex: 1 }}>
// //               <Text style={{ fontWeight: "bold", fontSize: 20, color: "#fff" }}>
// //                 Flyttstäd
// //               </Text>
// //             </View>
// //           ),
// //         }}>
// //         <Stack.Screen name="index"  />
// //       </Stack>
// //     </>
// //   );
// // };

// // export default ApartmentLayout;

// import { Stack } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import { Text, View } from "react-native";

// const ApartmentLayout = () => {
//   return (
//     <>
//       <StatusBar backgroundColor="#3e68abff" style="light" />

//       <Stack
//         screenOptions={{
//           headerShown: true,
//           headerStyle: {
//             backgroundColor: "#3e68abff",
//             height: 55,
//           },
//           headerTitleAlign: "left",
//           headerTintColor: "#fff",
//         }}>
//         {/* Index-sidan */}
//         <Stack.Screen
//           name="index"
//           options={{
//             headerTitle: () => (
//               <View
//                 style={{ marginLeft: 16, justifyContent: "center", flex: 1 }}>
//                 <Text
//                   style={{ fontWeight: "bold", fontSize: 20, color: "#fff" }}>
//                   Flyttstäd
//                 </Text>
//               </View>
//             ),
//           }}
//         />

//         {/* Dynamiska apartmentId-sidan */}
//         <Stack.Screen
//           name="[apartmentId]/index"
//           options={{
//             headerTitle: () => (
//               <View
//                 style={{ marginLeft: 16, justifyContent: "center", flex: 1 }}>
//                 <Text
//                   style={{ fontWeight: "bold", fontSize: 20, color: "#fff" }}>
//                   Flyttstäd
//                 </Text>
//               </View>
//             ),
//           }}
//         />
//       </Stack>
//     </>
//   );
// };

// export default ApartmentLayout;
