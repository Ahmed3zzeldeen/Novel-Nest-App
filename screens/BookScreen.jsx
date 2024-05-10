import COLORS from '@/constants/colors';
import {View , Text, StyleSheet , Image} from 'react-native';
import { CustomButton } from '@/components';
import { useState } from "react";

const BookScreen = ({ book , addToCartClicked }) => {

  const [counter , setCounter] = useState(0);
  const [addToCart , setAddToCart] = useState(false);

  const cartButtonStyle = {
    text: addToCart? 'Remove From Cart' : 'Add To Cart'
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image
          source={require('../assets/images/icons/cover 1.png')}
          style={{
            width: 200 , 
            height: 311.11 , 
            borderRadius: 13.8 , 
          }}
        />
      </View>
      <View style={styles.contentBox}>
        <View style={styles.details}>
          <View style={styles.dataBox}>
            <Text style={styles.data}><Text style={styles.header}>Book Title:</Text> book title</Text>
            <Text style={styles.data}><Text style={styles.header}>Author:</Text> Islam Shaker</Text>
            <Text style={styles.data}><Text style={styles.header}>Category:</Text> Drama</Text>
            <Text style={styles.data}><Text style={styles.header}>Pages:</Text> 140</Text>
            <Text style={styles.data}><Text style={styles.header}>Price:</Text> 100$</Text>
            <Text style={styles.data}><Text style={styles.header}>ISBN:</Text> 48375893284</Text>
          </View>
          <View style={styles.buttonsBox}>
            <View style={styles.counterButtons}>
              <CustomButton
                buttonStyle={styles.circleButton}
                textButton={'-'}
                textButtonStyle={styles.circleButtonText}
                functionality={counter === 0? () => setCounter(0) : () => setCounter(counter - 1)}
              />
              <Text style={styles.counter}>{counter}</Text>
              <CustomButton
                buttonStyle={styles.circleButton}
                textButton={'+'}
                textButtonStyle={styles.circleButtonText}
                functionality={() => setCounter(counter + 1)}
              />
            </View>
            <CustomButton
              buttonStyle={styles.button}
              textButton={cartButtonStyle.text}
              textButtonStyle={styles.textButton}
              functionality={addToCart ?() => setAddToCart(false) : () => setAddToCart(true)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default BookScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  dataBox: {
    marginHorizontal: '5%',
    marginTop: '2%'
  },
  imageBox: {
    borderRadius: 13.8 ,
    borderBottomWidth: 5,
    borderColor: 'rgba(0 , 0 , 0 , 0.25)',
    marginVertical: '6%'
  },
  contentBox: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 400,
    borderTopLeftRadius: 13.8,
    borderTopRightRadius: 13.8,
  },
  details: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 13.8,
    borderTopRightRadius: 13.8,
    marginTop: '2%'
  },
  header: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 18
  },
  data: {
    color: COLORS.white,
    fontWeight: '400',
    fontSize: 16,
    marginVertical: '1%' 
  },
  button: {
    backgroundColor: COLORS.secondary,
    width: 152,
    height: 50
  },
  textButtonStyle: {
    color: COLORS.primary
  },
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
    fontSize: 30,
    textAlign: 'center',
  },
  counter: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 30
  },
  buttonsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginTop: '17%'
  },
  textButton: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 18
  }
});