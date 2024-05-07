import {View , Text , Pressable , ImageBackground , StyleSheet} from 'react-native';
import { useRouter } from 'expo-router';
import COLORS from '@/constants/colors';
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';



const CartIconCounter = ({counterBoxStyle , counterTextStyle , cartBoxStyle}) => {

  const [counter, setCounter] = useState(0);

  return (
    <Pressable style={{ ...styles.cartBox , ...cartBoxStyle }}>
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