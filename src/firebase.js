import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAngH_5g79dJ89jnUKnVpTxOwcNSmD8tsc",
  authDomain: "ficha-5dada.firebaseapp.com",
  projectId: "ficha-5dada",
  storageBucket: "ficha-5dada.appspot.com",
  messagingSenderId: "970164715726",
  appId: "1:970164715726:web:9780925080fe27dc2c109f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };