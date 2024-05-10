import {View , Text, StyleSheet , Image, Pressable, StatusBar , FlatList} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLayoutEffect, useState } from 'react';
import COLORS from '@/constants/colors';
import { BottomSheet , CustomButton, OrderCard } from '@/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { findUserByField, updateUser } from '../firebase/apis/users';
import { getLink, uploadImage, uplouadFile } from '@/firebase/apis/storage';


const ProfileScreen = () => {
  
  const [user , setUser] = useState({
    firstName: '',
    username: '',
    lastName: '',
    email: '',
    avatar: '',
    fullname: '',
    role: ''
  });
  const [orders , setOrders] = useState([
    {id: 1 , totalPayment: 100 , date: '15/4/2024'},
    {id: 2 , totalPayment: 100 , date: '15/4/2024'},
    {id: 3 , totalPayment: 100 , date: '15/4/2024'},
    {id: 4 , totalPayment: 100 , date: '15/4/2024'},
    {id: 5 , totalPayment: 100 , date: '15/4/2024'},
    {id: 6 , totalPayment: 100 , date: '15/4/2024'},
    {id: 7 , totalPayment: 100 , date: '15/4/2024'},
    {id: 8 , totalPayment: 100 , date: '15/4/2024'},
    {id: 9 , totalPayment: 100 , date: '15/4/2024'},
    {id: 10 , totalPayment: 100 , date: '15/4/2024'}
  ]);
  const [visible , setVisible] = useState(false);

  const fetchCurrentUser = async () => {
    const data = await AsyncStorage.getItem('user');
    const userData = JSON.parse(data);
    const userObj = await findUserByField('uid' , userData.uid);
    if (userObj) {
      setUser(userObj);
    }
  }

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: MediaTypeOptions.Images,
      aspec: [4 , 3],
      quality: 1
    });
    if (!result.canceled) { 
        const promise = await fetch(result.assets[0].uri);
        const blob  = promise.blob();
        const downloadURL = await uploadImage(`users/${user.uid}` , blob);
        user.avatar = downloadURL;
        updateUser(user.uid , {avatar: downloadURL});
    }
  }

  useLayoutEffect(() => {
    fetchCurrentUser();
  } , [])

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <View style={styles.profileHeader}>
        <View style={styles.uploadBox}>
          <Image 
            source={user.avatar === '' ? require('../assets/images/icons/profile.png') : {uri: user.avatar}}
            style={{width: 50 , height: 50 , borderRadius: 50}}  
          />
          <CustomButton
            buttonStyle={styles.uploadButton}
            textButton={'Avatar'}
            textButtonStyle={styles.uploadText}
            icon={true}
            iconName={'cloud-upload'}
            iconSize={25}
            iconColor={COLORS.secondary}
            functionality={() => pickImage()}
          />
        </View>
        <Pressable style={styles.editButton} onPress={() => setVisible(true)}>
          <MaterialIcons 
            name='edit'
            size={25}
            color={COLORS.secondary}
          />
        </Pressable>
      </View>
      <View style={styles.profileDetails}>
        <Text style={styles.detailText}>Username: {user.username}</Text>
        <Text style={styles.detailText}>First Name: {user.firstName}</Text>
        <Text style={styles.detailText}>Last Name: {user.lastName}</Text>
        <Text style={styles.detailText}>Email: {user.email}</Text>
      </View>
      <Text style={styles.ordersText}>My Orders:</Text>
      <FlatList 
        data={orders}
        renderItem={({item}) => (<OrderCard order={item}/>)}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      {visible && <BottomSheet modalVisibility={setVisible}/>}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    width: 113,
    height: 32.91,
    borderRadius: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: '5%'
  },
  uploadText: {
    color: COLORS.secondary,
    fontWeight: '700',
    fontSize: 18
  },
  uploadBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '5%'
  },
  editButton: {
    backgroundColor: COLORS.primary,
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileDetails: {
    marginHorizontal: '5%'
  },
  detailText: {
    color: COLORS.primary,
    fontWeight: '400',
    fontSize: 18,
    marginVertical: '1%'
  },
  ordersText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 20,
    margin: '5%'
  }
}); 