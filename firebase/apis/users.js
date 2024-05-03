import { auth,db } from "../Config";
import {
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
import {deleteUserAuth} from "./auth";
const usersCollectionRef = collection(db, "users");

// tested ✓
async function getUsers() {
  const Users = await getDocs(usersCollectionRef);
  return Users.docs.map((user) => ({ ...user.data(), id: user.id }));
}

// should be used when reqister is done
// and the uid should be got from firebase auth
async function createUser(
  uid,
  username,
  firstName,
  lastName,
  email,
  role = "USER"
) {
  const userDocRef = doc(db, "users", uid);
  let res = await setDoc(
    userDocRef,
    {
      uid: uid,
      username: username,
      firstName: firstName,
      lastName: lastName,
      fullName: `${firstName} ${lastName}`,
      email,
      role,
      avatar: "https://www.gravatar.com/avatar/",
    },
  );
  return res;
}
// on any change in the users
// tested ✓
onSnapshot(usersCollectionRef, (snapshot) => {
  let users = [];
  snapshot.docs.forEach((user) => {
    users.push({ ...user.data(), id: user.id });
  });
  console.log("users have changed", users);
});

// deleting a user by id
// tested ✓
async function deleteUser(uid) {
  const userDocRef = doc(db, "users", uid);
  let user = (await getDoc(userDocRef)) ;
  // let  ress = await deleteUserAuth(user.data().email);
  const res = await deleteDoc(userDocRef);
  return res;
}

// update user with an object of data
async function updateUser(uid, userData) {
  // check if the user exists
  const user = await findUserById(uid);
  if (!user) {
    throw new Error("User not found");
  }
  const userDocRef = doc(db, "users", uid);
  await updateDoc(userDocRef, userData);
}

// tested ✓
async function findUserById(uid) {
  const userDocRef = doc(db, "users", uid);
  const userDocSnapshot = await getDoc(userDocRef);
  if (userDocSnapshot.exists()) {
    return { ...userDocSnapshot.data(), id: userDocSnapshot.id };
  }
}

// tested ✓
async function findUserByField(fieldName, value) {
  const q = query(usersCollectionRef, where(fieldName, "==", value));
  const querySnapshot = await getDocs(q);
  const users = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return users.length > 0 ? users[0] : null;
}

// tested ✓
async function searchUsersByEmail(email) {
  const users = await getUsers();
  const filteredUsers = users.filter((item) => {return (item.email.includes(email))});
  console.log("searched ", filteredUsers);
  return filteredUsers;
}

// tested ✓
async function searchUsersByName(userName) {
  const users = await getUsers();
  const filteredUsers = users.filter((item) => {return (item.username.includes(userName))});
  console.log("searched ", filteredUsers);
  return filteredUsers;
}
// using the findUserByField function example
// const userByEmail = await findUserByField("email", "example@example.com");
// const userByUsername = await findUserByField("username", "example_username");

// also you can use the findUserById function to get the user by id like this
// const userById = await findUserByField("uid", "1234567890");


export {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  findUserById,
  findUserByField,
  searchUsersByName,
  searchUsersByEmail,
};
