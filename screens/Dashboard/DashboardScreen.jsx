import { StyleSheet, View, Text, Pressable, FlatList } from 'react-native'
import {React,useEffect,useState} from 'react'
import { useRouter } from 'expo-router';
import {get_users} from '../../firebase/apis/users';

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

const DashboardScreen = () => {

[users,usersSet]=useState([]);

useEffect(() => {
getUsers();
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
       <FlatList
        data={users}
        renderItem={({ item }) => (
	    <Text>{item.id}</Text>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

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
