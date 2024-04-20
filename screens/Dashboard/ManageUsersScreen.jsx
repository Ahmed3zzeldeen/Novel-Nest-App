import {Pressable, StyleSheet, View, Text,FlatList , Image} from 'react-native';
import { React, useEffect, useState} from "react";
import { FontAwesome5, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import ROUTES from "../../constants/routes";
import { router } from "expo-router";
import {getUsers} from '../../firebase/apis/users'
import { SafeAreaView } from 'react-native-safe-area-context';


const ManageUsersScreen = () => {
  const Item = ({ text, img, id, email }) => {
    return (
      <View style={styles.userCard}>
        <Image source={{ uri: img }} style={{ width: 50, height: 50  , alignSelf : "flex-start" , margin : 10}}/> 
	<View style = {styles.infoCard}>
          <Text style={styles.Text}>{text}</Text>
          <Text style={styles.Text}>{email}</Text>
	</View>
	<View>
	    <Pressable style = {{alignSelf : "flex-end"}}>
	      <FontAwesome
		name="trash"
		size={24}
		color="#29648F"
		style={{ margin: 10 }}
	      />
	    </Pressable>
	    <Pressable style = {{}}>
	      <FontAwesome
		name="pencil-square"
		size={24}
		color="#29648F"
		style={{ margin: 10 }}
	      />
	    </Pressable>
	</View>
	
      </View>
    );
  };

  const [users,setUsers] =useState();
  //require users from the database
  const reqUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
        console.log("users from :" , users);
        return users;
      } catch (e) {
        console.error("couldn't get users", e);
      }
  };
  useEffect(() => {
      reqUsers();
  }, []);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Pressable
      style = {{alignSelf:"flex-end", margin : 10}}
        onPress={() => {
	    router.replace(ROUTES.AUTH.SIGN_OUT);
        }}
      >
        <Text style={{ color: "#29649f", fontSize: 20 }}>
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
        data={users}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            img={item.image}
            text={item.user_name}
            email={item.email}
          ></Item>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default ManageUsersScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f7f0e8",
  },
  text: {
    color: "#29648f",
    fontSize: 24, // Adjusted for more standard viewing
    fontWeight: "bold",
  },
  userCard: {
      flex : 1 , 
      alignSelf: "center",
      margin: 10 ,
      backgroundColor  : "#eadecf",
      flexDirection : "row",
      flexWrap : "wrap" , 
      width: '85%' ,
      maxWidth: 350, 
  },
  infoCard:{
    flex: 1,
    margin : 10 ,
  },
  Text:{
    color: "#29648F"
  }
});
