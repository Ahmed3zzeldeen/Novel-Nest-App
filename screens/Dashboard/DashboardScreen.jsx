import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import { React, useEffect} from "react";
import { useRouter } from "expo-router";
import ROUTES from "../../constants/routes";
import { FontAwesome5, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { logout } from "@/firebase/apis/auth";
import COLORS from "@/constants/colors";

const DashboardScreen = () => {
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
  
  const handleLogout = async () => {
    await logout();
    router.replace(ROUTES.AUTH.LOG_IN);
  };

  const handlePress = (id) => {
    switch (id) {
      case 1:
        router.push(ROUTES.DASHBOARD.MY_PROFILE);
        break;

      case 2:
        router.push(ROUTES.DASHBOARD.LIST_OF_USERS);
        break;
      case 3:
        router.push(ROUTES.DASHBOARD.LIST_OF_BOOKS);
        break;
      case 4:
        router.push(ROUTES.DASHBOARD.LIST_OF_ORDERS);
        break;
      case 5:
        handleLogout();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
console.log(buttons);
  }, []);


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
              size={60}
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
    <SafeAreaView style={styles.ScreenContainer}>
      <Pressable
        onPress={() => {
          handlePress(5);
        }}
      >
        <Text style={{ color: COLORS.primary, fontSize: 20, alignSelf: "flex-end" }}>
          <FontAwesome6
            name="door-open"
            size={24}
            color={COLORS.primary}
            style={{ margin: 10 }}
          />
          logout
        </Text>
      </Pressable>
      <FlatList
        showsVerticalScrollIndicator={false}
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
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
  },
  Button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    margin: 20,
    borderRadius: 10,
    width: 400,
    maxWidth: 450,
    maxHeight:150,
  },
  Text: {
    color: COLORS.primary,
    fontSize: 50,
    fontWeight: "bold",
    textAlign: 'left',
    marginRight: '2%'
  },
  ButtonsList: {
    flex: 1,
    width: "85%",
    alignSelf: "center",
    flexWrap: "wrap",
  },
});
