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

            return response.data;
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

    register: async (userData) => {
        try {
            const response = await axiosInstance.post('/Auth/register', userData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return error.response.data;
            }

            if (error.response && error.response.status === 500) {
                return error.response.data;
            }

            return {
                success: false,
                message: 'Error al conectar con el servidor'
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