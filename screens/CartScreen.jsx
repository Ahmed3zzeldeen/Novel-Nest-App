import { CustomButton , ShoppingBookCard , CustomPopup} from '@/components';
import COLORS from '@/constants/colors';
import {View , Text , StyleSheet , FlatList} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import ROUTES from '@/constants/routes';
import { ScrollView } from 'react-native-web';

const CartScreen = () => {

  const router = useRouter();
  const [cart , setCart] = useState([
    {ISBN:1 , cover: require('../assets/images/icons/cover 1.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:2 , cover: require('../assets/images/icons/cover 2.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:3 , cover: require('../assets/images/icons/cover 3.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:4 , cover: require('../assets/images/icons/cover 1.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:5 , cover: require('../assets/images/icons/cover 2.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:6 , cover: require('../assets/images/icons/cover 3.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'}
  ]);
  const [cancelPopup , setCancelPopup] = useState(false);
  const [invoicePopup , setInvoicePopup] = useState(false);
  const [purchasePopup , setPurchasePopup] = useState(false);
  const [numberOfBooks , setNumberOfBooks] = useState(() => {
    let books = 0;
    cart.forEach((book) => (books += 1));
    return books;
  })

  const handlePressCancelButton1 = () => {
    setCancelPopup(false);
  };
  
  const handlePressCancelButton2 = () => {
    setCancelPopup(false);
    router.back();
  };

  const handlePressPurchaseButton1 = () => {
    setPurchasePopup(false);
  };
  
  const handlePressPurchaseButton2 = () => {
    setPurchasePopup(false);
    router.replace(ROUTES.PUBLIC.HOME)
  };

  const handlePressInvoiceButton1 = () => {
    setInvoicePopup(false);
  };
  
  const handlePressInvoiceButton2 = () => {
    setInvoicePopup(false);
    setPurchasePopup(true);
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          style={styles.cartList}
          data={cart}
          renderItem={({item}) => (<ShoppingBookCard book={item}/>)}
          keyExtractor={(item) => item.ISBN}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.buttons}>
          <CustomButton
            buttonStyle={styles.cancel}
            textButton={'Cancel'}
            textButtonStyle={styles.textButton}
            functionality={() => setCancelPopup(true)}
          />
          <CustomButton
            buttonStyle={styles.invoice}
            textButton={'Invoice'}
            textButtonStyle={styles.textButton}
            functionality={() => setInvoicePopup(true)}
            />
        </View>
      </View>
      {purchasePopup && <CustomPopup
        title={'Purchase'}
        message={'Purchase Done! do you want to go home page?'}
        button1Style={{ ...styles.cancel , width: 83 }}
        button2Style={{ ...styles.invoice , width: 83 }}
        textButton1={'No'}
        textButton2={'Yes'}
        button1Function={handlePressPurchaseButton1}
        button2Function={handlePressPurchaseButton2}
        popupStyle={styles.popup}
        />}
      {cancelPopup && <CustomPopup
        title={'Cancel Confirmation'}
        message={'Are you sure you want to Cancel?'}
        button1Style={{ ...styles.cancel , width: 83 }}
        button2Style={{ ...styles.invoice , width: 83 }}
        textButton1={'No'}
        textButton2={'Yes'}
        button1Function={handlePressCancelButton1}
        button2Function={handlePressCancelButton2}
        popupStyle={styles.popup}
        />}
      {invoicePopup && <CustomPopup
        title={'Order'}
        message={'Number Of Books: ' + numberOfBooks + ' Books\nDate: 15/4/2024\nTotal: 1000$'}
        button1Style={styles.cancel}
        button2Style={{...styles.invoice , width: 91}}
        textButton1={'Cancel'}
        textButton2={'Buy'}
        button1Function={handlePressInvoiceButton1}
        button2Function={handlePressInvoiceButton2}
        popupStyle={styles.popup}
        />}

    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
  },
  cartList: {
    height: '85%',
    marginTop: '5%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '6%'
  },
  invoice: {
    backgroundColor: COLORS.success,
    width: 117
  },
  cancel: {
    backgroundColor: COLORS.danger,
    width: 117
  },
  textButton: {
    color: COLORS.white
  },
  popup: {
    height: '100%',
    top: 0
  }
})