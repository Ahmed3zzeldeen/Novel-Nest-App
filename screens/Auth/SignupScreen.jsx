import { StyleSheet, View, Text, Pressable, Button, TextInput } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import ROUTES from '../../constants/routes'
import { register } from "../../firebase/apis/auth";

const SignupScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handlePress = async () => {
  try {
      const credentials = await register(email, password);
      console.log('credentials', credentials);
      router.navigate(ROUTES.PUBLIC.HOME);
  } catch (error) {
      console.log('error', JSON.stringify(error));
      setError(error);
  }
};

  return (
    <View style={styles.ScreenContainer}>
    <TextInput
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
    />
    <TextInput
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
      style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
    />
    <Button title="Register" onPress={handlePress} />
    <Pressable onPress={()=>router.replace(ROUTES.AUTH.LOG_IN)}>
      <Text style={{ marginTop: 10 }}>Login</Text>
    </Pressable>
    <Pressable onPress={()=>router.replace(ROUTES.AUTH.FORGOT_PASSWORD)}>
      <Text style={{ marginTop: 10 }}>Forgot Password</Text>
    </Pressable>
    <Text>{error.code}</Text>
  </View>
  );
};

export default SignupScreen;

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
