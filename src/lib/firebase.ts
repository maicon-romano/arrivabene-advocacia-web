
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC8SsxAITOHlrxXBGxeu3YG99acYtWX00c",
  authDomain: "arrivaben-advocacia-web.firebaseapp.com",
  projectId: "arrivaben-advocacia-web",
  storageBucket: "arrivaben-advocacia-web.firebasestorage.app",
  messagingSenderId: "675177847049",
  appId: "1:675177847049:web:6ce96f8fd0a8e6c0519bd8",
  measurementId: "G-K4P4JC2QZ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;
