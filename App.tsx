import React from 'react';

import { AuthProvider, useAuth } from './app/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent from './app/components/DrawerContent';
import HomeUser from './app/screens/HomeUser';
import HomeAdmin from './app/screens/HomeAdmin';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Profile from './app/screens/Profile';

import { ThemeProvider, useTheme } from './app/context/ThemeContext';
import { LightTheme, AppDarkTheme  } from './app/theme';
import { Button, StyleSheet, Text, View } from 'react-native';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </AuthProvider>
  );
}

const UserDrawer = () => (
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen name="Inicio" component={HomeUser} />
    <Drawer.Screen name="Cotizar" component={HomeUser} />
    <Drawer.Screen name="Mis Cotizaciones" component={HomeUser} />
    <Drawer.Screen name="Mi Perfil" component={Profile} />
  </Drawer.Navigator>
);

const AdminDrawer = () => (
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen name="Inicio" component={HomeAdmin} />
    <Drawer.Screen name="Cotizaciones" component={HomeUser} />
    <Drawer.Screen name="Usuarios" component={HomeUser} />
    <Drawer.Screen name="Mi Perfil" component={Profile} />
  </Drawer.Navigator>
);

export const Layout = () => {
  const { authState, onLogout } = useAuth();  
  const { theme } = useTheme();

  return (
    <NavigationContainer theme={theme === 'light' ? LightTheme : AppDarkTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {authState?.authenticated ? (
          authState.role === 'Admin' ? (
            <Stack.Screen name="Admin" component={AdminDrawer} />
          ) : (
            <Stack.Screen name="User" component={UserDrawer} />
          )
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}