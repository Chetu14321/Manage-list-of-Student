import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


 const firebaseConfig = {
  apiKey: "AIzaSyCW3q8GwZlTycpm3xETfi9ZFuhcetoFxhU",
  authDomain: "student-dashboard-72ef9.firebaseapp.com",
  projectId: "student-dashboard-72ef9",
  storageBucket: "student-dashboard-72ef9.firebasestorage.app",
  messagingSenderId: "816314052075",
  appId: "1:816314052075:web:3a19d2d0ffd960673dbdae",
  measurementId: "G-DXLJNX3ZBG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
