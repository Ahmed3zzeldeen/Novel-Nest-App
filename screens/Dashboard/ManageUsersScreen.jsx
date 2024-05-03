import {
  Pressable,
  StyleSheet,
  View,
  TextInput,
  Text,
  FlatList,
  Image,
} from "react-native";
import { React, useEffect, useState } from "react";
import { FontAwesome5, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import ROUTES from "../../constants/routes";
import { router } from "expo-router";
import {
  findUserByEmail,
  getUsers,
  deleteUser,
} from "../../firebase/apis/users";
import { SafeAreaView } from "react-native-safe-area-context";

const ManageUsersScreen = () => {
  const [users, setUsers] = useState();
  const [filteredUsers, setFilteredUsers] = useState();
  //require users from the database
  const reqUsers = async () => {
    try {
      const users = await getUsers();
      setUsers(users);
      setFilteredUsers(users);
      console.log("users from :", users);
      return users;
    } catch (e) {
      console.error("couldn't get users", e);
    }
  };

  const delUserById = async (id) => {
    try {
      const response = await deleteUser(id);
      await reqUsers();
      console.log("deleted user", response);
    } catch (e) {
      console.error("couldn't get users", e);
    }
  };
  const Item = ({ text, img, id, email }) => {
    return (
      <View style={styles.userCard}>
        <Image
          source={{ uri: img }}
          style={{ width: 50, height: 50, alignSelf: "flex-start", margin: 10 }}
        />
        <View style={styles.infoCard}>
          <Text style={styles.Text}>{text}</Text>
          <Text style={styles.Text}>{email}</Text>
        </View>
        <View>
          <Pressable style={{ alignSelf: "flex-end" }}>
            <FontAwesome
              name="trash"
              size={24}
              color="#29648F"
              style={{ margin: 10 }}
              onPress={() => {
                delUserById(id);
              }}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              router.push(ROUTES.DASHBOARD.EDIT_USER + id);
            }}
          >
            <FontAwesome
              name="pencil-square"
              size={24}
              color="#29648F"
              style={{ margin: 10 }}
            />
          </Pressable>
        </View>
      </View>
    );
  };
  const getUserByEmail = async (email) => {
    try {
      const users = await findUsersByEmail(email);
      console.log("searched in usersManage:", user);
      return users;
    } catch (e) {
      console.error("couldn't get users", e);
    }
  };

  const getUserByUsersName = async (userName) => {
    try {
      const users = await findUsersByName(userName);
      setSearchedUser(user);
      console.log("searched in usersManage:", user);
      return user;
    } catch (e) {
      console.error("couldn't get users", e);
    }
  };

  const onChangeText = async (text) => {
    try {
      const nameUsers = await findUsersByName(text);
      const emailUsers = await findUsersByEmail(text);
      console.log("out put of search", nameUsers);
      console.log("out put of search", emailUsers);
      const map = new Map(nameUsers.map((item) => [item.id, item]));
      emailUsers.forEach((item) => map.set(item.id, item));
      let users = Array.from(map.values());
      setFilteredUsers(users);
      console.log("searched in usersManage:", users);
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
        style={{ alignSelf: "flex-end", margin: 10 }}
        onPress={() => {
          router.replace(ROUTES.AUTH.SIGN_OUT);
        }}
      >
        <Text style={{ color: "#29649f", fontSize: 20 }}>
          <FontAwesome6
            name="door-open"
            size={24}
            color="#29648F"
            style={{ margin: 10 }}
          />
          logout
        </Text>
      </Pressable>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundcolor: "#29648F",
          height: 50,
        }}
      >
        <TextInput
          style={{
            backgroundColor: "#eadecf",
            width: "90%",
            height: 50,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
          }}
          placeholder="Search by user email or username"
          placeholderTextColor="#29648F"
          onChangeText={(text) => onChangeText(text)}
        ></TextInput>
        <Text
          style={{
            fontSize: 30,
            backgroundColor: "#eadecf",
            color: "#29648F",
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            height: 50,
          }}
        >
          🔍
        </Text>
      </View>
      <FlatList
        style={{ margin: 50 }}
        data={filteredUsers}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            img={item.image}
            text={item.username}
            email={item.email}
          ></Item>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default ManageUsersScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f7f0e8",
  },
  text: {
    color: "#29648f",
    fontSize: 24, // Adjusted for more standard viewing
    fontWeight: "bold",
  },
  userCard: {
    flex: 1,
    alignSelf: "center",
    margin: 10,
    backgroundColor: "#eadecf",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "85%",
    maxWidth: 350,
    borderRadius: 10,
  },
  infoCard: {
    flex: 1,
    margin: 10,
  },
  Text: {
    color: "#29648F",
  },
});
