import { storage } from "../Config";
import {ref, uploadBytes } from "firebase/storage";

const storageRef = ref(storage, 'some-child');
async function uplouadFile(file) {
    const response = uploadBytes(storageRef, file)
    return response;
}
export {uplouadFile};

