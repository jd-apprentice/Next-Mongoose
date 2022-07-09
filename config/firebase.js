import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { config } from "./config"

// Initialize config
const firebaseConfig = {...config}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);