import {
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Text,
  View,
  StatusBar,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import { React, useState, useEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import * as ImagePicker from "expo-image-picker";
import myPicture from "../../../assets/images/icons/cover 2.png";
import { createBook, updateBook } from "@/firebase/apis/books";
import { getLink, uplouadFile } from "@/firebase/apis/storage";
import { setBooks } from "@/firebase/seeds/seedData";

export default function ListOfBooks() {
  const [ISBN, setISBN] = useState("");
  const [author, setAuthor] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [price, setPrice] = useState("");
  const [numOfPages, setNumOfPages] = useState(0);
  const [category, setCategory] = useState("");
  const [rate, setRate] = useState(4.5);
  const [cover, setCover] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  function cancelHandler() {
    Alert.alert("Cleared successfully");
    clear();
  }

  function clear() {
    setAuthor("");
    setBookTitle("");
    setCategory("");
    setNumOfPages(0);
    setPrice(0);
    setISBN("");
    setCover("");
  }
  function createHandler() {
    let switcher = true;
    if (!author || !bookTitle || !category || !numOfPages || !price || !ISBN) {
      switcher = false;
      Alert.alert("There are missed fields.");
    }
    if (isNaN(+price) || isNaN(+ISBN) || isNaN(+numOfPages)) {
      switcher = false;
      Alert.alert("Invalid number!");
    }
    if (switcher) {
      addBook();
      clear();
      Alert.alert("The item is added successfully");
    }
  }
  const addBook = async () => {
    try {
      const book = await createBook(
        ISBN,
        author,
        bookTitle,
        price,
        numOfPages,
        category,
        rate,
        cover
      );

      if (book && image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = await uplouadFile(`books/${uid}`, blob);
        const url = await getLink(ref.ref);
        await updateBook(uid, { cover: url });
      }
      else {
        await updateBook(uid, { cover: "https://imgs.search.brave.com/qSWvF9CER9_ERNV1A-abWrT5l3nucV7W1BjQwuAazCM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM4/MDE1NjA5L3Bob3Rv/L2JsYWNrLWhhcmRi/YWNrLWNhc2Vib3Vu/ZC1ib29rLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz10djE2/R2RuTnhOMGhUbFkw/SXRtUWtkR0hVdEVx/MGt5RnlWQ1dubllt/dU9nPQ" });
      }
    } catch (e) {
      // Alert.alert(e.message);
      console.log(e.message);
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setCover(result.assets[0].uri);
    }
  };
  const uploadImage = async () => {
    const response = await fetch(image);
    const blob = await response.blob();
    const ref = await uplouadFile(`${ISBN}-${new Date()}`, blob);
    return await getLink(ref.ref);
  };


  const handelSeedBooks = async () => {
    console.log("seedBooks");
    try {
      await setBooks();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (error !== null) {
      alert(`${error}`);
    }
  }, [error]);
  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"} hidden />
        <View style={styles.containerOfLogout}>
          <Pressable>
            <View style={styles.logoutButton}>
              <FontAwesome5
                name="door-open"
                style={{ marginTop: 3, marginRight: 10 }}
                size={20}
                color={COLORS.primary}
              />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </View>
          </Pressable>
        </View>
        <View style={{ justifyContent: "center", marginTop: 30 }}>
          <Text
            style={{ color: COLORS.primary, fontWeight: "700", fontSize: 22 }}
          >
            Book Preview
          </Text>
          <View style={[styles.containerOfBookDetails, { paddingTop: 40 }]}>
            <Image
              source={cover ? cover : myPicture}
              style={{
                height: 180,
                width: 130,
                marginRight: 15,
                marginBottom: 20,
              }}
              color={"#A0A0A1"}
            />
            <View style={styles.containerOfTextDetails}>
              <View style={{ marginTop: -30 }}>
                <Text style={styles.textDetails}>Book title: {bookTitle}</Text>
                <Text style={styles.textDetails}>Price: {price}</Text>
                <Text style={styles.textDetails}>Quantity: </Text>
                <Text style={styles.textDetails}>ISBN: {ISBN}</Text>
              </View>
              <Pressable
                style={styles.coverButton}
                onPress={() => {
                  pickImage();
                }}
              >
                <Text
                  style={{
                    color: COLORS.secondary,
                    fontWeight: "700",
                    fontSize: 20,
                  }}
                >
                  Cover
                </Text>
                <FontAwesome5
                  name="cloud"
                  color={COLORS.secondary}
                  size={16}
                ></FontAwesome5>
              </Pressable>
            </View>
          </View>

          <View style={[styles.bookTitleContainer, { marginTop: 20 }]}>
            <Text
              style={{ color: COLORS.primary, fontSize: 22, fontWeight: "700" }}
            >
              Book Title:
            </Text>
            <TextInput
              placeholder="Book Title"
              value={bookTitle}
              placeholderTextColor={COLORS.primary_70}
              style={styles.bookTitleInput}
              onChangeText={(text) => {
                setBookTitle(text);
              }}
            ></TextInput>
          </View>

          <View style={[styles.authorNameContainer, { marginTop: 20 }]}>
            <Text
              style={{ color: COLORS.primary, fontSize: 22, fontWeight: "700" }}
            >
              Author Name:
            </Text>
            <TextInput
              placeholder="Author Name"
              value={author}
              placeholderTextColor={COLORS.primary_70}
              style={styles.authorNameInput}
              onChangeText={(text) => {
                setAuthor(text);
              }}
            ></TextInput>
          </View>

          <View
            style={[
              styles.categoryContainer,
              { marginTop: 20, shadowColor: COLORS.primary },
            ]}
          >
            <Text
              style={{ color: COLORS.primary, fontSize: 22, fontWeight: "700" }}
            >
              Category:
            </Text>
            <View
              style={[
                styles.categoryInputBar,
                {
                  flexDirection: "row",
                  width: 350,
                  backgroundColor: COLORS.secondary,
                  color: COLORS.primary,
                },
              ]}
            >
              <TextInput
                placeholder="Select Category"
                value={category}
                placeholderTextColor={COLORS.primary_70}
                style={[
                  styles.categoryInput,
                  { color: COLORS.primary, height: "100%", width: "90%" },
                ]}
                onChangeText={(text) => {
                  setCategory(text.toLowerCase());
                }}
              />
            </View>
          </View>

          <View
            style={[
              styles.pageAndPriceContainer,
              {
                flexDirection: "row",
                width: 350,
                marginTop: 20,
                justifyContent: "space-between",
              },
            ]}
          >
            <View style={styles.containerOfPages}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: 22,
                  fontWeight: "700",
                }}
              >
                Pages:{" "}
              </Text>
              <TextInput
                placeholder="The numOfPages"
                value={numOfPages}
                placeholderTextColor={COLORS.primary_70}
                style={styles.numOfPagesAndPriceInput}
                onChangeText={(text) => {
                  setNumOfPages(text);
                }}
              ></TextInput>
            </View>

            <View style={styles.containerOfPrice}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: 22,
                  fontWeight: "700",
                }}
              >
                Price:{" "}
              </Text>
              <TextInput
                placeholder="The price"
                value={price}
                placeholderTextColor={COLORS.primary_70}
                style={styles.numOfPagesAndPriceInput}
                onChangeText={(text) => {
                  setPrice(text);
                }}
              ></TextInput>
            </View>
          </View>

          <View style={[styles.containerOfISBN, { marginTop: 20 }]}>
            <Text
              style={{ color: COLORS.primary, fontSize: 22, fontWeight: "700" }}
            >
              ISBN:
            </Text>
            <TextInput
              placeholder="ISBN"
              value={ISBN}
              placeholderTextColor={COLORS.primary_70}
              style={styles.ISBNInput}
              onChangeText={(text) => {
                setISBN(text);
              }}
            ></TextInput>
          </View>

          <View
            style={[styles.cancelAndCreateButtonsContainer, { marginTop: 20 }]}
          >
            <Pressable
              style={styles.cancelButton}
              onPress={() => {
                cancelHandler();
              }}
            >
              <Text
                style={{
                  color: COLORS.secondary,
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                Cancel
              </Text>
            </Pressable>
            <Pressable style={styles.createButton}>
              <Text
                style={{
                  color: COLORS.secondary,
                  fontSize: 18,
                  fontWeight: "700",
                }}
                onPress={() => createHandler()}
              >
                Create
              </Text>
            </Pressable>
            <Pressable style={styles.createButton}>
              <Text
                style={{
                  color: COLORS.secondary,
                  fontSize: 18,
                  fontWeight: "700",
                }}
                onPress={() => handelSeedBooks()}
              >
                populate
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  containerOfLogout: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
    width: "97%",
    height: 50,
    justifyContent: "flex-end",
  },
  logoutButton: {
    flexDirection: "row",
    width: 108,
    height: 50,
    alignItems: "center",
    marginHorizontal: 20,
  },
  logoutButtonText: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: "700",
  },
  containerOfBookDetails: {
    marginVertical: 20,
    paddingLeft: 20,
    paddingVertical: 10,
    maxWidth: 350,
    minWidth: 200,
    borderRadius: 10,
    backgroundColor: COLORS.secondary,
    flexDirection: "row",
    shadowOffset: { width: -2, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
    elevation: 8,
  },
  textDetails: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "500",
  },
  containerOfTextDetails: {
    justifyContent: "space-between",
  },
  coverButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    width: 110,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: 20,
    borderRadius: 10,
  },
  bookTitleInput: {
    marginTop: 5,
    width: 350,
    fontSize: 18,
    backgroundColor: COLORS.secondary,
    fontWeight: "500",
    paddingHorizontal: 8,
    paddingVertical: 5,
    shadowColor: COLORS.primary,
    borderRadius: 4,
    shadowOffset: { height: 2.5, width: 0 },
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 5,
    color: COLORS.primary,
  },
  authorNameInput: {
    marginTop: 5,
    width: 350,
    fontSize: 18,
    backgroundColor: COLORS.secondary,
    fontWeight: "500",
    paddingHorizontal: 8,
    paddingVertical: 5,
    shadowColor: COLORS.primary,
    borderRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 5,
    color: COLORS.primary,
  },
  categoryInputBar: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    width: 300,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 4,
    shadowOpacity: 1,
    shadowOffset: { height: 4, width: 0 },
    shadowColor: COLORS.primary,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 5,
  },
  categoryInput: {
    fontSize: 18,
    fontWeight: "500",
  },
  numOfPagesAndPriceInput: {
    marginTop: 5,
    width: 160,
    fontSize: 18,
    backgroundColor: COLORS.secondary,
    fontWeight: "500",
    paddingHorizontal: 8,
    paddingVertical: 5,
    shadowColor: COLORS.primary,
    borderRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 5,
    color: COLORS.primary,
  },
  ISBNInput: {
    marginTop: 5,
    width: 350,
    fontSize: 18,
    backgroundColor: COLORS.secondary,
    fontWeight: "500",
    paddingHorizontal: 8,
    paddingVertical: 5,
    shadowColor: COLORS.primary,
    borderRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 5,
    color: COLORS.primary,
  },
  cancelAndCreateButtonsContainer: {
    flex : 1 , 
    flexDirection: "raw",
    gap : 10 ,
    marginTop: 30,
    marginBottom: 60,
    width: "100%",
    justifyContent: "space-around",
  },
  cancelButton: {
    backgroundColor: COLORS.danger,
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 7,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 7,
  },
});
