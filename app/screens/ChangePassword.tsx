import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { updatePassword } from '../services/UserService';

const ChangePassword = () => {
    const { styles } = useTheme();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Todos los campos son obligatorios.');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Las nuevas contraseñas no coinciden.');
            return;
        }

        try {
            const response = await updatePassword({ OldPassword: oldPassword, NewPassword: newPassword });
            console.log("🚀 ~ file: ChangePassword.tsx:64 ~ handleChangePassword ~ response", response);
            
            const message = response.message || 'Contraseña actualizada exitosamente.';
            Alert.alert('Éxito', message);
        } catch (error) {
            const errorMessage = (error as any).response?.data?.message || 'No se pudo actualizar la contraseña. Por favor, intente nuevamente.';
            Alert.alert('Error', errorMessage);
        }
    };

    return (
        <View style={[styles.container, localStyles.container]}>
            <Text style={[localStyles.title, { color: styles.colors.text }]}>Cambiar Contraseña</Text>
            
            <Text style={[localStyles.label, { color: styles.colors.text }]}>Contraseña Actual</Text>
            <TextInput
                style={[styles.input, localStyles.input]}
                placeholder="Contraseña Anterior"
                secureTextEntry
                value={oldPassword}
                onChangeText={setOldPassword}
                placeholderTextColor={styles.colors.text}
            />
            
            <Text style={[localStyles.label, { color: styles.colors.text }]}>Nueva Contraseña</Text>
            <TextInput
                style={[styles.input, localStyles.input]}
                placeholder="Nueva Contraseña"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                placeholderTextColor={styles.colors.text}
            />
            
            <Text style={[localStyles.label, { color: styles.colors.text }]}>Confirmar Nueva Contraseña</Text>
            <TextInput
                style={[styles.input, localStyles.input]}
                placeholder="Confirmar Nueva Contraseña"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholderTextColor={styles.colors.text}
            />
            
            <TouchableOpacity
                style={[localStyles.button, { backgroundColor: styles.colors.primary }]}
                onPress={handleChangePassword}
            >
                <Text style={styles.buttonText}>Actualizar Contraseña</Text>
            </TouchableOpacity>
        </View>
    );
};

const localStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        marginBottom: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
    },
    button: {
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
});

export default ChangePassword;
