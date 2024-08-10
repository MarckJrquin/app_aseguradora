import axios from 'axios';
import * as SecureStore from "expo-secure-store";
import { TOKEN_KEY } from '../context/AuthContext'; 


// Asegurarse de ajustar la URL según sea necesario, colocar la IP de su servidor o computadora
// export const API_URL = "http://192.168.0.3:5080"; 
export const API_URL = "http://ec2-44-211-217-212.compute-1.amazonaws.com:5080";

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
