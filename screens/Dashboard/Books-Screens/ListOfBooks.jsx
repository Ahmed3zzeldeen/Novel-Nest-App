import { TextInput, Pressable, StyleSheet, Text, View, StatusBar, FlatList } from 'react-native'
import {React, useState} from "react";
import { useRouter } from "expo-router";
import ROUTES from "../../../constants/routes";
import { FontAwesome5, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import BookCard from "@/components/BookCard";
export default function ListOfBooks() {

    const [BestSellerBooks , setBestSellerBooks] = useState([
        {ISBN:2 , cover: require('../../../assets/images/icons/cover 2.png'), price: 100, author: 'Ahmed', bookTitle: 'journey2', numOfPages: 120, category: 'dramaB', rate: 4.5},
        {ISBN:3 , cover: require('../../../assets/images/icons/cover 3.png'), price: 100, author: 'Ahmed', bookTitle: 'a2', numOfPages: 120, category: 'dramaE', rate: 4.5},
        {ISBN:3 , cover: require('../../../assets/images/icons/cover 2.png'), price: 100, author: 'Ahmed', bookTitle: 'journey3', numOfPages: 120, category: 'dramaC', rate: 4.5},
        {ISBN:4 , cover: require('../../../assets/images/icons/cover 3.png'), price: 100, author: 'Ahmed', bookTitle: 'journey4', numOfPages: 120, category: 'dramaD', rate: 4.5},
    ]);
    const [searchText, setSearchText] = useState('');
    const filteredData = BestSellerBooks.filter(item =>
        item.bookTitle.toLowerCase().includes(searchText.toLowerCase())
    );
    const router = useRouter();
    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} hidden/>
            <View style={styles.containerOfNewButtonAndLogout}>
                <Pressable onPress={() => {router.push(ROUTES.DASHBOARD.ADD_NEW_BOOK);}}>
                    <View style={styles.newButton}>
                        <Text style={styles.newButtonText}>New</Text>
                        <FontAwesome name='plus' size={20} color={COLORS.secondary} style={styles.newButtonIcon}></FontAwesome>
                    </View>
                </Pressable>
                <Pressable>
                    <View style={styles.logoutButton}>
                        <FontAwesome5 name='door-open' style={{marginTop: 8, marginRight: 10}} size={20} color={COLORS.primary}/>
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </View>
                </Pressable>
            </View>
            <View style={styles.searchInput}>
                <TextInput placeholder='Search book...' placeholderTextColor={COLORS.primary} onChangeText={(text) => {setSearchText(text)}} style={styles.search} value={searchText}/>
                <FontAwesome5 name='search' size={15} style={{marginRight: 15}} color={COLORS.primary}></FontAwesome5>
            </View>
            <FlatList
                style={styles.searchList}
                data={filteredData}
                renderItem={({item}) => (<BookCard cover={item.cover} price={item.price} category={item.category} numOfPages={item.numOfPages}/>)}
                keyExtractor={(item) => {item.ISBN}}
                numColumns={2}
            />        
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    containerOfNewButtonAndLogout: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginBottom: 20,
        width: '97%',
        height: 50,
        justifyContent: 'space-between'
    },
    logoutButton: {
        flexDirection: 'row',
        width: 108,
        height: 50,
        alignItems: 'center',
        marginHorizontal: 20
    },
    logoutButtonText: {
        fontSize: 24,
        color: COLORS.primary,
        fontWeight: '700',
    },
    newButton: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: COLORS.primary,
        width: 100,
        height: 50,
        borderRadius: 7,
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    newButtonText: {
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: '700',
        color: COLORS.secondary
    },
    newButtonIcon: {
        marginTop: 3
    },
    searchList: {
        marginHorizontal: 25,
        marginVertical: 20,
        height: '20%',
    },
    searchInput: {
        marginVertical: 20,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 340,
        minWidth: 200,
        width: '100%',
        height: 43,
        backgroundColor: COLORS.secondary,
        flexDirection: 'row',
    },
    search:{
        paddingHorizontal: 20,
        height: '100%',      
        width: 325,
        fontSize: 18,
    }
})