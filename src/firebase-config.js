import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getAnalytics, isSupported } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyAngH_5g79dJ89jnUKnVpTxOwcNSmD8tsc",
  authDomain: "ficha-5dada.firebaseapp.com",
  projectId: "ficha-5dada",
  storageBucket: "ficha-5dada.appspot.com",
  messagingSenderId: "970164715726",
  appId: "1:970164715726:web:9780925080fe27dc2c109f",
  measurementId: "G-1MC3P9465F",
}

// Inicializar Firebase
console.log("Inicializando Firebase...")
const app = initializeApp(firebaseConfig)

// Inicializar servicios
console.log("Inicializando servicios de Firebase...")
export const auth = getAuth(app)
export const db = getFirestore(app)

// Inicializar analytics solo en el navegador
export const initializeAnalytics = async () => {
  if (typeof window !== "undefined") {
    const analyticsSupported = await isSupported()
    if (analyticsSupported) {
      return getAnalytics(app)
    }
  }
  return null
}

// Verificar conexión a Firestore
console.log("Firebase inicializado. Firestore disponible:", !!db)
