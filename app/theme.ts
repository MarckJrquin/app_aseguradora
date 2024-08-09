import { DefaultTheme as NavDefaultTheme, DarkTheme as NavDarkTheme } from '@react-navigation/native';

// Renamed the dark theme to avoid conflict with the imported one
export const LightTheme = {
  ...NavDefaultTheme,
  colors: {
    ...NavDefaultTheme.colors,
    background: 'white',
    text: 'black',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#ccc',
    color: 'black',
  },
  text: {
    color: 'black',
  },
};

export const AppDarkTheme = {
  ...NavDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    background: 'black',
    text: 'white',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#333',
    borderColor: '#555',
    color: 'white',
  },
  text: {
    color: 'white',
  },
};
