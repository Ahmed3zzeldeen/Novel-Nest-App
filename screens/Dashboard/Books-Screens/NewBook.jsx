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
            <View style={styles.containerOfLogout}>
                <Pressable>
                    <View style={styles.logoutButton}>
                        <FontAwesome5 name='door-open' style={{marginTop: 3, marginRight: 10}} size={20} color={COLORS.primary}/>
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </View>
                </Pressable>
            </View>
            <View style={[styles.containerOfBookDetails, {paddingTop: 40}]}>
                <FontAwesome5 name='book' size={110} style={{height: 147, width:120}} color={'#A0A0A1'}></FontAwesome5>
                <View style={styles.containerOfTextDetails}>
                    <View style={{marginTop: -30}}>
                        <Text style={styles.textDetails}>Book title: </Text>
                        <Text style={styles.textDetails}>Price: </Text>
                        <Text style={styles.textDetails}>Quantity: </Text>
                        <Text style={styles.textDetails}>ISBN: </Text>
                    </View>
                    <Pressable style={styles.coverButton}>
                        <Text style={{color:COLORS.secondary, fontWeight: 700, fontSize: 20}}>Cover</Text>
                        <FontAwesome5 name='cloud' color={COLORS.secondary} size={16}></FontAwesome5>
                    </Pressable>
                </View>
                <View style={styles.bookTitle}>
                    
                </View>
                {/* <TextInput placeholder='Search book...' placeholderTextColor={COLORS.primary} onChangeText={(text) => {setSearchText(text)}} style={styles.search} value={searchText}/> */}
            </View>
            {/* <FlatList
                style={styles.searchList}
                data={filteredData}
                renderItem={({item}) => (<BookCard cover={item.cover} price={item.price} category={item.category} numOfPages={item.numOfPages} />)}
                keyExtractor={(item) => {item.ISBN}}
                numColumns={2}
            />         */}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    containerOfLogout: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginBottom: 20,
        width: '97%',
        height: 50,
        alignContent: 'center',
        justifyContent: 'flex-end'
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
    containerOfBookDetails: {
        flex: 0.25,
        marginVertical: 20,
        marginHorizontal: 20,
        paddingLeft: 20,
        width: 350,
        borderRadius: 10,
        backgroundColor: COLORS.secondary,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    search:{
        paddingHorizontal: 20,      
        width: 325,
        fontSize: 18,
    },
    textDetails: {
        color: COLORS.primary,
        fontSize: 18,
    },
    containerOfTextDetails: {
        // flexDirection: 'column',
        justifyContent: 'space-between'
    },
    coverButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        width: 110,
        paddingHorizontal: 10,
        paddingVertical: 7,
        marginTop:20,
        borderRadius: 10,
    }
})