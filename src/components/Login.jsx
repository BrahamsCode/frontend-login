import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa Link y useNavigate
import authService from "../services/authService";
import "./AuthForms.css"; // <-- ¡Cambia a AuthForms.css!

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email || !formData.password) {
      setMessage({ type: "error", text: "Completa todos los campos." });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    const result = await authService.login(formData.email, formData.password);

    if (result.success) {
      setMessage({
        type: "success",
        text: `¡Bienvenido ${result.nombre}! Has iniciado sesión correctamente.`,
      });
      // Redirige al Home después de un pequeño retraso para que el usuario vea el mensaje
      setTimeout(() => {
        navigate("/home");
      }, 1500); // 1.5 segundos
    } else {
      setMessage({
        type: "error",
        text: result.message || "Error al iniciar sesión. Verifica tus credenciales.",
      });
    }

    setLoading(false);
  };

  return (
    <main className="auth-container"> {/* Usa la clase compartida */}
      <section className="auth-card" aria-label="Formulario de login">
        <div className="auth-header">
          <div className="auth-logo">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
              <path d="M2 17L12 22L22 17"/>
              <path d="M2 12L12 17L22 12"/>
            </svg>
          </div>
          <h2>Iniciar Sesión</h2>
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
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="auth-button"> {/* Usa la clase compartida */}
            {loading ? (
              <>
                <span className="loading-spinner" aria-hidden="true"></span>
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>

        <p className="auth-footer-text"> {/* Usa la clase compartida */}
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;