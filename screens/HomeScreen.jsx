import { StyleSheet, View, Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.ScreenContainer}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Home Page</Text>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.Text}>
          Go Back
        </Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Text: {
    color: "#00f",
    fontWeight: "bold",
    marginTop: 10,
  },
});
