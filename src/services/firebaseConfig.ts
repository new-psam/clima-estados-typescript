import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
// @ts-ignore
import { getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAywOYafjZCnZyxBvD5q23ZmcmqWADo7H4",
  authDomain: "weatherapp-5b2e9.firebaseapp.com",
  projectId: "weatherapp-5b2e9",
  storageBucket: "weatherapp-5b2e9.firebasestorage.app",
  messagingSenderId: "821007453750",
  appId: "1:821007453750:web:9ec6b5db9494dfcb789297",
  measurementId: "G-WYV63FMZ8M"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Auth já com a persistência configurada de uma vez só
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Inicializa o Firestore
export const db = getFirestore(app); 