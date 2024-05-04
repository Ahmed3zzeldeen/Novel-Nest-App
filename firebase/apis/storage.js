import { storage } from "../Config";
import {ref, uploadBytes , getDownloadURL } from "firebase/storage";

async function uplouadFile(fileName,file) {
    const storageRef = ref(storage, fileName);
    const response = uploadBytes(storageRef, file)
    return response;
}
async function getLink(ref) {
    return await getDownloadURL(ref);
}

export {uplouadFile, getLink};

