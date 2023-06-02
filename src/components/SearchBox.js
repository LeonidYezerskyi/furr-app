import React from "react";
import { getDistance } from "geolib";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

import {
  setFilteredDoctors,
  setShowAllDoctors,
  setDistance,
} from "../redux/slices/doctorsSlice";
import {
  setCurrentLocation,
  setSelectedDate,
} from "../redux/slices/locationSlice";
import doctorsData from "../data/doctor.json";

const SearchBox = () => {
  const currentLocation = useSelector(
    (state) => state.location.currentLocation
  );
  const selectedDate = useSelector((state) => state.location.selectedDate);
  const dispatch = useDispatch();

  const getCurrentLocation = async () => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
      }
    })();

    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;

    dispatch(setCurrentLocation({ latitude, longitude }));
  };

  const filterDoctorsByLocationAndDate = () => {
    if (currentLocation === null) {
      alert("We need your location in order to suggest nearby clinic.");
    }

    if (currentLocation) {
      const { latitude, longitude } = currentLocation;

      const updatedDoctorsData = doctorsData.map((doctor) => {
        const doctorDistance = getDistance(
          { latitude: doctor.latitude, longitude: doctor.longitude },
          { latitude, longitude }
        );
        const metersToMiles = (distanceInMeters) => {
          const metersInOneMile = 1609.34;
          return (distanceInMeters / metersInOneMile).toFixed(2);
        };
        const doctorDistanceInMiles = metersToMiles(doctorDistance);
        return {
          ...doctor,
          distance: doctorDistanceInMiles,
        };
      });

      const filtered = updatedDoctorsData.filter((doctor) => {
        const isWithinRadius = doctor.distance <= 10;
        const isAvailableToday = doctor.available === "Today";
        const isAvailableTomorrow = doctor.available === "Tomorrow";
        const isAvailableAfterTomorrow = doctor.available === "After tomorrow";
        let isMatchingDate = false;

        if (selectedDate === "Today") {
          isMatchingDate = isAvailableToday;
        } else if (selectedDate === "Tomorrow") {
          isMatchingDate = isAvailableTomorrow;
        } else if (selectedDate === "After tomorrow") {
          isMatchingDate = isAvailableAfterTomorrow;
        }

        return isWithinRadius && isMatchingDate;
      });

      const distanceValues = {};
      updatedDoctorsData.forEach((doctor) => {
        distanceValues[doctor.id] = doctor.distance;
      });

      dispatch(setDistance(distanceValues));
      dispatch(setShowAllDoctors(false));
      dispatch(setFilteredDoctors(filtered));
    }
  };

  const handleSearch = () => {
    filterDoctorsByLocationAndDate();
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <SelectDropdown
          buttonStyle={styles.dropdownBtnStyle}
          buttonTextStyle={styles.dropdownBtnTxtStyle}
          disabled={true}
          defaultButtonText={"Select Purpose"}
          renderDropdownIcon={(isOpened) => {
            return (
              <EvilIcons
                name={isOpened ? "chevron-up" : "chevron-down"}
                size={20}
                color="black"
                style={styles.dropdownIcon}
              />
            );
          }}
        />
      </View>
      <View style={[styles.dropdownContainer, styles.dropdownContainer2]}>
        <SelectDropdown
          buttonStyle={styles.dropdownBtnStyle}
          buttonTextStyle={styles.dropdownBtnTxtStyle}
          disabled={true}
          defaultButtonText={"Select Animal"}
          renderDropdownIcon={(isOpened) => {
            return (
              <EvilIcons
                name={isOpened ? "chevron-up" : "chevron-down"}
                size={20}
                color="black"
                style={styles.dropdownIcon}
              />
            );
          }}
        />
      </View>
      <View style={styles.searchBoxes}>
        <View>
          <TouchableOpacity
            onPress={getCurrentLocation}
            activeOpacity={0.6}
            style={[styles.btn, styles.btnLocation]}
          >
            <Text style={styles.btnLocationTxt}>Nearby</Text>
          </TouchableOpacity>
          <Image
            source={require("../../assets/location.png")}
            style={styles.mapPin}
          />
        </View>
        <View style={styles.dropdownContainerData}>
          <SelectDropdown
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            data={["Today", "Tomorrow", "After tomorrow"]}
            defaultButtonText={"Select day"}
            onSelect={(selectedItem) => {
              dispatch(setSelectedDate(selectedItem));
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <EvilIcons
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="black"
                  style={styles.dropdownIcon}
                />
              );
            }}
          />
          <Image
            source={require("../../assets/calendar2.jpg")}
            style={styles.iconCalendar}
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
        <Text style={styles.textButton}>Search</Text>
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

  dropdownContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 25,
    marginBottom: 15,
    height: 40,
    justifyContent: "center",
  },

  dropdownContainer2: {
    marginTop: 0,
  },

  dropdownBtnStyle: {
    width: "100%",
    height: 40,
    backgroundColor: "#FFF",
    borderColor: "#E9E8E8",
    borderStyle: "solid",
    borderRadius: 6,
    borderWidth: 1,
  },

  dropdownBtnTxtStyle: {
    fontFamily: "Outfit-Regular",
    fontSize: 13,
    lineHeight: 13,
    letterSpacing: 0.01,
    color: "#08182F",
    opacity: 0.7,
    textAlign: "left",
  },

  dropdownIcon: { marginBottom: 5 },

  searchBoxes: {
    display: "flex",
    flexDirection: "row",
  },

  btn: {
    borderWidth: 1,
    borderRadius: 6,
    borderStyle: "solid",
    borderColor: "#E9E8E8",
    height: 40,
    width: 150,

    fontFamily: "Outfit-Regular",
    letterSpacing: 0.01,
    fontSize: 13,
    lineHeight: 13,
    paddingLeft: 15,
    marginLeft: 20,
  },

  btnLocation: {
    justifyContent: "center",
  },

  btnLocationTxt: {
    fontFamily: "Outfit-Regular",
    fontSize: 13,
    lineHeight: 13,
    letterSpacing: 0.01,
    color: "#08182F",
  },

  mapPin: {
    position: "absolute",
    bottom: 11,
    left: 142,
  },

  dropdownContainerData: {
    justifyContent: "center",
    marginLeft: 14,
    height: 40,
    width: 150,
  },

  iconCalendar: {
    position: "absolute",
    left: 121,
    zIndex: 2,
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

  textButton: {
    fontFamily: "Outfit-SemiBold",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.04,
    textTransform: "uppercase",
    color: "#FFFFFF",
  },
});

export default SearchBox;
