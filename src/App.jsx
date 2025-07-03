import { Routes, Route, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useState, useEffect } from 'react'; // Importa useState y useEffect
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import authService from "./services/authService"; // Asegúrate de importar tu servicio de autenticación

import "./App.css";

function App() {
  const navigate = useNavigate();
  // Puedes usar un estado para saber si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  // Efecto para verificar la autenticación al cargar la app
  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  // Función para manejar el logout
  const handleLogout = () => {
    authService.logout(); // Llama a la función de logout de tu servicio
    setIsAuthenticated(false); // Actualiza el estado de autenticación
    navigate('/login'); // Redirige al login
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Pasa la función handleLogout como prop 'onLogout' al componente Home */}
      <Route
        path="/home"
        element={
          // Opcional: Proteger la ruta. Si no está autenticado, redirige al login.
          isAuthenticated ? (
            <Home onLogout={handleLogout} />
          ) : (
            <Login /> // O <Navigate to="/login" replace /> de react-router-dom v6
          )
        }
      />

      {/* Ruta por defecto. Si el usuario está autenticado, va a /home, si no, a /login */}
      <Route
        path="/"
        element={isAuthenticated ? <Home onLogout={handleLogout} /> : <Login />}
      />
    </Routes>
  );
}

export default App;