import React from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';
import { saveQuote } from '../services/QuoteInsuranceService'; 
// import { ScrollView } from 'react-native-gesture-handler';


type QuoteDetailsScreenRouteProp = RouteProp<RootStackParamList, 'QuoteDetails'>;

type Props = {
    route: QuoteDetailsScreenRouteProp;
};

const QuoteDetails = ({ route }: Props) => {
    const { styles } = useTheme();
    const { quote } = route.params;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    // Desestructura los datos de la cotización
    const { car, coverage, insuranceType, date, price, user, quoteId } = quote;

    // Paso 2: Implementa la función para guardar la cotización
    const handleSaveQuote = async () => {
        try {
            const quoteData = {
                Year: car.year,
                Brand: car.brand,
                Model: car.model,
                Cost: car.cost.toString(),
                InsuranceTypeId: insuranceType.id,
                CoverageId: coverage.id,
            };

            const savedQuote = await saveQuote(quoteData);
            console.log('🖨️ Cotización guardada:', savedQuote);

            // Aquí podrías mostrar una notificación de éxito, navegar a otra pantalla, etc.
            alert('Cotización guardada exitosamente!');
            navigation.navigate('Mis Cotizaciones');
        } catch (error) {
            console.error('Error al guardar la cotización:', error);
            alert('Ocurrió un error al guardar la cotización.');
        }
    };

    return (
        <ScrollView style={localStyles.container}>
            {/* Resto del código de renderizado */}
            <View style={localStyles.header}>
                <Text style={[localStyles.quoteId, styles.text]}>ID de Cotización: {quoteId}</Text>
                <Text style={[localStyles.date, styles.text]}>Fecha y Hora: {date}</Text>
            </View>

            <View style={localStyles.userInfo}>
                <Text style={[localStyles.sectionTitle, styles.text]}>Datos del Cotizador</Text>
                <Text style={[localStyles.text, styles.text]}>Nombre: {user?.firstName} {user?.lastName}</Text>
                <Text style={[localStyles.text, styles.text]}>Username: {user?.username}</Text>
                <Text style={[localStyles.text, styles.text]}>Correo: {user?.email}</Text>
            </View>

            <View style={localStyles.details}>
                <Text style={[localStyles.sectionTitle, styles.text]}>Descripción</Text>
                <View style={localStyles.detailRow}>
                    <Text style={[localStyles.label, styles.text]}>Marca</Text>
                    <Text style={[localStyles.value, styles.text]}>{car?.brand}</Text>
                </View>
                <View style={localStyles.detailRow}>
                    <Text style={[localStyles.label, styles.text]}>Modelo</Text>
                    <Text style={[localStyles.value, styles.text]}>{car?.model}</Text>
                </View>
                <View style={localStyles.detailRow}>
                    <Text style={[localStyles.label, styles.text]}>Año</Text>
                    <Text style={[localStyles.value, styles.text]}>{car?.year}</Text>
                </View>
                <View style={localStyles.detailRow}>
                    <Text style={[localStyles.label, styles.text]}>Costo</Text>
                    <Text style={[localStyles.value, styles.text]}>{car?.cost}</Text>
                </View>
                <View style={localStyles.detailRow}>
                    <Text style={[localStyles.label, styles.text]}>Tipo de Seguro</Text>
                    <Text style={[localStyles.value, styles.text]}>{insuranceType?.name}</Text>
                </View>
                <View style={localStyles.detailRow}>
                    <Text style={[localStyles.label, styles.text]}>Cobertura</Text>
                    <Text style={[localStyles.value, styles.text]}>{coverage?.name}</Text>
                </View>
                <View style={localStyles.detailRow}>
                    <Text style={[localStyles.label, styles.text]}>Precio</Text>
                    <Text style={[localStyles.value, styles.text]}>{price}</Text>
                </View>
            </View>

            <Text style={localStyles.thankYou}>¡Gracias por cotizar con nosotros!</Text>

            <Button title="Guardar Cotización" onPress={handleSaveQuote} />
            <Button title="Regresar" onPress={() => navigation.goBack()} />
        </ScrollView>
    );
};

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
    },
    header: {
        marginTop: 50,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 10,
    },
    quoteId: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    date: {
        fontSize: 16,
        color: '#555',
    },
    userInfo: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    details: {
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
    thankYou: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
});

export default QuoteDetails;
