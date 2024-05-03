import React from "react";
import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";
import ROUTES from "../constants/routes";
import { HomeHeader } from '@/components';
import COLORS from "@/constants/colors";

const AppHeaders = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Landing Page",
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <Link href={ROUTES.AUTH.LOG_IN}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: "bold",
                    margin: 10,
                  }}
                >
                  Login
                </Text>
              </Link>
              <Link href={ROUTES.AUTH.SIGN_UP}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: "bold",
                    margin: 10,
                  }}
                >
                  signup
                </Text>
              </Link>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name={ROUTES.PUBLIC.HOME}
        options={{
          header: () => (<HomeHeader />)
        }}
      />
      <Stack.Screen
        name={ROUTES.DASHBOARD.HOME}
        options={{
          headerTitle: "Dashboard",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#29648f" },
        }}
      />
      <Stack.Screen
        name={ROUTES.AUTH.LOG_IN}
        options={{ headerTitle: "Login Page" }}
      />
      <Stack.Screen
        name={ROUTES.AUTH.SIGN_UP}
        options={{ headerTitle: "Signup Page", presentation: "modal" }}
      />
      <Stack.Screen
        name={ROUTES.AUTH.FORGOT_PASSWORD}
        options={{ headerTitle: "Reset password", presentation: "modal" }}
      />
      <Stack.Screen
        name={ROUTES.DASHBOARD.MANAGE_USERS}
        options={{
          headerTitle: "Users",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#29648f" },
        }}
      />
    </Stack>
  );
};

export default AppHeaders;
