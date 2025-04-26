import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAngH_5g79dJ89jnUKnVpTxOwcNSmD8tsc",
  authDomain: "ficha-5dada.firebaseapp.com",
  projectId: "ficha-5dada",
  storageBucket: "ficha-5dada.firebasestorage.app",
  messagingSenderId: "970164715726",
  appId: "1:970164715726:web:9780925080fe27dc2c109f",
  measurementId: "G-1MC3P9465F",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null
const db = getFirestore(app)

// Export the Firebase services and functions
export { db, collection, addDoc }
