import {
	Pressable,
	StyleSheet,
	View,
	Text,
	FlatList,
	Image,
	Alert,
} from "react-native";
import { React, useEffect, useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome6 } from "@expo/vector-icons";
import ROUTES from "../../constants/routes";
import { router } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from "react-native";
import { uplouadFile, getLink } from "../../firebase/apis/storage";
import COLORS from "@/constants/colors";
import profilePic from "../../assets/images/icons/iconPlaceHolder.png"
import { CustomTextInput, CustomButton } from "@/components";
import { register, logout } from "../../firebase/apis/auth";
import { findUserById, updateUserImage, updateUser } from "../../firebase/apis/users";
import USER_ROLES from "@/constants/userRoles";

const EditUserScreen = ({ userId }) => {
	const [usernameInput, setUsernameInput] = useState("");
	const [firstNameInput, setFirstNameInput] = useState("");
	const [lastNameInput, setLastNameInput] = useState("");
	const [role, setRole] = useState("");
	const [image, setImage] = useState(null);
	const [selectedImage, setSelectedImage] = useState(false);
	const [error, setError] = useState(null);
	//require users from the database

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,

		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
			setSelectedImage(true);
		}
	};


	const updateUserHandler = async () => {
		try {
			if (usernameInput && firstNameInput && lastNameInput && role) {
				let uid = userId;
				let user = { username: usernameInput, firstName: firstNameInput, lastName: lastNameInput, fullName: `${firstNameInput} ${lastNameInput}`, role: role };
				await updateUser(uid, user);
				await setToAsyncStorage(user);
				if (selectedImage && image) {
					const response = await fetch(image);
					const blob = await response.blob();
					const ref = await uplouadFile(`users/${uid}`, blob);
					const url = (await getLink(ref.ref));
					await updateUserImage(uid, url);
				}
				else {
					updateUserImage(uid, "https://www.gravatar.com/avatar/");
				}
			}
			else {
				throw new Error('Enter complete data please');
			}
		} catch (e) {
			setError(e);
		}
	}

	const fetchUser = async () => {
		const userData = await findUserById(userId);
		if (userData) {
			setUsernameInput(userData.username);
			setFirstNameInput(userData.firstName);
			setLastNameInput(userData.lastName);
			setRole(userData.role);
			setImage(userData.avatar);
		}
	}

	const setToAsyncStorage = async (userData) => {
		await AsyncStorage.setItem("user", JSON.stringify(userData));
		if (userData.role === USER_ROLES.USER) {
			router.replace(ROUTES.PUBLIC.HOME);
		} else {
			router.push(ROUTES.DASHBOARD.EDIT_USER.replace(':id', userId));
		}

	}

	useLayoutEffect(() => {
		fetchUser();
	}, []);

	useEffect(() => {
		if (error !== null) {
			alert(`${error}`);
		}
	}, [error]);
	return (
		<ScrollView showsVerticalScrollIndicator={false} style={styles.screenContainer}>
			<View style={styles.buttonsArea}>
				<Pressable
					style={{ alignSelf: "flex-end", margin: 10 }}
					onPress={() => {
					    logout();
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
			</View>
			<View style={styles.inputsArea}>
				<View style={styles.firstRow}>
					<CustomTextInput label="First Name:" placeholder="Robert" value={firstNameInput} onChangeText={(e) => setFirstNameInput(e)} />
					<CustomTextInput label="Last Name:" placeholder="martin" value={lastNameInput} onChangeText={(e) => setLastNameInput(e)} />
				</View>
				<CustomTextInput label="Username:" placeholder="RobertMartin123" value={usernameInput} onChangeText={(e) => setUsernameInput(e)} />
				<CustomTextInput.Select secureTextEntry={true} label="Role" placeholder="Role" value={""} items={[{ label: "Admin", value: "ADMIN" }, { label: "User", value: "USER" }]} onValueChange={(e) => (e) ? setRole(e) : null} />
			</View >
			<View style={styles.optionButtons}>
				<CustomButton
					buttonStyle={{ backgroundColor: COLORS.danger }}
					textButton={'Cancel'}
					functionality={() => { router.back(); }}
					textButtonStyle={{ color: COLORS.white }}
				/>
				<CustomButton
					buttonStyle={{ backgroundColor: COLORS.success }}
					textButton={'Save'}
					functionality={() => { updateUserHandler(); }}
					textButtonStyle={{ color: COLORS.white }}
				/>
			</View>
		</ScrollView>
	);
};

export default EditUserScreen;

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
		minHeight: 67,
		gap: 10
	},
	inputsArea: {
		marginTop: 30,
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
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 30,
		alignItems: "center"

	}

});

