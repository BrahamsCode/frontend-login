import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import authService from "./services/authService"; 

import "./App.css";

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

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
          isAuthenticated ? (
            <Home onLogout={handleLogout} />
          ) : (
            <Login />
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