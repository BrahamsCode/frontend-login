import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import authService from "../services/authService";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const navigate = useNavigate(); // Inicializa useNavigate

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
      // Redirección al Home
      navigate("/home"); // Redirige al path /home
    } else {
      setMessage({
        type: "error",
        text: result.message || "Error al iniciar sesión.",
      });
    }

    setLoading(false);
  };

  return (
    <main className="login-container">
      <section className="login-card" aria-label="Formulario de login">
        <h2>Iniciar Sesión</h2>

        {message.text && (
          <div
            className={`alert alert-${message.type}`}
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

          <button type="submit" disabled={loading}>
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
      </section>
    </main>
  );
}

export default Login;