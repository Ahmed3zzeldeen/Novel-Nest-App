import React, { useLayoutEffect, useState } from "react";
import { LandingScreen } from "../screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import ROUTES from "@/constants/routes";

export default function Page() {
  const [user, setUser] = useState(null);
  const fetchUserFromLocalStorage = async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  useLayoutEffect(() => {
    const checkAuthentication = async () => {
      const user = await fetchUserFromLocalStorage();
      if (!user) {
        console.log("user from async :" , user);
        router.replace(ROUTES.AUTH.LOG_IN);
      } else {
        console.log("user from async :" , user);
        setUser(user);
        router.replace(ROUTES.PUBLIC.HOME);
      }
    };
    checkAuthentication();
  },[])

  return (
    <LandingScreen/>
  );
}
