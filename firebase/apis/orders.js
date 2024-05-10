import { db } from "../Config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  getDoc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { findUserById } from "./users";
const ordersCollectionRef = collection(db, "orders");

async function getOrders() {
  const Orders = await getDocs(ordersCollectionRef);
  return Orders.docs.map((order) => ({ ...order.data(), orderId: order.id }));
}

async function createOrder(userId, books = []) {
  const numberOfBooks = books.length;
  let totalPrice = 0;
  // Calc TotalPrice
  for (let i = 0; i < books.length; i++) {
    const bookItem = books[i];
    totalPrice += +bookItem.price * +bookItem.quantity;
  }
  // find user by userId
  const user = await findUserById(userId);
  
  const orderData = {
    userId,
    userName: user.firstName + " " + user.lastName,
    userEmail: user.email,
    userAvatar: user.avatar,
    books,
    numberOfBooks,
    totalPrice,
    orderDate: serverTimestamp(),
  };
  const orderColRef = collection(db, "orders");
  const orderDocRef = await addDoc(orderColRef, orderData);
  const orderUpdated = await updateOrder(orderDocRef.id, {
    ...orderData,
    orderId: orderDocRef.id,
  });
  return orderUpdated;
}

async function deleteOrder(orderId) {
  const orderDocRef = doc(db, "orders", orderId);
  let order = await getDoc(orderDocRef);
  if (!order) {
    return; // if order is not exist will ignore this deletion
  }
  const res = await deleteDoc(orderDocRef);
  return res;
}

async function findOrderById(orderId) {
  const orderDocRef = doc(db, "orders", orderId);
  const orderDocSnapshot = await getDoc(orderDocRef);
  if (orderDocSnapshot.exists()) {
    return { ...orderDocSnapshot.data(), orderId: orderDocSnapshot.id };
  }
}

async function updateOrder(orderId, orderData) {
  const order = await findOrderById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  const orderDocRef = doc(db, "orders", orderId);
  const orderAfterUpdate = await updateDoc(orderDocRef, {...orderData});
  return orderAfterUpdate;
}

// allowed fieldName = [ orderId , userId , books , numberOfBooks , totalPrice , orderDate]
async function findOrdersByField(fieldName, value) {
  const q = query(ordersCollectionRef, where(fieldName, "==", value));
  const querySnapshot = await getDocs(q);
  const orders = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    orderId: doc.id,
  }));
  return orders.length > 0 ? orders : null;
}

async function searchOrdersByUserName(userName) {
  const orders = await getOrders();
  const filteredOrders = orders.filter((item) => { return (item.userName.includes(userName)) });
  console.log("searched ", filteredOrders);
  return filteredOrders;
}

export {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  findOrderById,
  findOrdersByField,
  searchOrdersByUserName
};
