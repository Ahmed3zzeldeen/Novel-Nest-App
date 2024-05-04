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
import { SafeAreaView } from "react-native-safe-area-context";
import {uplouadFile, getLink} from "../../firebase/apis/storage";
import COLORS from "@/constants/colors";
import profilePic from "../../assets/images/icons/iconPlaceHolder.png"
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
      // console.log(image);
  }, [image]);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const uploadImage = async () => {
       const response = await fetch(image);
       const blob = await response.blob();
       const ref = await uplouadFile ('bsbs',blob);
       return (await getLink(ref.ref));
  };
  const Input = ({ text,placeHolder, width , setter1 , setter2}) => {
    return (
      <View style={{flex :1 , gap : 5}}>
	<Text style = {{width : 160 , height : 20 , fontWeight:"700" , color: COLORS.primary,fontFamily: "Fira Sans",}}>{text}</Text>
	<TextInput placeholder = {placeHolder}
        placeholderTextColor={COLORS.primary_70}
        onChangeText={(text) => {setter1(text);setter2(text); }}
	style = {{width : width , backgroundColor: COLORS.secondary , height : 30 , fontFamily: "Fira Sans",borderTopColor:COLORS.primary,borderRadius: 5}}
	>
	</TextInput>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.screenContainer}>
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
      <View style = {styles.AvatarArea}>
	  <Image source={(image)? { uri: image }: profilePic} style={{ width: 50, height: 50 , borderRadius:5 }} />
	  <Pressable style = {styles.avatarButton} onPress = {()=>{pickImage();}}>
	      <Text style= {{color:COLORS.secondary,fontSize :18, fontFamily: "Fira Sans" , fontWeight:"700" , alignSelf:"center" }}>
		  Avatar
	      </Text> 
	      <FontAwesome6
		name="cloud-arrow-up"
		size={18}
		color={COLORS.secondary}
		style={{ alignSelf : "center" }}
	      />
	  </Pressable>
      </View>
      <Text style= {styles.Text}>Username: {userNameprev} </Text>
      <Text style= {styles.Text}>First Name: {firstNameprev} </Text>
      <Text style= {styles.Text}>Last Name: {lastNameprev} </Text>
      <Text style= {styles.Text}>Email: {emailprev} </Text>
      <View style ={styles.inputsArea}>
	    <View style = {styles.firstRow}>
		<Input text = "First Name:" placeHolder = "Robert"  width = {160}/>
		<Input text = "Last Name:" placeHolder = "martin"  width = {160}/>
	    </View>
	    <Input text = "Username:" placeHolder = "RobertMartin123"  width = {"100%"}/>
	    <Input text = "Email:" placeHolder = "example@something.com"  width = {"100%"}/>
	    <Input text = "Password" placeHolder = "Password here!"  width = {"100%"}/>
      </View>
    </SafeAreaView>
  );
};

export default AddUserScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingLeft : 10 ,
  },
  avatarButton:{
    flex: 1,
    backgroundColor: COLORS.primary,
    width : 113, 
    height : 34 , 
    borderRadius: 5, 
    justifyContent : "center",
    alignSelf:"center",
    gap: 3, 
    flexDirection: "row",
    
  },
  AvatarArea:{
      flex :1 , 
      flexDirection: "row",
      width: 171, 
      maxHeight: 50 , 
      gap: 8 , 
      marginTop: 10, 
      marginBottom : 10 ,
    },
  firstRow:{
      flex : 1 ,
      flexDirection: "row",
      flexWrap : "wrap",
      gap : 10,
      rowGap : 30,
  },
  inputsArea:{
      gap : 10,
      marginRight : 30,
  },
  text: {
    color: COLORS.primary,
    fontSize: 20, // Adjusted for more standard viewing
    fontWeight: "700",
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
    fontFamily: "Fira Sans",
    fontSize: 16,
    fontWeight: "700",
      marginBottom : 10 ,
  }
});
