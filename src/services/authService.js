import axios from 'axios';

const API_URL = 'https://localhost:7163/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

const authService = {
    login: async (email, password) => {
        try {
            console.log('Intentando login en:', `${API_URL}/Auth/login`);

            const response = await axiosInstance.post('/Auth/login', {
                email,
                password
            });

            console.log('Login exitoso:', response.data);

            // Si llegamos aquí, el login fue exitoso (status 200)
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify({
                    email: response.data.email,
                    nombre: response.data.nombre
                }));
            }

            // Aseguramos que siempre retornamos un objeto con 'success' y 'message'
            return { success: true, ...response.data }; // Añade success: true aquí
        } catch (error) {
            console.error('Error en login:', error);

            // Manejar respuesta 401 (Unauthorized)
            if (error.response && error.response.status === 401) {
                return {
                    success: false,
                    message: error.response.data.message || 'Email o contraseña incorrectos'
                };
            }

            // Manejar otros errores del servidor
            if (error.response) {
                return {
                    success: false,
                    message: error.response.data.message || `Error del servidor: ${error.response.status}`
                };
            }

            // Error de red o CORS
            return {
                success: false,
                message: 'No se pudo conectar con el servidor. Verifica que la API esté ejecutándose.'
            };
        }
    },

    // *** MODIFICACIÓN AQUÍ ***
    register: async (nombre, email, password) => { // Acepta nombre, email, password
        try {
            const response = await axiosInstance.post('/Auth/register', { // Construye el objeto
                nombre,
                email,
                password
            });
            // Suponemos que la respuesta exitosa tendrá { success: true, message: "..." }
            // Si tu API devuelve solo datos, ajusta esto para que incluya 'success: true'
            return { success: true, ...response.data };
        } catch (error) {
            console.error('Error en register:', error);
            if (error.response) {
                // Si el backend devuelve un mensaje de error específico, úsalo
                return {
                    success: false,
                    message: error.response.data.message || `Error del servidor: ${error.response.status}`
                };
            }
            // Error de red o algo más
            return {
                success: false,
                message: 'No se pudo conectar con el servidor para registrar el usuario.'
            };
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getToken: () => {
        return localStorage.getItem('token');
    },

    getUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

export default authService;