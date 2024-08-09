import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Profile = () => {
    const { styles } = useTheme();

    return (
        <View style={styles.container}>
            <View style={[localStyles.header, { backgroundColor: styles.colors.background }]}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }} // Aquí deberías colocar la URL de la foto del usuario
                    style={localStyles.profileImage}
                />
                <Text style={localStyles.fullName}>John Doe</Text>
                <Text style={localStyles.username}>@johndoe</Text>
            </View>
            <View style={localStyles.infoSection}>
                <Text style={styles.text}>Username: JohnDoe</Text>
                <Text style={styles.text}>Email: john.doe@example.com</Text>
                <Text style={styles.text}>First Name: John</Text>
                <Text style={styles.text}>Last Name: Doe</Text>
                <Text style={styles.text}>Date of Birth: January 1, 1990</Text>
                <TouchableOpacity style={localStyles.button}>
                    <Text style={styles.text}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={localStyles.button}>
                    <Text style={styles.text}>Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity style={localStyles.button}>
                    <Text style={styles.text}>Delete My Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const localStyles = StyleSheet.create({
    header: {
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: 'linear-gradient(135deg, #FFDFDF 0%, #FF9B9B 100%)',
        justifyContent: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
    },
    fullName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    username: {
        fontSize: 16,
        color: '#555',
    },
    infoSection: {
        padding: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        alignItems: 'center',
    },
});

export default Profile;
