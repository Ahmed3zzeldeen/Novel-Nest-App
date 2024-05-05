import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import ROUTES from "../../constants/routes";
import { register } from "../../firebase/apis/auth";
import { CustomLink, CustomTextInput, PrimaryBtn } from "@/components";
import COLORS from "@/constants/colors";

const SignupScreen = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePress = async () => {
    try {
      const credentials = await register(
        firstName,
        lastName,
        username,
        email,
        password
      );
      console.log("credentials", credentials);
      router.navigate(ROUTES.PUBLIC.HOME);
    } catch (error) {
      setError(error.message);
    }
  };

  const onChangeFirstName = (firstName) => {
    setFirstName(firstName);
    if (firstName.length < 3) {
      setError("First name must be at least 3 characters long");
    } else {
      setError("");
    }
    if (!firstName) {
      setError("First name is required");
    } else {
      setError("");
    }
    
    setError("");
  };

  const onChangeLastName = (lastName) => {
    setError("");
    setLastName(lastName);
  };

  const onChangeUsername = (username) => {
    setError("");
    setUsername(username);
  };

  const onChangeEmail = (email) => {
    setError("");
    setEmail(email);
  };

  const onChangePassword = (password) => {
    setError("");
    setPassword(password);
  };

  return (
    <View style={styles.ScreenContainer}>
      <Image
        source={require("../../assets/images/books.png")}
        style={styles.Image}
      />
      <View style={styles.ContentContainer}>
        <View
          style={{
            width: "auto",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <CustomTextInput
            label="First Name:"
            placeholder="Robert"
            value={firstName}
            onChangeText={onChangeFirstName}
          />
          <CustomTextInput
            label="Last Name:"
            placeholder="martin"
            value={lastName}
            onChangeText={onChangeLastName}
          />
        </View>
        <CustomTextInput
          label="Username:"
          placeholder="RobertMartin123"
          value={username}
          onChangeText={onChangeUsername}
        />
        <CustomTextInput
          label="Email:"
          placeholder="example@something.com"
          value={email}
          onChangeText={onChangeEmail}
        />
        <CustomTextInput
          label="Password:"
          placeholder="password here!"
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry
        />
        <PrimaryBtn text="Register" handlePress={handlePress} />
        {error && <Text style={styles.ErrorText}>{error}</Text>}
        <CustomLink
          href={ROUTES.AUTH.LOG_IN}
          text="Have one? Login Now!"
          style={{
            color: COLORS.primary,
            fontWeight: "bold",
            marginTop: 10,
          }}
        />
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: COLORS.white,
  },
  ContentContainer: {
    maxWidth: "300px",
    width: "90%",
    marginTop: 10,
    gap: 10,
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
