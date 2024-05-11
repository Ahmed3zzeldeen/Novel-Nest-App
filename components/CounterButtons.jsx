import {View , Text , StyleSheet} from 'react-native';
import COLORS from '@/constants/colors';
import { CustomButton } from '@/components';
import { useState , useLayoutEffect } from 'react';
import {  addToCart, removeFromCart, updateCartItemQuantity  } from '@/firebase/apis/carts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CounterButtons = ({ book , counterStyle , fetchCartItems }) => {

  const [counter , setCounter] = useState(0);
  const [user , setUser] = useState({
    uid: ''
  });
  const [itemId , setItemId] = useState('');

  const fetchCurrentUser = async () => {
    const userData = await AsyncStorage.getItem('user');
    const userObj = JSON.parse(userData);
    setUser(userObj);
  } 

  const handleAddToCart = async (book) => {
    const itemIdFromCart = await addToCart(user.uid , book , counter);
    setItemId(itemIdFromCart);
  }

  const handleIncreament = async () => {
    setCounter(counter + 1);
    if (counter === 1) {
      await handleAddToCart(book);
    }
    await updateCartItemQuantity(itemId , user.uid  , counter);
    if(fetchCartItems){
      fetchCartItems();
    }
  }

  const handleDecreament = async () => {
    setCounter(counter - 1);
    if (counter === 0) {
      await removeFromCart(user.uid , itemId);
      return;
    }
    await updateCartItemQuantity(itemId , user.uid  , counter);
    if(fetchCartItems){
      fetchCartItems();
    }
  }

  useLayoutEffect(() => {
    fetchCurrentUser();
  } , []);

  return (
    <View style={{ ...styles.counterButtons , ...counterStyle }}>
      <CustomButton
        buttonStyle={styles.circleButton}
        textButton={'-'}
        textButtonStyle={styles.circleButtonText}
        functionality={() => handleDecreament()}
      />
      <Text style={styles.counter}>{counter}</Text>
      <CustomButton
        buttonStyle={styles.circleButton}
        textButton={'+'}
        textButtonStyle={styles.circleButtonText}
        functionality={() => handleIncreament()}
      />
    </View>
  );
}

export default CounterButtons;

const styles = StyleSheet.create({
  counterButtons: {
    width: 152,
    height: 50,
    backgroundColor: COLORS.secondary,
    borderRadius: 14.61,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  circleButton: {
    backgroundColor: COLORS.primary,
    width: 38.96,
    height: 38.96,
    borderRadius: 50,

  },
  circleButtonText: {
    color: COLORS.secondary,
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
  },
  counter: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 30
  },
});