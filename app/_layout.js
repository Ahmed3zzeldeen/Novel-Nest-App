import React, { useLayoutEffect, useState } from "react";
import { AppHeaders } from "@/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ROUTES from "@/constants/routes";
import { router } from "expo-router";
import USER_ROLES from "@/constants/userRoles";

export default function _layout() {
  const [user, setUser] = useState(null);
  const fetchUserFromLocalStorage = async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  useLayoutEffect(() => {
    const checkAuthentication = async () => {
      const user = await fetchUserFromLocalStorage();
      if (!user) {
        router.replace(ROUTES.AUTH.LOG_IN);
      } else {
        setUser(user);
      }
    };
    checkAuthentication();
  }
  , []);
  return (
    <AppHeaders />
  );
}
