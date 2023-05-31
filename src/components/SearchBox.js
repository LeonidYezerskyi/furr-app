import React, { useState } from "react";
import * as Location from "expo-location";
import { getDistance } from "geolib";
import { Picker } from "@react-native-picker/picker";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";

import doctorsData from "../data/doctor.json";

const SearchBox = ({ setFilteredDoctors, setShowAllDoctors }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState("today");

  const getCurrentLocation = async () => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
      }
    })();

    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;

    setCurrentLocation({ latitude, longitude });
  };

  const filterDoctorsByLocationAndDate = () => {
    if (currentLocation === null) {
      alert("We need your location in order to suggest nearby clinic.");
    }

    if (currentLocation) {
      const { latitude, longitude } = currentLocation;

      const filtered = doctorsData.filter((doctor) => {
        const doctorDistance = getDistance(
          { latitude: doctor.latitude, longitude: doctor.longitude },
          { latitude: latitude, longitude: longitude }
        );
        const metersToMiles = (distanceInMeters) => {
          const metersInOneMile = 1609.34;
          return distanceInMeters / metersInOneMile;
        };
        const doctorDistanceInMiles = metersToMiles(doctorDistance);
        const isWithinRadius = doctorDistanceInMiles <= 10;

        const isAvailableToday = doctor.available === "Today";
        const isAvailableTomorrow = doctor.available === "Tomorrow";
        const isAvailableAfterTomorrow = doctor.available === "After tomorrow";
        let isMatchingDate = false;
        if (selectedDate === "today") {
          isMatchingDate = isAvailableToday;
        } else if (selectedDate === "tomorrow") {
          isMatchingDate = isAvailableTomorrow;
        } else if (selectedDate === "after tomorrow") {
          isMatchingDate = isAvailableAfterTomorrow;
        }

        return isWithinRadius && isMatchingDate;
      });
      setShowAllDoctors(false);
      setFilteredDoctors(filtered);
    }
  };

  const handleSearch = () => {
    filterDoctorsByLocationAndDate();
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker enabled={false}>
          <Picker.Item
            label="Select Purpose"
            value=""
            style={styles.placeholder}
          />
        </Picker>
      </View>
      <View style={[styles.pickerContainer, styles.pickerContainer2]}>
        <Picker enabled={false}>
          <Picker.Item
            label="Select Animal"
            value=""
            style={styles.placeholder}
          />
        </Picker>
      </View>
      <View style={styles.searchBoxes}>
        <View>
          <TouchableOpacity
            onPress={getCurrentLocation}
            activeOpacity={0.6}
            style={[styles.input, styles.btnLocation]}
          >
            <Text style={styles.btnLocationTxt}>Nearby</Text>
          </TouchableOpacity>
          <Image
            source={require("../../assets/location.png")}
            style={styles.mapPin}
          />
        </View>
        <View style={[styles.input, styles.pickerContainerData]}>
          <Picker
            selectedValue={selectedDate}
            onValueChange={(itemValue) => setSelectedDate(itemValue)}
          >
            <Picker.Item
              label="Today"
              value="today"
              style={styles.placeholderData}
            />
            <Picker.Item
              label="Tomorrow"
              value="tomorrow"
              style={styles.placeholderData}
            />
            <Picker.Item
              label="After tomorrow"
              value="after tomorrow"
              style={styles.placeholderData}
            />
          </Picker>
          <Image
            source={require("../../assets/calendar2.jpg")}
            style={styles.icon}
            width={13.5}
            height={15}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSearch}
        activeOpacity={0.6}
        style={styles.button}
      >
        <Text style={styles.textBtn}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 354,
    height: 264,
    backgroundColor: "#FFFFFF",
    marginTop: 56,
    marginBottom: 30,
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.06,
    shadowRadius: 60,
  },

  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E9E8E8",
    borderStyle: "solid",
    borderRadius: 6,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 25,
    marginBottom: 15,
    height: 40,
    justifyContent: "center",
  },

  pickerContainerData: {
    justifyContent: "center",
    paddingLeft: 0,
    marginLeft: 14,
  },

  pickerContainer2: {
    marginTop: 0,
  },

  placeholder: {
    fontSize: 13,
    lineHeight: 13,
    letterSpacing: 0.01,
    color: "#08182F",
    opacity: 0.7,
  },

  placeholderData: {
    letterSpacing: 0.01,
    fontSize: 13,
    lineHeight: 13,
  },

  button: {
    backgroundColor: "#2F5EA0",
    height: 42,
    width: 158,
    borderRadius: 24,
    marginTop: 25,
    marginBottom: 26,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 98,
  },

  textBtn: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.04,
    textTransform: "uppercase",
    color: "#FFFFFF",
  },

  btnLocation: {
    justifyContent: "center",
  },

  btnLocationTxt: {
    fontSize: 13,
    lineHeight: 13,
    letterSpacing: 0.01,
    color: "#08182F",
  },

  searchBoxes: {
    display: "flex",
    flexDirection: "row",
  },

  input: {
    borderWidth: 1,
    borderRadius: 6,
    borderStyle: "solid",
    borderColor: "#E9E8E8",
    height: 40,
    width: 150,

    letterSpacing: 0.01,
    fontSize: 13,
    lineHeight: 13,
    paddingLeft: 15,
    marginLeft: 20,
  },

  mapPin: {
    position: "absolute",
    bottom: 11,
    left: 142,
  },

  icon: {
    position: "absolute",
    left: 116,
    zIndex: 2,
  },
});

export default SearchBox;
