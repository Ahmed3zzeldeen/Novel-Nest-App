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
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import ROUTES from "../../constants/routes";
import { router } from "expo-router";
import {
  searchUsersByEmail,
  searchUsersByName,
  getUsers,
  deleteUser,
} from "../../firebase/apis/users";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "@/constants/colors";

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
          style={{ width: 50, height: 50,borderRadius: 25, alignSelf: "flex-start", margin: 10 }}
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
              color={COLORS.primary}
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
              color={COLORS.primary}
              style={{ margin: 10 }}
            />
          </Pressable>
        </View>
      </View>
    );
  };
  const getUserByEmail = async (email) => {
    try {
      const users = await searchUsersByEmail(email);
      console.log("searched in usersManage:", users);
      return users;
    } catch (e) {
      console.error("couldn't get users", e);
    }
  };

  const getUserByUsersName = async (userName) => {
    try {
      const users = await searchUsersByName(userName);
      setSearchedUser(users);
      return users;
    } catch (e) {
      console.error("couldn't get users", e);
    }
  };

  const onChangeText = async (text) => {
    try {
	console.log("text",text);
      const nameUsers = await searchUsersByName(text);
      const emailUsers = await searchUsersByEmail(text);
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
  <View style={styles.buttonsArea}>
        <Pressable
          style={{ alignSelf: "center", margin: 10, backgroundColor: COLORS.primary, borderRadius: 3 }}
          onPress={() => {
            router.replace(ROUTES.DASHBOARD.ADD_NEW_USER);
          }}
        >
          <Text style={{ color: COLORS.white, fontSize: 20, margin: 3 }}>
            New{" "}
            <FontAwesome6
              name="add"
              size={24}
              color={COLORS.white}
            />
          </Text>
        </Pressable>
        <Pressable
          style={{ alignSelf: "center", margin: 10 }}
          onPress={() => {
            router.replace(ROUTES.AUTH.SIGN_OUT);
          }}
        >
          <Text style={{ color: COLORS.primary, fontSize: 20 }}>
            <FontAwesome6
              name="door-open"
              size={24}
              color={COLORS.primary}
              style={{ margin: 10 }}
            />
            logout
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          backgroundcolor: COLORS.primary,
          backgroundColor: COLORS.secondary,
          width: "85%",
          maxWidth: 450,
          height: 50,
          borderRadius: 20,
          alignSelf:"center"
        }}
        >
        <TextInput
          style={{
            height:50,
            paddingHorizontal:10,
            borderRadius: 20,
          }}
          placeholder="Search by user email or username"
          placeholderTextColor={COLORS.primary}
          onChangeText={(text) => onChangeText(text)}
        />
        <FontAwesome name="search" size={24} color={COLORS.primary} style={{position:"absolute" , right:10 , top: 12 }} />
      </View>
      <FlatList
        style={{ flex: 1 }}
	showsVerticalScrollIndicator={false}
        data={filteredUsers}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            img={item.avatar}
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
    backgroundColor: COLORS.white,
    },
  buttonsArea: {
    flex: 1,
    flexDirection: "row",
    maxHeight: "10%",
    Width: "100%",
    justifyContent: "space-between",
  },
  text: {
    color: COLORS.primary,
    fontSize: 24, // Adjusted for more standard viewing
    fontWeight: "bold",
  },
  userCard: {
    flex: 1,
    alignSelf: "center",
    margin: 10,
    backgroundColor: COLORS.secondary,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "85%",
    maxWidth: 450,
    borderRadius: 10,
  },
  infoCard: {
    flex: 1,
    margin: 10,
  },
  Text: {
    color: COLORS.primary,
    fontFamily: "Fira Sans",
  },
});
