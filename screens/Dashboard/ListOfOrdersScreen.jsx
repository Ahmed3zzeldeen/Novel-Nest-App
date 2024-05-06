// ListOfOrdersScreen.js
import { StyleSheet, Text, View, FlatList, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import Data from 'orders.json'; // Assuming orders.json is in the same directory
import COLORS from "@/constants/colors";
import { router } from "expo-router";
import ROUTES from "../../constants/routes";
import { FontAwesome5 } from "@expo/vector-icons";


const ListOfOrdersScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(Data);

  const handleSearch = () => {
    const filtered = Data.filter(order => order.orderId.toString().includes(searchText));
    setFilteredOrders(filtered);
  };

  const handleEdit = (orderId) => {
    router.push(ROUTES.DASHBOARD.ADD_NEW_ORDER,{orderId});
  };

  const handleDelete = (orderId) => {
    const updatedOrders = filteredOrders.filter(order => order.orderId !== orderId);
    setFilteredOrders(updatedOrders);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Pressable
          style={{ alignSelf: 'flex-end', margin: 2, }}
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
        <FontAwesome5 name="search" size={18} color="#2f6892" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Order"
          value={searchText}
          onChangeText={text => setSearchText(text)}
          onSubmitEditing={handleSearch}
        />
      </View>
      <FlatList
        data={filteredOrders}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.ContainerTestData}>
              <Text style={styles.totalPayment}>Total Payment: ${item.totalPrice}</Text>
              <Text style={styles.date}>Date: {item.orderDate}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Pressable onPress={() => handleEdit(item.orderId)} style={styles.ContainerIcon}>
                <FontAwesome5 name="pen" size={16} color="#fff" style={styles.icon} />
              </Pressable>
              <Pressable onPress={() => handleDelete(item.orderId)} style={styles.ContainerIcon}>
                <FontAwesome5 name="trash-alt" size={16} color="#fff" style={styles.icon} />
              </Pressable>
            </View>
          </View>
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
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: COLORS.secondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5

   
  },
  searchInputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 5,
    height: 40,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#769ab2',
    fontSize: 16,
    height:'100%'
  },
  totalPayment: {
    color: '#2f6892',
    fontWeight: 'bold',
    fontSize: 15,
  },
  date: {
    color: '#769ab5',
    fontSize: 13,
  },
  iconContainer: {
    flexDirection: 'row',
    marginRight:5,
    
  },
  icon: {
   
  },
  searchIcon:{
   paddingHorizontal:10
  },
  ContainerIcon:{
    width:29,
    height:29,
    backgroundColor:'#2f6892',
    borderRadius:'50%',
   alignItems:'center',
   justifyContent:'center',
   marginHorizontal:3,
    
  },
  ContainerTestData:{
    maxWidth:'75%',
    minWidth:'75%'

  }
});
