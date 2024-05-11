import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  StatusBar,
  Pressable,
  SafeAreaView,
  Platform,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import COLORS from "@/constants/colors";
import { router } from "expo-router";
import ROUTES from "@/constants/routes";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { logout } from "@/firebase/apis/auth";
import CartIconCounter from "./CartIconCounter";
import USER_ROLES from "@/constants/userRoles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { findUserByField } from "@/firebase/apis/users";

const HomeHeader = ({ inMoreBook }) => {
  const [user, setUser] = useState({
    avatar: ''
  });

  const handleLogout = () => {
    logout();
    router.navigate(ROUTES.AUTH.LOG_IN);
  };

  const fetchCurrentUser = async () => {
    const data = await AsyncStorage.getItem("user");
    const userData = JSON.parse(data);
    const userObj = await findUserByField("uid", userData.uid);
    if (userObj) {
      setUser(userObj);
    }
  };

  useLayoutEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{
          uri: "https://s3-alpha-sig.figma.com/img/a8d4/ce20/9979d5c6741421e4f3b2ad4ecf0dbd2f?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BhXWQU-hLVpQOg5GAlVU~v0WrtY-d82I~9sLuyOO8nbTDs22vdn49zugBNaZGqyxr~Z-EfJ-yuaNVXZGI0-y73yAPLDftHx7~WhLrFa0iRJx2-VH1ku-TlsX~X0tGdnlODY311VoFZ4Q1Ye5J6PVCVL~cP~Jw5L1laQUdYA7342zPym2D1RbVeHj~qHpes6yNmwd-f4RQB6CR9niBYgPdFY1TncdoNaYK7HX9oQLiW-cP2m41fyh0aP8giaBDEk-Jynaj8DgV8G0TiTHknq9Q9Djl6Td2LzgQY3kbYzTzpVkQsnld1uapTd4b600PpGg-3zCAZFALydI90cINq8-pg__",
        }}
        style={{
          height: 200,
          width: "100%",
          gap: 10,
        }}
        imageStyle={{
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          opacity: 0.87,
        }}
      >
        <View style={styles.darkCover}></View>
        <View style={styles.header}>
          {inMoreBook ? (
            <Pressable
              style={{ marginRight: 10 }}
              onPress={() => router.replace(ROUTES.PUBLIC.HOME)}
            >
              <FontAwesome5 name="angle-left" size={24} color={COLORS.white} />
            </Pressable>
          ) : null}
          <Text style={styles.homeText}>
            {inMoreBook ? "List of Books" : "Home"}
          </Text>
          <View style={styles.headerIcons}>
            {user && user.role === USER_ROLES.ADMIN ? (
              <Pressable
                onPress={() => router.push(ROUTES.DASHBOARD.HOME)}
                style={{
                  marginHorizontal: 5,
                }}
              >
                <MaterialIcons
                  name="dashboard"
                  size={30}
                  color={COLORS.white}
                />
              </Pressable>
            ) : null}
            <Pressable onPress={handleLogout}>
              <FontAwesome5
                name="door-open"
                size={30}
                color={COLORS.secondary}
              />
            </Pressable>
            <CartIconCounter />
            <Pressable
              onPress={() => router.navigate(ROUTES.PUBLIC.EDIT_PROFILE)}
            >
              <Image
                source={user.avatar ? {uri: user.avatar} : ("../assets/images/icons/profile.png")}
                style={{ width: 40, height: 40, borderRadius: 50 }}
              />
            </Pressable>
          </View>
        </View>
        <Text style={styles.usernameText}>
          Hey! {user ? `${user.username}`.toLocaleUpperCase() : "USERNAME"}
        </Text>
      </ImageBackground>
    </SafeAreaView>
  );F
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  darkCover: {
    position: "absolute",
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    opacity: 0.5,
  },
  header: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  homeText: {
    color: COLORS.secondary,
    fontWeight: "700",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: "auto",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },
  usernameText: {
    color: COLORS.secondary,
    fontWeight: "700",
    fontSize: 16,
    marginHorizontal: "5%",
    marginTop: "5%",
  },
  searchIconBox: {
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
  },
  searchBar: {
    backgroundColor: COLORS.secondary,
    width: "89%",
    paddingLeft: "3%",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  searchBox: {
    flexDirection: "row",
    marginHorizontal: "10%",
    justifyContent: "space-between",
    padding: 3,
    backgroundColor: COLORS.secondary,
    borderRadius: 5,
    marginVertical: "5%",
  },
  counterText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
  counter: {
    width: 21.43,
    height: 21.43,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    borderRadius: 50,
    position: "absolute",
    right: 25,
    bottom: 20,
  },
});
