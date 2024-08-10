import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Platform, ImageBackground, ScrollView, Alert } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import CustomAlert from '../components/CustomAlert';

const Register = ({ navigation }: any) => {
    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [DateOfBirth, setDateOfBirth] = useState(new Date());
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [datePickerOpen, setDatePickerOpen] = useState(false);

    const { onRegister } = useAuth();
    const { theme, styles } = useTheme();

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const register = async () => {
        if(!Username || !Email || !FirstName || !LastName || !DateOfBirth || !Password || !ConfirmPassword) {
            setAlertMessage('Por favor, completa todos los campos');
            setAlertVisible(true);
            return;
        }

        if (!validateEmail(Email)) {
            setAlertMessage('Por favor, introduce un correo electrónico válido');
            setAlertVisible(true);
            return;
        }
    
        if(Password !== ConfirmPassword) {
            setAlertMessage('Las contraseñas no coinciden');
            setAlertVisible(true);
            return;
        }
    
        const result = await onRegister!(Username, Email, FirstName, LastName, DateOfBirth, Password);
    
        if (result && result.error) {
            setAlertMessage(result.msg);
            setAlertVisible(true);
        }
    }

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || DateOfBirth;
        setDatePickerOpen(Platform.OS === 'ios');
        setDateOfBirth(currentDate);
    };

    return (
        <ImageBackground source={{ uri: 'https://images.pexels.com/photos/804130/pexels-photo-804130.jpeg' }} style={localStyles.background}>
            <ScrollView contentContainerStyle={localStyles.container}>
                <Image
                    style={localStyles.image}
                    source={require('../../assets/logo.png')}
                />
                <Text style={localStyles.subtitle}>Aseguradora de Autos</Text>
                <View style={localStyles.form}>
                    <View style={localStyles.inputContainer}>
                        <Text style={styles.text}>Nombre de Usuario</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Nombre de usuario'
                            value={Username}
                            onChangeText={(text: string) => setUsername(text)}
                        />
                    </View>
                    <View style={localStyles.inputContainer}>
                        <Text style={styles.text}>Correo Electrónico</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Correo electrónico'
                            value={Email}
                            onChangeText={(text: string) => setEmail(text)}
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={localStyles.inputContainer}>
                        <Text style={styles.text}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Nombre'
                            value={FirstName}
                            onChangeText={(text: string) => setFirstName(text)}
                        />
                    </View>
                    <View style={localStyles.inputContainer}>
                        <Text style={styles.text}>Apellido</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Apellido'
                            value={LastName}
                            onChangeText={(text: string) => setLastName(text)}
                        />
                    </View>
                    <View style={localStyles.inputContainer}>
                        <Text style={styles.text}>Fecha de Nacimiento</Text>
                        <TouchableOpacity onPress={() => setDatePickerOpen(true)}>
                            <Text style={styles.input}>
                                {DateOfBirth.toDateString()}
                            </Text>
                        </TouchableOpacity>
                        {datePickerOpen && (
                            <DateTimePicker
                                value={DateOfBirth}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                    </View>
                    <View style={localStyles.inputContainer}>
                        <Text style={styles.text}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Contraseña'
                            value={Password}
                            onChangeText={(text: string) => setPassword(text)}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={localStyles.inputContainer}>
                        <Text style={styles.text}>Confirmar Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Confirmar contraseña'
                            value={ConfirmPassword}
                            onChangeText={(text: string) => setConfirmPassword(text)}
                            secureTextEntry={true}
                        />
                    </View>
                    <Button title='Registrarse' onPress={register} />
                    <Button title='Iniciar sesión' onPress={() => navigation.navigate('Login')} />
                </View>
                <CustomAlert
                    visible={alertVisible}
                    message={alertMessage}
                    onClose={() => setAlertVisible(false)}
                />
            </ScrollView>
        </ImageBackground>
    );
};

const localStyles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
        color: '#888',
    },
    form: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    inputContainer: {
        marginBottom: 15,
        width: '100%',
    },
});

export default Register;
