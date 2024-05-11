import {
  CustomButton,
  ShoppingBookCard,
  CustomPopup,
  CounterButtons,
} from "@/components";
import COLORS from "@/constants/colors";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "expo-router";
import ROUTES from "@/constants/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCartItems , deleteCart} from "@/firebase/apis/carts";
import { initOrder } from "@/firebase/apis/orders";

const CartScreen = () => {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [cancelPopup, setCancelPopup] = useState(false);
  const [invoicePopup, setInvoicePopup] = useState(false);
  const [purchasePopup, setPurchasePopup] = useState(false);
  const [numberOfBooks, setNumberOfBooks] = useState(0);

  const handlePressCancelButton1 = () => {
    setCancelPopup(false);
  };

  const handlePressCancelButton2 = () => {
    setCancelPopup(false);
    router.replace(ROUTES.PUBLIC.HOME);
  };

  const handlePressPurchaseButton1 = () => {
    setPurchasePopup(false);
  };

  const handlePressPurchaseButton2 = async () => {
    setPurchasePopup(false);
    let temp = []
    cart.forEach(element => {
	temp.push(element);
    	console.log ("cart" , element);
    });
    await deleteCart(user.uid);
    const createOrder = await initOrder (user.uid, temp);
  };

  const handlePressInvoiceButton1 = () => {
    setInvoicePopup(false);
  };

  const handlePressInvoiceButton2 = () => {
    setInvoicePopup(false);
    setPurchasePopup(true);
  };

  const fetchCurrentUser = async () => {
    const userData = await AsyncStorage.getItem("user");
    const user = JSON.parse(userData);
    setUser(user);
    const data = await getCartItems(user?.uid);
    console.log("Cart Items: ", data);
    setCart(data);
  };

  useLayoutEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <>
      <View style={styles.container}>
        {cart.length === 0 ? (
          <View
            style={{
              flex: 1,
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>Your Cart is Empty!</Text>
          </View>
        ) : (
          <FlatList
            style={styles.cartList}
            data={cart}
            renderItem={({ item }) => <ShoppingBookCard book={item} itemId={item.itemId} userId={user.uid} rerenderCarts={fetchCurrentUser} />}
            keyExtractor={(item) => item.bookId}
            showsVerticalScrollIndicator={false}
          />
        )}
        {cart.length !== 0 ? (
          <View style={styles.buttons}>
            <CustomButton
              buttonStyle={styles.cancel}
              textButton={"Cancel"}
              textButtonStyle={styles.textButton}
              functionality={() => setCancelPopup(true)}
            />
            <CustomButton
              buttonStyle={styles.invoice}
              textButton={"Invoice"}
              textButtonStyle={styles.textButton}
              functionality={() => setInvoicePopup(true)}
            />
          </View>
        ) : null}
      </View>
      {purchasePopup && (
        <CustomPopup
          title={"Purchase"}
          message={"Purchase Done! do you want to go home page?"}
          button1Style={{ ...styles.cancel, width: 83 }}
          button2Style={{ ...styles.invoice, width: 83 }}
          textButton1={"No"}
          textButton2={"Yes"}
          button1Function={handlePressPurchaseButton1}
          button2Function={handlePressPurchaseButton2}
          popupStyle={styles.popup}
        />
      )}
      {cancelPopup && (
        <CustomPopup
          title={"Cancel Confirmation"}
          message={"Are you sure you want to Cancel?"}
          button1Style={{ ...styles.cancel, width: 83 }}
          button2Style={{ ...styles.invoice, width: 83 }}
          textButton1={"No"}
          textButton2={"Yes"}
          button1Function={handlePressCancelButton1}
          button2Function={handlePressCancelButton2}
          popupStyle={styles.popup}
        />
      )}
      {invoicePopup && (
        <CustomPopup
          title={"Order"}
          message={
            "Number Of Books: " +
            numberOfBooks +
            " Books\nDate: 15/4/2024\nTotal: 1000$"
          }
          button1Style={styles.cancel}
          button2Style={{ ...styles.invoice, width: 91 }}
          textButton1={"Cancel"}
          textButton2={"Buy"}
          button1Function={handlePressInvoiceButton1}
          button2Function={handlePressInvoiceButton2}
          popupStyle={styles.popup}
        />
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: "5%",
  },
  cartList: {
    height: "85%",
    marginTop: "5%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "6%",
  },
  invoice: {
    backgroundColor: COLORS.success,
    width: 117,
  },
  cancel: {
    backgroundColor: COLORS.danger,
    width: 117,
  },
  textButton: {
    color: COLORS.white,
  },
  popup: {
    height: "100%",
    top: 0,
  },
});
