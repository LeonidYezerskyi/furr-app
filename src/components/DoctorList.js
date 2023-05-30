import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import DoctorItem from "./DoctorItem";
import doctorsData from "../data/doctor.json";

const DoctorList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listWrapper}>
        <Text style={styles.title}>Nearby Vets</Text>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.4}
          onPress={() => {}}
        >
          <Text style={styles.btnText}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={doctorsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <DoctorItem item={item} />;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  container: {
    flex: 1,
  },

  title: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: 0.02,
    color: "#08182F",
  },

  btnText: {
    fontWeight: 500,
    fontSize: 13,
    lineHeight: 13,
    color: "#2F5EA0",
  },
});

export default DoctorList;
