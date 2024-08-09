// app/components/DrawerContent.tsx
import React from 'react';

import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

import { View, Text, Button, Switch, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';


const DrawerContent = (props: any) => {
  const { onLogout } = useAuth();

  const { theme, setTheme, styles } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={localStyles.container}>
        <DrawerItemList {...props} />
        <View style={localStyles.themeToggle}>
          <Text style={styles.text}>Dark Theme</Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
          />
        </View>
        <Button title="Logout" onPress={onLogout} />
      </View>
    </DrawerContentScrollView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  logoutButton: {
    margin: 16,
  },
});

export default DrawerContent;
