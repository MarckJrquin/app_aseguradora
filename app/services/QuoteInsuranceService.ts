import apiClient from '../services/ApiService';

interface quoteData {
    Brand: string,
    Model: string
    Cost: string
    Year: number,
    InsuranceTypeId: number,
    CoverageId: number,
}

export interface InsuranceType {
    id: number;
    name: string;
}

export interface Coverage {
    id: number;
    name: string;
}


export const createQuote = async (model: quoteData) => {
    try {
        const response = await apiClient.post('/api/quote/create-quote', model);
        return response.data;
    } catch (error) {
        console.error('Error creating quote:', error);
        throw error;
    }
}

export const saveQuote = async (model: quoteData) => {
    try {
        const response = await apiClient.post('/api/quote/save-quote', model);
        return response.data;
    } catch (error) {
        console.error('Error saving quote:', error);
        throw error;
    }
}


export const getInsuranceTypes = async () => {
    try {
        const response = await apiClient.get('/api/quote/insurance-types');
        return response.data;
    } catch (error) {
        console.error('Error fetching insurance types:', error);
        throw error;
    }
} 

export const getCoverages = async () => {
    try {
        const response = await apiClient.get('/api/quote/coverages');
        return response.data;
    } catch (error) {
        console.error('Error fetching coverages:', error);
        throw error;
    }
}


export const getUserQuotes = async () => {
    try {
        const response = await apiClient.get('/api/quote/user-quotes');
        return response.data;
    } catch (error) {
        console.error('Error fetching user quotes:', error);
        throw error;
    }
}


export const getAllQuotes = async () => {
    try {
        const response = await apiClient.get('/api/quote/all-quotes');
        return response.data;
    } catch (error) {
        console.error('Error fetching all quotes:', error);
        throw error;
    }
}


export const deleteQuote = async (quoteId: number) => {
    try {
        const response = await apiClient.delete(`/api/quote/delete-quote/${quoteId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting quote:', error);
        throw error;
    }
}



