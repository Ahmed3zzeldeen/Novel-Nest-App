import { TextInput, Pressable, StyleSheet, Text, View, StatusBar, FlatList, ScrollView, Alert } from 'react-native'
import {React, useState} from "react";
import { FontAwesome5, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import {app, db, auth} from '../../../firebase/Config'
import { collection , addDoc} from 'firebase/firestore';
export default function ListOfBooks() {
    const [price, setPrice] = useState('');
    const [pages, setPages] = useState('');
    const [author, setAuthor] = useState('');
    const [ISBN, setISBN] = useState('');
    const [category, setCategory] = useState('');
    const [cover, setCover] = useState('');
    const [bookTitle, setBookTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [books, setBooks] = useState([{ISBN:1 , cover: require('../../../assets/images/icons/cover 2.png'), price: 100, author: 'Ahmed', bookTitle: 'journey2', numOfPages: 120, category: 'dramaB', rate: 4.5},
    {ISBN:2 , cover: require('../../../assets/images/icons/cover 3.png'), price: 100, author: 'Ahmed', bookTitle: 'a2', numOfPages: 120, category: 'dramaE', rate: 4.5},
    {ISBN:3 , cover: require('../../../assets/images/icons/cover 2.png'), price: 100, author: 'Ahmed', bookTitle: 'journey3', numOfPages: 120, category: 'dramaC', rate: 4.5},
    {ISBN:4 , cover: require('../../../assets/images/icons/cover 3.png'), price: 100, author: 'Ahmed', bookTitle: 'journey4', numOfPages: 120, category: 'dramaD', rate: 4.5}]);
    
    const arr = [{ISBN:1 , cover: require('../../../assets/images/icons/cover 2.png'), price: 100, author: 'Ahmed', bookTitle: 'journey2', numOfPages: 120, category: 'dramaB', rate: 4.5},
    {ISBN:2 , cover: require('../../../assets/images/icons/cover 3.png'), price: 100, author: 'Ahmed', bookTitle: 'a2', numOfPages: 120, category: 'dramaE', rate: 4.5},
    {ISBN:3 , cover: require('../../../assets/images/icons/cover 2.png'), price: 100, author: 'Ahmed', bookTitle: 'journey3', numOfPages: 120, category: 'dramaC', rate: 4.5},
    {ISBN:4 , cover: require('../../../assets/images/icons/cover 3.png'), price: 100, author: 'Ahmed', bookTitle: 'journey4', numOfPages: 120, category: 'dramaD', rate: 4.5}]
    function cancelHandler() {
        Alert.alert('Cleared successfully');
        clear();
    }
    function clear(){
        setAuthor('');
        setBookTitle('');
        setCategory('');
        setPages('');
        setPrice('');
        setISBN('');
        setCover('');
    }
    function createHandler(){
        let switcher = true;
        if(!author || !bookTitle || !category || !pages || !price || !ISBN){
            switcher = false;
            alert('There are missed fields.');
        }
        if(isNaN(price) || isNaN(ISBN) || isNaN(pages)){
            switcher = false;
            alert('Invalid number!');
        }
        if(ISBN.length != 13){
            switcher = false;
            alert('ISBN Should be 13 digits.');
        }
        if(switcher){
            addBook();
            clear();
            alert('The item has been added successfully');
        }
    }
    const addBook = async() => {
        try{
            const docRef = await addDoc(collection(db, "books"), {
                author: author,
                bookTitle: bookTitle,
                price: price,
                pages: pages,
                ISBN: ISBN,
                category: category,
                cover: cover,
            });
            console.log("Document added with id: ", docRef.id);
            clear();
        }catch(e){
            console.log("Error adding document", e);
        }
    }
    //problem here
    function isUnique (text){
        for(let i = 0; i < arr.length; i++){
            if(arr[i].ISBN === text){
                console.log(arr[i].ISBN === text);
                return false;
            }
        }
        return true;
    }
    return (
        <ScrollView>
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
                <View style={{justifyContent: 'center', marginTop: 30}}>
                    <Text style={{color: COLORS.primary, fontWeight: '700', fontSize: 22}}>Book Preview</Text>
                    <View style={[styles.containerOfBookDetails, {paddingTop: 40}]}>
                        <FontAwesome5 name='book' size={110} style={{height: 147, width:120}} color={'#A0A0A1'}></FontAwesome5>
                        <View style={styles.containerOfTextDetails}>
                            <View style={{marginTop: -30}}>
                                <Text style={styles.textDetails}>Book title: {bookTitle}</Text>
                                <Text style={styles.textDetails}>Price: {price}</Text>
                                <Text style={styles.textDetails}>Quantity: </Text>
                                <Text style={styles.textDetails}>ISBN: {ISBN}</Text>
                            </View>
                            <Pressable style={styles.coverButton}>
                                <Text style={{color:COLORS.secondary, fontWeight: '700', fontSize: 20}}>Cover</Text>
                                <FontAwesome5 name='cloud' color={COLORS.secondary} size={16}></FontAwesome5>
                            </Pressable>
                        </View>
                    </View>

                    <View style={[styles.bookTitleContainer, {marginTop: 20}]}>
                        <Text style={{color: COLORS.primary, fontSize: 22, fontWeight: '700'}}>Book Title:</Text>
                        <TextInput placeholder='Book Title' value={bookTitle} placeholderTextColor={COLORS.primary_70} style={styles.bookTitleInput} onChangeText={(text) => {setBookTitle(text)}}></TextInput>
                    </View>

                    <View style={[styles.authorNameContainer, {marginTop: 20}]}>
                        <Text style={{color: COLORS.primary, fontSize: 22, fontWeight: '700'}}>Author Name:</Text>
                        <TextInput placeholder='Author Name' value={author} placeholderTextColor={COLORS.primary_70} style={styles.authorNameInput} onChangeText={(text) => {setAuthor(text)}}></TextInput>
                    </View>

                    <View style={[styles.categoryContainer, {marginTop: 20, shadowColor: COLORS.primary}]}>
                        <Text style={{color: COLORS.primary, fontSize: 22, fontWeight: '700'}}>Category:</Text>
                        <View style={[styles.categoryInputBar, {flexDirection: 'row', width: 350, backgroundColor: COLORS.secondary, color: COLORS.primary}]}>
                            <TextInput placeholder='Select Category' value={category} placeholderTextColor={COLORS.primary_70} style={[styles.categoryInput, {color: COLORS.primary, height: '100%', width: '90%'}]} onChangeText={(text) => {setCategory(text)}}/>
                            <Pressable>
                                <FontAwesome5 name="caret-square-down" size={22} color={COLORS.primary}></FontAwesome5>
                            </Pressable>
                        </View>
                    </View>

                    <View style={[styles.pageAndPriceContainer, {flexDirection: 'row', width: 350, marginTop: 20, justifyContent: 'space-between'}]}>
                        <View style={styles.containerOfPages}>
                            <Text style={{color: COLORS.primary, fontSize: 22, fontWeight: '700'}}>Pages: </Text>
                            <TextInput placeholder='The pages' value={pages} placeholderTextColor={COLORS.primary_70} style={styles.pagesAndPriceInput} onChangeText={(text) => {setPages(text);}}></TextInput>
                        </View>

                        <View style={styles.containerOfPrice}>
                            <Text style={{color: COLORS.primary, fontSize: 22, fontWeight: '700'}}>Price: </Text>
                            <TextInput placeholder='The price' value={price} placeholderTextColor={COLORS.primary_70} style={styles.pagesAndPriceInput} onChangeText={(text) => {setPrice(text);}}></TextInput>
                        </View>
                    </View>

                    <View style={[styles.containerOfISBN, {marginTop: 20}]}>
                        <Text style={{color: COLORS.primary, fontSize: 22, fontWeight: '700'}}>ISBN:</Text>
                        <TextInput placeholder='ISBN' value={ISBN} placeholderTextColor={COLORS.primary_70} style={styles.ISBNInput} onChangeText={(text) => {setISBN(text);}}></TextInput>
                    </View>

                    <View style={[styles.cancelAndCreateButtonsContainer, {marginTop: 20}]}>
                        <Pressable style={styles.cancelButton} onPress={() => {cancelHandler()}}><Text style={{color: COLORS.secondary, fontSize: 18, fontWeight: '700'}}>Cancel</Text></Pressable>
                        <Pressable style={styles.createButton}><Text style={{color: COLORS.secondary, fontSize: 18, fontWeight: '700'}} onPress={() => createHandler()}>Create</Text></Pressable>
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
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
        marginVertical: 20,
        paddingLeft: 20,
        paddingVertical: 10,
        maxWidth: 350,
        minWidth: 200,
        borderRadius: 10,
        backgroundColor: COLORS.secondary,
        flexDirection: 'row',
        shadowOffset: {width:-2, height:6},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        alignItems: 'center',
        elevation: 8
    },
    textDetails: {
        color: COLORS.primary,
        fontSize: 18,
        fontWeight: '500'
    },
    containerOfTextDetails: {
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
    },
    bookTitleInput: {
        marginTop: 5,
        width: 350,
        fontSize: 18,
        backgroundColor: COLORS.secondary,
        fontWeight: '500',
        paddingHorizontal: 8,
        paddingVertical: 5,
        shadowColor: COLORS.primary,
        borderRadius: 4,
        shadowOffset: {height: 2.5, width: 0},
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 5,
        color: COLORS.primary
    },
    authorNameInput: {
        marginTop: 5,
        width: 350,
        fontSize: 18,
        backgroundColor: COLORS.secondary,
        fontWeight: '500',
        paddingHorizontal: 8,
        paddingVertical: 5,
        shadowColor: COLORS.primary,
        borderRadius: 4,
        shadowOffset: {height: 4, width: 0},
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 5,
        color: COLORS.primary
    },
    categoryInputBar: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        width: 300,
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 4,
        shadowOpacity: 1,
        shadowOffset: {height: 4, width: 0},
        shadowColor: COLORS.primary,
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 5
    },
    categoryInput: {
        fontSize: 18,
        fontWeight: '500',
    },
    pagesAndPriceInput:{
        marginTop: 5,
        width: 160,
        fontSize: 18,
        backgroundColor: COLORS.secondary,
        fontWeight: '500',
        paddingHorizontal: 8,
        paddingVertical: 5,
        shadowColor: COLORS.primary,
        borderRadius: 4,
        shadowOffset: {height: 4, width: 0},
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 5,
        color: COLORS.primary
    },
    ISBNInput: {
        marginTop: 5,
        width: 350,
        fontSize: 18,
        backgroundColor: COLORS.secondary,
        fontWeight: '500',
        paddingHorizontal: 8,
        paddingVertical: 5,
        shadowColor: COLORS.primary,
        borderRadius: 4,
        shadowOffset: {height: 4, width: 0},
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 5,
        color: COLORS.primary
    },
    cancelAndCreateButtonsContainer:{
        marginTop: 30,
        marginBottom: 60,
        width: 350,
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    cancelButton: {
        backgroundColor: COLORS.danger,
        paddingHorizontal: 30,
        paddingVertical: 8,
        borderRadius:7,
    },
    createButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 30,
        paddingVertical: 8,
        borderRadius:7,
    }
})