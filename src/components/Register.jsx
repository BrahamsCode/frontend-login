import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import authService from "../services/authService";
import "./Login.css"; // Usamos los mismos estilos

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setMessage({
        type: "error",
        text: "Las contraseñas no coinciden"
      });
      return;
    }

    if (formData.password.length < 6) {
      setMessage({
        type: "error",
        text: "La contraseña debe tener al menos 6 caracteres"
      });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    const result = await authService.register({
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      password: formData.password
    });

    if (result.success) {
      setMessage({
        type: "success",
        text: "¡Registro exitoso! Redirigiendo al login..."
      });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setMessage({
        type: "error",
        text: result.message || "Error al registrar usuario"
      });
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card auth-card-register">
        <div className="auth-header">
          <div className="auth-logo">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
              <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>Crear Cuenta</h2>
          <p className="auth-subtitle">Únete a nosotros</p>
        </div>

        {message.text && (
          <div className={`alert alert-${message.type}`}>
            <span className="alert-icon">
              {message.type === 'success' ? '✓' : '✕'}
            </span>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">
                <i className="input-icon">👤</i>
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Juan"
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido">
                <i className="input-icon">👥</i>
                Apellido
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
                placeholder="Pérez"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <i className="input-icon">📧</i>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <i className="input-icon">🔒</i>
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              <i className="input-icon">🔐</i>
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Repite tu contraseña"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Registrando...
              </>
            ) : (
              'Crear Cuenta'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;