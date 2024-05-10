import { storage } from "../Config";
import {ref, uploadBytes , getDownloadURL , uploadBytesResumable } from "firebase/storage";

async function uplouadFile(fileName,file) {
    const storageRef = ref(storage, fileName);
    const response = uploadBytes(storageRef, file)
    return response;
}
async function getLink(ref) {
    const mataData = await getDownloadURL(ref);
    console.log("metaData", mataData);
    return mataData;
}

export {uplouadFile, getLink };

