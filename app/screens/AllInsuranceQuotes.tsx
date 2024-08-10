import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getAllQuotes } from '../services/QuoteInsuranceService';

interface User {
    firstName: string;
    lastName: string;
    username: string;
}

interface Quote {
    id: number;
    brand: string;
    model: string;
    cost: string;
    year: number;
    insuranceType: string;
    coverage: string;
    price: number;
    createdAt: string;
    user: User; 
}

const imageUrls = [
    'https://images.pexels.com/photos/12393000/pexels-photo-12393000.jpeg',
    'https://images.pexels.com/photos/13627442/pexels-photo-13627442.jpeg',
    'https://images.pexels.com/photos/11500861/pexels-photo-11500861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/9145483/pexels-photo-9145483.jpeg',
    'https://images.pexels.com/photos/8830042/pexels-photo-8830042.jpeg',
    'https://images.pexels.com/photos/7856833/pexels-photo-7856833.jpeg',
    'https://images.pexels.com/photos/4149337/pexels-photo-4149337.jpeg',
    'https://images.pexels.com/photos/12920640/pexels-photo-12920640.jpeg'
];

const AllInsuranceQuotes = () => {
    const { styles } = useTheme();
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const response = await getAllQuotes();
                setQuotes(response);
            } catch (error) {
                console.error('Error fetching user quotes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuotes();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const getRandomImage = () => {
        return imageUrls[Math.floor(Math.random() * imageUrls.length)];
    }

    const renderItem = ({ item }: { item: Quote }) => (
        <View style={styles.card}>
            <View style={localStyles.overlay}>
                <Text style={localStyles.overlayText}>{item.brand} {item.model} {item.year}</Text>
                <Text style={localStyles.overlayText}>{item.cost}</Text>
            </View>
            <Image source={{ uri: getRandomImage() }} style={localStyles.cardImage} />
            <View style={localStyles.cardContent}>
                <Text style={styles.cardText}>Tipo de Seguro: {item.insuranceType}</Text>
                <Text style={styles.cardText}>Cobertura: {item.coverage}</Text>
                <Text style={styles.cardText}>Precio: {item.price}</Text>
                <Text style={styles.cardText}>Cotizador: {item.user.firstName} {item.user.lastName}</Text>
                <Text style={styles.cardText}>Username: @{item.user.username}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={quotes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.cardText}>No hay cotizaciones disponibles.</Text>}
            />
        </View>
    );
};

const localStyles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        overflow: 'hidden',
    },
    overlay: {
        position: 'absolute',
        top: 8,
        left: 8,
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    overlayText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    cardImage: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    cardContent: {
        padding: 16,
    },
});

export default AllInsuranceQuotes;
