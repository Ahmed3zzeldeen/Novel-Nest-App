import {
  collection,
  deleteDoc,
  getDocs,
  getDoc,
  doc,
  setDoc
} from 'firebase/firestore';
import {db} from '../Config';

const colRef = collection(db , 'carts');

const getCart = async (uid) => { 
  const q = query(colRef , where('uid' , '==' , uid));
  const promise = await getDocs(q);
  const cart = [];
  promise.docs.forEach((doc) => {
    cart.push({ ...doc.data() , cartId: doc.id });
  });
  console.log('cart:' , cart);
  return cart;
}

const deleteCart = async (cartId) => {
  const cartRef = doc(db , 'carts' , cartId);
  await deleteDoc(cartRef);
}

const createCart = async (uid) => {
  await setDoc(colRef , {userId:  uid});
}

const addToCart = async (uid , book , itemQuantity = 1) => {
  const cart = await getCart(uid);
  const itemsRef = doc(db , 'carts' , cart.cartId , 'items');
  const itemRef = doc(itemsRef);
  const cartItem = { ...book , quantity: itemQuantity };
  await setDoc(itemRef , cartItem);
}

const getCartItems = async (cartId) => {
  const itemsRef = doc(db , 'carts' , cart.cartId , 'items');
  const promise = await getDocs(collection(itemsRef));
  const cart = [];
  promise.docs.forEach((doc) => {
    cart.push({ ...doc.data() , itemId: doc.id });
  });
  return cart;
}

const updateCartItemQuantity = async (itemId , itemQuantity) => {
  const itemRef = doc(db , 'carts' , itemId);
  const item = await getDoc(itemRef);
  if (!item.exists()) {
    await updateDoc(itemRef , {quantity: itemQuantity});
  }
}

const removeFromCart = async (itemId) => {
  const cart = await getCart(uid);
  const itemRef = doc(db , 'carts' , 'items' , itemId);
  await deleteDoc(itemRef);
}

export {
  createCart,
  deleteCart,
  getCart,
  updateCartItemQuantity,
  getCartItems,
  addToCart,
  removeFromCart
};