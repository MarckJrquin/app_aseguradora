import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const HomeAdmin = () => {
    const { styles } = useTheme();

    return (
        <ImageBackground
            source={{ uri: 'https://images.pexels.com/photos/1051071/pexels-photo-1051071.jpeg' }}
            style={localStyles.backgroundImage}
            resizeMode="cover"
        >
            <View style={localStyles.overlay}>
                <View style={localStyles.contentContainer}>
                    <Image source={require('../../assets/logo.png')} style={localStyles.logo} />
                    <Text style={[styles.text, localStyles.welcomeText]}>
                        Bienvenido a la App de Cotización de Seguros de Auto
                    </Text>
                </View>
            </View>
        </ImageBackground>
    );
};

const localStyles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Oscurecer la imagen de fondo
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 30,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        paddingHorizontal: 20,
    },
});

export default HomeAdmin;
