
import { db } from "../Config";
import {
    getFirestore,
    collection,
    getDocs,
    setDoc,
    onSnapshot,
    deleteDoc, doc,
    query ,where,
    getDoc,
    updateDoc,
}from 'firebase/firestore'



const colRef = collection(db, 'users');

// get the documents 
async function get_docs() {

  const snapshot = await getDocs(colRef);
  return snapshot.docs;
};


async function get_users () { 
    let Users = await get_docs() ; 
    let usersArray = [];
    Users.forEach((user) =>
		  {
	usersArray.push({... user.data(), id: user.id})
    });
    return usersArray;
}

// should be used when reqister is done 
// and the uid should be got from firebase auth
async function add_user(uid ,user_name,first_name,last_name,email, role){
    const docRef = doc(db, "users", uid);
   let res =  await setDoc(docRef, {
	uid : uid , 
	user_name: user_name,
	first_name: first_name,
	last_name: last_name,
	full_name: first_name +" "+last_name,
	user_email: email,
	books : [],
	orders : [],
	role : role ,
	image: "https://imgs.search.brave.com/9fS5PQgMiMZlyIE1fog3Hs4t6K9QjNRIEW6efirkaiM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC8x/MS82OS9ibGFuay1h/dmF0YXItcHJvZmls/ZS1waWN0dXJlLXZl/Y3Rvci00NTE2MTE2/OS5qcGc",
    }, uid);
    return res ; 
};

// on any change in the users 
onSnapshot (colRef , (snapshot) => {

    let users =[];
    snapshot.docs.forEach((user) => {
	users.push({... user.data() , id: user.id})
    });
    console.log("users have changed", users);
})

// deleting a user by id
async function del_user(uid){
    const docRef = doc(db , 'users',uid )
    const res =  await deleteDoc(docRef) ; 
    return res  ; 
};

//update user with an object
async function update_user(uid , user){
    const docRef = doc(db , 'users',uid )
    await updateDoc(docRef , user)
    console.log("user fetched " , user);
};


async function find_user_by_id(uid){
    const docRef = doc(db ,'uid',uid )
    const user  =await getDoc (docRef);
    console.log("user fetched " , user.data());
    return user;
};
async function find_user_by_email(email){
    const users = await get_users();
    console.log("from search :" , users);
    const user=  users.filter((item) => {
	return item.email === email;
    	
    });
    console.log("searched " , user);
    return user;
};

export {get_docs , get_users , add_user ,update_user, del_user ,find_user_by_email,find_user_by_id };

