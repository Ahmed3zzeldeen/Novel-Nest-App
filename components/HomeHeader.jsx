import { ImageBackground, StyleSheet, Text, View , Image , TextInput} from "react-native";
import React, { useState } from "react";
import COLORS from "@/constants/colors";

const HomeHeader = () => {

    const [search , setSearch] = useState('');

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={{uri: 'https://s3-alpha-sig.figma.com/img/a8d4/ce20/9979d5c6741421e4f3b2ad4ecf0dbd2f?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BhXWQU-hLVpQOg5GAlVU~v0WrtY-d82I~9sLuyOO8nbTDs22vdn49zugBNaZGqyxr~Z-EfJ-yuaNVXZGI0-y73yAPLDftHx7~WhLrFa0iRJx2-VH1ku-TlsX~X0tGdnlODY311VoFZ4Q1Ye5J6PVCVL~cP~Jw5L1laQUdYA7342zPym2D1RbVeHj~qHpes6yNmwd-f4RQB6CR9niBYgPdFY1TncdoNaYK7HX9oQLiW-cP2m41fyh0aP8giaBDEk-Jynaj8DgV8G0TiTHknq9Q9Djl6Td2LzgQY3kbYzTzpVkQsnld1uapTd4b600PpGg-3zCAZFALydI90cINq8-pg__'}}
                style={{height: 200}}
                imageStyle={{ borderBottomLeftRadius: 50 , borderBottomRightRadius: 50 }}
            >
                <View style={styles.header}>
                    <Text style={styles.homeText}>Home</Text>
                    <View style={styles.headerIcons}>
                        <View>
                            <Image source={require('../assets/images/icons/logout.png')}/>
                        </View>
                        <View>
                            <Image source={require('../assets/images/icons/cart.png')}/>
                        </View>
                        <View>
                            <Image source={require('../assets/images/icons/profile.png')}/>
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
        // borderWidth: 1
    },
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: '5%',
        // marginVertical: '10%',
        borderWidth: 1,
        borderColor: 'green',
    },
    homeText: {
        color: COLORS.secondary,
        fontWeight: '700',
        fontSize: 24
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'green',
        width: '35%',
        justifyContent: 'space-between'
    },
    usernameText: {
        color: COLORS.secondary,
        fontWeight: '700',
        fontSize: 16,
        marginHorizontal: '5%',
        marginVertical: '3%',
        borderWidth: 1,
        borderColor: 'green',
    },
    searchBar: {
        borderWidth: 1,
        borderColor: 'green',
        backgroundColor: COLORS.secondary,
    },
    searchBox: {
        flexDirection: 'row'
    },
    searchIconBox: {
        backgroundColor: COLORS.secondary
    }
});
