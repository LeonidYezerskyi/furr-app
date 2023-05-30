import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const SearchBox = () => {
  const handleSearch = () => {
    console.log("Search clicked");
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
      <TouchableOpacity activeOpacity={0.6} style={styles.button}>
        <Text onPress={handleSearch} style={styles.textBtn}>
          Search
        </Text>
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

  button: {
    backgroundColor: "#2F5EA0",
    height: 42,
    width: 158,
    borderRadius: 24,
    marginTop: 25,
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
});

export default SearchBox;
