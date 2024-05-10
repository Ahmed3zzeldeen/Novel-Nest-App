import {View , Text , Pressable , StyleSheet} from 'react-native';
import { useRouter } from 'expo-router';
import COLORS from '@/constants/colors';
import { useLayoutEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import ROUTES from '@/constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';



const CartIconCounter = ({counterBoxStyle , counterTextStyle , cartBoxStyle}) => {

  const [counter , setCounter] = useState(0);  
  const [uid , setUid] = useState(null);
  const router = useRouter();

  const fetchCurrentUserId = async () => {
    const data = await AsyncStorage.getItem('user');
    const user = JSON.parse(data);
    console.log('user' , user);
    if (user) {
      setUid(user.uid);
    }
  }

  useLayoutEffect(() => {
    fetchCurrentUserId();
  } , []);

  return (
    <Pressable style={{ ...styles.cartBox , ...cartBoxStyle }} onPress={() => router.push(ROUTES.PUBLIC.CART)}>
      <View 
            style={{
                width: 35.71, 
                height: 31.7,
            }}
            
        >
          <FontAwesome5
            name={'shopping-cart'}
            size={30}
            color={COLORS.secondary}
          />
          <View style={{ ...styles.counter , ...counterBoxStyle }}>
              <Text style={{ ...styles.counterText , ...counterTextStyle }}>{counter}</Text>
          </View>
      </View>
    </Pressable>
  )
}

export default CartIconCounter;

const styles = StyleSheet.create({
  counterText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700'
  },
  counter: {
    width: 21.43,
    height: 21.43,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    right: 25,
    bottom: 20
  },
});
