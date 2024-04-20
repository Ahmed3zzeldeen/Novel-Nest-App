import {Pressable, StyleSheet, View, Text } from 'react-native';
import { React, useEffect, useState} from "react";
import { FontAwesome5, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import ROUTES from "../../constants/routes";
import { router } from "expo-router";
import {getUsers} from '../../firebase/apis/users'
import { SafeAreaView } from 'react-native-safe-area-context';


const ManageUsersScreen = () => {

  const [users,setUsers] =useState();
  //require users from the database
  const reqUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
        console.log("users from :" , users);
        return users;
      } catch (e) {
        console.error("couldn't get users", e);
      }
  };
  useEffect(() => {
      reqUsers();
  }, []);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Pressable
        onPress={() => {
	    router.replace(ROUTES.AUTH.SIGN_OUT);
	    
        }}
      >
        <Text style={{ color: "#29649f", fontSize: 20, alignSelf: "flex-end" }}>
          <FontAwesome6
            name="door-open"
            size={24}
            color="#29648F"
            style={{ margin: 10 }}
          />
          logout
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ManageUsersScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f0e8",
  },
  text: {
    color: "#29648f",
    fontSize: 24, // Adjusted for more standard viewing
    fontWeight: "bold",
  },
});
