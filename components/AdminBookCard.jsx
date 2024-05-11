import COLORS from "@/constants/colors";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import ROUTES from "@/constants/routes";

const AdminBookCard = ({
  cover,
  numOfPages,
  price,
  ISBN,
  author,
  bookTitle,
  rate,
  category,
  bookId,
  handleDeletBook,
}) => {
  const router = useRouter();

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.navigate(ROUTES.DASHBOARD.EDIT_BOOK.replace(":id", bookId))
      }
    >
      <ImageBackground
        style={styles.container}
        source={cover}
        imageStyle={{
          borderRadius: 14,
        }}
      >
        <View style={styles.detailBackground}>
          <View style={{ width: "100%" }}>
            <Text style={styles.details}>Title: <Text style={styles.content}>{bookTitle}</Text> </Text>
            <Text style={styles.details}>
              Category: <Text style={styles.content}>{category}</Text>
            </Text>
            <Text style={styles.details}>
              Price: <Text style={styles.content}>{price}EGP</Text>
            </Text>
            <Text style={styles.details}>
              Pages: <Text style={styles.content}>{numOfPages}</Text>
            </Text>
          </View>
        </View>
        <Pressable
          style={styles.cartButton}
          onPress={() => handleDeletBook(bookId)}
        >
          <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
            {" "}
            Delete Book{" "}
          </Text>
        </Pressable>
      </ImageBackground>
    </Pressable>
  );
};

export default AdminBookCard;

const styles = StyleSheet.create({
  container: {
    width: 167,
    height: 250,
    borderRadius: 14,
    marginHorizontal: 20,
    marginBottom: 20,
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
    overflow: "hidden",
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
  cartButton: {
    width: "auto",
    height: 50,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.danger,
  },
});
