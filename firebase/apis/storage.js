import { storage } from "../Config";
import {ref, uploadBytes } from "firebase/storage";

const storageRef = ref(storage, 'some-child');

uploadBytes(storageRef, file).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});
export {uploadBytes};

