import {
  Pressable,
  StyleSheet,
  View,
  TextInput,
  Text,
  FlatList,
  Button,
  Image,
} from "react-native";
import { React, useEffect, useState } from "react";
import { FontAwesome5, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import ROUTES from "../../constants/routes";
import { router } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { auth,db, storage } from "../../firebase/Config";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "@/constants/colors";

const AddUserScreen = () => {
  const [userNameprev, setUserNameprev] = useState("");
  const [firstNameprev, setFirstNameprev] = useState("");
  const [lastNameprev, setLastNameprev] = useState("");
  const [emailprev, setEmailprev] = useState("");
  const [userNameinput, setUserNameinput] = useState("");
  const [firstNameinput, setFirstNameinput] = useState("");
  const [lastNameinput, setLastNameinput] = useState("");
  const [emailinput, setEmailinput] = useState("");
  const [passinput, setPassinput] = useState("");
  const [image, setImage] = useState(null);
  //require users from the database

  const onChangeText = async (text) => {
    try {
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
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const uploadImage = async () => {
       const response = await fetch(image);
       const blob = await response.blob();
       const ref = storage.ref().child(new Date().toISOString());
       const snapshot = await ref.put(blob);
       return await snapshot.ref.getDownloadURL();
  };
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {image && <Button title="Upload to Firebase" onPress={() => uploadImage().then(url => alert("Uploaded successfully: " + url))} />}
      <View style={styles.buttonsArea}>
	  <Pressable
	    style={{ alignSelf: "flex-end",margin: 10 }}
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
      <Text style={styles.text}>User Preview</Text>
      <Text style= {styles.Text}>Username: {userNameprev} </Text>
      <Text style= {styles.Text}>First Name: {firstNameprev} </Text>
      <Text style= {styles.Text}>Last Name: {lastNameprev} </Text>
      <Text style= {styles.Text}>Email: {emailprev} </Text>
    </SafeAreaView>
  );
};

export default AddUserScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  buttonsArea:{
      flex :1 , 
      flexDirection: "row",
      maxHeight: "10%",
      Width:"100%",
      justifyContent: "flex-end",
    },
  text: {
    color: COLORS.primary,
    fontSize: 20, // Adjusted for more standard viewing
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
    maxWidth: 350,
    borderRadius: 10,
  },
  infoCard: {
    flex: 1,
    margin: 10,
  },
  Text: {
    color: COLORS.primary,
  },
});
