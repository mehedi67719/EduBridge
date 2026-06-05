import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDtfAjc7GABfh5SKwBt4wyFeV1KLqIAKis",

  authDomain: "d-models-5490e.firebaseapp.com",

  projectId: "d-models-5490e",

  storageBucket: "d-models-5490e.firebasestorage.app",

  messagingSenderId: "178455683857",

  appId: "1:178455683857:web:c457461f650f0284e3a2b0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
