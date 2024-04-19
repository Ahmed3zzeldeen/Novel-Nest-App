import { StyleSheet, View, Text, Pressable, FlatList , TextInput,Button} from 'react-native'
import {React,useEffect,useState} from 'react'
import { useRouter } from 'expo-router';
import {get_users , find_user_by_id, find_user_by_email , del_useri , find_user_by_user_name} from '../../firebase/apis/users';


const DashboardScreen = () => {

const [users,usersSet]=useState([]);
const [searchedUser, setSearchedUser]=useState();
const [deluser, setDelUser]=useState();
const [inputText, setInputText] = useState('');

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

const delUserById = async () => {
    try {

      const response = await del_user(deluser);
      await getUsers();
      console.log("deleted user" , response);
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


const getUserByUserName = async (userName) => {
    try {

      const user = await find_user_by_user_name(userName);
      setSearchedUser(user);
      console.log("searched in Dashboard:" , user);
      return user;
    } catch (e) {
      console.error("couldn't get users", e);
    }
};

const getUserById = async (uid) => {
    try {

      const user = await find_user_by_id(uid);
      setSearchedUser(user);
      console.log("searched in Dashboard:" , user);
      return user;
    } catch (e) {
      console.error("couldn't get users", e);
    }
};


useEffect(() => {
getUserByUserName('philo');
},[]);

useEffect(() => {
setDelUser(inputText);
},[inputText]);

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
      {(searchedUser)? <Text>found a user: {searchedUser.id}</Text> : <Text>not a user{searchedUser}</Text>}

      <View >
        <Button title="delete user" onPress={delUserById} />
        <TextInput
          placeholder="delete user"
          onChangeText={text => setInputText(text)}
          value={inputText}
        />
      </View>
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
