import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import COLORS from "@/constants/colors";
import { BookCard, LatestBookCard, CustomLink, HomeHeader } from "@/components";
import ROUTES from "@/constants/routes";
import { getBooks, searchBooksByBookTitle } from "@/firebase/apis/books";
import { Stack } from "expo-router";
import CustomSearch from "@/components/CustomSearch";

const { width } = Dimensions.get("window");
const HomeScreen = () => {
  const [latestBooks, setLatestBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchText, setSearchText] = useState("");

  const onChangeText = async (text) => {
    if (text.length === 0) {
      setFilteredBooks(latestBooks);
    }
    if (text.length > 0) {
      let filteredData = await searchBooksByBookTitle(text);
      setFilteredBooks(filteredData);
    }
  };

  const handleSearch = async () => {
    onChangeText(searchText);
  };

  const fetchLatestBooks = async () => {
    const books = await getBooks();
    setLatestBooks(books);
    setFilteredBooks(books);
  };

  useLayoutEffect(() => {
    fetchLatestBooks();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <HomeHeader>
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
      <ScrollView style={styles.ScreenContainer}>
        <Text style={styles.headLine}>Latest Books: </Text>
        <FlatList
          horizontal
          style={{ maxHeight: 180, margin: "3%" }}
          data={latestBooks}
          renderItem={({ item }) => <LatestBookCard book={item} />}
          keyExtractor={(item) => item.bookId}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.moreBooks}>
          <Text style={styles.searchText}>Search Results:</Text>
          <CustomLink
            text={"More Books"}
            style={styles.linkBooks}
            href={ROUTES.PUBLIC.BOOKS}
          />
        </View>
        <FlatList
          style={styles.searchList}
          data={filteredBooks}
          renderItem={({ item }) => (
            <BookCard
              book={item}
              cover={item.cover}
              price={item.price}
              category={item.category}
              numOfPages={item.numOfPages}
            />
          )}
          keyExtractor={(item) => item.bookId}
          numColumns={Math.floor(width / 150)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
        />
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  headLine: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 20,
    marginTop: "5%",
    paddingLeft: "5%",
  },
  moreBooks: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "5%",
  },
  searchText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 20,
  },
  linkBooks: {
    color: COLORS.primary,
    textDecorationLine: "underline",
    fontWeight: "600",
    fontSize: 16,
    marginTop: 0,
  },
  searchList: {
    width: "auto",
  },
});
