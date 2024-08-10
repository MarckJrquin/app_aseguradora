// types.ts
import { ParamListBase } from '@react-navigation/native';

export type RootStackParamList = {
    Profile: undefined;
    ChangePassword: undefined;
    Login: undefined;
    Register: undefined;
    Admin: undefined;
    User: undefined;
    QuoteForm: undefined;
    QuoteDetails: { quote: any }; // Add this line
    "Mis Cotizaciones": undefined; 
};
