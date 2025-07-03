import { Routes, Route } from 'react-router-dom'; // <-- Importa Routes y Route
import Login from "./components/Login";
import Home from "./components/Home";       // <-- Importa el componente Home
import Register from "./components/Register"; // <-- Importa el componente Register (si lo tienes)

import "./App.css";

function App() {
  return (
    // Define tus rutas aquí
    <Routes>
      {/* Ruta para el login */}
      <Route path="/login" element={<Login />} />

      {/* Ruta para el registro (si lo tienes) */}
      <Route path="/register" element={<Register />} />

      {/* Ruta para la página de inicio (Home) */}
      <Route path="/home" element={<Home />} />

      {/* Opcional: Una ruta por defecto que redirige a /home o /login */}
      {/* Por ejemplo, si alguien va a la raíz "/", que lo mande a /login o /home */}
      <Route path="/" element={<Login />} /> {/* Puedes elegir /home o /login como ruta por defecto */}
    </Routes>
  );
}

export default App;