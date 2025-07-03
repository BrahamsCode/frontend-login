import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa Link y useNavigate
import authService from "../services/authService"; // Asegúrate de que este servicio tenga una función register
import "./AuthForms.css"; // Usaremos un CSS compartido para login y register

function Register() {
  const [formData, setFormData] = useState({
    nombre: "", // Asegúrate de pedir el nombre
    email: "",
    password: "",
    confirmPassword: "", // Para confirmar la contraseña
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.password || !formData.confirmPassword) {
      setMessage({ type: "error", text: "Por favor, completa todos los campos." });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Las contraseñas no coinciden." });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    // Aquí debes llamar a tu servicio de autenticación para el registro
    // Asegúrate de que authService.register exista y maneje la lógica de la API
    const result = await authService.register(formData.nombre, formData.email, formData.password);

    if (result.success) {
      setMessage({
        type: "success",
        text: "¡Registro exitoso! Por favor, inicia sesión.",
      });
      // Opcional: Redirigir al login después de un registro exitoso
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirige después de 2 segundos para que el usuario lea el mensaje
    } else {
      setMessage({
        type: "error",
        text: result.message || "Error al registrar usuario.",
      });
    }

    setLoading(false);
  };

  return (
    <main className="auth-container"> {/* Usamos la misma clase para centrar */}
      <section className="auth-card" aria-label="Formulario de registro">
        <div className="auth-header">
          <div className="auth-logo">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
              <path d="M2 17L12 22L22 17"/>
              <path d="M2 12L12 17L22 12"/>
            </svg>
          </div>
          <h2>Registrarse</h2>
        </div>

        {message.text && (
          <div
            className={`auth-alert alert-${message.type}`}
            role={message.type === "error" ? "alert" : "status"}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              autoComplete="name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? (
              <>
                <span className="loading-spinner" aria-hidden="true"></span>
                Registrando...
              </>
            ) : (
              "Crear Cuenta"
            )}
          </button>
        </form>

        <p className="auth-footer-text">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;