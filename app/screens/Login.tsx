import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import axios from 'axios';
import { API_URL, useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

import CustomAlert from '../components/CustomAlert';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet } from 'react-native';


const Login = ({ navigation }: any) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const { onLogin } = useAuth();
    const { theme, styles } = useTheme();

    // useEffect(() => {
    //     axios.get(`${API_URL}/api/User/all`)
    //         .then(result => {
    //             console.log("asdyutub", result);
    //         })
    //         .catch(error => {
    //             if (error.response) {
    //                 console.error("Response error:", error.response);
    //             } else if (error.request) {
    //                 console.error("Request error:", error.request);
    //             } else {
    //                 console.error("Error", error.message);
    //             }
    //         });
    // }, []);

    const login = async () => {

        if(!username || !password) {
            setAlertMessage('Please fill in all fields');
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
        <View style={localStyles.container}>
            <Image
                style={localStyles.image}
                source={{ uri: 'https://galaxies.dev/img/logos/logo--blue.png' }}
            />
            <View style={localStyles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    value={username}
                    onChangeText={(text: string) => setUsername(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    value={password}
                    onChangeText={(text: string) => setPassword(text)}
                    secureTextEntry={true}
                />
                <Button title='Sign in' onPress={login} />
                <Button title='Create Account' onPress={() => navigation.navigate('Register')} />
            </View>
            <CustomAlert
                visible={alertVisible}
                message={alertMessage}
                onClose={() => setAlertVisible(false)}
            />
        </View>
    );
};


const localStyles = StyleSheet.create({
    image: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain',
    },
    form: {
        gap: 10,
        width: '60%',
    },
    container: {
        alignItems: 'center',
        width: '100%'
    }
});


export default Login;