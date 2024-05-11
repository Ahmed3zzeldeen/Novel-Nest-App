import { BookCard } from '@/components';
import COLORS from '@/constants/colors';
import {View , Text , StyleSheet, FlatList} from 'react-native';
import { useLayoutEffect, useState } from 'react';
import { getBooks } from '@/firebase/apis/books';

const MoreBooksScreen = () => {
  
  const [books , setBooks] = useState([]);

  const fetchBestSellerBooks = async () => {
    // Fetch best seller books from the database
    const books = await getBooks();
    setBooks(books);
  }

  useLayoutEffect(() => {
    fetchBestSellerBooks();
  }, []);
  
  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.subHeader}>List of Recently Books:</Text>
      <FlatList
        style={styles.searchList}
        data={books}
        renderItem={({item}) => (<BookCard book={item}/>)}
        keyExtractor={(item) => item.ISBN}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default MoreBooksScreen;

const styles = StyleSheet.create({
  container: {
    height: '98%',
    alignItems: 'center'
  },
  subHeader: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 20,
    marginVertical: '5%'
  },
  searchList: {
  }
});