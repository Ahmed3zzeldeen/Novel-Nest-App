import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native';
import COLORS from "@/constants/colors";
import { router } from "expo-router";
import ROUTES from "../../constants/routes";
import { FontAwesome5 } from "@expo/vector-icons";
import { findOrderById } from '@/firebase/apis/orders';
import { formatData } from '@/utils';

const EditOrderScreen = ({ orderId }) => {
  const [orderData, setOrderData] = useState(null); 
  const [editMode, setEditMode] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const fetchOrderFromStore = async () => {
    const order = await findOrderById(orderId);
    setOrderData(order);
  }

  useLayoutEffect(() => {
    fetchOrderFromStore();
  }, []);

  if (!orderData) {
    return (
      <View style={styles.container}>
        <Text>No data found for orderId {orderId}</Text>
      </View>
    );
  }

  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.Center3}>
      <View style={styles.item}>
        <View style={styles.TextConatiner}>
          <Text style={styles.BookText}>Book Title : {item.bookTitle}</Text>
          <Text style={styles.BookText}>Price : {item.price} $</Text>
          <Text style={styles.BookText}>ISBN : {item.ISBN}</Text>
          <View style={styles.DisItem}>
            {editMode && (
              <View style={styles.editButtons}>
                <Pressable style={styles.editButton} onPress={incrementQuantity}>
                  <Text style={styles.buttonText}>+</Text>
                </Pressable>
                <Text>{quantity}</Text>
                <Pressable style={styles.editButton} onPress={decrementQuantity}>
                  <Text style={styles.buttonText}>-</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
        <View style={styles.ImageConatiner}>
          <Image source={item.cover} style={styles.ImageWH} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Pressable
          style={{ alignSelf: "flex-end", margin: 2 }}
          onPress={() => {
            router.replace(ROUTES.DASHBOARD.HOME);
          }}
        >
          <Text style={{ color: COLORS.primary, fontSize: 20, fontWeight: 'bold' }}>
            <FontAwesome5
              name="door-open"
              size={24}
              color={COLORS.primary}
              style={{ margin: 10 }}
            />
            Logout
          </Text>
        </Pressable>
      </View>
      <View style={styles.Center1}>
        <View style={styles.Container1}>
          <View style={styles.Box1}>
            <Text style={styles.Text1}>Number of Books: {orderData.numberOfBooks}</Text>
            <Text style={styles.Text1}>Order Date: {formatData(new Date(orderData.orderDate?.seconds * 1000))}</Text>
          </View>
          <View style={styles.Box}>
            <View style={styles.Box2}>
              <Pressable style={styles.ContainerIcon} onPress={toggleEditMode}>
                <FontAwesome5
                  name={editMode ? "times" : "pen"}
                  size={12}
                  color="#fff"
                  style={styles.icon}
                />
              </Pressable>
              <Pressable style={styles.ContainerIcon}>
                <FontAwesome5
                  name="trash-alt"
                  size={12}
                  color="#fff"
                  style={styles.icon}
                />
              </Pressable>
            </View>
            <View style={styles.Box3}>
              <Text style={styles.Text2}>{orderData.totalPrice} $</Text>
            </View>
          </View>

        </View>
      </View>
      <View style={styles.Center2}>
        <View style={styles.CenterContainer}>
          <Text style={styles.CenterText}>Books</Text>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={orderData.books}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 4,
    backgroundColor: COLORS.secondary,
    width: '90%',
    flexDirection: 'row',
    elevation: 4,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    marginVertical: 10,
  },
  topContainer: {
    marginVertical: 8,
    width: '100%',
    paddingHorizontal: 20
  },
  Container1: {
    backgroundColor: COLORS.secondary,
    padding: 15,
    width: '90%',
    borderRadius: 5,
    marginTop: 20
  },
  Box1: {
    backgroundColor: COLORS.secondary,
    marginBottom: 10,
    marginHorizontal: 1,
  },
  Box2: {
    width: 140,
    flexDirection: 'row',
  },
  Box3: {
    width: 89,
    flexDirection: 'row-reverse'
  },
  Text1: {
    fontWeight: "bold",
    fontSize: 15,
    color: COLORS.primary,
    marginVertical: 1,
  },
  Box: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%'
  },
  ContainerIcon: {
    width: 22,
    height: 22,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 3,
    marginVertical: 2,
    padding: 5,
  },
  Text2: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  CenterContainer: {
    width: '90%',
    marginVertical: 15,
  },
  CenterText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  TextConatiner: {
    width: '65%',
    height: 137,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  ImageConatiner: {
    backgroundColor: 'blue',
    width: 85,
    height: 137,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Center1: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  Center2: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  ImageWH: {
    width: '100%',
    height: '100%'
  },
  Center3: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  BookText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  editButtons: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  editButton: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  DisItem: {
    backgroundColor: 'red',
    marginTop: 10,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default EditOrderScreen;
