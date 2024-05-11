import { StyleSheet, View, Text, FlatList} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import COLORS from "@/constants/colors";
import { BookCard , LatestBookCard , CustomLink } from "@/components";
import ROUTES from "@/constants/routes";
import { getBooks } from "@/firebase/apis/books";

const HomeScreen = () => {

  const [latestBooks , setLatestBooks] = useState([]);

  const fetchLatestBooks = async () => {
    const books = await getBooks();
    setLatestBooks(books);
  }

  useLayoutEffect(() => {
    fetchLatestBooks();
  }, []);
      
  return (
    <View style={styles.ScreenContainer}>
      <Text style={styles.headLine}>Latest Books: </Text>
      <FlatList
        horizontal
        style={{maxHeight: 180 , margin: '3%'}}
        data={latestBooks}
        renderItem={({item}) => (<LatestBookCard book={item}/>)}
        keyExtractor={(item) => item.bookId}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.moreBooks}>
        <Text style={styles.searchText}>Search Results:</Text>
        <CustomLink
          text={'More Books'}
          style={styles.linkBooks}
          href={ROUTES.PUBLIC.BOOKS}
        />
      </View>
      <FlatList
        style={styles.searchList}
        data={latestBooks}
        renderItem={({item}) => (<BookCard book={item} cover={item.cover} price={item.price} category={item.category} numOfPages={item.numOfPages}/>)}
        keyExtractor={(item) => item.bookId}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.secondary
  },
  headLine: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 20,
    marginTop: '5%',
    paddingLeft: '5%'
  },
  moreBooks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '5%'
  },
  searchText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 20
  },
  linkBooks: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 0
  },
  searchList: {
    alignSelf: 'center',
    height: '20%',
  },
});
