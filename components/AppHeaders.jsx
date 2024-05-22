import React from "react";
import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";
import ROUTES from "../constants/routes";
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
        name={ROUTES.DASHBOARD.HOME}
        options={{
          headerTitle: "Dashboard",
          headerStyle: { backgroundColor: "#29648f" },
        }}
      />
      <Stack.Screen
        name={ROUTES.AUTH.LOG_IN}
        options={{ headerTitle: "Login Page" }}
      />
      <Stack.Screen
        name={ROUTES.PUBLIC.EDIT_PROFILE}
        options={{ headerTitle: "My Profile", presentation: "modal" }}
      />
      <Stack.Screen
        name={ROUTES.PUBLIC.CART}
        options={{ headerTitle: "Cart", presentation: "modal" }}
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
        name={ROUTES.DASHBOARD.LIST_OF_USERS}
        options={{
          headerTitle: "Users",
          headerStyle: { backgroundColor: COLORS.primary },
        }}
      />
      <Stack.Screen
        name={ROUTES.DASHBOARD.ADD_NEW_USER}
        options={{
          headerTitle: "New User",
          headerStyle: { backgroundColor: COLORS.primary },
        }}
      />
      <Stack.Screen
        name={ROUTES.DASHBOARD.ADD_NEW_ORDER}
        options={{

          headerTitle: "Edit Order",
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: "#29648f" },
        }}
      />
      <Stack.Screen
        name={ROUTES.DASHBOARD.LIST_OF_BOOKS}
        options={{ headerTitle: "List of books" }}
      />
      <Stack.Screen
        name={ROUTES.DASHBOARD.ADD_NEW_BOOK}
        options={{ headerTitle: "Add new book" }}
      />
      <Stack.Screen
        name={ROUTES.DASHBOARD.LIST_OF_ORDERS}
        options={{
          headerTitle: "List Of Orders",
          headerStyle: { backgroundColor: COLORS.primary },

        }}
      />

    </Stack>
  );
};

export default AppHeaders;
