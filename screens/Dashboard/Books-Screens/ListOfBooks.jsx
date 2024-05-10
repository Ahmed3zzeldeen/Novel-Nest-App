import { TextInput, Pressable, StyleSheet, Text, View, StatusBar, FlatList , Image} from 'react-native'
import { React, useState, useLayoutEffect } from "react";
import { router } from "expo-router";
import ROUTES from "../../../constants/routes";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import AdminBookCard from '@/components/AdminBookCard';
import { getBooks, searchBooksByBookTitle } from '@/firebase/apis/books';

export default function ListOfBooks() {
	const [filteredBooks, setFilteredBooks] = useState([]);
	const [searchText, setSearchText] = useState('');

	const onChangeText = async (text) => {
		if (text.length === 0) {
			fetchBooks();
		}
		if (text.length > 0) {
			let filteredData = await searchBooksByBookTitle(text);
			setFilteredBooks(filteredData);
		}
		setSearchText(text);
	}

	const handleNewBookPress = async () => {
		router.push(ROUTES.DASHBOARD.ADD_NEW_BOOK);
	}

	const fetchBooks = async () => {
		const books = await getBooks();
		setFilteredBooks(books);
	}
	useLayoutEffect(() => {
		fetchBooks();
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar barStyle={'light-content'} hidden />
			<View style={styles.containerOfNewButtonAndLogout}>
				<Pressable onPress={handleNewBookPress}>
					<View style={styles.newButton}>
						<Text style={styles.newButtonText}>New</Text>
						<FontAwesome name='plus' size={20} color={COLORS.secondary} style={styles.newButtonIcon}></FontAwesome>
					</View>
				</Pressable>
				<Pressable>
					<View style={styles.logoutButton}>
						<FontAwesome5 name='door-open' style={{ marginTop: 8, marginRight: 10 }} size={20} color={COLORS.primary} />
						<Text style={styles.logoutButtonText}>Logout</Text>
					</View>
				</Pressable>
			</View>
			<View style={styles.searchInput}>
				<TextInput
					placeholder='Search book...' placeholderTextColor={COLORS.primary}
					onChangeText={onChangeText} style={styles.search} value={searchText} />
				<FontAwesome5 name='search' size={15} style={{ marginRight: 15 }} color={COLORS.primary}></FontAwesome5>
			</View>
			<FlatList
				style={styles.searchList}
				data={filteredBooks}
				renderItem={({ item }) => (<AdminBookCard cover={item.cover} price={item.price} category={item.category} numOfPages={item.numOfPages} />)}
				keyExtractor={(item) => item.ISBN}
				numColumns={2}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
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
	search: {
		paddingHorizontal: 20,
		height: '100%',
		width: 325,
		fontSize: 18,
	}
})