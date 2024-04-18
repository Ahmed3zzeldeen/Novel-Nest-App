import { StyleSheet, View, Text, Pressable, FlatList } from 'react-native'
import {React,useEffect,useState} from 'react'
import { useRouter } from 'expo-router';
import {get_users , find_user_by_id, find_user_by_email} from '../../firebase/apis/users';


const DashboardScreen = () => {

const [users,usersSet]=useState([]);
const [searchedUser, setSearchedUser]=useState();

const getUsers = async () => {
    try {

      const users = await get_users();
      usersSet(users);
      console.log("users from :" , users);
      return users;
    } catch (e) {
      console.error("couldn't get users", e);
    }
};


const getUserByEmail = async (email) => {
    try {

      const user = await find_user_by_email(email);
      setSearchedUser(user);
      console.log("searched in Dashboard:" , user);
      return user;
    } catch (e) {
      console.error("couldn't get users", e);
    }
};
useEffect(() => {
getUsers();
getUserByEmail("email@email");
},[]);


  const router = useRouter();
  return (
    <View style={styles.ScreenContainer}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Dashboard Home Page</Text>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.Text}>
          Go Back
        </Text>
      </Pressable>
      <Text>users show </Text>
       <FlatList
        data={users}
        renderItem={({ item }) => (
	    <Text>user : {item.id}</Text>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      {(searchedUser)? <Text>found a user: {searchedUser[0].id}</Text> : <Text>not a user{searchedUser}</Text>}

    </View>
  )
}

export default DashboardScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Text: {
    color: "#00f",
    fontWeight: "bold",
    marginTop: 10,
  },
});
