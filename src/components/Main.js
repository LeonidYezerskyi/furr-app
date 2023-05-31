import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

import BottomTabNav from "../routes/BottomTabNav";

const Main = () => {
  return (
    <View style={{ backgroundColor: "#E7E7E7", flex: 1 }}>
      <NavigationContainer>
        <BottomTabNav />
      </NavigationContainer>
    </View>
  );
};

export default Main;
