import { StyleSheet, View, Text, Pressable, FlatList , TextInput,Button,Image} from 'react-native'
import {React,useEffect,useState} from 'react'
import { useRouter } from 'expo-router';
import {get_users , find_user_by_id, find_user_by_email , del_useri , find_user_by_user_name} from '../../firebase/apis/users';
import l from '../../assets/images/icon.png';
import ROUTES from  '../../constants/routes';


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

const buttons  = [
	{pressed : false,id : 1,text : "ADMIN \nProfile" ,image:l},
	{pressed : false,id : 2,text : "Manage \nUSERS" ,image:l},
	{pressed : false,id : 3,text : "Manage \nBOOKS" ,image:l},
	{pressed : false,id : 4,text : "Manage \nORDERS" ,image:l},
]
const handlePress =  (id) => {
    switch (id) {
    	case 1:
    		router.push(ROUTES.DASHBOARD.PROFILE);
    		break;

    	case 2:
    		router.push(ROUTES.DASHBOARD.MANAGE_USERS);
    		break;
    	case 3:
    		router.push(ROUTES.DASHBOARD.MANAGE_BOOKS);
    		break;
    	case 4:
    		router.push(ROUTES.DASHBOARD.MANAGE_ORDERS);
    		break;
    	case 5:
    		router.replace(ROUTES.AUTH.SIGN_OUT);
    		break;
    	default:
    		break;
    }
};

useEffect(() => {
},[]);

useEffect(() => {
setDelUser(inputText);
},[inputText]);

const router = useRouter();

const Item = ({text , img  , id}) =>{
  return (
      <View  >
	  <Pressable style ={styles.Button} onPress = {()=>{handlePress(id)}}>
		<Image source={img}
		style = {{width:90,height:90, marginRight: 20}}
		/>
		<Text style = {styles.Text}>{text}</Text>
	      </Pressable>
      </View>
  );
}

  return (
    <View style={styles.ScreenContainer}>
      <Pressable onPress = {()=>{handlePress(5)}}><Text style = {{color:"#29648f" , fontSize:20 , alignSelf:"flex-end"}}>logout</Text></Pressable>
       <FlatList
        data={buttons}
        renderItem={({item}) => (
	     <Item id = {item.id} img = {item.image} text = {item.text}pressed = {item.pressed}></Item>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default DashboardScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f7f0e8",
  },
  Button:{
    flex: 1 , 
    flexDirection : "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eadecf",
    margin: 20,
    borderRadius: 10,
  },
  Text: {
    color: "#29648f",
    fontSize : 50,
    fontWeight: "bold",
    marginTop: 10,
  },
    ButtonsList:{
    width: '85%',
    }
});
