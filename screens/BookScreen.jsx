import COLORS from '@/constants/colors';
import {View , Text, StyleSheet , Image} from 'react-native';
import { CustomButton , CounterButtons } from '@/components';
import { useState , useLayoutEffect } from "react";
import { addToCart } from '@/firebase/apis/carts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findBookById } from '@/firebase/apis/books';


const BookScreen = ({ id }) => {

  const [addToCartClicked , setAddToCartClicked] = useState(false);
  const [uid , setUid] = useState('');
  const [book , setBook] = useState({
    ISBN: '',
    author: '',
    bookId: '',
    bookTitle: '',
    category: '',
    cover: '',
    numOfPages: '',
    price: '',
    rate: ''
  });
  
  const cartButtonStyle = {
    text: addToCartClicked? 'Remove From Cart' : 'Add To Cart'
  }

  const fetchCurrentUser = async () => {
    const userData = await AsyncStorage.getItem('user');
    const userObj = JSON.parse(userData);
    setUid(userObj.uid);
  }

  const handleRemoveFromCart = async () => {
    setAddToCartClicked(false);
  }

  const handleAddToCart = async () => {
    await addToCart(book , uid , 1);
    setAddToCartClicked(true);
  }

  const fetchBook = async () => {
    console.log("id " ,  id);
    const bookData = await findBookById(id);
    setBook(bookData);
  }

  useLayoutEffect(() => {
    fetchCurrentUser();
    fetchBook();
  } , []);

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image
          source={book.cover ? {uri: book.cover} : ''}
          style={{
            width: 200 , 
            height: 311.11 , 
            borderRadius: 14 , 
          }}
        />
      </View>
      <View style={styles.contentBox}>
        <View style={styles.details}>
          <View style={styles.dataBox}>
            <Text style={styles.data}><Text style={styles.header}>Book Title:</Text> {book.bookTitle}</Text>
            <Text style={styles.data}><Text style={styles.header}>Author:</Text> {book.author}</Text>
            <Text style={styles.data}><Text style={styles.header}>Category:</Text> {book.category}</Text>
            <Text style={styles.data}><Text style={styles.header}>Pages:</Text> {book.numOfPages}</Text>
            <Text style={styles.data}><Text style={styles.header}>Price:</Text> {book.price} EGP</Text>
            <Text style={styles.data}><Text style={styles.header}>ISBN:</Text> {book.ISBN}</Text>
          </View>
          <View style={styles.buttonsBox}>
            <CustomButton
              buttonStyle={styles.button}
              textButton={cartButtonStyle.text}
              textButtonStyle={styles.textButton}
              functionality={addToCartClicked ? () => handleRemoveFromCart() : () => handleAddToCart()}
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
    borderRadius: 14 ,
    borderBottomWidth: 5,
    borderColor: 'rgba(0 , 0 , 0 , 0.25)',
    marginVertical: '6%'
  },
  contentBox: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 400,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  details: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
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