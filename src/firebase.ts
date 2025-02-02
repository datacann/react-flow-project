import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCZlaRm-epzXWGfL2tftId4nScpDRHkXhY",
    authDomain: "react-flow-f7a27.firebaseapp.com",
    projectId: "react-flow-f7a27",
    storageBucket: "react-flow-f7a27.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
