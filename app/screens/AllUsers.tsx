import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from "react-native";
import { getAllUsers } from '../services/UserService';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Role {
  id: number;
  name: string;
}

interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  roles: Role[];
}

const profileImages = [
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
  'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
  'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
  'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg',
  'https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg',
  'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',
  'https://images.pexels.com/photos/428333/pexels-photo-428333.jpeg',
  'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg',
];

const getRandomProfileImage = () => {
  const randomIndex = Math.floor(Math.random() * profileImages.length);
  return profileImages[randomIndex];
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const AllUsers = () => {
  const { styles } = useTheme();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (error) {
        console.error('Error getting all users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={styles.spinnerColor} />
      </View>
    );
  }

  const renderItem = ({ item }: { item: User }) => {
    const role = item.roles[0]?.name || 'No role';
    const roleColor = role === 'Admin' ? '#ff4d4d' : '#4d94ff';

    return (
      <View style={styles.cardUser}>
        <Image
          source={{ uri: getRandomProfileImage() }}
          style={styles.profileImage}
        />
        <View style={styles.textContainer}>
          <View style={[styles.chip, { backgroundColor: roleColor }]}>
            <Text style={styles.chipText}>{role}</Text>
          </View>
          <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
          <View style={styles.row}>
            <Icon name="user" size={16} color={styles.text.color} style={styles.icon} />
            <Text style={styles.username}>@{item.username}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="envelope" size={16} color={styles.text.color} style={styles.icon} />
            <Text style={styles.email}>{item.email}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="calendar" size={16} color={styles.text.color} style={styles.icon} />
            <Text style={styles.createdAt}>Fecha de Registro: {formatDate(item.createdAt)}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.email}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay usuarios disponibles.</Text>}
      />
    </View>
  );
};

export default AllUsers;
