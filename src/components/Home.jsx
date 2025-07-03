import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './Home.css';

function Home({ onLogout }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    const currentUser = authService.getUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <h3>Gestión App</h3>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            <span className="nav-icon">📊</span>
            Dashboard
          </button>
          <button 
            className={`nav-item ${activeSection === 'empleados' ? 'active' : ''}`}
            onClick={() => setActiveSection('empleados')}
          >
            <span className="nav-icon">👥</span>
            Empleados
          </button>
          <button 
            className={`nav-item ${activeSection === 'roles' ? 'active' : ''}`}
            onClick={() => setActiveSection('roles')}
          >
            <span className="nav-icon">🏷️</span>
            Roles
          </button>
          <button 
            className={`nav-item ${activeSection === 'reportes' ? 'active' : ''}`}
            onClick={() => setActiveSection('reportes')}
          >
            <span className="nav-icon">📈</span>
            Reportes
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <h1>Bienvenido, {user?.nombre || 'Usuario'} 👋</h1>
          <div className="header-actions">
            <button className="notification-btn">
              <span className="notification-icon">🔔</span>
              <span className="notification-badge">3</span>
            </button>
            <div className="user-avatar">
              {user?.nombre?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        </header>

        <div className="content-area">
          {activeSection === 'dashboard' && (
            <div className="dashboard">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">👤</div>
                  <div className="stat-content">
                    <h3>Total Empleados</h3>
                    <p className="stat-value">150</p>
                    <span className="stat-change positive">+12% este mes</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📋</div>
                  <div className="stat-content">
                    <h3>Departamentos</h3>
                    <p className="stat-value">8</p>
                    <span className="stat-change">Sin cambios</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">💰</div>
                  <div className="stat-content">
                    <h3>Nómina Total</h3>
                    <p className="stat-value">$450K</p>
                    <span className="stat-change positive">+5% este mes</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-content">
                    <h3>Productividad</h3>
                    <p className="stat-value">92%</p>
                    <span className="stat-change positive">+3% este mes</span>
                  </div>
                </div>
              </div>

              <div className="recent-activity">
                <h2>Actividad Reciente</h2>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon">🆕</div>
                    <div className="activity-content">
                      <p><strong>Nuevo empleado registrado:</strong> María García</p>
                      <span className="activity-time">Hace 2 horas</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">✏️</div>
                    <div className="activity-content">
                      <p><strong>Actualización de rol:</strong> Juan Pérez ahora es Senior Developer</p>
                      <span className="activity-time">Hace 5 horas</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">📄</div>
                    <div className="activity-content">
                      <p><strong>Reporte generado:</strong> Informe mensual de nómina</p>
                      <span className="activity-time">Hace 1 día</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'empleados' && (
            <div className="section-placeholder">
              <h2>Gestión de Empleados</h2>
              <p>Aquí podrás gestionar todos los empleados...</p>
            </div>
          )}

          {activeSection === 'roles' && (
            <div className="section-placeholder">
              <h2>Gestión de Roles</h2>
              <p>Administra los roles y permisos...</p>
            </div>
          )}

          {activeSection === 'reportes' && (
            <div className="section-placeholder">
              <h2>Reportes</h2>
              <p>Genera y visualiza reportes...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;