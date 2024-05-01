import { StyleSheet, View, Text, Image } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { login } from "@/firebase/apis/auth";
import ROUTES from "@/constants/routes";
import { CustomLink, CustomTextInput, PrimaryBtn } from "@/components";
import COLORS from "@/constants/colors";

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePress = async () => {
    try {
      const credentials = await login(email, password);
      console.log("credentials", credentials);
      router.navigate(ROUTES.PUBLIC.HOME);
    } catch (error) {
      setError(error.message);
    }
  };

  const onChangeEmail = (email) => {
    setError("");
    setEmail(email);
  }

  const onChangePassword = (password) => {
    setError("");
    setPassword(password);
  }

  return (
    <View style={styles.ScreenContainer}>
      <Image
        source={require("../../assets/images/books.png")}
        style={styles.Image}
      />
      <View style={styles.ContentContainer}>
        <CustomTextInput
          label="Email"
          placeholder="example@something.com"
          value={email}
          onChangeText={onChangeEmail}
        />
        <CustomTextInput
          label="Password"
          placeholder="password here!"
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry
          withLink={true}
          linkText="Forgot Password?"
          linkRoute={ROUTES.AUTH.FORGOT_PASSWORD}
        />
        <PrimaryBtn text="Login" handlePress={handlePress} />
        {error && <Text style={styles.ErrorText}>{error}</Text>} 
          <CustomLink
            href={ROUTES.AUTH.SIGN_UP}
            text="Don’t Have one? Register Now!"
          />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    height: "100vh",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: COLORS.white,
  },
  ContentContainer: {
    width: "100%",
    minWidth: 300,
    maxWidth: 745,
    marginTop: 20,
    gap: 20,
  },
  Text: {
    color: COLORS.primary,
    fontWeight: "bold",
    marginTop: 10,
  },
  Image: {
    width: 180,
  },
  ErrorText: {
    color: COLORS.danger,
    marginTop: 10,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
