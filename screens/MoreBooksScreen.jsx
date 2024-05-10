import { BookCard } from '@/components';
import COLORS from '@/constants/colors';
import {View , Text , StyleSheet, FlatList} from 'react-native';
import { useState } from 'react';

const MoreBooksScreen = () => {

  const [books , setBooks] = useState([
    {ISBN:1 , cover: require('../assets/images/icons/cover 1.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:2 , cover: require('../assets/images/icons/cover 1.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:3 , cover: require('../assets/images/icons/cover 2.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:4 , cover: require('../assets/images/icons/cover 2.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:5 , cover: require('../assets/images/icons/cover 3.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:6 , cover: require('../assets/images/icons/cover 3.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:7 , cover: require('../assets/images/icons/cover 1.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:8 , cover: require('../assets/images/icons/cover 1.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:9 , cover: require('../assets/images/icons/cover 2.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:10 , cover: require('../assets/images/icons/cover 2.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:11 , cover: require('../assets/images/icons/cover 3.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:12 , cover: require('../assets/images/icons/cover 3.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'}
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>List of Recently Books:</Text>
      <FlatList
        style={styles.searchList}
        data={books}
        renderItem={({item}) => (<BookCard cover={item.cover}/>)}
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
    marginHorizontal: '5%'
  },
  subHeader: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 20,
    marginVertical: '5%'
  },
});