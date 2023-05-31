import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground } from "react-native";
import SearchBox from "../components/SearchBox";
import DoctorList from "../components/DoctorList";

const HomeScreen = () => {
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  // const [displayedDoctors, setDisplayedDoctors] = useState([]);
  const [showAllDoctors, setShowAllDoctors] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/background.png")}
      >
        <SearchBox
          setFilteredDoctors={setFilteredDoctors}
          // setDisplayedDoctors={setDisplayedDoctors}
          setShowAllDoctors={setShowAllDoctors}
        />
        <DoctorList
          filteredDoctors={filteredDoctors}
          // displayedDoctors={displayedDoctors}
          // setDisplayedDoctors={setDisplayedDoctors}
          showAllDoctors={showAllDoctors}
          setShowAllDoctors={setShowAllDoctors}
        />
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
