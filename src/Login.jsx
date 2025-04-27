import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "src/firebase";
import { useNavigate } from "react-router-dom";
import './App.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirige al home después del login
    } catch (err) {
      console.error("Error de autenticación:", err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  // Función para traducir códigos de error
  const getErrorMessage = (code) => {
    switch(code) {
      case "auth/invalid-email":
        return "El correo electrónico no es válido";
      case "auth/user-disabled":
        return "Esta cuenta ha sido deshabilitada";
      case "auth/user-not-found":
        return "No existe una cuenta con este correo";
      case "auth/wrong-password":
        return "Contraseña incorrecta";
      default:
        return "Error al iniciar sesión. Inténtalo de nuevo.";
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <img src="/logo.png" alt="Logo" className="login-logo" />
        </div>
        <h1 className="login-title">Iniciar Sesión</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;