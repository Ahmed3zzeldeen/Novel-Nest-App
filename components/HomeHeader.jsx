import { ImageBackground, StyleSheet, Text, View , Image , TextInput, StatusBar} from "react-native";
import React, { useState } from "react";
import COLORS from "@/constants/colors";

const HomeHeader = () => {

    const [search , setSearch] = useState('');

    const [counter , setCounter] = useState(0);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <ImageBackground 
                source={{uri: 'https://s3-alpha-sig.figma.com/img/a8d4/ce20/9979d5c6741421e4f3b2ad4ecf0dbd2f?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BhXWQU-hLVpQOg5GAlVU~v0WrtY-d82I~9sLuyOO8nbTDs22vdn49zugBNaZGqyxr~Z-EfJ-yuaNVXZGI0-y73yAPLDftHx7~WhLrFa0iRJx2-VH1ku-TlsX~X0tGdnlODY311VoFZ4Q1Ye5J6PVCVL~cP~Jw5L1laQUdYA7342zPym2D1RbVeHj~qHpes6yNmwd-f4RQB6CR9niBYgPdFY1TncdoNaYK7HX9oQLiW-cP2m41fyh0aP8giaBDEk-Jynaj8DgV8G0TiTHknq9Q9Djl6Td2LzgQY3kbYzTzpVkQsnld1uapTd4b600PpGg-3zCAZFALydI90cINq8-pg__'}}
                style={{height: 200}}
                imageStyle={{ borderBottomLeftRadius: 50 , borderBottomRightRadius: 50 , opacity: 0.87}}
            >
                <View style={styles.header}>
                    <Text style={styles.homeText}>Home</Text>
                    <View style={styles.headerIcons}>
                        <View>
                            <Image source={require('../assets/images/icons/logout.png')}/>
                        </View>
                        
                        <View style={styles.cartBox}>
                            <ImageBackground 
                                source={require('../assets/images/icons/cart.png')}
                                style={{
                                    width: 35.71, 
                                    height: 31.75,
                                }}
                                
                            >
                                <View style={styles.counter}>
                                    <Text style={styles.counterText}>{counter}</Text>
                                </View>
                            </ImageBackground>
                        </View>
                        <View>
                            <Image 
                                source={require('../assets/images/icons/profile.png')}
                                style={{width: 40 , height: 40}}
                            />
                        </View>
                    </View>
                </View>
                <Text style={styles.usernameText}>Hey! USERNAME</Text>
                <View style={styles.searchBox}>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search Book..."
                        value={search}
                        onChangeText={(value) => setSearch(value)}
                        placeholderTextColor={COLORS.primary}
                    />
                    <View style={styles.searchIconBox}>
                        <Image source={require('../assets/images/icons/search.png')}/>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default HomeHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
    },
    header: {
        marginTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: '5%',
    },
    homeText: {
        color: COLORS.secondary,
        fontWeight: '700',
        fontSize: 24
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '35%',
        width: 150,
        justifyContent: 'space-between'
    },
    usernameText: {
        color: COLORS.secondary,
        fontWeight: '700',
        fontSize: 16,
        marginHorizontal: '5%',
        marginVertical: '3%',
    },
    searchBar: {
        backgroundColor: COLORS.secondary,
    },
    searchBox: {
        flexDirection: 'row'
    },
    searchIconBox: {
        backgroundColor: COLORS.secondary,
        marginTop: '5%'
    },
    searchBar: {
        backgroundColor: COLORS.secondary,
        width: '89%',
        paddingLeft: '5%',
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
    },
    searchBox: {
        flexDirection: 'row',
        marginHorizontal: '10%',
        justifyContent: 'space-between',
        padding: 3,
        backgroundColor: COLORS.secondary,
        borderRadius: 5,
        marginVertical: '5%'
    },
    searchIconBox: {
        backgroundColor: COLORS.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3%',
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
    },
    counter: {
        width: 21.43,
        height: 21.43,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        borderRadius: 50,
        position: 'absolute',
        right: 25,
        bottom: 20
    },
    counterText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '700'
    },
});
