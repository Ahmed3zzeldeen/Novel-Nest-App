import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import COLORS from "@/constants/colors";
import { router } from "expo-router";
import ROUTES from "../../constants/routes";
import { FontAwesome5 } from "@expo/vector-icons";

const Data = [
  {
    orderId: 1,
    userId: "oZVhinkHdQPvbYIeDFzoTtsF17R2",
    books: [
      {
        bookId: 1,
        quantity: 1,
      },
      {
        bookId: 2,
        quantity: 1,
      },
    ],
    numberOfBooks: 2,
    totalPrice: 50,
    orderDate: "2020-06-01",
  },
  {
    orderId: 2,
    userId: "oZVhinkHdQPvbYIeDFzoTtsF17R2",
    books: [
      {
        bookId: 1,
        quantity: 1,
      },
      {
        bookId: 2,
        quantity: 1,
      },
    ],
    numberOfBooks: 2,
    totalPrice: 50,
    orderDate: "2020-06-01",
  },
  {
    orderId: 3,
    userId: "oZVhinkHdQPvbYIeDFzoTtsF17R2",
    books: [
      {
        bookId: 1,
        quantity: 1,
      },
      {
        bookId: 2,
        quantity: 1,
      },
    ],
    numberOfBooks: 2,
    totalPrice: 50,
    orderDate: "2020-06-01",
  },
  {
    orderId: 4,
    userId: "oZVhinkHdQPvbYIeDFzoTtsF17R2",
    books: [
      {
        bookId: 1,
        quantity: 1,
      },
      {
        bookId: 2,
        quantity: 1,
      },
    ],
    numberOfBooks: 2,
    totalPrice: 50,
    orderDate: "2020-06-01",
  },
  {
    orderId: 5,
    userId: "oZVhinkHdQPvbYIeDFzoTtsF17R2",
    books: [
      {
        bookId: 1,
        quantity: 1,
      },
      {
        bookId: 2,
        quantity: 1,
      },
    ],
    numberOfBooks: 2,
    totalPrice: 50,
    orderDate: "2020-06-01",
  },
  {
    orderId: 4,
    userId: "oZVhinkHdQPvbYIeDFzoTtsF17R2",
    books: [
      {
        bookId: 1,
        quantity: 1,
      },
      {
        bookId: 2,
        quantity: 1,
      },
    ],
    numberOfBooks: 2,
    totalPrice: 50,
    orderDate: "2020-06-01",
  },
  {
    orderId: 6,
    userId: "oZVhinkHdQPvbYIeDFzoTtsF17R2",
    books: [
      {
        bookId: 1,
        quantity: 1,
      },
      {
        bookId: 2,
        quantity: 1,
      },
    ],
    numberOfBooks: 2,
    totalPrice: 50,
    orderDate: "2020-06-01",
  },
];

const ListOfOrdersScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(Data);

  const handleSearch = () => {
    const filtered = Data.filter(order => order.orderId.toString().includes(searchText));
    setFilteredOrders(filtered);
  };

  const handleEdit = (orderId) => {
    router.push(ROUTES.DASHBOARD.EDIT_ORDER.replace(":id", orderId));
  };

  const handleDelete = (orderId) => {
    const updatedOrders = filteredOrders.filter(
      (order) => order.orderId !== orderId
    );
    setFilteredOrders(updatedOrders);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Pressable
          style={{ alignSelf: "flex-end", margin: 2 }}
          onPress={() => {
            router.replace(ROUTES.DASHBOARD.HOME);
          }}
        >
          <Text style={{ color: COLORS.primary, fontSize: 20 }}>
            <FontAwesome5
              name="door-open"
              size={24}
              color={COLORS.primary}
              style={{ margin: 10 }}
            />
            logout
          </Text>
        </Pressable>
      </View>
      <View style={styles.searchInputContainer}>
        <FontAwesome5
          name="search"
          size={18}
          color="#2f6892"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Order"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={handleSearch}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredOrders}
        renderItem={({ item }) => (
          <Pressable style={styles.item} onPress={() => router.push(ROUTES.DASHBOARD.EDIT_ORDER.replace(":id", item.orderId))}>
            <View style={styles.ContainerTestData}>
              <Text style={styles.totalPayment}>
                Total Payment: ${item.totalPrice}
              </Text>
              <Text style={styles.date}>Date: {item.orderDate}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Pressable
                onPress={() => handleEdit(item.orderId)}
                style={styles.ContainerIcon}
              >
                <FontAwesome5
                  name="pen"
                  size={16}
                  color="#fff"
                  style={styles.icon}
                />
              </Pressable>
              <Pressable
                onPress={() => handleDelete(item.orderId)}
                style={styles.ContainerIcon}
              >
                <FontAwesome5
                  name="trash-alt"
                  size={16}
                  color="#fff"
                  style={styles.icon}
                />
              </Pressable>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.orderId}
      />
    </View>
  );
};

export default ListOfOrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  item: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: COLORS.secondary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
  },
  searchInputContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 5,
    height: 40,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: COLORS.placeholderText,
    fontSize: 16,
    height: "100%",
  },
  totalPayment: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 15,
  },
  date: {
    color: COLORS.primary_70,
    fontSize: 13,
  },
  iconContainer: {
    flexDirection: "row",
    marginRight: 5,
  },
  icon: {},
  searchIcon: {
    paddingHorizontal: 10,
  },
  ContainerIcon: {
    width: 29,
    height: 29,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 3,
    padding: 5,
  },
  ContainerTestData: {
    maxWidth: "75%",
    minWidth: "75%",
  },
});
