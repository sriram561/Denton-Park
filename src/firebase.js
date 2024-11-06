import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-O0MdUG2OUQpckeVPipdlzUpONxnVVdA",
  authDomain: "amusementpark-780b6.firebaseapp.com",
  projectId: "amusementpark-780b6",
  storageBucket: "amusementpark-780b6.appspot.com",
  messagingSenderId: "653567101152",
  appId: "1:653567101152:web:0a69fce67993382511e885",
  measurementId: "G-89PXFR9QLC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); 

export { analytics };
