import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const BlinkingAlarmIcon = () => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={{ opacity }}>
      <FontAwesome name="warning" size={20} color="red" />
    </Animated.View>
  );
};

export default BlinkingAlarmIcon;
