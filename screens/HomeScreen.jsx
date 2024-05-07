import { StyleSheet, View, Text, FlatList} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import COLORS from "@/constants/colors";
import { BookCard , BestSellerCard , CustomLink } from "@/components";
import ROUTES from "@/constants/routes";

const HomeScreen = () => {
  const router = useRouter();

  const [BestSellerBooks , setBestSellerBooks] = useState([
    {ISBN:1 , cover: require('../assets/images/icons/cover 1.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:2 , cover: require('../assets/images/icons/cover 2.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:3 , cover: require('../assets/images/icons/cover 3.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:4 , cover: require('../assets/images/icons/cover 1.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:5 , cover: require('../assets/images/icons/cover 2.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'},
    {ISBN:6 , cover: require('../assets/images/icons/cover 3.png') , numOfPages: 120, price: 100, author: 'ahmed', bookTitle: 'journey to the earth', rate: 4.5, category: 'drama'}
  ]);

  return (
    <View style={styles.ScreenContainer}>
      <Text style={styles.headLine}>Best Seller Books:</Text>
      <FlatList
        horizontal
        style={{maxHeight: 180 , margin: '3%'}}
        data={BestSellerBooks}
        renderItem={({item}) => (<BestSellerCard cover={item.cover}/>)}
        keyExtractor={(item) => item.ISBN}
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
        data={BestSellerBooks}
        renderItem={({item}) => (<BookCard cover={item.cover}/>)}
        keyExtractor={(item) => item.ISBN}
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
    marginHorizontal: '3%',
    marginTop: '5%'
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
    marginHorizontal: "5%",
    height: '20%',
  },
});
