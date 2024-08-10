import axios from 'axios';
import * as SecureStore from "expo-secure-store";
import { TOKEN_KEY } from '../context/AuthContext'; // Asegúrate de ajustar la ruta según sea necesario


export const API_URL = "http://192.168.0.3:5080";

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});


// Interceptor para añadir el token a cada solicitud
apiClient.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;
