import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ImageBackground } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import CustomAlert from '../components/CustomAlert';

const Login = ({ navigation }: any) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const { onLogin } = useAuth();
    const { theme, styles } = useTheme();

    const login = async () => {
        if (!username || !password) {
            setAlertMessage('Por favor, complete todos los campos');
            setAlertVisible(true);
            return;
        }

        const result = await onLogin!(username, password);

        if (result && result.error) {
            setAlertMessage(result.msg);
            setAlertVisible(true);
        }
    };

    return (
        <ImageBackground source={{ uri: 'https://images.pexels.com/photos/804130/pexels-photo-804130.jpeg' }} style={localStyles.background}>
            <View style={localStyles.container}>
                <Image
                    style={localStyles.image}
                    source={require('../../assets/logo.png')}
                />
                <Text style={localStyles.title}>Aseguradora de Autos</Text>
                <View style={localStyles.form}>
                    <View style={localStyles.inputContainer}>
                        <Text style={styles.text}>Nombre de usuario</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Ingrese su nombre de usuario'
                            placeholderTextColor={theme === 'dark' ? '#999' : '#666'}
                            value={username}
                            onChangeText={(text: string) => setUsername(text)}
                        />
                    </View>
                    <View style={localStyles.inputContainer}>
                        <Text style={styles.text}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Ingrese su contraseña'
                            placeholderTextColor={theme === 'dark' ? '#999' : '#666'}
                            value={password}
                            onChangeText={(text: string) => setPassword(text)}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={localStyles.buttonContainer}>
                        <Button title='Iniciar sesión' onPress={login} />
                    </View>
                    <View style={localStyles.buttonContainer}>
                        <Button title='Crear cuenta' onPress={() => navigation.navigate('Register')} />
                    </View>
                </View>
                <CustomAlert
                    visible={alertVisible}
                    message={alertMessage}
                    onClose={() => setAlertVisible(false)}
                />
            </View>
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
        alignItems: 'center',
        width: '100%',
        padding: 20,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#fff',  // Puedes ajustar este color según el tema
    },
    form: {
        width: '80%',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    inputContainer: {
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 10,
    },
});

export default Login;
