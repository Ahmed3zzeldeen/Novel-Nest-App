import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import COLORS from "@/constants/colors";
import { router } from "expo-router";
import ROUTES from "../../constants/routes";
import { FontAwesome5 } from "@expo/vector-icons";
import { deleteOrder, getOrders } from "@/firebase/apis/orders";
import { formatData } from "@/utils";
import { CustomPopup } from "@/components";

const ListOfOrdersScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [deletePopup, setDeletePopup] = useState(false);
  const [orderDeletedId, setOrderDeletedId] = useState(null);

  const handlePressNoBtn = () => {
    setDeletePopup(false);
  };

  const handlePressYesBtn = async () => {
    if (orderDeletedId) {
      const deleted = await deleteOrder(orderDeletedId);
      setOrderDeletedId(null);
      fetchOrdersFromApi();
    }
    setDeletePopup(false);
  };


  const handleSearch = () => {
    const filtered = Data.filter(order => order.orderId.toString().includes(searchText));
    setFilteredOrders(filtered);
  };

  const handleDelete = (orderId) => {
    setDeletePopup(true);
    setOrderDeletedId(orderId);
  };

  const handleEdit = async (orderId, idx) => {
    router.push({
      pathname: ROUTES.DASHBOARD.EDIT_ORDER.replace(":id", orderId), params: { id: orderId, number: idx + 1 }
    })
  };

  const fetchOrdersFromApi = async () => {
    let orders = await getOrders();
    orders = orders.map((item, idx) => {
      return { ...item, idx }
    })
    setFilteredOrders([...orders]);
  }
  useLayoutEffect(() => {
    fetchOrdersFromApi();
  }, []);
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
              <Text style={styles.date}>Date: {formatData(new Date(item.orderDate?.seconds * 1000))}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Pressable
                onPress={() => handleEdit(item.orderId, item.idx)}
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
      />
      {deletePopup && <CustomPopup
        title={'Delete Confirmation'}
        message={'Are you sure you want to Delete this order?'}
        button1Style={styles.button1}
        button2Style={styles.button2}
        textButton1={'No'}
        textButton2={'Yes'}
        button1Function={handlePressNoBtn}
        button2Function={handlePressYesBtn}
      />}
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
