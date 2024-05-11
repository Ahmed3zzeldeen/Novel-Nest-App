import { View, Text } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import USER_ROLES from "@/constants/userRoles";
import { router, Slot } from "expo-router";
import ROUTES from "@/constants/routes";

export default function _layout() {
  const [user, setUser] = useState(null);

  const fetchUserFromLocalStorage = async () => {
    const user = await AsyncStorage.getItem("user");
    const userData = user ? JSON.parse(user) : null;
    setUser(userData);
  };

  useLayoutEffect(() => {
    const checkAuthentication = async () => {
      await fetchUserFromLocalStorage();
      if (user) {
        if (user.role !== USER_ROLES.ADMIN) {
          router.replace(ROUTES.PUBLIC.HOME);
        }
      }
    };
    checkAuthentication();
  }, []);

  return <Slot/>;
}
