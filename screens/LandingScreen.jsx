import { StyleSheet ,  View, Text } from "react-native";
import React from "react";
import ROUTES from "../constants/routes";
import { Link } from "expo-router";

const LandingScreen = () => {
  return (
    <View style={styles.ScreenContainer}>
      <Text style={{ fontSize: 24 }}>Welcome to our app</Text>
      <Text style={{ fontSize: 18 }}>This will be splash screen (LANDING)</Text>
      <Link style={styles.LinkStyle} href={ROUTES.PUBLIC.HOME}>
        <Text>
          Go to home Page
        </Text>
      </Link>
      <Link style={styles.LinkStyle} href={ROUTES.DASHBOARD.HOME}>
        <Text>
          Go to Dashoard Home Page
        </Text>
      </Link>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  LinkStyle: {
    color: "#00f",
    fontWeight: "bold",
    marginTop: 10,
  },
});
