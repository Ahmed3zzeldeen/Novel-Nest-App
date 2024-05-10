import COLORS from '@/constants/colors'; 
import {View , Text , StyleSheet , Image} from 'react-native';
import CustomButton from './CustomButton';
import { useState } from 'react';

const ShoppingBookCard = ({ book }) => {

  const [counter , setCounter] = useState(0);
  
  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image 
          source={book.cover}
          style={{width: 92 , height: 147}}
        />
      </View>
      <View style={styles.contentBox}>
        <View>
          <Text style={styles.text}>Book Title: {book.bookTitle}</Text>
          <Text style={styles.text}>Price: {book.price}EGP</Text>
          <Text style={styles.text}>Quantity: 2</Text>
          <Text style={styles.text}>ISBN: {book.ISBN}</Text>
        </View>
        <View style={styles.buttons}>
          <CustomButton
            buttonStyle={styles.circleButton}
            icon={true}
            iconName={'trash'}
            iconColor={COLORS.secondary}
            iconSize={20}
          />
          <View style={styles.counterButtons}>
            <CustomButton
              buttonStyle={styles.circleButton}
              textButton={'-'}
              textButtonStyle={styles.textCircleButton}
              functionality={counter === 0 ? () => setCounter(0) : () => setCounter(counter - 1)}
            />
            <Text style={styles.counter}>{counter}</Text>
            <CustomButton
              buttonStyle={styles.circleButton}
              textButton={'+'}
              textButtonStyle={styles.textCircleButton}
              functionality={() => setCounter(counter + 1)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ShoppingBookCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    width: '100%',
    height: 160.86,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '5%',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  imageBox: {
    justifyContent: 'center',
    borderRadius: 5,
    marginLeft: '2%'
  },
  contentBox: {
    flex: 1,
    marginHorizontal: '3%',
    height: 147,
    justifyContent: 'space-between'
  },
  text: {
    color: COLORS.primary,
    fontWeight: '400',
    fontSize: 16
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
  },
  textCircleButton: {
    color: COLORS.secondary,
    fontWeight: '700',
    fontSize: 25,
  },
  counterButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  counter: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 32,
    marginHorizontal: '5%'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});