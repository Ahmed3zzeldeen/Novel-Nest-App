import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  StatusBar,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLayoutEffect, useState } from "react";
import COLORS from "@/constants/colors";
import { CustomButton } from "@/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import {
  findUserByField,
  updateUserImage,
} from "@/firebase/apis/users";
import { getLink, uplouadFile } from "@/firebase/apis/storage";
import { router } from "expo-router";
import ROUTES from "@/constants/routes";

const MyProfileScreen = () => {
  const [user, setUser] = useState({
    firstName: "",
    username: "",
    lastName: "",
    email: "",
    avatar: "",
    fullname: "",
    role: "",
  });
  const [uid, setUid] = useState();
  const [image, setImage] = useState();

  const fetchCurrentUser = async () => {
    const data = await AsyncStorage.getItem("user");
    const userData = JSON.parse(data);
    const userObj = await findUserByField("uid", userData.uid);
    if (userObj) {
      setUser(userObj);
      setUid(userObj.id);
      setImage(userObj.avatar);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let image = result.assets[0].uri;
      const response = await fetch(image);
      const blob = await response.blob();
      console.log(blob.type);
      const ref = await uplouadFile(`users/${uid}`, blob);
      return await getLink(ref.ref);
    }
  };
  const updateImage = async () => {
    let imageUrl = await pickImage();
    if (imageUrl) {
      updateUserImage(uid, imageUrl);
      setImage(imageUrl);
    }
  };

  useLayoutEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.profileHeader}>
        <View style={styles.uploadBox}>
          <Image
            source={user.avatar === "" ? "" : { uri: image }}
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
          <CustomButton
            buttonStyle={styles.uploadButton}
            textButton={"Avatar"}
            textButtonStyle={styles.uploadText}
            icon={true}
            iconName={"cloud-upload"}
            iconSize={25}
            iconColor={COLORS.secondary}
            functionality={() => {
              console.log(updateImage());
            }}
          />
        </View>
        <Pressable style={styles.editButton} onPress={() => router.push(ROUTES.DASHBOARD.EDIT_USER.replace(":id", uid))}>
          <MaterialIcons name="edit" size={25} color={COLORS.secondary} />
        </Pressable>
      </View>
      <View style={styles.profileDetails}>
        <Text style={styles.detailText}><Text style={{fontWeight:"bold"}}>Username: </Text>{user.username}</Text>
        <Text style={styles.detailText}><Text style={{fontWeight:"bold"}}>First Name: </Text>{user.firstName}</Text>
        <Text style={styles.detailText}><Text style={{fontWeight:"bold"}}>Last Name: </Text>{user.lastName}</Text>
        <Text style={styles.detailText}><Text style={{fontWeight:"bold"}}>Email:  </Text>{user.email}</Text>
      </View>
    </ScrollView>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  uploadButton: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    width: 113,
    height: 32.91,
    borderRadius: 5,
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: "5%",
  },
  uploadText: {
    color: COLORS.secondary,
    fontWeight: "700",
    fontSize: 18,
  },
  uploadBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "5%",
  },
  editButton: {
    backgroundColor: COLORS.primary,
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  profileDetails: {
    marginHorizontal: "5%",
  },
  detailText: {
    color: COLORS.primary,
    fontWeight: "400",
    fontSize: 18,
    marginVertical: "1%",
  },
});
