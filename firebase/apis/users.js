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
        "https://imgs.search.brave.com/9fS5PQgMiMZlyIE1fog3Hs4t6K9QjNRIEW6efirkaiM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC8x/MS82OS9ibGFuay1h/dmF0YXItcHJvZmls/ZS1waWN0dXJlLXZl/Y3Rvci00NTE2MTE2/OS5qcGc",
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
