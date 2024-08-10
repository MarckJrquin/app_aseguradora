import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export enum Role {
    ADMIN = "Admin",
    USER = "User",
}

interface AuthProps {
    authState?: { 
        token: string | null; 
        authenticated: boolean | null 
        role: Role | null
    };
    onRegister?: (Username: string, Email:string, FirstName: string, LastName: string, DateOfBirth: Date, Password: String ) => Promise<any>;
    onLogin?: (username: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

export const TOKEN_KEY = 'my-jwt';
export const ROLE_KEY = 'my-role';
export const API_URL = "http://192.168.0.3:5080";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null; 
        authenticated: boolean | null;
        role: Role | null
    }>({
        token: null, 
        authenticated: null,
        role: null,
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            const role = await SecureStore.getItemAsync(ROLE_KEY);
            console.log("🚀 ~ file: AuthContext.tsx:45 ~ loadToken ~ token", token);
            console.log("🚀 ~ file: AuthContext.tsx:46 ~ loadRole ~ role", role);
            
            if (token && role) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                setAuthState({
                    token,
                    authenticated: true,
                    role: role as Role,
                });
            } else {
                setAuthState({
                    token: null,
                    authenticated: false,
                    role: null,
                });
            }
        };

        loadToken();
    }, []);

    const register = async ( Username: string, Email:string, FirstName: string, LastName: string, DateOfBirth: Date, Password: String ) => {
        try {
            const result = await axios.post(`${API_URL}/api/Auth/signup`, {Username, Email, FirstName, LastName, DateOfBirth, Password});
            console.log("🚀 ~ file: AuthContext.tsx:71 ~ login ~ result: ", result);

            setAuthState({
                token: result.data.token,
                authenticated: true,
                role: result.data.role
            });

            axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
            await SecureStore.setItemAsync(ROLE_KEY, result.data.role);
            
            return result;
        } catch (e) {
            console.error("Registration error:", (e as any).response?.data || (e as any).message);
            return {error: true, msg: (e as any).response.data.message};
        }
    };

    const login = async (username: string, password: string) => {
        try {
            const result = await axios.post(`${API_URL}/api/Auth/signin`, {username, password});
            console.log("🚀 ~ file: AuthContext.tsx:93 ~ login ~ result: ", result);

            setAuthState({
                token: result.data.token,
                authenticated: true,
                role: result.data.role
            });

            axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
            await SecureStore.setItemAsync(ROLE_KEY, result.data.role);
            
            return result;
        } catch (e) {
            console.error("Login error:", (e as any).response?.data || (e as any).message);
            return {error: true, msg: (e as any).response.data.message};
        }
    };

    const logout = async () => {
        // Delete token from storage
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        // Delete role from storage
        await SecureStore.deleteItemAsync(ROLE_KEY);

        // Update HTTP Headers
        axios.defaults.headers.common["Authorization"] = "";

        // Reset auth state
        setAuthState({
            token: null,
            authenticated: false,
            role: null
        });
    };  

    const value = {
        authState,
        onRegister: register,
        onLogin: login,
        onLogout: logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}