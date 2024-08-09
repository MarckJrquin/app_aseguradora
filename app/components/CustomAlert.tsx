import React from 'react';
import { Modal, View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface CustomAlertProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ visible, message, onClose }) => {
  const { theme, styles } = useTheme();

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={localStyles.centeredView}>
        <View style={[localStyles.modalView, { backgroundColor: theme === 'dark' ? '#333' : '#fff' }]}>
          <Text style={[styles.text, localStyles.modalText]}>{message}</Text>
          <TouchableOpacity style={localStyles.button} onPress={onClose}>
            <Text style={localStyles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      width: '80%',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#2196F3',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      width: '50%',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
});

export default CustomAlert;
