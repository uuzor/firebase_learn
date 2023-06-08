// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyDVWS3zmWYEvGUfVfueC5zn7IYOhw69fSA",
  authDomain: "fir-learn-97276.firebaseapp.com",
  projectId: "fir-learn-97276",
  storageBucket: "fir-learn-97276.appspot.com",
  messagingSenderId: "832256793274",
  appId: "1:832256793274:web:d2bf36a9304f632c2bc083",
  measurementId: "G-LF3N13LP0B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const storage = getStorage(app)