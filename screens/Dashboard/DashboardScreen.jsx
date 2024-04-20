import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  TextInput,
  Button,
  Image,
} from "react-native";
import { React, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import ROUTES from "../../constants/routes";
import { FontAwesome5, FontAwesome, FontAwesome6 } from "@expo/vector-icons";

const DashboardScreen = () => {
  const [users, usersSet] = useState([]);
  const [searchedUser, setSearchedUser] = useState();
  const [deluser, setDelUser] = useState();
  const [inputText, setInputText] = useState("");

  const buttons = [
    {
      pressed: false,
      id: 1,
      text: "ADMIN \nProfile",
      image: "user-tie",
      FontAwesome: 5,
    },
    { pressed: false, id: 2, text: "Manage \nUSERS", image: "group" },
    {
      pressed: false,
      id: 3,
      text: "Manage \nBOOKS",
      image: "book",
      FontAwesome: 5,
    },
    {
      pressed: false,
      id: 4,
      text: "Manage \nORDERS",
      image: "shopping-bag",
      FontAwesome: 5,
    },
  ];
  const handlePress = (id) => {
    switch (id) {
      case 1:
        router.push(ROUTES.DASHBOARD.PROFILE);
        break;

      case 2:
        router.push(ROUTES.DASHBOARD.MANAGE_USERS);
        break;
      case 3:
        router.push(ROUTES.DASHBOARD.MANAGE_BOOKS);
        break;
      case 4:
        router.push(ROUTES.DASHBOARD.MANAGE_ORDERS);
        break;
      case 5:
        router.replace(ROUTES.AUTH.SIGN_OUT);
        break;
      default:
        break;
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    setDelUser(inputText);
  }, [inputText]);

  const router = useRouter();

  const Item = ({ text, img, id, awesome }) => {
    return (
      <View style={{ alignSelf: "center" }}>
        <Pressable
          style={styles.Button}
          onPress={() => {
            handlePress(id);
          }}
        >
          {awesome === 5 ? (
            <FontAwesome5
              name={img}
              size={85}
              color="#29648F"
              style={{ margin: 30 }}
            />
          ) : (
            <FontAwesome
              name={img}
              size={60}
              color="#29648F"
              style={{ margin: 30 }}
            />
          )}
          <Text style={styles.Text}>{text}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.ScreenContainer}>
      <Pressable
        onPress={() => {
          handlePress(5);
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
      <FlatList
        data={buttons}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            img={item.image}
            text={item.text}
            pressed={item.pressed}
            awesome={item.FontAwesome}
          ></Item>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f7f0e8",
  },
  Button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eadecf",
    margin: 20,
    borderRadius: 10,
    maxWidth: 350,
  },
  Text: {
    color: "#29648f",
    fontSize: 50,
    fontWeight: "bold",
    marginTop: 10,
  },
  ButtonsList: {
    flex: 1,
    width: "85%",
    alignSelf: "center",
    flexWrap: "wrap",
  },
});
