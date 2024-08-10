import React, { useEffect, useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, editUserProfile, deleteUser } from '../services/UserService';
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { RootStackParamList } from '../navigation/types';

interface EditUserModel {
    Email: string;
    FirstName: string;
    LastName: string;
    DateOfBirth: string; // Use string to match API format
}

const Profile = () => {
    const { styles } = useTheme();
    const { onLogout } = useAuth();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [userProfile, setUserProfile] = useState({
        email: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        username: ''
    });
    const [formData, setFormData] = useState<EditUserModel>({
        Email: '',
        FirstName: '',
        LastName: '',
        DateOfBirth: ''
    });
    const [editMode, setEditMode] = useState(false);
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState(new Date()); // Use Date object for date handling

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const profile = await getUserProfile();
                const dob = new Date(profile.dateOfBirth);
                setUserProfile(profile);
                setDateOfBirth(dob);
                setFormData({
                    Email: profile.email,
                    FirstName: profile.firstName,
                    LastName: profile.lastName,
                    DateOfBirth: formatDateForDisplay(dob)
                });
            } catch (error) {
                console.error("Error loading profile:", (error as any).message);
            }
        };

        loadProfile();
    }, []);

    const formatDateForDisplay = (date: Date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const formatDateForAPI = (date: Date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateFormData = () => {
        const { Email, FirstName, LastName, DateOfBirth } = formData;
        if (!Email || !FirstName || !LastName || !DateOfBirth) {
            Alert.alert('Todos los campos son obligatorios.');
            return false;
        }
        if (!isValidEmail(Email)) {
            Alert.alert('El formato del correo electrónico no es válido.');
            return false;
        }
        return true;
    };

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setDatePickerOpen(false);
        if (selectedDate) {
            setDateOfBirth(selectedDate);
            setFormData(prev => ({
                ...prev,
                DateOfBirth: formatDateForDisplay(selectedDate)
            }));
        }
    };

    const handleEditProfile = async () => {
        if (!validateFormData()) {
            return;
        }

        try {
            const formattedData: EditUserModel = {
                Email: formData.Email,
                FirstName: formData.FirstName,
                LastName: formData.LastName,
                DateOfBirth: formatDateForAPI(dateOfBirth) // Use formatted date for API
            };
            await editUserProfile(formattedData);
            Alert.alert('Perfil actualizado con éxito');
            // Reload profile data
            const updatedProfile = await getUserProfile();
            const updatedDob = new Date(updatedProfile.dateOfBirth);
            setUserProfile(updatedProfile);
            setDateOfBirth(updatedDob);
            setFormData({
                Email: updatedProfile.email,
                FirstName: updatedProfile.firstName,
                LastName: updatedProfile.lastName,
                DateOfBirth: formatDateForDisplay(updatedDob)
            });
            setEditMode(false);
        } catch (error) {
            Alert.alert('Error al actualizar el perfil');
        }
    };

    const handleDeleteAccount = async () => {
        Alert.alert(
            'Confirmar Eliminación',
            '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteUser();
                            Alert.alert('Cuenta eliminada exitosamente');
                            if (onLogout) {
                                onLogout(); // Cerrar sesión después de eliminar la cuenta
                            }
                        } catch (error) {
                            Alert.alert('Error al eliminar la cuenta');
                        }
                    },
                },
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={[localStyles.header, { backgroundColor: styles.colors.background }]}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }}
                    style={localStyles.profileImage}
                />
                <Text style={[localStyles.fullName, { color: styles.colors.text }]}>
                    {userProfile?.firstName} {userProfile?.lastName}
                </Text>
                <Text style={[localStyles.username, { color: styles.colors.text }]}>
                    @{userProfile?.username}
                </Text>
            </View>
            <View style={[localStyles.infoSection, { backgroundColor: styles.colors.card }]}>
                <Text style={styles.text}>Correo Electrónico</Text>
                <TextInput
                    style={[styles.input, localStyles.inputSpacing]}
                    value={formData.Email}
                    onChangeText={(text) => setFormData({ ...formData, Email: text })}
                    placeholder="Ingrese su correo electrónico"
                    editable={editMode}
                    placeholderTextColor={styles.colors.text}
                />
                
                <Text style={styles.text}>Nombre</Text>
                <TextInput
                    style={[styles.input, localStyles.inputSpacing]}
                    value={formData.FirstName}
                    onChangeText={(text) => setFormData({ ...formData, FirstName: text })}
                    placeholder="Ingrese su nombre"
                    editable={editMode}
                    placeholderTextColor={styles.colors.text}
                />
                
                <Text style={styles.text}>Apellido</Text>
                <TextInput
                    style={[styles.input, localStyles.inputSpacing]}
                    value={formData.LastName}
                    onChangeText={(text) => setFormData({ ...formData, LastName: text })}
                    placeholder="Ingrese su apellido"
                    editable={editMode}
                    placeholderTextColor={styles.colors.text}
                />
                
                <Text style={styles.text}>Fecha de Nacimiento</Text>
                <TouchableOpacity onPress={() => editMode && setDatePickerOpen(true)}>
                    <Text style={[styles.input, localStyles.inputSpacing]}>
                        {formData.DateOfBirth}
                    </Text>
                </TouchableOpacity>
                {datePickerOpen && editMode && (
                    <DateTimePicker
                        value={dateOfBirth}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}

                <View style={localStyles.buttonContainer}>
                    {editMode ? (
                        <View style={localStyles.row}>
                            <TouchableOpacity
                                style={[localStyles.button, { backgroundColor: styles.colors.primary, marginRight: 10 }]}
                                onPress={handleEditProfile}
                            >
                                <Text style={styles.buttonText}>Actualizar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[localStyles.button, { backgroundColor: styles.colors.primary }]}
                                onPress={() => setEditMode(false)}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={[localStyles.button_b, { backgroundColor: styles.colors.primary }]}
                            onPress={() => setEditMode(true)}
                        >
                            <Text style={styles.buttonText}>Editar Perfil</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={[localStyles.deleteButton, { marginTop: 20 }]}
                        onPress={handleDeleteAccount}
                    >
                        <Text style={styles.buttonText}>Eliminar Cuenta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const localStyles = StyleSheet.create({
    header: {
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#fff',
        marginBottom: 10,
    },
    fullName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    username: {
        fontSize: 18,
        color: '#666',
    },
    infoSection: {
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 10,
    },
    inputSpacing: {
        marginBottom: 15,
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 5,
    },
    button_b: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 5,
    },
    deleteButton: {
        backgroundColor: '#FF5733',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333'
    }
});

export default Profile;
