import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SettingsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7E7E7",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontFamily: "Outfit-Regular",
    fontSize: 22,
  },
});

export default SettingsScreen;
