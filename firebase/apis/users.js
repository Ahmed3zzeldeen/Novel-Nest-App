import { db } from "../Config";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  where,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const colRef = collection(db, "users");

// get the documents
// tested ✓
async function get_docs() {
  const snapshot = await getDocs(colRef);
  return snapshot.docs;
}

// tested ✓
async function getUsers() {
  let Users = await get_docs();
  let usersArray = [];
  Users.forEach((user) => {
    usersArray.push({ ...user.data(), id: user.id });
  });
  return usersArray;
}

// should be used when reqister is done
// and the uid should be got from firebase auth
async function addUser(uid, user_name, first_name, last_name, email, role) {
  const docRef = doc(db, "users", uid);
  let res = await setDoc(
    docRef,
    {
      uid: uid,
      user_name: user_name,
      first_name: first_name,
      last_name: last_name,
      full_name: first_name + " " + last_name,
      user_email: email,
      books: [],
      orders: [],
      role: role,
      image:
        "https://s3-alpha-sig.figma.com/img/823a/1021/43190b7b2b4507f04eaf9dcb3a5dfcaf?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hSytG50hHxVwKAr9Lp5QRKfQ~Rux9uu7EPexn6KBZ5pzWlb5xC-Lo3BcF9kkZW36Ke6A7kTJpLwdycbqUpka~~txxQTwfOEpw1sXLLPRW8yyJ~Lr6cCwv9orRYh7YU9if6LAamM5aluHDbSjQgoq6MAKivcbP1NTd0QUia5vYgNxU3TPZgq5Q5wtLCXi06LZHndp1tuWG5rR46RuLjuyQ97fc78nhcxswBzVP14M021zk0fTuXg8ZTzOIotvBx6SX9EnBbBBPZorzv~uT4Z5HK0RCbRKY47rqpOK6MBEPwe6Vm-ow4YX6G1sXg4U4hLj3Ef4Mn-uYFy2l8Jz1d1Q4A__",
    },
    uid,
  );
  return res;
}

// on any change in the users
// tested ✓
onSnapshot(colRef, (snapshot) => {
  let users = [];
  snapshot.docs.forEach((user) => {
    users.push({ ...user.data(), id: user.id });
  });
  console.log("users have changed", users);
});

// deleting a user by id
// tested ✓
async function delUser(uid) {
  const docRef = doc(db, "users", uid);
  const res = await deleteDoc(docRef);
  return res;
}

//update user with an object
async function updateUser(uid, user) {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, user);
  console.log("user fetched ", user);
}

// tested ✓
async function finduserById(uid) {
  const docRef = doc(db, "users", uid);
  const user = await getDoc(docRef);
  console.log("user fetched ", user);
  if (user) {
    return { ...user.data(), id: user.id };
  }
}

// tested ✓
async function findUserByEmail(email) {
  const users = await getUsers();
  console.log("from search :", users);
  const filteredUsers = users.filter((item) => item.email.includes(emailSubstring));
  console.log("searched ", filteredUsers);
  return filteredUsers;
}

// tested ✓
async function findUserByName(user_name) {
  const users = await getUsers();
  console.log("from search :", users);
  const user = users.filter((item) => {
    return item.user_name === user_name;
  });
  console.log("searched ", user);
  if (user) {
    return user[0];
  }
}

export {
  get_docs,
  getUsers,
  addUser,
  updateUser,
  delUser,
  findUserByEmail,
  finduserById,
  findUserByName,
};
