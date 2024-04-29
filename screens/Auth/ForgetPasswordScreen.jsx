import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { resetPassword } from "@/firebase/apis/auth";
import ROUTES from "@/constants/routes";
import { CustomLink, CustomTextInput, PrimaryBtn } from "@/components";
import COLORS from "@/constants/colors";

const ForgetPasswordScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handlePress = async () => {
    try {
      const credentials = await resetPassword(email);
      console.log("credentials", credentials);
      router.navigate(ROUTES.AUTH.LOG_IN);
    } catch (error) {
      setError(error.message);
    }
  };

  const onChangeEmail = (email) => {
    // check valid email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
    // check if email is empty
    if (email.length < 1) {
      setError("Email is required");
    }else {
      setError("");
    }
    setError("");
    setEmail(email);
  }

  return (
    <View style={styles.ScreenContainer}>
      <View style={styles.InfoContainer}>
        <Image
          source={require("../../assets/images/books.png")}
          style={styles.Image}
        />
        <Text style={styles.Title}>
          You are forget your password, don't worry we will help you to reset
          it.
        </Text>
        <Text style={styles.subTitle}>
          Just Enter your email and we will send you a link to reset your
          password.
        </Text>
      </View>
      <View style={styles.FormContainer}>
        <CustomTextInput
          label="Email"
          placeholder="Email"
          value={email}
          onChangeText={onChangeEmail}
        />
        <PrimaryBtn text="Send" handlePress={handlePress} />
        {error && <Text style={styles.ErrorText}>{error}</Text>}
      </View>
      <CustomLink href={ROUTES.AUTH.LOG_IN} text="I have one? go to login" />
      <CustomLink
        href={ROUTES.AUTH.SIGN_UP}
        text="I don’t have one? go to  register"
      />
    </View>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: COLORS.white,
  },
  InfoContainer: {
    width: "100%",
    maxWidth: "450px",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
  },
  Image: {
    alignSelf: "center",
    width: 180,
  },
  Text: {
    color: COLORS.primary,
    fontWeight: "bold",
    marginTop: 10,
  },
  Title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "start",
    color: COLORS.primary,
  },
  subTitle: {
    fontSize: 12,
    textAlign: "start",
    color: COLORS.primary_70,
  },
  FormContainer: {
    width: "100%",
    maxWidth: "450px",
    marginTop: 20,
    gap: 20,
  },
  ErrorText: {
    color: COLORS.danger,
    marginTop: 10,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
