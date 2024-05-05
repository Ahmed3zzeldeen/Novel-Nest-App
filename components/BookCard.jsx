import COLORS from '@/constants/colors';
import {View , Text, StyleSheet, ImageBackground, Pressable} from 'react-native';
import { useState } from 'react';
const BookCard = ({ cover, numOfPages, price, ISBN, author, bookTitle, rate, category  }) =>{ 
  let [numOfBooks, setNumOfBooks] = useState(0);
  return (
    <Pressable>
      <ImageBackground 
        style={styles.container}
        source={cover}
        imageStyle={{
          borderRadius: 13.8,    
        }}
      >
        <View style={styles.detailBackground}>
          <View>
            <Text style={styles.details}>Category: <Text style={styles.content}>{category}</Text></Text>
            <Text style={styles.details}>Price: <Text style={styles.content}>{price}EGP</Text></Text>
            <Text style={styles.details}>Pages: <Text style={styles.content}>{numOfPages}</Text></Text>
          </View>
          <View style={styles.buttonBox}>
            <Pressable style={styles.circleButton}>
              <Text style={styles.symbol} onPress={() => {numOfBooks === 0 ? setNumOfBooks(0): setNumOfBooks(--numOfBooks)}}>-</Text>
            </Pressable>
            <View>
              <Text style={styles.bookCounter}>{numOfBooks}</Text>
            </View>
            <Pressable style={styles.circleButton} onPress={() => {setNumOfBooks(++numOfBooks)}}>
              <Text style={styles.symbol}>+</Text>
            </Pressable>
          </View>
        </View>
        <Pressable style={styles.cartButton}>
          <View style={styles.addToCartBox}>
            <Text style={styles.cartText}>Add To Cart</Text>
          </View>
        </Pressable>
      </ImageBackground>
    </Pressable>
  );
}

export default BookCard;

const styles = StyleSheet.create({
  container: {
    width: 167,
    height: 250,
    borderRadius: 13.8,
    marginHorizontal: '1.71%',
    marginBottom: 10,
    justifyContent: 'flex-end'
  },
  addToCartBox: {
    height: 40,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 13.8,
    borderBottomRightRadius: 13.8
  },
  cartText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white
  },
  detailBackground: {
    backgroundColor: COLORS.secondary,
    padding: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  details: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 10
  },
  content: {
    fontWeight: '400'
  },
  buttonBox: {
    flexDirection: 'row',
    width: '45%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '1%'
  },
  circleButton: {
    backgroundColor: COLORS.primary,
    width: 25.55,
    height: 25.55,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  symbol: {
    color: COLORS.secondary,
    fontWeight: '800',
    fontSize: 15
  },
  bookCounter: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 15
  }
});