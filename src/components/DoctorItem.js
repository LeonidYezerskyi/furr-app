import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const DoctorItem = () => {
  return (
    <View style={styles.itemWrapper}>
      <View style={styles.infoWrapper}>
        <Image
          source={require("../../assets/doctor.jpg")}
          style={styles.docImg}
        />
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>Sophia James</Text>
          <Text style={styles.position}>Veterinary Dentist</Text>
        </View>
        <Image source={require("../../assets/rating.png")} />
        <Text style={styles.ratingInfo}>4.9</Text>
      </View>
      <View style={styles.locationWrapper}>
        <Image
          source={require("../../assets/location.png")}
          style={styles.locationPin}
        />
        <Text style={styles.addressInfo}>28 Oakwood Avenue, New York</Text>
        <Image
          source={require("../../assets/dot.png")}
          style={styles.dotIcon}
        />
        <Text style={styles.distanceInfo}>2.8 mi</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.bottomWrapper}>
        <Text style={styles.bottomText}>Available Today</Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.4}
          onPress={() => {}}
        >
          <Text style={styles.textBtn}>Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    width: 354,
    height: 164,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.05,
    shadowRadius: 60,
  },

  infoWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
  },

  docImg: {
    borderRadius: 50,
    width: 48,
    height: 48,
    marginRight: 13,
  },

  nameWrapper: {
    flexDirection: "column",
  },

  name: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.02,
    color: "#08182F",
    opacity: 0.9,
    marginBottom: 9,
    marginRight: 134,
  },

  position: {
    fontSize: 11,
    lineHeight: 11,
    letterSpacing: 0.02,
    color: "#08182F",
    opacity: 0.5,
  },

  ratingInfo: {
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: 0.02,
    color: "#FFBA07",
    opacity: 0.9,
    marginLeft: 5,
  },

  locationWrapper: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    marginTop: 16,
    marginLeft: 15,
  },

  locationPin: {
    width: 12.5,
    height: 15,
    marginRight: 15,
  },

  addressInfo: {
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.02,
    color: "#2F5EA0",
    marginRight: 6,
  },

  dotIcon: {
    marginRight: 6,
  },

  distanceInfo: {
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.02,
    color: "#08182F",
    opacity: 0.6,
  },

  line: {
    width: 339,
    height: 1,
    backgroundColor: "#F6F7FB",
    marginLeft: 8,
    marginTop: 18,
    marginBottom: 11,
  },

  bottomWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
  },

  bottomText: {
    fontWeight: 500,
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.01,
    color: "#FF974D",
  },

  button: {
    backgroundColor: "#2F5EA0",
    borderRadius: 22,
    width: 75,
    height: 31,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  textBtn: {
    paddingTop: 2,
    color: "#FFFFFF",
    fontWeight: 600,
    fontSize: 13,
    lineHeight: 13,
    letterSpacing: 0.04,
  },
});

export default DoctorItem;
