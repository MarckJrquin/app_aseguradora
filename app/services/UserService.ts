import apiClient from './ApiService';

interface EditUserModel {
    Email: string;
    FirstName: string;
    LastName: string;
    DateOfBirth: string;
}

interface UpdatePasswordModel {
    OldPassword: string;
    NewPassword: string;
}

// Obtener perfil del usuario
export const getUserProfile = async () => {
    try {
        const response = await apiClient.get('/api/User/profile');
        return response.data;
    } catch (error) {
        console.error("Error getting user profile:", (error as any).response?.data || (error as any).message);
        throw error;
    }
};

// Editar perfil del usuario
export const editUserProfile = async (model: EditUserModel) => {
    try {
        const response = await apiClient.put('/api/User/profile', model);
        return response.data;
    } catch (error) {
        console.error("Error editing user profile:", (error as any).response?.data || (error as any).message);
        throw error;
    }
};

// Actualizar contraseña del usuario
export const updatePassword = async (model: UpdatePasswordModel) => {
    try {
        const response = await apiClient.put('/api/User/profile/password', model);
        return response.data;
    } catch (error) {
        console.error("Error updating password:", (error as any).response?.data || (error as any).message);
        throw error;
    }
};

// Eliminar cuenta del usuario
export const deleteUser = async () => {
    try {
        const response = await apiClient.delete('/api/User/profile');
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", (error as any).response?.data || (error as any).message);
        throw error;
    }
};

// Obtener todos los usuarios (puede ser usado para administración, por ejemplo)
export const getAllUsers = async () => {
    try {
        const response = await apiClient.get('/api/User/all');
        return response.data;
    } catch (error) {
        console.error("Error getting all users:", (error as any).response?.data || (error as any).message);
        throw error;
    }
};
