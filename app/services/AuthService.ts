import apiClient from './ApiService';
import * as SecureStore from 'expo-secure-store';

export enum Role {
    ADMIN = "Admin",
    USER = "User",
}

const TOKEN_KEY = "my-jwt";
const ROLE_KEY = "my-role";

export const register = async (Username: string, Email: string, FirstName: string, LastName: string, DateOfBirth: Date, Password: string) => {
    try {
        const result = await apiClient.post('/api/Auth/signup', { Username, Email, FirstName, LastName, DateOfBirth, Password });
        
        // Set token and role in secure storage
        await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
        await SecureStore.setItemAsync(ROLE_KEY, result.data.role);
        
        return result.data;
    } catch (error) {
        console.error("Registration error:", (error as any).response?.data || (error as any).message);
        throw error;
    }
};

export const login = async (username: string, password: string) => {
    try {
        const result = await apiClient.post('/api/Auth/signin', { username, password });
        
        // Set token and role in secure storage
        await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
        await SecureStore.setItemAsync(ROLE_KEY, result.data.role);
        
        return result.data;
    } catch (error) {
        console.error("Login error:", (error as any).response?.data || (error as any).message);
        throw error;
    }
};

export const logout = async () => {
    try {
        // Delete token and role from secure storage
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(ROLE_KEY);
    } catch (error) {
        console.error("Logout error:", (error as any).message);
        throw error;
    }
};
