import {
  TextInput,
  Pressable,
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { React, useLayoutEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import { findBookById, updateBook } from "@/firebase/apis/books";
import * as ImagePicker from "expo-image-picker";

export default function ListOfBooks({bookId}) {
  const [ISBN, setISBN] = useState("");
  const [author, setAuthor] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [price, setPrice] = useState("");
  const [numOfPages, setNumOfPages] = useState(0);
  const [category, setCategory] = useState("");
  const [rate, setRate] = useState(4.5);
  const [cover, setCover] = useState("");
  const [selectedImage, setSelectedImage] = useState(false);

  function cancelHandler() {
    Alert.alert("Cleared successfully");
    clear();
  }

  function clear() {
    setSelectedImage(false);
    fetchBookByBookId();
  }

  async function saveHandler() {
    let switcher = true;
    if (!author || !bookTitle || !category || !numOfPages || !price || !ISBN) {
      switcher = false;
      Alert.alert("There are missed fields.");
    }
    if (isNaN(+price) || isNaN(+ISBN) || isNaN(+numOfPages)) {
      switcher = false;
      Alert.alert("Invalid number!");
    }
    if (cover && selectedImage){
      const response = await fetch(image);
      const blob = await response.blob();
      const ref = await uplouadFile(`users/${uid}`, blob);
      const url = (await getLink(ref.ref));
      const bookData = {
        ISBN,
        author,
        bookTitle,
        category,
        url, 
        price,
        numOfPages,
      }
      if (switcher) {
        const updatedBook  = await updateBook(bookId , bookData);
        clear();
        Alert.alert("The item is added successfully");
      }
      
    }
    else {
      const bookData = {
        ISBN,
        author,
        bookTitle,
        category,
        cover,
        price, 
        numOfPages,
      }
      if (switcher) {
        const updatedBook  = await updateBook(bookId , bookData);
        clear();
        Alert.alert("The item is added successfully");
      }

    }
  }

  const pickImage = async () => {
    console.log ("pressed");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setCover(result.assets[0].uri);
    }
}
  const fetchBookByBookId = async () => {
    const book = await findBookById(bookId);
    setISBN(book.ISBN);
    setAuthor(book.author);
    setBookTitle(book.bookTitle);
    setCategory(book.category);
    setNumOfPages(book.numOfPages);
    setPrice(book.price);
    setCover(book.cover);
    setRate(book.rate);
  }

  useLayoutEffect(() => {
    fetchBookByBookId();
  },[])

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
        <View style={{ justifyContent: "center", marginTop: 30 , width:"90%" }}>
          <Text
            style={{ color: COLORS.primary, fontWeight: "700", fontSize: 22 }}
          >
            Book Preview
          </Text>
          <View style={[styles.containerOfBookDetails, { paddingTop: 40 }]}>
            <Image source={{ uri: cover }} style={styles.ImageCover} />
            <View style={styles.containerOfTextDetails}>
              <View>
                <Text style={styles.textDetails}>Book title: {bookTitle}</Text>
                <Text style={styles.textDetails}>Price: {price}</Text>
                <Text style={styles.textDetails}>Quantity: </Text>
                <Text style={styles.textDetails}>ISBN: {ISBN}</Text>
              </View>
              <Pressable onPress={() => { console.log("should pres");pickImage();}} style={styles.coverButton}>
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
                onPress={() => saveHandler()}
              >
                Save
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
    width: "90%",
    minWidth: 390,
    maxWidth: 450,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: COLORS.secondary,
    padding: 20,
    shadowOffset: { width: -2, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
    justifyContent:"space-between",
    gap:10,
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
    marginTop: 30,
    marginBottom: 60,
    width: 350,
    flexDirection: "row",
    justifyContent: "space-between",
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
  ImageCover:{
    width: 100,
    height: 160,
    borderRadius: 14,
    justifyContent: "flex-end",
  }
});
