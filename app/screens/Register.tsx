import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { API_URL, useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

import CustomAlert from '../components/CustomAlert';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Alert, Platform  } from 'react-native';


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

    const register = async () => {         
        if(!Username || !Email || !FirstName || !LastName || !DateOfBirth || !Password || !ConfirmPassword) {
            setAlertMessage('Please fill in all fields');
            setAlertVisible(true);
            return;
        }
    
        if(Password !== ConfirmPassword) {
            setAlertMessage('Passwords do not match');
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
        <View style={localStyles.container}>
            <Image
                style={localStyles.image}
                source={{ uri: 'https://galaxies.dev/img/logos/logo--blue.png' }}
            />
            <View style={localStyles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    value={Username}
                    onChangeText={(text: string) => setUsername(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    value={Email}
                    onChangeText={(text: string) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='First Name'
                    value={FirstName}
                    onChangeText={(text: string) => setFirstName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Last Name'
                    value={LastName}
                    onChangeText={(text: string) => setLastName(text)}
                />
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
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    value={Password}
                    onChangeText={(text: string) => setPassword(text)}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Confirm Password'
                    value={ConfirmPassword}
                    onChangeText={(text: string) => setConfirmPassword(text)}
                    secureTextEntry={true}
                />
                <Button title='Register' onPress={register} />
                <Button title='Sign in' onPress={() => navigation.navigate('Login')} />
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
        width: '30%',
        height: '30%',
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


export default Register;