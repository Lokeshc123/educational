import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCaGbLHf6zFY9XmGJzvPunPNIeDEZ2TqjQ",
  authDomain: "tutorial-storage-3c262.firebaseapp.com",
  projectId: "tutorial-storage-3c262",
  storageBucket: "tutorial-storage-3c262.appspot.com",
  messagingSenderId: "342609657606",
  appId: "1:342609657606:web:c4e41bedfb2ae83915a887",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage();
