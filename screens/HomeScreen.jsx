import { StyleSheet, View, Text , FlatList} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import COLORS from "@/constants/colors";
import BestSellerCard from "@/components/BestSellerCard";
import BookCard from "@/components/BookCard";
import COLORS from "@/constants/colors";
import BestSellerCard from "@/components/BestSellerCard";
import BookCard from "@/components/BookCard";

const HomeScreen = () => {
  const router = useRouter();
  const [BestSellerBooks , setBestSellerBooks] = useState([
    {id:1 , image: require('../assets/images/icons/cover 1.png') },
    {id:2 , image: require('../assets/images/icons/cover 2.png') },
    {id:3 , image: require('../assets/images/icons/cover 3.png') },
    {id:4 , image: require('../assets/images/icons/cover 1.png') },
    {id:5 , image: require('../assets/images/icons/cover 2.png') },
    {id:6 , image: require('../assets/images/icons/cover 3.png') }
  ]);

  const [BestSellerBooks , setBestSellerBooks] = useState([
    {id:1 , image: require('../assets/images/icons/cover 1.png') },
    {id:2 , image: require('../assets/images/icons/cover 2.png') },
    {id:3 , image: require('../assets/images/icons/cover 3.png') },
    {id:4 , image: require('../assets/images/icons/cover 1.png') },
    {id:5 , image: require('../assets/images/icons/cover 2.png') },
    {id:6 , image: require('../assets/images/icons/cover 3.png') }
  ]);

  return (
    <View style={styles.ScreenContainer}>
      <Text style={styles.headLine}>Best Seller Books:</Text>
      <FlatList
        horizontal
        style={{maxHeight: 180 , margin: '3%'}}
        data={BestSellerBooks}
        renderItem={({item}) => (<BestSellerCard image={item.image}/>)}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.moreBooks}>
        <Text style={styles.searchText}>Search Results:</Text>
        <Text style={styles.linkBooks}>More Books</Text>
      </View>
      <FlatList
        style={styles.searchList}
        data={BestSellerBooks}
        renderItem={({item}) => (<BookCard image={item.image}/>)}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
      <Text style={styles.headLine}>Best Seller Books:</Text>
      <FlatList
        horizontal
        style={{maxHeight: 180 , margin: '3%'}}
        data={BestSellerBooks}
        renderItem={({item}) => (<BestSellerCard image={item.image}/>)}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.moreBooks}>
        <Text style={styles.searchText}>Search Results:</Text>
        <Text style={styles.linkBooks}>More Books</Text>
      </View>
      <FlatList
        style={styles.searchList}
        data={BestSellerBooks}
        renderItem={({item}) => (<BookCard image={item.image}/>)}
        keyExtractor={(item) => item.id}
        numColumns={2}
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
    fontSize: 16
  },
  searchList: {
    marginHorizontal: '5%',
    height: '20%',
  }
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
    fontSize: 16
  },
  searchList: {
    marginHorizontal: '5%',
    height: '20%',
  }
});
