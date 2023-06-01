import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground } from "react-native";

import SearchBox from "../components/SearchBox";
import DoctorList from "../components/DoctorList";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/background.png")}
      >
        <SearchBox />
        <DoctorList />
      </ImageBackground>
      <StatusBar barStyle="light-content" />
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

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 338,
  },

  text: {
    marginTop: 338,
  },
});

export default HomeScreen;
