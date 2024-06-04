// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {v4} from 'uuid'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEhm_JKXwX-3zdn1Fe4JkQFwhvohe3Nag",
  authDomain: "next-images-45e6a.firebaseapp.com",
  projectId: "next-images-45e6a",
  storageBucket: "next-images-45e6a.appspot.com",
  messagingSenderId: "281288171775",
  appId: "1:281288171775:web:5aa6b8b7113f859d416cca",
  measurementId: "G-9TY7SQ3NQN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export async function uploadFile(file: File):Promise<string>{
    const uplodaRef = ref(storage,v4())
    await uploadBytes(uplodaRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    const url = await getDownloadURL(uplodaRef)
    return url
}