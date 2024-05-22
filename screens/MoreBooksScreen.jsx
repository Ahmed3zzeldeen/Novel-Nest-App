import { BookCard, HomeHeader } from "@/components";
import COLORS from "@/constants/colors";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { useLayoutEffect, useState } from "react";
import { getBooks, searchBooksByBookTitle } from "@/firebase/apis/books";
import { Stack } from "expo-router";
import CustomSearch from "@/components/CustomSearch";

const { width } = Dimensions.get("window");

const MoreBooksScreen = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchText, setSearchText] = useState("");

  const onChangeText = async (text) => {
    if (text.length === 0) {
      setFilteredBooks(books);
    }
    if (text.length > 0) {
      let filteredData = await searchBooksByBookTitle(text);
      setFilteredBooks(filteredData);
    }
  };

  const handleSearch = async () => {
    onChangeText(searchText);
  };

  const fetchBooks = async () => {
    const books = await getBooks();
    setBooks(books);
    setFilteredBooks(books);
  };

  useLayoutEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <HomeHeader inMoreBook={true}>
              <CustomSearch
                handleSearch={handleSearch}
                placeholderText="Search book..."
                searchText={searchText}
                setSearchText={setSearchText}
                containerStyle={{ marginHorizontal: 30, opacity: 0.5 }}
              />
            </HomeHeader>
          ),
        }}
      />
      <View style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.subHeader}>List of Recently Books:</Text>
        <FlatList
          data={filteredBooks}
          renderItem={({ item }) => <BookCard book={item} />}
          keyExtractor={(item) => item.ISBN}
          numColumns={Math.floor(width / 150)}
          contentContainerStyle={{ alignItems: "center" }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default MoreBooksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: "5%",
  },
  subHeader: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 20,
    marginVertical: "5%",
  },
});
