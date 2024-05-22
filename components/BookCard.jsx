import COLORS from "@/constants/colors";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "expo-router";
import ROUTES from "@/constants/routes";
import { CustomButton, CounterButtons } from "@/components";
import { addToCart, removeFromCart, getCart } from "@/firebase/apis/carts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { findUserByField } from "@/firebase/apis/users";

const BookCard = ({ book }) => {
  const [addToCartClicked, setAddToCartClicked] = useState(false);
  const [uid, setUid] = useState("");
  const [itemId, setItemId] = useState("");

  const router = useRouter();

  const cartButtonStyle = {
    backgroundColor: addToCartClicked ? COLORS.danger : COLORS.primary,
    textButton: addToCartClicked ? "Remove From Cart" : "Add To Cart",
  };

  const handleAddToCart = async () => {
    setItemId(await addToCart(book, uid, 1));
    setAddToCartClicked(true);
  };

  const handleRemoveFromCart = async () => {
    await removeFromCart(uid, itemId);
    setAddToCartClicked(false);
  };

  const fetchCurrentUser = async () => {
    const data = await AsyncStorage.getItem("user");
    const userData = JSON.parse(data);
    const userObj = await findUserByField("uid", userData.uid);
    if (userObj) {
      setUid(userObj.uid);
    }
  };

  useLayoutEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Pressable
      onPress={() =>
        router.navigate(ROUTES.PUBLIC.BOOK_DETAILS.replace(":id", book.bookId))
      }
    >
      <ImageBackground
        style={styles.container}
        source={{ uri: book.cover }}
        imageStyle={{
          borderRadius: 14,
        }}
      >
        <View style={styles.detailBackground}>
          <View>
            <Text style={styles.details}>
              Title : <Text style={styles.content}>{book.bookTitle}</Text>
            </Text>
            <Text style={styles.details}>
              Category: <Text style={styles.content}>{book.category}</Text>
            </Text>
            <Text style={styles.details}>
              Price: <Text style={styles.content}>{book.price}EGP</Text>
            </Text>
            <Text style={styles.details}>
              Pages: <Text style={styles.content}>{book.numOfPages}</Text>
            </Text>
          </View>
        </View>
        <Pressable
          style={styles.cartButton}
          onPress={
            addToCartClicked
              ? () => handleRemoveFromCart()
              : () => handleAddToCart()
          }
        >
          <View
            style={{
              ...styles.addToCartBox,
              backgroundColor: cartButtonStyle.backgroundColor,
            }}
          >
            <Text style={styles.cartText}>{cartButtonStyle.textButton}</Text>
          </View>
        </Pressable>
      </ImageBackground>
    </Pressable>
  );
};

export default BookCard;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 250,
    borderRadius: 14,
    margin: 5,
    justifyContent: "flex-end",
  },
  addToCartBox: {
    height: 40,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  cartText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.white,
  },
  detailBackground: {
    backgroundColor: COLORS.secondary,
    padding: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  details: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 10,
  },
  content: {
    fontWeight: "400",
  },
  buttonBox: {
    flexDirection: "row",
    width: "45%",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "1%",
  },
  circleButton: {
    backgroundColor: COLORS.primary,
    width: 25.55,
    height: 25.55,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  symbol: {
    color: COLORS.secondary,
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },
  bookCounter: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 15,
  },
});
