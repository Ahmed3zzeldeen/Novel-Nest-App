import { TextInput, Pressable, StyleSheet, Text, View, StatusBar, FlatList, ScrollView } from 'react-native'
import {React, useState} from "react";
import { useRouter } from "expo-router";
import ROUTES from "../../../constants/routes";
import { FontAwesome5, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import BookCard from "@/components/BookCard";
export default function ListOfBooks() {

    const router = useRouter();
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
                                <Text style={styles.textDetails}>Book title: </Text>
                                <Text style={styles.textDetails}>Price: </Text>
                                <Text style={styles.textDetails}>Quantity: </Text>
                                <Text style={styles.textDetails}>ISBN: </Text>
                            </View>
                            <Pressable style={styles.coverButton}>
                                <Text style={{color:COLORS.secondary, fontWeight: '700', fontSize: 20}}>Cover</Text>
                                <FontAwesome5 name='cloud' color={COLORS.secondary} size={16}></FontAwesome5>
                            </Pressable>
                        </View>
                    </View>

                    <View style={[styles.bookTitleContainer, {marginTop: 20}]}>
                        <Text style={{color: COLORS.primary, fontSize: 22, fontWeight: '700'}}>Book Title:</Text>
                        <TextInput placeholder='Book Title' placeholderTextColor={COLORS.primary_70} style={styles.bookTitleInput}></TextInput>
                    </View>

                    <View style={[styles.authorNameContainer, {marginTop: 20}]}>
                        <Text style={{color: COLORS.primary, fontSize: 22, fontWeight: '700'}}>Author Name:</Text>
                        <TextInput placeholder='Book Title' placeholderTextColor={COLORS.primary_70} style={styles.authorNameInput}></TextInput>
                    </View>

                    <View style={[styles.categoryContainer, {marginTop: 20, shadowColor: COLORS.primary}]}>
                        <Text style={{color: COLORS.primary, fontSize: 22, fontWeight: '700'}}>Category:</Text>
                        <View style={[styles.categoryInputBar, {flexDirection: 'row', width: 350, backgroundColor: COLORS.secondary, color: COLORS.primary}]}>
                            <TextInput placeholder='Select Category' placeholderTextColor={COLORS.primary_70} style={[styles.categoryInput, {color: COLORS.primary}]}/>
                            <Pressable>
                                <FontAwesome5 name="caret-square-down" size={22} color={COLORS.primary}></FontAwesome5>
                            </Pressable>
                        </View>
                    </View>

                    <View style={[styles.pageAndPriceContainer, {flexDirection: 'row', width: 350, marginTop: 20, justifyContent: 'space-between'}]}>
                        <View style={styles.containerOfPages}>
                            <Text style={{color: COLORS.primary, fontSize: 22, fontWeight: '700'}}>Pages: </Text>
                            <TextInput placeholder='Enter the pages' placeholderTextColor={COLORS.primary_70} style={styles.pagesAndPriceInput}></TextInput>
                        </View>

                        <View style={styles.containerOfPrice}>
                            <Text style={{color: COLORS.primary, fontSize: 22, fontWeight: '700'}}>Price: </Text>
                            <TextInput placeholder='Enter the price' placeholderTextColor={COLORS.primary_70} style={styles.pagesAndPriceInput}></TextInput>
                        </View>
                    </View>

                    <View style={[styles.containerOfISBN, {marginTop: 20}]}>
                        <Text style={{color: COLORS.primary, fontSize: 22, fontWeight: '700'}}>ISBN:</Text>
                        <TextInput placeholder='ISBN' placeholderTextColor={COLORS.primary_70} style={styles.ISBNInput}></TextInput>
                    </View>

                    <View style={[styles.cancelAndCreateButtonsContainer, {marginTop: 20}]}>
                        <Pressable style={styles.cancelButton}><Text style={{color: COLORS.secondary, fontSize: 18, fontWeight: '700'}}>Cancel</Text></Pressable>
                        <Pressable style={styles.createButton}><Text style={{color: COLORS.secondary, fontSize: 18, fontWeight: '700'}}>Create</Text></Pressable>
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
        width: '100%',
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
        shadowOffset: {height: 4, width: 0},
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