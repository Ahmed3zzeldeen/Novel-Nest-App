import {
  collection,
  deleteDoc,
  getDocs,
  doc,
  setDoc,
  query,
  where,
  limit,
  addDoc,
} from 'firebase/firestore';
import { db } from '../Config';


const colRef = collection(db , 'carts');

const getCart = async (uid) => {
  const q = query(colRef , where('uid' , '==' , uid) , limit(1));
  const promise = await getDocs(q);
  return promise.docs[0];
}

const createCart = async (uid) => {
  const cartRef = doc(collection(db , 'carts'));
  await setDoc(cartRef , { uid });
  return cartRef;  
}

const deleteCart = async (id) => {
  const cart = doc(db , 'carts' , id);
  await deleteDoc(cart);
}

const addToCart = async (book , uid , counter) => {
  let cart = await getCart(uid);
  if (!cart) {
    cart = await createCart(uid);
  }
  const cartItemsColRef = collection(db , 'carts' , cart.id , 'items');
  const item = {
    ...book , quantity: counter
  };
  const itemRef = await addDoc( cartItemsColRef , item );
  console.log('added to cart! this id = ', itemRef.id);
  return itemRef.id;
};

const inCart = async (uid, bookId) => {
  const cartItemsColRef = collection(db , 'carts' , uid , 'items');
  const q = query(cartItemsColRef , where('bookId' , '==' , bookId) , limit(1));
  const promise = await getDocs(q);
  return promise;
};
const removeFromCart = async (uid , itemId ) => {
  let cart = await getCart(uid);
  if (!cart) {
    console.log('cart not found');
    return false;
  }
  const cartItem = doc(db , 'carts', cart.id , 'items' , itemId);
  await deleteDoc(cartItem);  
  console.log('cart item deleted!');
}

const getCartItems = async (uid) => {
  let cart = await getCart(uid);
  if (!cart) {
    cart = await createCart(uid);
    return [];
  }
  const itemsRef = collection(db , 'carts' , cart.id , 'items');
  const promise = await getDocs(itemsRef);
  const items = [];
  promise.docs.forEach((item) => {
    console.log('item fetched' , item.data());
    items.push({ ...item.data() , itemId: item.id });
  });
  console.log('cart items fetched' , items);
  return items;
}

export {
  getCart,
  createCart,
  deleteCart,
  addToCart,
  removeFromCart,
  getCartItems,
  inCart
};
