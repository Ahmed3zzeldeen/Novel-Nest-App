import {
  Pressable,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { React, useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import ROUTES from "../../constants/routes";
import { router } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from "react-native";
import { uplouadFile, getLink } from "../../firebase/apis/storage";
import COLORS from "@/constants/colors";
import profilePic from "../../assets/images/icons/iconPlaceHolder.png"
import { CustomTextInput , CustomButton } from "@/components";
import { register , logout} from "../../firebase/apis/auth";
import {updateUserImage} from "../../firebase/apis/users";

const AddUserScreen = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  //require users from the database

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
    const ref = await uplouadFile(`avatar-${new Date()}`, blob);
    return (await getLink(ref.ref));
  };
  const createUser = async () => {
      try {
	if (usernameInput &&  firstNameInput && lastNameInput  && emailInput && passInput && role !== "" ){
	    let cred = await register(firstNameInput , lastNameInput , usernameInput , emailInput , passInput , role);
	    if (cred){ 
		let uid = cred.user.uid
		if (image){
		    const response = await fetch(image);
		    const blob = await response.blob();
		    const ref = await uplouadFile(`users/${uid}`, blob);
		    const url =  (await getLink(ref.ref));
		    updateUserImage (uid , url);
		}
		else {
		    updateUserImage (uid, "https://www.gravatar.com/avatar/");
		}
	       router.navigate(ROUTES.PUBLIC.HOME);
	    }
	} 
	else {
	    throw new Error('Enter complete data please');
	}
      }catch(e){
	setError(e);
      }
  }

  useEffect(() => {
      if (error !== null){
	  alert(`${error}`);
      }
  }, [error]);
  return (
    <ScrollView showsVerticalScrollIndicator = {false} style={styles.screenContainer}>
      <View style={styles.buttonsArea}>
        <Pressable
          style={{ alignSelf: "flex-end", margin: 10 }}
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
      <View>
	  <Text style={styles.text}>User Preview</Text>
	  <View style={styles.AvatarArea}>
	    <Image source={(image) ? { uri: image } : profilePic} style={{ width: 50, height: 50, borderRadius: 100 }} />
	    <Pressable style={styles.avatarButton} onPress={() => { pickImage(); }}>
	      <Text style={{ color: COLORS.secondary, fontSize: 18, fontFamily: "Fira Sans", fontWeight: "700", alignSelf: "center" }}>
		Avatar
	      </Text>
	      <FontAwesome6
		name="cloud-arrow-up"
		size={18}
		color={COLORS.secondary}
		style={{ alignSelf: "center" }}
	      />
	    </Pressable>
	  </View>
	  <Text style={styles.Text}>Username: {usernameInput} </Text>
	  <Text style={styles.Text}>First Name: {firstNameInput} </Text>
	  <Text style={styles.Text}>Last Name: {lastNameInput} </Text>
	  <Text style={styles.Text}>Email: {emailInput} </Text>
      </View>
      <View style={styles.inputsArea}>
        <View style={styles.firstRow}>
          <CustomTextInput label="First Name:" placeholder="Robert" value={firstNameInput} onChangeText={(e) => setFirstNameInput(e)} />
          <CustomTextInput label="Last Name:" placeholder="martin" value={lastNameInput} onChangeText={(e) => setLastNameInput(e)} />
        </View>
        <CustomTextInput label="Username:" placeholder="RobertMartin123" value={usernameInput} onChangeText={(e) => setUsernameInput(e)} />
        <CustomTextInput label="Email:" placeholder="example@something.com" value={emailInput} onChangeText={(e) => setEmailInput(e)} />
        <CustomTextInput secureTextEntry={true} label="Password" placeholder="Password here!" value={passInput} onChangeText={(e) => setPassInput(e)} />
        <CustomTextInput.Select secureTextEntry={true} label="Role" placeholder="Role" value={""} items = {[{label : "Admin" , value : "ADMIN" },{label : "User" , value : "USER" }]} onValueChange={(e) => (e)? setRole(e) : null}  />
      </View >
      <View style = {styles.optionButtons}>
            <CustomButton
              buttonStyle={{backgroundColor: COLORS.danger}}
              textButton={'Cancel'}
              textButtonStyle={{color  : COLORS.white}}
            />
            <CustomButton
              buttonStyle={{backgroundColor: COLORS.success }}
              textButton={'Create'}
	      functionality = {()=>{createUser();}}
              textButtonStyle={{color  : COLORS.white}}
            />
      </View>
    </ScrollView>
  );
};

export default AddUserScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },
  avatarButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    width: 113,
    height: 34,
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "center",
    gap: 3,
    flexDirection: "row",

  },
  AvatarArea: {
    flex: 1,
    flexDirection: "row",
    width: 171,
    maxHeight: 50,
    gap: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  firstRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    minHeight : 67,
    gap: 10
  },
  inputsArea: {
    marginTop : 30  ,
    gap: 10,
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
    marginBottom: 10,
  },
    optionButtons: {
	flex : 1 , 
	flexDirection : "row" , 
	justifyContent : "space-between",
	marginVertical: 30 ,
	alignItems: "center"

    }

});
