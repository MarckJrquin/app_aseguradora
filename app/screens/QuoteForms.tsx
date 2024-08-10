import React, { useState, useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { createQuote, getInsuranceTypes, getCoverages, InsuranceType, Coverage } from '../services/QuoteInsuranceService';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList } from '../navigation/types';

const MIN_YEAR = 1885;
const CURRENT_YEAR = new Date().getFullYear();

const QuoteForm = () => {
    const { styles } = useTheme();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [cost, setCost] = useState('');
    const [year, setYear] = useState<string>('');
    const [insuranceType, setInsuranceType] = useState<number | string>(''); 
    const [coverage, setCoverage] = useState<number | string>(''); 
    const [insuranceTypes, setInsuranceTypes] = useState<InsuranceType[]>([]);
    const [coverages, setCoverages] = useState<Coverage[]>([]);
    const [datePickerOpen, setDatePickerOpen] = useState(false);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const insuranceResponse = await getInsuranceTypes();
                const coverageResponse = await getCoverages();
                setInsuranceTypes(insuranceResponse);
                setCoverages(coverageResponse);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchOptions();
    }, []);

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || new Date(year);
        setDatePickerOpen(Platform.OS === 'ios');
        setYear(currentDate.getFullYear().toString());
    };

    const handleCostChange = (text: string) => {
        const filteredText = text.replace(/[^0-9.]/g, '');
        setCost(filteredText);
    };

    const handleYearChange = (text: string) => {
        const filteredText = text.replace(/[^0-9]/g, '');
        setYear(filteredText);
    };

    const validateForm = () => {
        if (!brand.trim() || !model.trim()) {
            Alert.alert('Error', 'Marca y modelo son campos obligatorios.');
            return false;
        }

        const numericCost = parseFloat(cost.replace(/,/g, ''));
        if (isNaN(numericCost) || numericCost <= 0) {
            Alert.alert('Error', 'El costo debe ser un número positivo.');
            return false;
        }

        const numericYear = parseInt(year, 10);
        if (isNaN(numericYear) || numericYear < MIN_YEAR || numericYear > CURRENT_YEAR) {
            Alert.alert('Error', `El año debe estar entre ${MIN_YEAR} y ${CURRENT_YEAR}.`);
            return false;
        }

        if (insuranceType === '') {
            Alert.alert('Error', 'Debe seleccionar un tipo de seguro.');
            return false;
        }

        if (coverage === '') {
            Alert.alert('Error', 'Debe seleccionar una cobertura.');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            const quoteData = {
                Brand: brand,
                Model: model,
                Cost: cost,
                Year: parseInt(year, 10),
                InsuranceTypeId: parseInt(insuranceType as string, 10),
                CoverageId: parseInt(coverage as string, 10),
            };
            try {
                const generatedQuote = await createQuote(quoteData);

                navigation.navigate('QuoteDetails', { quote: generatedQuote });
            } catch (error) {
                Alert.alert('Error', 'No se pudo generar la cotización.');
            }
        }
    };

    return (
        <ScrollView style={[localStyles.container]}>
            <Text style={[localStyles.title, styles.text]}>Generar Cotización</Text>
            
            <View style={localStyles.formGroup}>
                <Text style={[localStyles.label, styles.text]}>Marca</Text>
                <TextInput
                    style={[styles.input, localStyles.input]}
                    placeholder="Marca"
                    value={brand}
                    onChangeText={setBrand}
                    placeholderTextColor={styles.colors.text}
                />
            </View>
            
            <View style={localStyles.formGroup}>
                <Text style={[localStyles.label, styles.text]}>Modelo</Text>
                <TextInput
                    style={[styles.input, localStyles.input]}
                    placeholder="Modelo"
                    value={model}
                    onChangeText={setModel}
                    placeholderTextColor={styles.colors.text}
                />
            </View>
            
            <View style={localStyles.formGroup}>
                <Text style={[localStyles.label, styles.text]}>Costo</Text>
                <TextInput
                    style={[styles.input, localStyles.input]}
                    placeholder="Costo"
                    keyboardType="numeric"
                    value={cost}
                    onChangeText={handleCostChange}
                    placeholderTextColor={styles.colors.text}
                />
            </View>
            
            <View style={localStyles.formGroup}>
                <Text style={[localStyles.label, styles.text]}>Año</Text>
                <TextInput
                    style={[styles.input, localStyles.input]}
                    placeholder="Año"
                    keyboardType="numeric"
                    value={year}
                    onChangeText={handleYearChange}
                    placeholderTextColor={styles.colors.text}
                />
            </View>

            <View style={localStyles.formGroup}>
                <Text style={[localStyles.label, styles.text]}>Tipo de Seguro</Text>
                <View style={localStyles.pickerContainer}>
                    <Picker
                        selectedValue={insuranceType}
                        onValueChange={(itemValue) => setInsuranceType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Seleccione Tipo de Seguro" value="" />
                        {insuranceTypes.map(type => (
                            <Picker.Item key={type.id} label={type.name} value={type.id} />
                        ))}
                    </Picker>
                </View>
            </View>
            
            <View style={localStyles.formGroup}>
                <Text style={[localStyles.label, styles.text]}>Cobertura</Text>
                <View style={localStyles.pickerContainer}>
                    <Picker
                        selectedValue={coverage}
                        onValueChange={(itemValue) => setCoverage(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Seleccione Cobertura" value="" />
                        {coverages.map(cov => (
                            <Picker.Item key={cov.id} label={cov.name} value={cov.id} />
                        ))}
                    </Picker>
                </View>
            </View>

            <View style={localStyles.formGroup}>
                <Button title="Generar Cotización" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
};

const localStyles = StyleSheet.create({
    container: {  
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 24,
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#495057',
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        overflow: 'hidden',
    },
    picker: {
        height: 44,
        width: '100%',
    },
    button:{
        marginBottom: 20,
    }
});

export default QuoteForm;
