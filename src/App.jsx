import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./Login";
import Layout from "./components/Layout";
import CosmetologyForm from "./components/CosmetologyForm";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <p>Cargando aplicación...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <Layout>
          <CosmetologyForm />
        </Layout>
      )}
    </div>
  );
}

export default App;